from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
from flask import render_template
from models.user import UserModel
from models.comment import CommentModel
from models.info import InfoModel
from utilities.passwordManager import generate_salt, generate_digest, validate_password

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.secret_key = 'keyyyyyyyyyyy'
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)

class User(Resource):
    def get(self, username):
        res = UserModel.find_by_username(username)
        if res:
            return res.json()
        return {}, 404

userParser = reqparse.RequestParser()
userParser.add_argument('username', type=str, required=True, help='username cannot be blank.')
userParser.add_argument('password', type=str, required=True, help='password cannot be blank.')
userParser.add_argument('description', type=str, required=False)
        
class UserPost(Resource):
    def post(self):
        ''' 新增用戶(註冊) '''
        args = userParser.parse_args()
        # print(args['username'], args['password'])
        if len(args['username']) == 0 or len(args['username']) > 20 or len(args['password']) > 20:
            return {'message': 'Invalid username or password.'}, 400
        if UserModel.find_by_username(args['username']):
            return {'message': 'Duplicate username.'}, 400
        if len(args['description']) > 120:
            return {'message': 'Invalid username or password.'}, 400

        salt = generate_salt()
        hashed_password = generate_digest(args['password'], salt)
        UserModel.create_user(args['username'], salt, hashed_password, args['description'])
        return {'message': 'Create successfully.'}, 201

class Login(Resource):
    ''' 登入 '''
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
        print('Login:', user)
        return user.json()

class Comment(Resource):
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
    
    # 尚未驗證身分!!
    def delete(self, idComment):
        ''' 刪除留言 '''
        parser = reqparse.RequestParser()
        parser.add_argument('idUser', type=int, required=True, help='userId cannot be blank.')
        args = parser.parse_args()
        idUser = args['idUser']

        res = CommentModel.find_by_id(idComment)
        if res is None:
            return {'message': 'Comment not found.'}, 404
        if res.idUser != idUser:
            return {'message': 'Authentication failed.'}, 404
        res.stash_from_db()
        return {'message': 'Delete successfully.'}, 200
         

class CommentPost(Resource):
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
        
        CommentModel.create_comment(args['idUser'], args['comment'])
        return {'message': 'Create successfully.'}, 201

class CommentList(Resource):
    def get(self):
        ''' 訪客?取得所有留言 '''
        res = CommentModel.get_all_comments()
        print(res)
        return [r.json() for r in res]

class CommentListOfUser(Resource):
    def get(self, idUser):
        ''' 取得該用戶的所有留言 '''
        res = CommentModel.find_by_userId(idUser)
        print(res)
        return [r.json() for r in res]

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

if __name__ == "__main__":
    from db import db
    db.init_app(app)
    app.run(host = '127.0.0.1', port = 5000, debug = True)