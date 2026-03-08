import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  await connectDB();
  const article = await Article.findById(id);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(req, context) {
  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  await connectDB();
  const body = await req.json();
  const updated = await Article.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, context) {
  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  await connectDB();
  await Article.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}