from sqlalchemy.orm import Session
from app import models, schemas

# -------------------------
# Get All Itineraries
# -------------------------

def get_itineraries(db: Session):
    return db.query(models.Itinerary).all()

# -------------------------
# Get Single Itinerary by ID
# -------------------------

def get_itinerary(db: Session, itinerary_id: int):
    return db.query(models.Itinerary).filter(models.Itinerary.id == itinerary_id).first()

# -------------------------
# Create New Itinerary (basic)
# -------------------------

def create_itinerary(db: Session, itinerary: schemas.ItineraryCreate):
    db_itinerary = models.Itinerary(
        name=itinerary.name,
        region=itinerary.region,
        nights=itinerary.nights
    )
    db.add(db_itinerary)
    db.commit()
    db.refresh(db_itinerary)
    return db_itinerary
