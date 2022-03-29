from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
from flask import render_template
from models.user import UserModel
from models.comment import CommentModel

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.secret_key = 'keyyyyyyyy'
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)

class User(Resource):
    def get(self, username):
        res = UserModel.find_by_username(username)
        if res:
            return res.json()
        return {}, 404

class UserPost(Resource):
    def post(self):
        ''' 新增用戶(註冊) '''
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True, help='username cannot be blank.')
        parser.add_argument('password', type=str, required=True, help='password cannot be blank.')
        args = parser.parse_args()
        print(args['username'], args['password']) # 不能有None!!
        # UserModel.create_user(args['username'], 'salt', 'hash')
        return {}, 201

class Login(Resource):
    def post(self):
        pass

class Comment(Resource):
    def get(self, idComment):
        ''' 取得留言 '''
        res = CommentModel.find_by_id(idComment)
        if res:
            return res
        return {'message': 'Comment not found'}, 404 

    def put(self, idComment):
        ''' 修改留言 '''
        return
    
    def delete(self, idComment):
        ''' 刪除留言 '''
        return

class CommentPost(Resource):
    def post(self):
        ''' 新增留言 '''
        return

class CommentList(Resource):
    def get(self):
        ''' 訪客?取得所有留言 '''
        res = CommentModel.get_all_comments()
        print(res)
        return [r.json() for r in res]

api.add_resource(User, '/api/user/<string:username>', endpoint="user_get")
api.add_resource(UserPost, '/api/user', endpoint="user_registery")
api.add_resource(Comment, '/api/comment/<int:idComment>', endpoint="comment")
api.add_resource(CommentPost, '/api/comment', endpoint="create_comment")
api.add_resource(CommentList, '/api/comments', endpoint="get_all_comments")
api.add_resource(Login, 'api/login')
# http://localhost:5000/api/user/1

if __name__ == "__main__":
    from db import db
    db.init_app(app)
    app.run(host = '127.0.0.1', port = 5000, debug = True)