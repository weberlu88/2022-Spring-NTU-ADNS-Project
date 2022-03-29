from db import db

class UserModel(db.Model):
    __tablename__ = 'User'

    idUser = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    loginCount = db.Column(db.Integer)
    passwordSalt = db.Column(db.String(20))
    passwordHash = db.Column(db.String(120))
    description = db.Column(db.String(120))
    isDelete = db.Column(db.Integer, nullable=False, default=0)
    # a user could have zore/many comments
    # comments = db.relationship("Comment", back_populates="userOfComment")
    comments = db.relationship("CommentModel", backref="UserModel", lazy=True)

    # override constructor
    def __init__(self, username, passwordSalt, passwordHash):
        # self.idUser = idUser
        self.username = username
        self.loginCount = 0
        self.passwordSalt = passwordSalt
        self.passwordHash = passwordHash

    def __repr__(self):
        return '<User %r>' % self.username

    def json(self):
        return {
            # 'idUser': self.idUser, 
            'username': self.username,
            'loginCount': self.loginCount }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(idUser=_id).first()

    @classmethod
    def create_user(cls, username, passwordSalt, passwordHash):
        new_user = UserModel(username, passwordSalt, passwordHash)
        new_user.save_to_db()