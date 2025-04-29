from app.database import SessionLocal
from app import models
import random

db = SessionLocal()

# Clear existing data
db.query(models.Transfer).delete()
db.query(models.Activity).delete()
db.query(models.Hotel).delete()
db.query(models.DayPlan).delete()
db.query(models.Itinerary).delete()
db.commit()

places = ["Phuket", "Krabi"]
hotel_names = ["Seaview Resort", "Tropical Paradise", "Sunset Inn", "Coral Bay Hotel"]
activity_templates = [
    "Visit the Big Buddha in {}",
    "Go snorkeling at {} beach",
    "Explore the night markets in {}",
    "Take a cooking class in {}",
    "Island hopping from {}",
    "Enjoy Thai massage in {}"
]

def create_sample_itinerary(name, region, nights):
    itinerary = models.Itinerary(name=name, region=region, nights=nights)
    db.add(itinerary)
    db.flush()

    for day_num in range(1, nights + 1):
        day = models.DayPlan(day_number=day_num, itinerary_id=itinerary.id)
        db.add(day)
        db.flush()

        # Add hotel
        hotel = models.Hotel(
            name=f"{random.choice(hotel_names)} - Day {day_num}",
            location=region,
            day_plan_id=day.id
        )
        db.add(hotel)

        # Add activities
        for _ in range(random.randint(1, 3)):
            activity = models.Activity(
                name=f"Activity {random.randint(1, 99)}",
                description=random.choice(activity_templates).format(region),
                day_plan_id=day.id
            )
            db.add(activity)

        # Add transfer (except on last day)
        if day_num < nights:
            transfer = models.Transfer(
                from_location=region,
                to_location=region,
                mode=random.choice(["Car", "Boat", "Flight", "Train", "Bus"]),
                day_plan_id=day.id
            )
            db.add(transfer)

    db.commit()
    print(f"Seeded itinerary: {name} ({nights} nights)")

# Generate 20 sample itineraries
for i in range(1, 21):
    region = random.choice(places)
    nights = random.randint(2, 6)
    name = f"{region} Adventure {i}"
    create_sample_itinerary(name, region, nights)

db.close()
