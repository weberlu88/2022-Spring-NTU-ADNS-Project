import os
from flask import Flask, request, jsonify, make_response, send_from_directory
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
from flask import render_template

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies

from models.user import UserModel
from models.comment import CommentModel
from models.info import InfoModel
from utilities.strToInt import parseInt
from utilities.passwordManager import generate_salt, generate_digest, validate_password

app = Flask(__name__, static_folder='../frontend/dist')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config["JWT_TOKEN_LOCATION"] = ["headers"] # options: "cookies", "json", "query_string"
app.config["JWT_COOKIE_SECURE"] = True # only allow the cookies that contain your JWTs to be sent over https
app.config["JWT_COOKIE_SAMESITE"] = "None"
app.config["JWT_SECRET_KEY"] = "super-secret-jfi;l_8"
app.secret_key = 'keyyyyyyyyyyy-y^%#M.'
# app.config['CORS_HEADERS'] = 'Content-Type'
whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://127.0.0.1:3000', 'https://localhost:3000', 'https://127.0.0.1:5000',]
cors = CORS(app, resources={r"/api/*": {"origins": whitelist}}, supports_credentials=True) # https://flask-cors.readthedocs.io/en/latest/
api = Api(app)
jwt = JWTManager(app)

AUTH_FAILLED = 'Authentication failed.'

class User(Resource):
    @cross_origin()
    def get(self, username):
        res = UserModel.find_by_username(username)
        if res:
            return res.json()
        return {}, 404

userParser = reqparse.RequestParser()
userParser.add_argument('username', type=str, required=True, help='username cannot be blank.')
userParser.add_argument('password', type=str, required=True, help='password cannot be blank.')
userParser.add_argument('description', type=str, required=False)
userParser.add_argument('avatar', type=str, required=False)
        
class UserPost(Resource):
    @cross_origin()
    def post(self):
        ''' 新增用戶(註冊) '''
        args = userParser.parse_args()
        description = ''
        avatar = ''
        # print(args['username'], args['password'])
        if len(args['username']) == 0 or len(args['username']) > 20 or len(args['password']) > 20:
            return {'message': 'Invalid username or password.'}, 400
        if UserModel.find_by_username(args['username']):
            return {'message': 'Duplicate username.'}, 400
        if args['description'] is not None and len(args['description']) > 120:
            return {'message': 'Invalid username or password.'}, 400
        if args['description'] is not None :
            description = args['description']
        if args['avatar'] is not None and len(args['avatar']) > 80000: # 50KB
            return {'message': 'Invalid image.'}, 400
        if args['avatar'] is not None:
            avatar = args['avatar']
            print('avatar lenght:', len(args['avatar']))

        salt = generate_salt()
        hashed_password = generate_digest(args['password'], salt)
        UserModel.create_user(args['username'], salt, hashed_password, description, avatar)
        return jsonify({'message': 'Create successfully.'}) #201前端收不到?

# for test
# @app.route("/api/test", methods=['GET'])
# def test():
#     access_token = create_access_token(identity=str(1))
#     # Set cookie
#     response = jsonify(status='success')
#     response.set_cookie(
#         'access_token', access_token, 
#         domain=".app.localhost", 
#         path='/', 
#         max_age=600,
#         secure=True, 
#         httponly=False,
#         samesite="None"
#     )
#     return response

# for test
# @app.route("/api/recieve", methods=['GET'])
# def recieve_cookie():
#     access_token = request.cookies.get('access_token')
#     print('access_token:',access_token)
#     return {}

class Login(Resource):
    ''' 登入 '''
    @cross_origin()
    def post(self):
        # json_data = request.get_json(force=True)
        args = userParser.parse_args()
        username = args['username']
        password = args['password']

        ERROR_MSG = 'Invalid username or password.'
        if len(username) > 20 or len(password) > 20:
            return {'message': ERROR_MSG}, 400
        user = UserModel.find_by_username(username)
        if user is None:
            return {'message': ERROR_MSG}, 400
        if not validate_password(password, user.passwordSalt, user.passwordHash):
            return {'message': ERROR_MSG}, 400
        # login success
        user.loginCount += 1
        user.save_to_db()
        print('Login:', user)
        # set JWT
        access_token = create_access_token(identity=str(user.idUser))
        # resp = make_response(user.json())
        # set_access_cookies(resp, access_token)
        # return resp
        resp = user.json()
        resp['access_token'] = access_token
        return resp

class Comment(Resource):
    @cross_origin()
    def get(self, idComment):
        ''' 取得留言 '''
        res = CommentModel.find_by_id(idComment)
        if res:
            return res.json()
        return {'message': 'Comment not found.'}, 404 

    # 不用實作 
    # def put(self, idComment):
    #     ''' 修改留言 '''
    #     return
    
    @jwt_required()
    @cross_origin()
    def delete(self, idComment):
        ''' 刪除留言 '''
        parser = reqparse.RequestParser()
        parser.add_argument('idUser', type=int, required=True, help='userId cannot be blank.')
        args = parser.parse_args()
        print('args', args)
        idUser = args['idUser']
        # auth double check
        current_userId = parseInt(get_jwt_identity())
        if current_userId is None or current_userId != args['idUser']:
            return {'message': AUTH_FAILLED}, 400

        res = CommentModel.find_by_id(idComment)
        if res is None:
            return {'message': 'Comment not found.'}, 404
        if res.idUser != idUser:
            return {'message': AUTH_FAILLED}, 400
        res.stash_from_db()
        return {'message': 'Delete successfully.'}, 200
         
class CommentPost(Resource):
    @jwt_required()
    @cross_origin()
    def post(self):
        ''' 新增留言 '''
        parser = reqparse.RequestParser()
        parser.add_argument('idUser', type=int, required=True, help='userId cannot be blank.')
        parser.add_argument('comment', type=str, required=True, help='comment cannot be blank.')
        args = parser.parse_args()
        
        if UserModel.find_by_id(args['idUser']) is None:
            return {'message': 'User not found.'}, 400
        if len(args['comment']) > 120 or len(args['comment']) == 0:
            return {'message': 'Comment extends max length.'}, 400
        # auth check: 驗證isDuser和token一致
        current_userId = parseInt(get_jwt_identity())
        if current_userId is None or current_userId != args['idUser']:
            return {'message': AUTH_FAILLED}, 400
        
        CommentModel.create_comment(args['idUser'], args['comment'])
        return {'message': 'Create successfully.'}, 201

class CommentList(Resource):
    @cross_origin()
    def get(self):
        ''' 訪客?取得所有留言 '''
        res = CommentModel.get_all_comments()
        print(res)
        return jsonify([r.json() for r in res])

class CommentListOfUser(Resource):
    @cross_origin()
    def get(self, idUser):
        ''' 取得該用戶的所有留言 '''
        res = CommentModel.find_by_userId(idUser)
        print(res)
        return jsonify([r.json() for r in res])

class VistCount(Resource):
    @cross_origin()
    def get(self):
        return {'visitCount': InfoModel.getTotalVisitCount()}

api.add_resource(User, '/api/user/<string:username>', endpoint="user_get")
api.add_resource(UserPost, '/api/user', endpoint="user_register")
api.add_resource(Comment, '/api/comment/<int:idComment>', endpoint="comment")
api.add_resource(CommentPost, '/api/comment', endpoint="create_comment")
api.add_resource(CommentList, '/api/comments', endpoint="get_all_comments")
api.add_resource(CommentListOfUser, '/api/comments/<int:idUser>') # 之後把userid改成token，前端拿不到userid
api.add_resource(Login, '/api/login')
api.add_resource(VistCount, '/api/visitCount')
# http://localhost:5000/api/user/1

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    from db import db
    db.init_app(app)
    app.run(host = '127.0.0.1', port = 5000, debug = True, 
        ssl_context=('./assets/certificate.crt', './assets/privateKey.key'))