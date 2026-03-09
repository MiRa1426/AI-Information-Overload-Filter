import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from embedding_engine import get_embedding


def relevance_scores(user_goal, content_list):
    """
    Compare user goal with each content item
    Returns list of similarity scores (0 to 1)
    """

    # Convert goal → vector
    goal_vector = get_embedding(user_goal)

    scores = []

    for content in content_list:
        content_vector = get_embedding(content)

        # cosine similarity
        score = cosine_similarity(
            [goal_vector],
            [content_vector]
        )[0][0]

        scores.append(score)

    return scores
