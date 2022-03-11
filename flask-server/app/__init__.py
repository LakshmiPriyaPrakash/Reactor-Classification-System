from .models import db, Image
from flask import Flask, request
from flask_migrate import Migrate
from flask_cors import CORS
import os
from .seeds import seed_commands

app = Flask(__name__)

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_mapping({
  'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
  'SQLALCHEMY_TRACK_MODIFICATIONS': False,
})

db.init_app(app)
Migrate(app, db)

CORS(app)

@app.route("/")
def images():
    all_images = Image.query.order_by(Image.id).all()
    return {image.id: image.to_dict() for image in all_images}


@app.route("/", methods=['PUT'])
def edit_all_images():
    image_list = request.get_json()
    if image_list:
        for image in image_list:
            data = Image.query.get(image["id"])
            data.tag_id = image["tag_id"]
            db.session.add(data)
            db.session.commit()

        updated_images = {}
        for image in image_list:
            data = Image.query.get(image["id"])
            updated_images[data.id] = data.to_dict()
        return updated_images
