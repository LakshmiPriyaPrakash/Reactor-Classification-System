from .db import db

class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(100),nullable = False)


    image = db.relationship("Image", back_populates="tag")


    def to_dict(self):
        return {
            'id': self.id,
            'tag_name': self.tag_name,
        }


