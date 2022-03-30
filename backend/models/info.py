from __future__ import annotations
from db import db

class InfoModel(db.Model):
    __tablename__ = 'Info'

    _id = db.Column('id', db.Integer, default=1, primary_key=True)
    totalVisitCount = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return '<Info %r>' % self.totalVisitCount

    def json(self):
        return { 'totalVisitCount': self.totalVisitCount }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def getTotalVisitCount(cls) -> int:
        info = cls.query.all()[0]
        info.totalVisitCount += 1
        info.save_to_db()
        return cls.query.all()[0].totalVisitCount
