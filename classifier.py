def classify_content(scores, threshold=0.30):
    """
    Convert similarity scores → Useful / Noise
    threshold = minimum relevance to be considered Useful
    """

    labels = []

    for score in scores:
        if score >= threshold:
            labels.append("Useful")
        else:
            labels.append("Noise")

    return labels
