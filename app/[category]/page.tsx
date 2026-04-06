"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BookOpen, ShieldCheck, ScrollText, Eye, CircleDot, Gem, Hand, Mountain, Clock, ArrowRight, Plus } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "surah": return BookOpen;
      case "naqsh": return ShieldCheck;
      case "taveez": return ScrollText;
      case "istikhara": return Eye;
      case "loh": return CircleDot;
      case "cara": return Gem;
      case "ring": return Hand;
      case "stone": return Mountain;
      default: return BookOpen;
    }
  };

  const Icon = getIcon(category);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?category=${category}`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchPosts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfd] pt-32 pb-20 px-4 md:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
            <Icon size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0E3E26] uppercase tracking-wider">
            {category}
          </h1>
        </div>
        <p className="text-gray-500 text-lg max-w-2xl">
          Explore our authentic collection of {category} services and spiritual solutions tailored for your wellbeing.
        </p>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full">
                {/* Image Area */}
                <div className="h-64 relative overflow-hidden bg-gray-100">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Icon size={64} strokeWidth={1} />
                    </div>
                  )}
                  {post.price && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                      <span className="text-green-700 font-bold text-sm">₨ {post.price}</span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
                    <Clock size={14} />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#0E3E26] mb-3 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {post.description || "Inspiration and detailed spiritual guidance for this specifically crafted service."}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <button className="flex items-center gap-2 text-green-600 font-bold text-sm hover:gap-3 transition-all">
                      GET DETAILS
                      <ArrowRight size={18} />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                      <Plus size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Icon size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No {category} found yet</h3>
            <p className="text-gray-500">Please check back later or contact us for more details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
