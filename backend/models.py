from pydantic import BaseModel
from typing import List

class AnalysisRequest(BaseModel):
    goal: str

class AnalysisResponse(BaseModel):
    message: str
    relevance: int
    noise: int
    focus: int
    suggestions: List[str]
    goal_type: str
    confidence: int
