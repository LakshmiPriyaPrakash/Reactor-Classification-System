from .db import db

class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(), nullable = False)
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), nullable=False, default=3)

    tag = db.relationship("Tag", back_populates="image")


    def to_dict(self):
        return {
            'id': self.id,
            'image_url': self.image_url,
            'tag_id': self.tag_id,
            'tag_name': self.tag.tag_name
        }
