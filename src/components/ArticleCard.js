"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const TAG_COLORS = {
  Docker: "#0db7ed",
  Kubernetes: "#326ce5",
  Jenkins: "#d33833",
  Terraform: "#7b42bc",
  AWS: "#ff9900",
  CI_CD: "#2ecc71",
  Linux: "#f0a500",
};

export default function ArticleCard({ article, onDelete }) {
  const router = useRouter();
  const tagColor = TAG_COLORS[article.tag] || "#6c757d";

  const handleDelete = async () => {
    if (!confirm("Delete this article?")) return;
    await axios.delete(`/api/articles/${article._id}`);
    onDelete();
  };

  return (
    <div style={{
      background: "#1a1f2e",
      border: "1px solid #2d3548",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "16px",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <h3 style={{ color: "#e2e8f0", margin: 0, fontSize: "18px" }}>{article.title}</h3>
        <span style={{
          background: tagColor + "22",
          color: tagColor,
          border: `1px solid ${tagColor}`,
          padding: "3px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          whiteSpace: "nowrap",
          marginLeft: "12px"
        }}>
          {article.tag}
        </span>
      </div>

      <pre style={{
        background: "#0d1117",
        color: "#a8d8a8",
        padding: "14px",
        borderRadius: "8px",
        fontSize: "13px",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        marginBottom: "16px",
        border: "1px solid #2d3548"
      }}>
        {article.content}
      </pre>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => router.push(`/edit/${article._id}`)} style={{
          padding: "7px 18px", borderRadius: "6px", border: "1px solid #4a90d9",
          background: "transparent", color: "#4a90d9", cursor: "pointer", fontSize: "13px"
        }}>
          ✏️ Edit
        </button>
        <button onClick={handleDelete} style={{
          padding: "7px 18px", borderRadius: "6px", border: "1px solid #e74c3c",
          background: "transparent", color: "#e74c3c", cursor: "pointer", fontSize: "13px"
        }}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}