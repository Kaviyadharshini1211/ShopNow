# recommend.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
import sys
import json

# MongoDB connection
client = MongoClient("your_mongodb_connection_string")
db = client["your_db_name"]
collection = db["products"]

# Get all products
products = list(collection.find({}, {"_id": 1, "title": 1, "description": 1, "category": 1}))

# Combine title, description, and category for each product
texts = [f"{p.get('title', '')} {p.get('description', '')} {p.get('category', '')}" for p in products]

# Vectorize
tfidf = TfidfVectorizer(stop_words='english')
vectors = tfidf.fit_transform(texts)

# Find index of target product
target_id = sys.argv[1]
target_index = next((i for i, p in enumerate(products) if str(p['_id']) == target_id), None)

if target_index is None:
    print(json.dumps([]))
    sys.exit()

# Compute cosine similarity
cosine_sim = cosine_similarity(vectors[target_index], vectors).flatten()

# Get top 5 recommendations (excluding self)
similar_indices = cosine_sim.argsort()[-6:-1][::-1]
recommended_ids = [str(products[i]['_id']) for i in similar_indices]

# Print JSON output
print(json.dumps(recommended_ids))
