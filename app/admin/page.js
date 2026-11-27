"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

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

  useEffect(() => {
    fetchOrder();
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

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
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
                  cursor: "pointer",
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