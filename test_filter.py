from filter_engine import filter_content

goal = "Learn artificial intelligence and machine learning"

content_feed = [
    "Introduction to neural networks",
    "Top funny comedy videos",
    "Machine learning project ideas",
    "Celebrity gossip news",
    "Deep learning explained",
    "Best gaming laptops"
]

useful, noise = filter_content(goal, content_feed)

print("\nUSEFUL CONTENT:\n")
for content, score in useful:
    print(content, "| Score:", round(score, 3))

print("\nNOISE CONTENT:\n")
for content, score in noise:
    print(content, "| Score:", round(score, 3))
