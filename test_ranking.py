from ranking_engine import rank_content

goal = "Learn artificial intelligence and machine learning"

content_feed = [
    "Introduction to neural networks",
    "Top funny comedy videos",
    "Machine learning project ideas",
    "Celebrity gossip news",
    "Deep learning explained",
    "Best gaming laptops"
]

ranked = rank_content(goal, content_feed)

print("\nRanked Content (Most Relevant First):\n")

for content, score in ranked:
    print(content)
    print("Score:", round(score, 3))
    print("------------------")
