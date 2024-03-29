from __future__ import annotations
from db import db

class UserModel(db.Model):
    __tablename__ = 'User'

    idUser = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    loginCount = db.Column(db.Integer)
    passwordSalt = db.Column(db.String(32))
    passwordHash = db.Column(db.String(120))
    description = db.Column(db.String(120))
    avatar = db.Column(db.String)
    isDelete = db.Column(db.Integer, nullable=False, default=0)
    # a user could have zore/many comments
    # comments = db.relationship("Comment", back_populates="userOfComment")
    # comments = db.relationship("CommentModel", backref="UserModel", lazy=True)

    # override constructor
    def __init__(self, username, passwordSalt, passwordHash, description="", avatar=""):
        # self.idUser = idUser
        self.username = username
        self.loginCount = 0
        self.passwordSalt = passwordSalt
        self.passwordHash = passwordHash
        self.description = description
        self.avatar = avatar

    def __repr__(self):
        return '<User %r>' % self.username

    def json(self):
        return {
            'idUser': self.idUser, 
            'username': self.username,
            'loginCount': self.loginCount,
            'description': self.description,
            'avatar': self.avatar }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username) -> UserModel:
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id) -> UserModel:
        return cls.query.filter_by(idUser=_id).first()

    @classmethod
    def create_user(cls, username, passwordSalt, passwordHash, description="", avatar=""):
        new_user = UserModel(username, passwordSalt, passwordHash, description, avatar)
        new_user.save_to_db()