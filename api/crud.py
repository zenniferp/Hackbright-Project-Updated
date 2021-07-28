"""Create Read Update Delete"""

from model import db, User, Favorite, connect_to_db 

def create_user(email, password):
    """Create and return a new user"""

    user = User(email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user

def create_favorite(user_id, yelp_id):
    """Create and return a new favorite."""

    #if a favorite exists, assume True; favorite row only gets added if a user clicks "save"
    #if a bar doesn't exist in this table, favorte = false

    favorite = Favorite(user_id=user_id, yelp_id=yelp_id)

    db.session.add(favorite)
    db.session.commit()

    return favorite

def get_favorite(user_id, yelp_id):

    favorite = Favorite.query.filter_by(user_id=user_id, yelp_id=yelp_id).first()

    return favorite

def get_all_favorites(user_id):

    all_favorites = Favorite.query.filter_by(user_id=user_id)

    return all_favorites

def remove_favorite(user_id, yelp_id):
    """Remove a user's favorite."""

    favorite = get_favorite(user_id, yelp_id)

    db.session.delete(favorite)
    db.session.commit()

if __name__ == '__main__':
    from server import app
    connect_to_db(app)

