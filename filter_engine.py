from ranking_engine import rank_content
from classifier import classify_content


def filter_content(user_goal, content_list, threshold=0.30):
    """
    Returns:
    - useful_content (ranked)
    - noise_content (ranked)
    """

    # Step 1: Rank everything
    ranked = rank_content(user_goal, content_list)

    # Extract scores for classification
    scores = [item[1] for item in ranked]

    # Step 2: Classify
    labels = classify_content(scores, threshold)

    useful_content = []
    noise_content = []

    for i in range(len(ranked)):
        content, score = ranked[i]
        label = labels[i]

        if label == "Useful":
            useful_content.append((content, score))
        else:
            noise_content.append((content, score))

    return useful_content, noise_content
