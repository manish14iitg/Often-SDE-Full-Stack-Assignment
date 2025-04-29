from sqlalchemy import Column, Integer, String, ForeignKey , Float
from sqlalchemy.orm import relationship
from .database import Base

class Itinerary(Base):
    __tablename__ = "itineraries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    nights = Column(Integer, nullable=False)
    region = Column(String, nullable=False)
    rating = Column(Float, default=0.0)
    day_plans = relationship("DayPlan", back_populates="itinerary", cascade="all, delete")

class DayPlan(Base):
    __tablename__ = "day_plans"

    id = Column(Integer, primary_key=True, index=True)
    day_number = Column(Integer, nullable=False)
    itinerary_id = Column(Integer, ForeignKey("itineraries.id"))

    itinerary = relationship("Itinerary", back_populates="day_plans")
    hotel = relationship("Hotel", uselist=False, back_populates="day_plan", cascade="all, delete")
    activities = relationship("Activity", back_populates="day_plan", cascade="all, delete")
    transfers = relationship("Transfer", back_populates="day_plan", cascade="all, delete")

class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    day_plan_id = Column(Integer, ForeignKey("day_plans.id"))

    day_plan = relationship("DayPlan", back_populates="hotel")

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    day_plan_id = Column(Integer, ForeignKey("day_plans.id"))

    day_plan = relationship("DayPlan", back_populates="activities")

class Transfer(Base):
    __tablename__ = "transfers"

    id = Column(Integer, primary_key=True, index=True)
    from_location = Column(String, nullable=False)
    to_location = Column(String, nullable=False)
    mode = Column(String, nullable=False)
    day_plan_id = Column(Integer, ForeignKey("day_plans.id"))

    day_plan = relationship("DayPlan", back_populates="transfers")
