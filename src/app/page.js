"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

const TAGS = ["All", "Docker", "Kubernetes", "Jenkins", "Terraform", "AWS", "CI_CD", "Linux"];

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchArticles(); }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const res = await axios.get("/api/articles");
    setArticles(res.data);
    setLoading(false);
  };

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                        a.content.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === "All" || a.tag === activeTag;
    return matchSearch && matchTag;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e2e8f0", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#161b27", borderBottom: "1px solid #2d3548", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", color: "#4a90d9" }}>⚙️ DevOps Knowledge Hub</h1>
          <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "13px" }}>Your personal DevOps command reference</p>
        </div>
        <Link href="/create" style={{
          background: "#4a90d9", color: "white", padding: "10px 22px",
          borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "14px"
        }}>
          + New Article
        </Link>
      </div>

      <div style={{ padding: "32px 40px", maxWidth: "900px", margin: "0 auto" }}>
        {/* Search */}
        <input
          placeholder="🔍  Search articles..."
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: "8px",
            border: "1px solid #2d3548", background: "#1a1f2e", color: "#e2e8f0",
            fontSize: "15px", marginBottom: "20px", boxSizing: "border-box"
          }}
        />

        {/* Tag Filters */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)} style={{
              padding: "6px 16px", borderRadius: "20px", border: "1px solid #2d3548",
              background: activeTag === tag ? "#4a90d9" : "#1a1f2e",
              color: activeTag === tag ? "white" : "#9ca3af",
              cursor: "pointer", fontSize: "13px", fontWeight: "500"
            }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Articles */}
        {loading ? (
          <p style={{ color: "#6b7280", textAlign: "center" }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6b7280" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
            <p>No articles found. <Link href="/create" style={{ color: "#4a90d9" }}>Create one!</Link></p>
          </div>
        ) : (
          filtered.map(a => <ArticleCard key={a._id} article={a} onDelete={fetchArticles} />)
        )}
      </div>
    </div>
  );
}