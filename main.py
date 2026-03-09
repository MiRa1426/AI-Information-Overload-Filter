from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from sentence_transformers import SentenceTransformer, util

# -----------------------------
# Initialize FastAPI
# -----------------------------
app = FastAPI()

# -----------------------------
# Load AI Model (Better Model)
# -----------------------------
model = SentenceTransformer("all-mpnet-base-v2")

# -----------------------------
# Request Schema
# -----------------------------
class AnalyzeRequest(BaseModel):
    goal: str
    contents: List[str]

# -----------------------------
# Root Route
# -----------------------------
@app.get("/")
def home():
    return {"message": "AI Overload Filter is running 🚀"}

# -----------------------------
# Analyze Route
# -----------------------------
@app.post("/filter")
def analyze(request: AnalyzeRequest):

    # Encode goal
    goal_embedding = model.encode(request.goal, convert_to_tensor=True)

    # Encode all contents
    content_embeddings = model.encode(request.contents, convert_to_tensor=True)

    # Compute similarity scores
    scores = util.cos_sim(goal_embedding, content_embeddings)[0]

    # Create ranked results
    ranked = []
    for content, score in zip(request.contents, scores):
        ranked.append({
            "content": content,
            "score": float(score)
        })

    # Sort by highest similarity
    ranked = sorted(ranked, key=lambda x: x["score"], reverse=True)

    # -----------------------------
    # Dynamic Threshold
    # -----------------------------
    avg_score = sum([r["score"] for r in ranked]) / len(ranked)
    threshold = avg_score

    recommended = [r["content"] for r in ranked if r["score"] >= threshold]
    filtered_out = [r["content"] for r in ranked if r["score"] < threshold]

    return {
        "ranked_results": ranked,
        "threshold_used": threshold,
        "recommended_focus": recommended,
        "filtered_out": filtered_out
    }