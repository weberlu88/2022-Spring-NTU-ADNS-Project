from db import db

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

    def __repr__(self):
        return '<Comment %r>' % self.idComment

    def json(self):
        return {
            'idComment': self.idComment, 
            'idUser': self.idUser, # username?
            'content': self.content,
            'time': self.time }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def get_all_comments(cls):
        return cls.query.order_by(cls.idComment).all()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(idComment=_id).first()