import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const articles = await Article.find().sort({ createdAt: -1 });
  return NextResponse.json(articles);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { title, tag, content } = body;

  if (!title?.trim() || !tag?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const article = await Article.create({ title, tag, content });
  return NextResponse.json(article);
}