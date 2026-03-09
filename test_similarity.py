from similarity_engine import relevance_scores

goal = "Learn artificial intelligence and machine learning"

content_feed = [
    "Introduction to neural networks",
    "Top funny comedy videos",
    "Machine learning project ideas",
    "Celebrity gossip news",
    "Deep learning explained",
    "Best gaming laptops"
]

scores = relevance_scores(goal, content_feed)

print("\nRelevance Scores:\n")

for i in range(len(content_feed)):
    print(content_feed[i])
    print("Score:", round(scores[i], 3))
    print("------------------")
