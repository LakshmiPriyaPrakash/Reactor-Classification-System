from app.models import db, Image
import json
import urllib.request


def seed_images():
    new_images = []
    link = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4fc14642-a3d6-424b-b621-5ecf5d955d7f/foam-seed.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220309T223656Z&X-Amz-Expires=86400&X-Amz-Signature=1ab450b219a76efba3016ca7d600bad0f5e59af425fe04f30c73e434333f369f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22foam-seed.json%22&x-id=GetObject'
    contents  = urllib.request.urlopen(link)
    data = json.load(contents)
    for obj in data:
        new_image = Image(image_url=obj["url"])
        new_images.append(new_image)

    db.session.add_all(new_images)
    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
