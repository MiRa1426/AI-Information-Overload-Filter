from filter_engine import filter_content


def get_filtered_output(user_goal, content_list):
    """
    Returns structured output for backend / UI
    """

    useful, noise = filter_content(user_goal, content_list)

    result = {
        "goal": user_goal,
        "useful_count": len(useful),
        "noise_count": len(noise),
        "useful_content": [
            {"content": content, "score": float(score)}
            for content, score in useful
        ],
        "noise_content": [
            {"content": content, "score": float(score)}
            for content, score in noise
        ]
    }

    return result
