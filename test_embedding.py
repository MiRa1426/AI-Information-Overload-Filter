from embedding_engine import get_embedding

text = "Artificial Intelligence will change the world"
vector = get_embedding(text)

print("Vector length:", len(vector))
print("First values:", vector[:5])
