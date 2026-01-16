# from pydantic import BaseModel

# class Item(BaseModel):
#     id: int
#     name: str
#     description: str
#     price: float
#     tax: float

# from sqlalchemy import Column, Integer, String
# from database import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
#     email = Column(String, unique=True)


from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    dob = Column(String, nullable=True)
    mobile = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    student_id = Column(String, nullable=True)
    class_level = Column(Integer, nullable=True)
    address = Column(String, nullable=True)
