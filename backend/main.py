# from fastapi import FastAPI, HTTPException
# from models import Item
# app = FastAPI()

# @app.get("/")
# def root():
#     return {"message": "Hello, welcome to the API!"}

# item=[
#     Item(id=1, name="Wireless Mouse", description="Ergonomic wireless mouse with USB receiver", price=799.0, tax=72.0),
#     Item(id=2, name="Mechanical Keyboard", description="RGB backlit mechanical keyboard with blue switches", price=2499.0, tax=225.0),
#     Item(id=3, name="Bluetooth Headphones", description="Over-ear noise cancellation headphones", price=3499.0, tax=315.0),
#     Item(id=4, name="Smartphone Stand", description="Adjustable aluminum mobile stand for desk", price=399.0, tax=36.0),
# ]

# @app.get("/items/")
# def get_items():
#     return item

# @app.get("/items/{id}")
# def get_one_item(id: int):
#     if id < 1 or id>len(item):
#         raise HTTPException(status_code=404, detail="Item not found")
#     return item[id-1]


#     # for i in item:
#     #     if i.id == id:
#     #       return i
#     # return ("Item not found")

# @app.post("/item/")
# def create_item(item_data:Item):
#     item.append(item_data)
#     return item_data

# @app.put("/item/{id}")
# def update_item(id: int, item_data: Item):
#     if id <= 0 or id > len(item):
#         raise HTTPException(status_code=404, detail="Item not found")
#     item[id-1] = item_data
#     return ("Item updated successfully")

# @app.delete("/item/{id}")
# def delete_item(id:int):
#     if id <1 or id>len(item):
#         raise HttpException(status_code=404, detail="Item not found")
#     del item[id-1]
#     return {"detail":"Item deleted successfully"}


# from fastapi import FastAPI, Depends
# from sqlalchemy.orm import Session
# from database import SessionLocal
# import models

# app = FastAPI()

# @app.get("/")
# def root():
#     return {"message": "Hello, welcome to the API!"}

# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @app.post("/users")
# def create_user(name: str, email: str, db: Session = Depends(get_db)):
#     user = models.User(name=name, email=email)
#     db.add(user)
#     db.commit()
#     db.refresh(user)
#     return user

# @app.get("/users")
# def get_users(db: Session = Depends(get_db)):
#     return db.query(models.User).all()


from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, auth
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import text

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Check database connection on startup
@app.on_event("startup")
def startup_event():
    try:
        # Test database connection
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        print("✅ Database connected successfully!")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        raise e

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# HEALTH CHECK - Database Connection Status
@app.get("/")
def root():
    return {"message": "Welcome to Student Education API", "status": "running"}

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        # Test database connection
        db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected",
            "message": "Database connection is working!"
        }
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Database connection failed: {str(e)}"
        )

# SIGNUP
@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email==user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.hash_password(user.password)
    new_user = models.User(name=user.name, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}

# LOGIN
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email==user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}

# GET PROFILE
@app.get("/profile")
def get_profile(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(models.User).filter(models.User.email==email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "dob": user.dob,
        "mobile": user.mobile,
        "gender": user.gender,
        "student_id": user.student_id,
        "class_level": user.class_level,
        "address": user.address
    }

# UPDATE PROFILE
@app.post("/profile")
def update_profile(profile: schemas.UserProfile, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(models.User).filter(models.User.email==email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for field, value in profile.dict().items():
        setattr(user, field, value)
    db.commit()
    db.refresh(user)
    return {"message": "Profile updated successfully"}
