from api_ready_engine import get_filtered_output


def run_demo():
    print("\n=== AI Information Overload Filter (Member-1 Demo) ===\n")

    # Step 1: Take user goal
    user_goal = input("Enter your learning goal: ")

    # Step 2: Simulated content feed
    content_feed = [
        "Introduction to neural networks",
        "Top funny comedy videos compilation",
        "Machine learning project ideas for beginners",
        "Celebrity gossip and entertainment news",
        "Deep learning explained in simple terms",
        "Best gaming laptops in 2026",
        "AI roadmap for beginners",
        "Motivational speech",
        "Understanding transformers in AI",
        "Cooking recipes for beginners"
    ]

    # Step 3: Run AI filter
    result = get_filtered_output(user_goal, content_feed)

    # Step 4: Print results
    print("\n============================")
    print("Goal:", result["goal"])
    print("============================")

    print("\nUSEFUL CONTENT:\n")
    for item in result["useful_content"]:
        print(f"- {item['content']} (Score: {round(item['score'],3)})")

    print("\nNOISE CONTENT:\n")
    for item in result["noise_content"]:
        print(f"- {item['content']} (Score: {round(item['score'],3)})")

    print("\n=== Demo Completed ===\n")


if __name__ == "__main__":
    run_demo()
