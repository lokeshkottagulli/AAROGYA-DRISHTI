import os
from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import Depends, HTTPException, Header, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel

JWT_SECRET = os.getenv("JWT_SECRET", "itda_paderu_asr_district_super_secret_key_2026_disha_hipaa")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "720"))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token", auto_error=False)

VALID_ROLES = {
    "HEALTH_WORKER": {
        "title": "Frontline Worker (ASHA/ANM)",
        "allowed_steps": [1, 2, 3, 5, 6, 8]
    },
    "MEDICAL_OFFICER": {
        "title": "PHC Medical Officer",
        "allowed_steps": [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    "SPECIALIST": {
        "title": "Oral Oncology Specialist",
        "allowed_steps": [3, 4, 5, 6, 7, 8, 9]
    },
    "DISTRICT_ADMIN": {
        "title": "ITDA District Admin",
        "allowed_steps": [1, 4, 9]
    }
}


class UserClaims(BaseModel):
    username: str
    role: str
    mandal: str = "Paderu"


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


ENVIRONMENT = os.getenv("ENVIRONMENT", "production").lower()

async def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    x_demo_role: Optional[str] = Header(default=None)
) -> UserClaims:
    if token:
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            username: str = payload.get("sub", "field_user")
            role: str = payload.get("role", "HEALTH_WORKER")
            if role in VALID_ROLES:
                return UserClaims(username=username, role=role)
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired session token. Please log in again."
            )

    # In Production mode, strictly require official JWT authentication
    if ENVIRONMENT == "production":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please log in with official ITDA credentials."
        )

    role_key = x_demo_role if x_demo_role in VALID_ROLES else "MEDICAL_OFFICER"
    return UserClaims(username=f"demo_{role_key.lower()}", role=role_key)


def require_roles(allowed_roles: List[str]):
    async def role_checker(user: UserClaims = Depends(get_current_user)) -> UserClaims:
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role '{user.role}' is not authorized for this clinical action. Allowed: {allowed_roles}"
            )
        return user
    return role_checker
