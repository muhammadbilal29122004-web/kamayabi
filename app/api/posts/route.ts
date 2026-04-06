import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "backend", "posts.json");

// Helper to read data
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return {};
  const content = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(content);
};

// Helper to write data
const writeData = (data: any) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  
  const data = readData();
  
  if (category) {
    return NextResponse.json(data[category.toLowerCase()] || []);
  }
  
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, title, price, description, image } = body;
    
    if (!category || !title) {
      return NextResponse.json({ error: "Category and Title are required" }, { status: 400 });
    }
    
    const data = readData();
    const catKey = category.toLowerCase();
    
    if (!data[catKey]) {
      data[catKey] = [];
    }
    
    const newPost = {
      id: Date.now().toString(),
      title,
      price,
      description,
      image,
      createdAt: new Date().toISOString()
    };
    
    data[catKey].unshift(newPost); // Add to beginning
    writeData(data);
    
    return NextResponse.json({ message: "Post published successfully!", post: newPost });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const id = searchParams.get("id");
    
    if (!category || !id) {
      return NextResponse.json({ error: "Category and ID are required" }, { status: 400 });
    }
    
    const data = readData();
    const catKey = category.toLowerCase();
    
    if (data[catKey]) {
      data[catKey] = data[catKey].filter((post: any) => post.id !== id);
      writeData(data);
      return NextResponse.json({ message: "Post deleted successfully!" });
    } else {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
