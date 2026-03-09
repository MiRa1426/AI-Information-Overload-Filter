from similarity_engine import relevance_scores
from classifier import classify_content

goal = "Learn artificial intelligence and machine learning"

content_feed = [
    "Introduction to neural networks",
    "Top funny comedy videos",
    "Machine learning project ideas",
    "Celebrity gossip news",
    "Deep learning explained",
    "Best gaming laptops"
]

# Step 1: Get similarity scores
scores = relevance_scores(goal, content_feed)

# Step 2: Classify Useful vs Noise
labels = classify_content(scores)

print("\nClassification Result:\n")

for i in range(len(content_feed)):
    print(content_feed[i])
    print("Score:", round(scores[i], 3))
    print("Label:", labels[i])
    print("------------------")
