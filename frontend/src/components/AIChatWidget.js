import React, { useState } from "react";
import { FaComments } from "react-icons/fa"; // ✅ Using react-icons instead of lucide-react
import { useNavigate } from "react-router-dom";
import "./AIChatWidget.css";

const AIChatWidget = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="ai-chat-widget"
      onClick={() => navigate("/chat")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`chat-icon ${isHovered ? "hovered" : ""}`}>
        <FaComments size={26} /> {/* ✅ React Icons version */}
      </div>
      {isHovered && <span className="chat-tooltip">Ask AI Assistant</span>}
    </div>
  );
};

export default AIChatWidget;
