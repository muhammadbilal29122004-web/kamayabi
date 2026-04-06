"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  ShieldCheck, 
  ScrollText, 
  Eye, 
  Gem, 
  CircleDot, 
  Hand, 
  Mountain,
  Settings,
  Bell,
  Search,
  Plus,
  Trash2,
  Clock
} from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState<any>({});
  const [categoryPosts, setCategoryPosts] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch all data for counts and dashboard
  const fetchAllData = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setAllData(data);
    } catch (err) {
      console.error("Error fetching all data", err);
    }
  };

  // Fetch specific category items
  const fetchCategoryItems = async (cat: string) => {
    try {
      const response = await fetch(`/api/posts?category=${cat}`);
      const data = await response.json();
      setCategoryPosts(data);
    } catch (err) {
      console.error("Error fetching category items", err);
    }
  };

  useEffect(() => {
    fetchAllData();
    if (activeTab !== "Dashboard") {
      fetchCategoryItems(activeTab);
    }
  }, [activeTab]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const publishPost = async () => {
    if (!title) return alert("Title is mandatory!");
    setLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: activeTab,
          title,
          price,
          description,
          image: selectedImage
        })
      });
      if (response.ok) {
        alert(`${activeTab} published successfully!`);
        setTitle("");
        setPrice("");
        setDescription("");
        setSelectedImage(null);
        fetchCategoryItems(activeTab);
        fetchAllData();
      } else {
        alert("Failed to publish");
      }
    } catch (err) {
      alert("Error publishing post");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const response = await fetch(`/api/posts?category=${activeTab}&id=${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        alert("Deleted successfully!");
        fetchCategoryItems(activeTab);
        fetchAllData();
      }
    } catch (err) {
      alert("Error deleting post");
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const sidebarLinks = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Surah", icon: BookOpen },
    { name: "Naqsh", icon: ShieldCheck },
    { name: "Taveez", icon: ScrollText },
    { name: "Istikhara", icon: Eye },
    { name: "Loh", icon: CircleDot },
    { name: "Cara", icon: Gem },
    { name: "Ring", icon: Hand },
    { name: "Stone", icon: Mountain },
  ];

  const categories = sidebarLinks.filter(l => l.name !== "Dashboard");

  return (
    <div className="fixed inset-0 bg-[#f8fafc] z-[9999] flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0d1b2a] text-white flex flex-col shadow-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-lg">K</span>
            Kamayabi Admin
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setActiveTab(link.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === link.name
                  ? "bg-green-600 text-white shadow-lg shadow-green-900/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <link.icon size={20} className={activeTab === link.name ? "text-white" : "group-hover:text-green-400"} />
              <span className="font-medium">{link.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={() => window.location.href='/'} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Settings size={20} />
            <span className="font-medium">Go to Site</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search something..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-500 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={22} />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-green-600 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{activeTab}</h2>
            <p className="text-gray-500 mt-1">Manage your spiritual platform content.</p>
          </div>

          {activeTab === "Dashboard" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <div 
                  key={cat.name} 
                  onClick={() => setActiveTab(cat.name)}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 text-green-600 p-3 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <cat.icon size={24} />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{cat.name} Posts</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">
                      {allData[cat.name.toLowerCase()]?.length || 0}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: List with Delete */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-280px)]">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 text-lg">Existing {activeTab} Records</h3>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                  {categoryPosts.length > 0 ? (
                    categoryPosts.map((post) => (
                      <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                            {post.image ? (
                              <img src={post.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <BookOpen size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{post.title}</p>
                            <p className="text-sm text-green-600 font-bold">Rs. {post.price}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                              <Clock size={12} />
                              {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => deletePost(post.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center text-gray-400">
                      No posts found in this category.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Add Form */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 h-fit">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Add New {activeTab}</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Display Title</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title of post"
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Price (PKR)</label>
                    <input 
                      type="text" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea 
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detailed description..."
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none resize-none"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Upload Image</label>
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                    <div 
                      onClick={triggerUpload}
                      className="border-2 border-dashed border-gray-200 rounded-2xl p-6 min-h-[140px] flex flex-col items-center justify-center bg-gray-50 hover:bg-green-50 cursor-pointer overflow-hidden relative"
                    >
                      {selectedImage ? (
                        <img src={selectedImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="text-center">
                          <Plus className="text-gray-300 mx-auto mb-2" size={32} />
                          <p className="text-xs text-gray-500">Image Preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={publishPost}
                    disabled={loading}
                    className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/20 disabled:opacity-50"
                  >
                    {loading ? "Publishing..." : "Save & Publish"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
