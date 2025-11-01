import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AIChat.css";
import API from "../services/api";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  // ✅ Show welcome message with small delay
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const welcome = {
        role: "assistant",
        content: `👋 Hi there! Welcome to <b>Shoppica</b> — your smart shopping assistant! 🛍️
        <br/><br/>You can ask me things like:
        <ul>
          <li>Show me a yellow dress</li>
          <li>Find a stylish men's shirt under ₹1500</li>
          <li>Suggest an outfit for a wedding</li>
        </ul>`,
      };
      setMessages([welcome]);
      setLoading(false);
      setShowWelcome(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Send message to AI API
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/ai", { message: input }); // ✅ use API.post
      const data = res.data;

      const aiMsg = {
        role: "assistant",
        content: data.reply || "🤖 Sorry, I didn’t catch that.",
        products: data.products || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("❌ Error chatting with AI:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Sorry, I couldn’t connect to Shoppica AI right now.",
        },
      ]);
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

        {loading && (
          <p className="loading-text">
            💭 {showWelcome ? "Thinking..." : "Shoppica is typing..."}
          </p>
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
