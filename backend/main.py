from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, auth
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import text
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# ============== DB CHECK =================
@app.on_event("startup")
def startup_event():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        print("✅ Database connected successfully!")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        raise e

# ============== DB DEP =================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ============== ROOT =================
@app.get("/")
def root():
    return {"message": "Welcome to Student Education API", "status": "running"}

# ============== HEALTH =================
@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
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

# ================= SIGNUP =================
@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(models.User)\
        .filter(models.User.email == user.email)\
        .first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = auth.hash_password(user.password)

    new_user = models.User(
        name=user.name,
        first_name=user.name,   # also set first_name for consistency
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}

# ================= LOGIN =================
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User)\
        .filter(models.User.email == user.email)\
        .first()

    if not db_user or not auth.verify_password(
        user.password, db_user.password
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# ================= PROFILE =================
@app.get("/profile")
def get_profile(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    try:
        payload = jwt.decode(
            token,
            auth.SECRET_KEY,
            algorithms=[auth.ALGORITHM]
        )
        email = payload.get("sub")
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(models.User)\
        .filter(models.User.email == email)\
        .first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "mobile": user.mobile,
        "gender": user.gender,
        "student_id": user.student_id,
        "class_level": user.class_level,
        "address": user.address
    }

# ================= UPDATE PROFILE =================
@app.post("/profile")
def update_profile(
    profile: schemas.UserProfile,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    try:
        payload = jwt.decode(
            token,
            auth.SECRET_KEY,
            algorithms=[auth.ALGORITHM]
        )
        email = payload.get("sub")
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(models.User)\
        .filter(models.User.email == email)\
        .first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    for field, value in profile.dict().items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)

    return {"message": "Profile updated successfully"}
