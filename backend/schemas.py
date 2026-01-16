from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    first_name: str = None
    last_name: str = None
    email: str
    dob: str = None
    mobile: str = None
    gender: str = None
    student_id: int = None
    class_level: str = None
    address: str = None
