"use client";

import React, { useMemo, useState } from "react";
import { BookOpen, ShieldCheck, ScrollText, Eye, CircleDot, Gem, Hand, Mountain, Clock, ShoppingCart, X } from "lucide-react";

type ClientPost = {
  id: string;
  category?: string;
  title: string;
  price?: string;
  description?: string;
  image?: string;
  allowAddToCart?: boolean;
  createdAt?: string;
};

export default function CategoryClient({
  category,
  initialPosts,
}: {
  category: string;
  initialPosts: ClientPost[];
}) {
  const [posts, setPosts] = useState<ClientPost[]>(initialPosts);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ClientPost | null>(null);
  const [orderForm, setOrderForm] = useState({ name: "", motherName: "", address: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "JAZZCASH_EASYPAISA" | "BANK_TRANSFER">("COD");
  const [transactionId, setTransactionId] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);

  const Icon = useMemo(() => {
    switch (category.toLowerCase()) {
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
  }, [category]);

  const categoryLabel = useMemo(() => {
    const raw = (category || "").trim();
    if (!raw) return "Services";
    return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  }, [category]);

  const openOrderModal = (post: ClientPost) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.motherName || !orderForm.address || !orderForm.phone) {
      return alert("Please fill all details!");
    }
    if (paymentMethod !== "COD" && (!transactionId || !paymentReference)) {
      return alert("Please add transaction ID and screenshot/reference link.");
    }

    setOrderLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: orderForm.name,
          motherName: orderForm.motherName,
          customerPhone: orderForm.phone,
          customerAddress: orderForm.address,
          paymentMethod,
          transactionId: transactionId || undefined,
          paymentReference: paymentReference || undefined,
          postTitle: selectedPost?.title,
          postPrice: selectedPost?.price,
        }),
      });
      if (response.ok) {
        alert("Order placed successfully! We will contact you soon.");
        setShowModal(false);
        setOrderForm({ name: "", motherName: "", address: "", phone: "" });
        setPaymentMethod("COD");
        setTransactionId("");
        setPaymentReference("");
      } else {
        alert("Failed to place order.");
      }
    } catch {
      alert("Error placing order.");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] pb-20">
      {/* Hero */}
      <section className="pt-28 md:pt-32">
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-transparent" />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: "radial-gradient(rgba(16,185,129,0.18) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
          </div>

          <div className="rounded-[2.25rem] border border-emerald-100/60 bg-white/70 backdrop-blur-md shadow-[0_20px_60px_rgba(2,6,23,0.08)] overflow-hidden">
            <div className="p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 text-emerald-700 px-4 py-2 text-xs font-extrabold tracking-[0.18em] uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Services
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="text-slate-400">Home</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-emerald-700">{categoryLabel}</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                      <Icon size={26} />
                    </div>
                    <div className="h-12 w-px bg-emerald-200/70 hidden sm:block" />
                    <p className="text-sm font-semibold text-slate-600">
                      Authentic collection • Trusted guidance • Quick order
                    </p>
                  </div>

                  <h1 className="font-serif font-extrabold text-[#0E3E26] text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
                    {categoryLabel}
                  </h1>

                  <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                    Explore our authentic collection of <span className="font-semibold text-slate-700">{categoryLabel}</span>{" "}
                    and spiritual solutions tailored for your wellbeing.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-slate-200 text-sm font-semibold text-slate-700">
                      <span className="text-emerald-700 font-extrabold">{posts.length}</span>
                      Items available
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-slate-200 text-sm font-semibold text-slate-700">
                      Secure checkout
                      <span className="text-emerald-700 font-extrabold">•</span>
                      Fast response
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-[360px]">
                  <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-500 p-[1px] shadow-lg shadow-emerald-600/15">
                    <div className="rounded-3xl bg-white p-5">
                      <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-slate-500">
                        Need help choosing?
                      </p>
                      <p className="mt-2 text-slate-700 font-semibold leading-snug">
                        Talk to us on the contact page and we’ll guide you to the right option.
                      </p>
                      <a
                        href="/contact"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 text-sm shadow-lg shadow-emerald-600/25 transition-all active:scale-[0.99]"
                      >
                        Contact / Raabta
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-[1.75rem] overflow-hidden border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full"
              >
                {/* Image Area */}
                <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Icon size={64} strokeWidth={1} />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-80" />
                  {post.price ? (
                    <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-2 shadow-lg ring-1 ring-black/5">
                      <span className="text-emerald-700 font-extrabold text-sm tracking-tight">₨ {post.price}</span>
                    </div>
                  ) : null}
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Clock size={14} />
                    <span>
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "—"}
                    </span>
                  </div>

                  <h3 className="text-[1.35rem] md:text-[1.5rem] font-extrabold text-[#0E3E26] leading-snug mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-3 mb-5 leading-relaxed">
                    {post.description || "Inspiration and detailed spiritual guidance for this specifically crafted service."}
                  </p>

                  <div className="mt-auto pt-5 border-t border-gray-100/70 flex items-center">
                    <button
                      onClick={() => post.allowAddToCart && openOrderModal(post)}
                      disabled={!post.allowAddToCart}
                      className={`w-full rounded-full px-5 py-3 flex items-center justify-center gap-2 font-bold text-sm shadow-lg transition-all active:scale-[0.99] ${
                        post.allowAddToCart
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25"
                          : "bg-gray-100 text-gray-400 shadow-transparent cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
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
      {showModal && selectedPost ? (
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
                {selectedPost.price ? ` (Rs. ${selectedPost.price})` : ""}
              </p>

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 border border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Mother Name</label>
                  <input
                    type="text"
                    required
                    value={orderForm.motherName}
                    onChange={(e) => setOrderForm({ ...orderForm, motherName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 border border-transparent"
                    placeholder="Enter mother name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Delivery Address</label>
                  <textarea
                    required
                    rows={3}
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 border border-transparent resize-none"
                    placeholder="Full delivery address"
                  ></textarea>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Contact Number</label>
                  <input
                    type="text"
                    required
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 border border-transparent"
                    placeholder="Enter contact number"
                  />
                </div>

                <div className="pt-2">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Payment Method</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("COD")}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold transition ${
                        paymentMethod === "COD"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("JAZZCASH_EASYPAISA")}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold transition ${
                        paymentMethod === "JAZZCASH_EASYPAISA"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      JazzCash / EasyPaisa
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("BANK_TRANSFER")}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold transition ${
                        paymentMethod === "BANK_TRANSFER"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Bank Transfer
                    </button>
                  </div>
                </div>

                {paymentMethod === "JAZZCASH_EASYPAISA" ? (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-sm">
                    <p className="font-bold text-emerald-800 mb-1">JazzCash / EasyPaisa</p>
                    <p className="text-gray-700">03352805020 - Hassan Abbas</p>
                  </div>
                ) : null}

                {paymentMethod === "BANK_TRANSFER" ? (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-sm space-y-1">
                    <p className="font-bold text-emerald-800 mb-1">Bank Alfalah</p>
                    <p className="text-gray-700"><span className="font-semibold">Account Title:</span> AL-GHAZI TABARRUKAT CENTRE</p>
                    <p className="text-gray-700"><span className="font-semibold">Account Number:</span> 56385001173284</p>
                    <p className="text-gray-700"><span className="font-semibold">IBAN:</span> PK25ALFH5638005001173284</p>
                    <p className="text-gray-700"><span className="font-semibold">Swift Code:</span> ALFHPKKAXXX</p>
                    <p className="text-gray-700"><span className="font-semibold">Branch:</span> Soldier Bazar Br IBG (5638)</p>
                  </div>
                ) : null}

                {paymentMethod !== "COD" ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1">Transaction ID</label>
                      <input
                        type="text"
                        required
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 border border-transparent"
                        placeholder="Enter transaction ID"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1">Screenshot / Reference Link</label>
                      <input
                        type="text"
                        required
                        value={paymentReference}
                        onChange={(e) => setPaymentReference(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 border border-transparent"
                        placeholder="Paste screenshot link or reference"
                      />
                    </div>
                  </div>
                ) : null}
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
      ) : null}
    </div>
  );
}

