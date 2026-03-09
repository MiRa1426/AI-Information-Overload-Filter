from similarity_engine import relevance_scores


def rank_content(user_goal, content_list):
    """
    Returns content sorted by relevance (highest first)
    """

    # Get similarity scores
    scores = relevance_scores(user_goal, content_list)

    # Combine content + score
    combined = list(zip(content_list, scores))

    # Sort by score (descending)
    combined.sort(key=lambda x: x[1], reverse=True)

    return combined
