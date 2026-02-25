import os
from pydantic import BaseModel

class InsightRequestItem(BaseModel):
    query: str
