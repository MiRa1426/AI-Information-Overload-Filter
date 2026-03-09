from api_ready_engine import get_filtered_output

goal = "Learn artificial intelligence and machine learning"

content_feed = [
    "Introduction to neural networks",
    "Top funny comedy videos",
    "Machine learning project ideas",
    "Celebrity gossip news",
    "Deep learning explained",
    "Best gaming laptops"
]

output = get_filtered_output(goal, content_feed)

print("\nSTRUCTURED OUTPUT:\n")
print(output)
