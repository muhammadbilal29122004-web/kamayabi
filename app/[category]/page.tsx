"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BookOpen, ShieldCheck, ScrollText, Eye, CircleDot, Gem, Hand, Mountain, Clock, ArrowRight, Plus, ShoppingCart, X } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Order modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '' });
  const [orderLoading, setOrderLoading] = useState(false);

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

  const openOrderModal = (post: any) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone || !orderForm.address) return alert("Please fill all details!");
    
    setOrderLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: orderForm.name,
          customerPhone: orderForm.phone,
          customerAddress: orderForm.address,
          postTitle: selectedPost.title,
          postPrice: selectedPost.price
        })
      });
      if (response.ok) {
        alert("Order placed successfully! We will contact you soon.");
        setShowModal(false);
        setOrderForm({ name: '', phone: '', address: '' });
      } else {
        alert("Failed to place order.");
      }
    } catch (err) {
      alert("Error placing order.");
    } finally {
      setOrderLoading(false);
    }
  };

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
                    {post.allowAddToCart ? (
                      <button 
                        onClick={() => openOrderModal(post)}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 flex items-center gap-2 font-bold text-sm shadow-lg shadow-green-600/20 transition-all"
                      >
                        <ShoppingCart size={16} />
                        Buy Now
                      </button>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <Plus size={16} />
                      </div>
                    )}
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

      {/* Order Modal */}
      {showModal && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 rounded-full p-2"
            >
              <X size={20} />
            </button>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#0E3E26] mb-2">Checkout Details</h3>
              <p className="text-gray-500 mb-6 font-medium text-sm">
                Ordering: <span className="text-green-600 font-bold">{selectedPost.title}</span> 
                {selectedPost.price && ` (Rs. ${selectedPost.price})`}
              </p>
              
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 border border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    required
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 border border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Shipping Address</label>
                  <textarea 
                    required
                    rows={3}
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 border border-transparent resize-none"
                    placeholder="Full delivery address"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={orderLoading}
                  className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/20 disabled:opacity-50 mt-4 transition-all"
                >
                  {orderLoading ? "Processing..." : "Confirm Order"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
