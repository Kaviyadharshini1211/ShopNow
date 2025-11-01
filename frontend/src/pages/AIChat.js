import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AIChat.css";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  // ✅ Simulate typing delay before showing welcome message
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const welcome = {
        role: "assistant",
        content:
          "👋 Hi there! Welcome to **Shoppica** — your smart shopping assistant! 🛍️\n\nYou can ask me things like:\n- *Show me a yellow dress*\n- *Find a stylish men's shirt under ₹1500*\n- *Suggest an outfit for a wedding*\n\nWhat would you like to explore today?",
      };
      setMessages([welcome]);
      setLoading(false);
      setShowWelcome(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI response failed");

      const aiMsg = {
        role: "assistant",
        content: data.reply,
        products: data.products || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("❌ Error chatting with AI:", err);
      const errMsg = {
        role: "assistant",
        content: "⚠️ Sorry, I couldn’t connect to Shoppica AI right now.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-box">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <div
              className={`ai-msg ${
                msg.role === "user" ? "user-msg" : "assistant-msg"
              }`}
              dangerouslySetInnerHTML={{
                __html: msg.content.replace(/\n/g, "<br/>"),
              }}
            ></div>

            {/* 🛍️ Product list (if any) */}
            {msg.products && msg.products.length > 0 && (
              <div className="ai-product-list">
                {msg.products.map((p) => (
                  <div
                    key={p._id || p.id}
                    className="ai-product-card"
                    onClick={() => navigate(`/product/${p._id || p.id}`)}
                  >
                    <img
                      src={
                        p.thumbnail ||
                        (p.images && p.images[0]) ||
                        "/placeholder.jpg"
                      }
                      alt={p.title}
                    />
                    <div className="ai-product-info">
                      <p className="ai-product-title">{p.title}</p>
                      <p className="ai-product-price">₹{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* 💭 Typing Indicator */}
        {loading && !showWelcome && (
          <div className="typing-indicator">💭 Shoppica is typing...</div>
        )}
        {loading && showWelcome && (
          <p className="loading-text">💭 Thinking...</p>
        )}
      </div>

      <div className="ai-input-area">
        <input
          type="text"
          value={input}
          placeholder="Ask about products..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default AIChat;
