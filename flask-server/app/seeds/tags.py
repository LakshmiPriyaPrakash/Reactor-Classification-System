from app.models import db, Tag


def seed_tags():
    tag1 = Tag(tag_name="foaming")
    tag2 = Tag(tag_name="non-foaming")
    tag3 = Tag(tag_name="unclassified")


    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the tags table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
