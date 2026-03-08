"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TAGS = ["Docker", "Kubernetes", "Jenkins", "Terraform", "AWS", "CI_CD", "Linux", "DevOps"];

export default function Create() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!title.trim() || !tag.trim() || !content.trim()) {
      alert("All fields are required");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/articles", { title, tag, content });
      router.push("/");
    } catch (err) {
      alert("Error saving article");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: "8px",
    border: "1px solid #2d3548", background: "#1a1f2e", color: "#e2e8f0",
    fontSize: "15px", boxSizing: "border-box"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e2e8f0", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "#161b27", borderBottom: "1px solid #2d3548", padding: "20px 40px", display: "flex", alignItems: "center", gap: "16px" }}>
        <Link href="/" style={{ color: "#4a90d9", textDecoration: "none" }}>← Back</Link>
        <h1 style={{ margin: 0, fontSize: "20px" }}>Create Article</h1>
      </div>

      <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", color: "#9ca3af", fontSize: "13px" }}>TITLE</label>
          <input placeholder="e.g. Docker Build Command" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", color: "#9ca3af", fontSize: "13px" }}>TAG</label>
          <select value={tag} onChange={e => setTag(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
            <option value="">Select a tag...</option>
            {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={{ display: "block", marginBottom: "8px", color: "#9ca3af", fontSize: "13px" }}>CONTENT / COMMAND</label>
          <textarea
            placeholder="docker build -t myimage ."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={8}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace" }}
          />
        </div>

        <button onClick={submit} disabled={loading} style={{
          background: loading ? "#2d3548" : "#4a90d9",
          color: "white", padding: "12px 28px", borderRadius: "8px",
          border: "none", fontSize: "15px", fontWeight: "600", cursor: "pointer"
        }}>
          {loading ? "Saving..." : "💾 Save Article"}
        </button>
      </div>
    </div>
  );
}