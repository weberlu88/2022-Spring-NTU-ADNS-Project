from __future__ import annotations
from db import db
from datetime import datetime

class CommentModel(db.Model):
    __tablename__ = 'Comment'

    idComment = db.Column(db.Integer, primary_key=True)
    idUser = db.Column(db.Integer, db.ForeignKey('User.idUser'), nullable=False)
    content = db.Column(db.String(120), nullable=False)
    time = db.Column(db.String(120))
    isDelete = db.Column(db.Integer, nullable=False, default=0)
    # this comment belones to which user
    userOfComment = db.relationship("UserModel", backref="CommentModel", lazy=True)

    def __init__(self, idUser, content):
        self.idUser = idUser
        self.content = content
        self.time = datetime.now().strftime("%m/%d/%Y, %H:%M")

    def __repr__(self):
        return '<Comment %r>' % self.idComment

    def json(self):
        return {
            'idComment': self.idComment, 
            'idUser': self.idUser, # no show?
            'username': self.userOfComment.username,
            'content': self.content,
            'time': self.time }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        ''' 不要使用! 本系統不會真的刪除留言 '''
        db.session.delete(self)
        db.session.commit()

    def stash_from_db(self):
        ''' Set isDelete flag to True '''
        self.isDelete = 1
        db.session.commit()

    @classmethod
    def get_all_comments(cls) -> list[CommentModel]:
        return cls.query.filter_by(isDelete=0).order_by(cls.idComment).all()

    @classmethod
    def find_by_id(cls, _id) -> CommentModel:
        return cls.query.filter_by(idComment=_id, isDelete=0).first()

    @classmethod
    def find_by_userId(cls, _id) -> CommentModel:
        return cls.query.filter_by(idUser=_id, isDelete=0).all()

    @classmethod
    def create_comment(cls, idUser, content):
        new_comment = CommentModel(idUser, content)
        new_comment.save_to_db()