from sentence_transformers import SentenceTransformer
import pymongo
from tqdm import tqdm
import os

# Load local model
model = SentenceTransformer('all-MiniLM-L6-v2')

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
client = pymongo.MongoClient(MONGO_URI)
db = client.get_default_database()
collection = db["products"]

# Fetch products without embeddings
products = list(collection.find({"$or": [{"embedding": {"$exists": False}}, {"embedding": {"$size": 0}}]}))

print(f"📦 Found {len(products)} products to embed")

for p in tqdm(products, desc="Generating embeddings"):
    text = f"{p.get('title', '')}. {p.get('description', '')}. Brand: {p.get('brand', '')}. Category: {p.get('category', '')}"
    embedding = model.encode(text).tolist()

    collection.update_one({"_id": p["_id"]}, {"$set": {"embedding": embedding}})

print("✅ All product embeddings stored in MongoDB.")
