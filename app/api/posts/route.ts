import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const summary = searchParams.get("summary");

    if (summary === "1") {
      const rows = await Post.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]);
      const counts = rows.reduce((acc: Record<string, number>, r: any) => {
        if (r?._id) acc[String(r._id).toLowerCase()] = Number(r.count || 0);
        return acc;
      }, {});
      return NextResponse.json(counts);
    }

    let query = {};
    if (category) {
      query = { category: category.toLowerCase() };
    }

    const posts = await Post.find(query).sort({ createdAt: -1 }).lean();
    
    if (category) {
      return NextResponse.json(posts);
    }

    // If no category, group them by category like the original JSON structure
    // or just return all. The original JSON structure was { category: [posts] }.
    // Let's keep it consistent if needed, but returning all posts is more standard.
    // However, the admin dashboard might expect the grouped format.
    
    const groupedPosts = posts.reduce((acc: any, post: any) => {
      const cat = post.category.toLowerCase();
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(post);
      return acc;
    }, {});

    return NextResponse.json(groupedPosts);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { category, title, price, description, image, allowAddToCart } = body;

    if (!category || !title) {
      return NextResponse.json({ error: "Category and Title are required" }, { status: 400 });
    }

    const newPost = await Post.create({
      category: category.toLowerCase(),
      title,
      price,
      description,
      image,
      allowAddToCart: allowAddToCart || false,
    });

    return NextResponse.json({ message: "Post published successfully!", post: newPost });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

