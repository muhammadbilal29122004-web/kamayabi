import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import CategoryClient from "./CategoryClient";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  await connectDB();
  const rows = await Post.find({ category: category.toLowerCase() })
    .sort({ createdAt: -1 })
    .lean();

  const initialPosts = rows.map((p: any) => ({
    id: String(p._id ?? p.id),
    category: p.category,
    title: p.title,
    price: p.price,
    description: p.description,
    image: p.image,
    allowAddToCart: Boolean(p.allowAddToCart),
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
  }));

  return <CategoryClient category={category} initialPosts={initialPosts} />;
}
