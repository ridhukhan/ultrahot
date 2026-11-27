"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [todayViews, setTodayViews] = useState(0);

  // Fraud Checker States
  const [searchPhone, setSearchPhone] = useState("");
  const [checkingFraud, setCheckingFraud] = useState(false);
  const [fraudResult, setFraudResult] = useState(null);
  const [fraudError, setFraudError] = useState("");

  async function fetchOrder() {
    try {
      const res = await fetch("/api/order");
      const gokgok = await res.json();

      if (gokgok.success) {
        setOrders(gokgok.orders || []);
      } else {
        alert("No order found");
      }
    } catch (error) {
      console.error("Order fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTodayViews() {
    try {
      const res = await fetch("/api/views", { cache: "no-store" });
      const data = await res.json();
      setTodayViews(data.todayViews || 0);
    } catch (error) {
      console.error("Views fetch error:", error);
    }
  }

  async function handleFraudCheck(e, customPhone = null) {
    if (e) e.preventDefault();
    const targetPhone = (customPhone || searchPhone).trim();

    if (!targetPhone) {
      setFraudError("অনুগ্রহ করে একটি সঠিক ফোন নম্বর দিন");
      setFraudResult(null);
      return;
    }

    if (customPhone) setSearchPhone(customPhone);
    setCheckingFraud(true);
    setFraudError("");
    setFraudResult(null);

    try {
      const res = await fetch("/api/pathao_fraud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: targetPhone }),
      });

      const data = await res.json();

      if (data.success) {
        setFraudResult({
          phone: targetPhone,
          ...data,
        });
      } else {
        setFraudError(data.error || "তথ্য খুঁজে পাওয়া যায়নি");
      }
    } catch (error) {
      setFraudError("সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে");
    } finally {
      setCheckingFraud(false);
    }
  }

  // কাস্টমার রেটিং অনুযায়ী ব্যাজ স্টাইল
  function getRatingBadge(rating) {
    const r = (rating || "").toLowerCase();
    if (r.includes("excellent") || r.includes("good")) {
      return {
        label: rating.replace("_", " ").toUpperCase(),
        bg: "#dcfce7",
        color: "#15803d",
        border: "#86efac",
        icon: "🛡️",
      };
    }
    if (r.includes("risky") || r.includes("fraud") || r.includes("bad")) {
      return {
        label: rating.replace("_", " ").toUpperCase(),
        bg: "#fee2e2",
        color: "#b91c1c",
        border: "#fca5a5",
        icon: "⚠️",
      };
    }
    return {
      label: (rating || "NEW CUSTOMER").replace("_", " ").toUpperCase(),
      bg: "#fef3c7",
      color: "#b45309",
      border: "#fcd34d",
      icon: "🔎",
    };
  }

  useEffect(() => {
    fetchOrder();
    fetchTodayViews();

    const interval = setInterval(fetchTodayViews, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f4f8",
          color: "#1e293b",
          fontSize: "18px",
          fontWeight: "600",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Loading orders...
      </div>
    );
  }

  const badge = fraudResult ? getRatingBadge(fraudResult.rating) : null;

  return (
    <div
      style={{
        padding: "30px 20px",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* উপরের ডান কোণায় Today's Views ব্যাজ */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "10px 18px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.12)",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "18px" }}>👁️</span>
          <span
            style={{
              fontSize: "14px",
              color: "#64748b",
              fontWeight: "600",
            }}
          >
            Today's Views:
          </span>
          <span
            style={{
              fontSize: "17px",
              color: "#4f46e5",
              fontWeight: "700",
            }}
          >
            {todayViews}
          </span>
        </div>
      </div>

      {/* সবার উপরে মাঝবরাবর Fraud Checker Search Box */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto 35px auto",
        }}
      >
        <form
          onSubmit={(e) => handleFraudCheck(e)}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: "8px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.12)",
            border: "2px solid #e0e7ff",
            gap: "8px",
          }}
        >
          <span style={{ paddingLeft: "12px", fontSize: "18px" }}>🔍</span>
          <input
            type="text"
            placeholder="কাস্টমারের ফোন নম্বর লিখুন (যেমন: 017XXXXXXXX)"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "15px",
              color: "#1e293b",
              backgroundColor: "transparent",
              padding: "10px 6px",
              fontWeight: "500",
            }}
          />
          <button
            type="submit"
            disabled={checkingFraud}
            style={{
              background: checkingFraud
                ? "#94a3b8"
                : "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
              color: "#ffffff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: checkingFraud ? "not-allowed" : "pointer",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {checkingFraud ? "Checking..." : "Search"}
          </button>
        </form>

        {/* Error মেসেজ দেখালে */}
        {fraudError && (
          <div
            style={{
              marginTop: "14px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              padding: "12px 16px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            ⚠️ {fraudError}
          </div>
        )}

        {/* Search করার পর প্রফেশনাল Fraud Result Card */}
        {fraudResult && (
          <div
            style={{
              marginTop: "18px",
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              padding: "22px",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
              border: "1px solid #e2e8f0",
              position: "relative",
            }}
          >
            {/* কার্ড হেডার: ফোন নম্বর ও কাস্টমার রেটিং */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                paddingBottom: "15px",
                borderBottom: "1px solid #f1f5f9",
                marginBottom: "18px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    fontWeight: "600",
                    display: "block",
                  }}
                >
                  PATHAO COURIER REPORT
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#0f172a",
                  }}
                >
                  📱 {fraudResult.phone}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    backgroundColor: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`,
                    padding: "6px 14px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.4px",
                  }}
                >
                  {badge.icon} {badge.label}
                </span>

                <button
                  onClick={() => setFraudResult(null)}
                  title="Close"
                  style={{
                    background: "#f1f5f9",
                    border: "none",
                    borderRadius: "8px",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    color: "#64748b",
                    fontWeight: "700",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ৩টি স্ট্যাটাস কার্ড: Total, Received, Returned */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              {/* Total Parcels */}
              <div
                style={{
                  backgroundColor: "#eef2ff",
                  border: "1px solid #c7d2fe",
                  borderRadius: "14px",
                  padding: "14px 10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    color: "#4338ca",
                  }}
                >
                  {fraudResult.total}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#4f46e5",
                    marginTop: "2px",
                  }}
                >
                  📦 Total Parcel
                </div>
              </div>

              {/* Received / Delivered */}
              <div
                style={{
                  backgroundColor: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                  borderRadius: "14px",
                  padding: "14px 10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    color: "#047857",
                  }}
                >
                  {fraudResult.delivered}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#059669",
                    marginTop: "2px",
                  }}
                >
                  ✅ Received
                </div>
              </div>

              {/* Returned / Cancelled */}
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "14px",
                  padding: "14px 10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    color: "#b91c1c",
                  }}
                >
                  {fraudResult.cancelled}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#dc2626",
                    marginTop: "2px",
                  }}
                >
                  ❌ Returned
                </div>
              </div>
            </div>

            {/* নিচে ডেলিভারি সাকসেস রেট বার */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "12px 15px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                <span>Delivery Success Ratio</span>
                <span
                  style={{
                    color:
                      fraudResult.successRate >= 80
                        ? "#059669"
                        : fraudResult.successRate >= 50
                        ? "#d97706"
                        : "#dc2626",
                  }}
                >
                  {fraudResult.successRate}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${fraudResult.successRate}%`,
                    height: "100%",
                    backgroundColor:
                      fraudResult.successRate >= 80
                        ? "#10b981"
                        : fraudResult.successRate >= 50
                        ? "#f59e0b"
                        : "#ef4444",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <h2
        style={{
          textAlign: "center",
          color: "#1e293b",
          fontSize: "28px",
          marginBottom: "30px",
          fontWeight: "700",
        }}
      >
        Hello admin, how are you? 👋
      </h2>

      {/* অর্ডার লিস্ট */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {orders.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "18px",
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            }}
          >
            No orders available.
          </p>
        ) : (
          orders.map((item) => {
            const itemId = item._id || item.id;
            const isHovered = hoveredId === itemId;

            return (
              <div
                key={itemId}
                onMouseEnter={() => setHoveredId(itemId)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  padding: "22px 25px",
                  borderRadius: "16px",
                  borderLeft: "6px solid #6366f1",
                  boxShadow: isHovered
                    ? "0 15px 30px rgba(99, 102, 241, 0.2)"
                    : "0 6px 15px rgba(0, 0, 0, 0.06)",
                  transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                  transition: "all 0.3s ease",
                }}
              >
                <h1
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    color: "#0f172a",
                    fontWeight: "700",
                    borderBottom: "1px solid #e2e8f0",
                    paddingBottom: "8px",
                  }}
                >
                  👤 {item.name}
                </h1>

                <h1
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    color: "#475569",
                    fontWeight: "500",
                  }}
                >
                  📍 <strong style={{ color: "#334155" }}>Area:</strong> {item.area}
                </h1>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      color: "#475569",
                      fontWeight: "500",
                    }}
                  >
                    📞 <strong style={{ color: "#334155" }}>Phone:</strong> {item.phone}
                  </h1>

                  {/* এক ক্লিকে অর্ডার কার্ড থেকেই ফ্রড চেক করার বাটন */}
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      handleFraudCheck(null, item.phone);
                    }}
                    style={{
                      backgroundColor: "#eef2ff",
                      color: "#4f46e5",
                      border: "1px solid #c7d2fe",
                      padding: "4px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    🛡️ Check Fraud
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "6px",
                    paddingTop: "10px",
                    borderTop: "1px dashed #cbd5e1",
                  }}
                >
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      color: "#4f46e5",
                      backgroundColor: "#eef2ff",
                      padding: "5px 12px",
                      borderRadius: "8px",
                      fontWeight: "600",
                    }}
                  >
                    📦 Qty: {item.quantity}
                  </h1>

                  <h1
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      color: "#059669",
                      backgroundColor: "#ecfdf5",
                      padding: "5px 14px",
                      borderRadius: "8px",
                      fontWeight: "700",
                    }}
                  >
                    💰 ৳{item.price}
                  </h1>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}