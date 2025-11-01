import dotenv from "dotenv";
import fetch from "node-fetch";
import Product from "../models/Product.js";

dotenv.config();

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const query = message.toLowerCase();

    // 🧠 Extract simple keywords
    const isMen = /(men|male|boy|man's|mens|guy)/i.test(query);
    const isWomen = /(women|woman|female|girl|ladies|ladys|womens)/i.test(query);
    const isJeans = /jean/i.test(query);
    const isShirt = /shirt/i.test(query);
    const isTshirt = /t[-\s]?shirt/i.test(query);
    const isDress = /dress/i.test(query);
    const isKurta = /kurta/i.test(query);
    const isSaree = /saree/i.test(query);
    const isTop = /top/i.test(query);
    const isColor = /(yellow|blue|black|white|red|green|pink|purple)/i.exec(query);
    const color = isColor ? isColor[0] : null;

    // 🧩 Build MongoDB query dynamically
    const searchConditions = [];

    // Base conditions by gender
    if (isMen) searchConditions.push({ category: /men/i });
    if (isWomen) searchConditions.push({ category: /women/i });

    // Clothing type
    if (isJeans) searchConditions.push({ title: /jean/i });
    if (isShirt) searchConditions.push({ title: /shirt/i });
    if (isTshirt) searchConditions.push({ title: /t[-\s]?shirt/i });
    if (isDress) searchConditions.push({ title: /dress/i });
    if (isKurta) searchConditions.push({ title: /kurta/i });
    if (isSaree) searchConditions.push({ title: /saree/i });
    if (isTop) searchConditions.push({ title: /top/i });

    // Color preference
    if (color) searchConditions.push({ title: new RegExp(color, "i") });

    // Fallback: search in title + description
    if (searchConditions.length === 0) {
      searchConditions.push({
        $or: [
          { title: new RegExp(query, "i") },
          { description: new RegExp(query, "i") },
          { category: new RegExp(query, "i") },
        ],
      });
    }

    // 🔍 Combine with AND logic to enforce multiple conditions (e.g., women + jeans)
    const mongoQuery = { $and: searchConditions };

    // 🛍️ Fetch from MongoDB
    const matchingProducts = await Product.find(mongoQuery).limit(6);

    // ✅ If products found, return them
    if (matchingProducts.length > 0) {
      const listText = matchingProducts
        .map((p) => `${p.title} — ₹${p.price}`)
        .join("\n");
      return res.json({
        reply: `Here are some products matching your search:\n${listText}`,
        products: matchingProducts,
      });
    }

    // 💬 Else fallback to Gemini for natural chat
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are Shoppica, a helpful fashion assistant. Be concise.\nUser: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t find matching products right now.";

    res.json({ reply, products: [] });
  } catch (err) {
    console.error("❌ AI Chat Error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
};
