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
  Clock,
  ShoppingCart
} from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [ordersPage, setOrdersPage] = useState(1);
  const [orderStatusSaving, setOrderStatusSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [allowAddToCart, setAllowAddToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState<any>({});
  const [categoryPosts, setCategoryPosts] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImageToDataUrl = async (file: File) => {
    // Keep uploads snappy: downscale + webp
    const MAX_DIM = 1400;
    const QUALITY = 0.78;
    const MIME = "image/webp";

    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIM / Math.max(bitmap.width, bitmap.height));
    const targetW = Math.max(1, Math.round(bitmap.width * scale));
    const targetH = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    ctx.drawImage(bitmap, 0, 0, targetW, targetH);

    const blob: Blob | null = await new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b), MIME, QUALITY);
    });

    if (!blob) throw new Error("Failed to compress image");

    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read compressed image"));
      reader.readAsDataURL(blob);
    });

    return dataUrl;
  };

  // Fetch all data for counts and dashboard
  const fetchAllData = async () => {
    try {
      const response = await fetch("/api/posts?summary=1");
      if (!response.ok) return;
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
      if (!response.ok) {
        setCategoryPosts([]);
        return;
      }
      const data = await response.json();
      setCategoryPosts(data);
    } catch (err) {
      console.error("Error fetching category items", err);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setAllOrders(data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const updateOrderStatus = async (orderId: string, status: "Pending" | "Completed") => {
    setOrderStatusSaving(true);
    try {
      const res = await fetch(`/api/orders?id=${encodeURIComponent(orderId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || "Failed to update order status");
      }

      const payload = await res.json();
      const updatedOrder = payload?.order;
      if (updatedOrder) {
        const updatedId = (updatedOrder.id ?? updatedOrder._id) as string;
        setAllOrders((prev) =>
          prev.map((o) => {
            const oid = (o.id ?? o._id) as string;
            return oid === updatedId ? { ...o, ...updatedOrder } : o;
          })
        );
      } else {
        // fallback optimistic update
        setAllOrders((prev) =>
          prev.map((o) => {
            const oid = (o.id ?? o._id) as string;
            return oid === orderId ? { ...o, status } : o;
          })
        );
      }
    } catch (err: any) {
      alert(err?.message || "Failed to update order status");
    } finally {
      setOrderStatusSaving(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    if (activeTab === "Orders") {
      fetchOrders();
      setSelectedOrderId(null);
      setOrdersPage(1);
    } else if (activeTab !== "Dashboard") {
      fetchCategoryItems(activeTab);
    }
  }, [activeTab]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Guard against huge files that make publish slow
      if (file.size > 8 * 1024 * 1024) {
        alert("Image is too large. Please upload an image under 8MB.");
        return;
      }

      setImageLoading(true);
      compressImageToDataUrl(file)
        .then((dataUrl) => setSelectedImage(dataUrl))
        .catch(() => alert("Failed to process image. Please try another image."))
        .finally(() => setImageLoading(false));
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
          image: selectedImage,
          allowAddToCart
        })
      });
      if (response.ok) {
        alert(`${activeTab} published successfully!`);
        setTitle("");
        setPrice("");
        setDescription("");
        setAllowAddToCart(false);
        setSelectedImage(null);
        fetchCategoryItems(activeTab);
        fetchAllData();
      } else {
        const payload = await response.json().catch(() => ({}));
        alert(payload?.error || "Failed to publish");
      }
    } catch (err: any) {
      alert(err?.message || "Error publishing post");
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
    { name: "Orders", icon: ShoppingCart },
    { name: "Surah", icon: BookOpen },
    { name: "Naqsh", icon: ShieldCheck },
    { name: "Taveez", icon: ScrollText },
    { name: "Istikhara", icon: Eye },
    { name: "Loh", icon: CircleDot },
    { name: "Cara", icon: Gem },
    { name: "Ring", icon: Hand },
    { name: "Stone", icon: Mountain },
  ];

  const categories = sidebarLinks.filter(l => l.name !== "Dashboard" && l.name !== "Orders");
  const ORDERS_PAGE_SIZE = 8;
  const totalOrdersPages = Math.max(1, Math.ceil(allOrders.length / ORDERS_PAGE_SIZE));
  const visibleOrders = allOrders.slice(
    (ordersPage - 1) * ORDERS_PAGE_SIZE,
    ordersPage * ORDERS_PAGE_SIZE
  );
  const selectedOrder = selectedOrderId
    ? allOrders.find((o) => (o.id ?? o._id) === selectedOrderId) ?? null
    : null;

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
                      {allData[cat.name.toLowerCase()] ?? 0}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === "Orders" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Orders grid */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-280px)]">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">All Customer Orders</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Showing {allOrders.length === 0 ? 0 : (ordersPage - 1) * ORDERS_PAGE_SIZE + 1}
                      {" - "}
                      {Math.min(ordersPage * ORDERS_PAGE_SIZE, allOrders.length)} of {allOrders.length}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setOrdersPage((p) => Math.max(1, p - 1))}
                      disabled={ordersPage <= 1}
                      className="px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Prev
                    </button>
                    <div className="text-sm font-semibold text-gray-700">
                      {ordersPage} / {totalOrdersPages}
                    </div>
                    <button
                      onClick={() => setOrdersPage((p) => Math.min(totalOrdersPages, p + 1))}
                      disabled={ordersPage >= totalOrdersPages}
                      className="px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {allOrders.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                      {visibleOrders.map((order) => {
                        const orderId = (order.id ?? order._id) as string;
                        const isSelected = selectedOrderId === orderId;
                        return (
                          <button
                            key={orderId}
                            onClick={() => setSelectedOrderId(orderId)}
                            className={`text-left rounded-2xl border p-4 transition-all shadow-sm hover:shadow-md hover:-translate-y-[1px] ${
                              isSelected ? "border-green-500 ring-2 ring-green-100" : "border-gray-100 hover:border-green-200"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-bold text-gray-900 leading-tight line-clamp-2">
                                  {order.customerName || "Unknown Customer"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                  {order.postTitle || "Untitled Item"}
                                </p>
                              </div>
                              <div className="shrink-0 bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                                {order.status || "Pending"}
                              </div>
                            </div>

                            <div className="mt-3">
                              <div className="text-sm bg-gray-50 text-gray-700 px-3 py-2 rounded-xl font-semibold">
                                {order.postPrice ? `Rs. ${order.postPrice}` : "Price N/A"}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                                <Clock size={12} />
                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-gray-400">No orders found.</div>
                  )}
                </div>
              </div>

              {/* Right: Selected order details */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-280px)]">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 text-lg">Order Details</h3>
                  <p className="text-sm text-gray-500 mt-1">Click an order card to view details.</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {selectedOrder ? (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm text-gray-500 font-semibold">Customer</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">
                              {selectedOrder.customerName || "Unknown Customer"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={(selectedOrder.status || "Pending") as string}
                              onChange={(e) =>
                                updateOrderStatus(
                                  ((selectedOrder.id ?? selectedOrder._id) as string) || "",
                                  e.target.value as "Pending" | "Completed"
                                )
                              }
                              disabled={orderStatusSaving}
                              className="text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-green-100 disabled:opacity-60"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                            </select>
                            {orderStatusSaving ? (
                              <div className="text-xs text-gray-400 font-semibold">Saving...</div>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-4 text-sm bg-green-50 text-green-700 px-3 py-2 rounded-xl inline-flex font-semibold">
                          Item: {selectedOrder.postTitle}{" "}
                          {selectedOrder.postPrice ? `(Rs. ${selectedOrder.postPrice})` : ""}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-3">
                          <Clock size={12} />
                          {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : "—"}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-gray-100 p-5 space-y-4">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Address</p>
                          <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                            {selectedOrder.customerAddress || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Phone Number</p>
                          <p className="text-sm text-gray-600 mt-1">{selectedOrder.customerPhone || "—"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Mother Name</p>
                          <p className="text-sm text-gray-600 mt-1">{selectedOrder.motherName || "—"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Payment Method</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {selectedOrder.paymentMethod === "JAZZCASH_EASYPAISA"
                              ? "JazzCash / EasyPaisa"
                              : selectedOrder.paymentMethod === "BANK_TRANSFER"
                                ? "Bank Transfer"
                                : "Cash on Delivery"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Transaction ID</p>
                          <p className="text-sm text-gray-600 mt-1">{selectedOrder.transactionId || "—"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Screenshot / Reference</p>
                          {selectedOrder.paymentReference ? (
                            <a
                              href={selectedOrder.paymentReference}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-emerald-700 font-semibold hover:underline break-all"
                            >
                              {selectedOrder.paymentReference}
                            </a>
                          ) : (
                            <p className="text-sm text-gray-600 mt-1">—</p>
                          )}
                        </div>
                        {selectedOrder.customerEmail ? (
                          <div>
                            <p className="text-sm font-bold text-gray-900">Email</p>
                            <p className="text-sm text-gray-600 mt-1">{selectedOrder.customerEmail}</p>
                          </div>
                        ) : null}
                      </div>

                      <button
                        onClick={() => setSelectedOrderId(null)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                      Select an order to view details.
                    </div>
                  )}
                </div>
              </div>
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
                      ) : imageLoading ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mx-auto mb-2"></div>
                          <p className="text-xs text-gray-500">Optimizing image...</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Plus className="text-gray-300 mx-auto mb-2" size={32} />
                          <p className="text-xs text-gray-500">Image Preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <input 
                      type="checkbox" 
                      id="allowAddToCart"
                      checked={allowAddToCart}
                      onChange={(e) => setAllowAddToCart(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="allowAddToCart" className="text-sm font-semibold text-gray-700 select-none cursor-pointer">
                      Enable "Add to Cart" for this item
                    </label>
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
