"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CiCircleCheck } from "react-icons/ci";

function ThankYouContent() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "সম্মানিত গ্রাহক";
  const area = searchParams.get("area") || "উল্লেখ নেই";
  const phone = searchParams.get("phone") || "উল্লেখ নেই";
  const quantity = searchParams.get("quantity") || "1";
  const price = searchParams.get("price") || "1250";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ecfdf5 0%, #f0f9ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Hind Siliguri', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "460px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "36px 26px",
          boxShadow: "0 20px 50px rgba(5, 150, 105, 0.15)",
          border: "1px solid #d1fae5",
          textAlign: "center",
        }}
      >
        {/* সাকসেস আইকন */}
        <div
          style={{
            width: "76px",
            height: "76px",
            borderRadius: "50%",
            backgroundColor: "#dcfce7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
            boxShadow: "0 8px 20px rgba(22, 163, 74, 0.2)",
          }}
        >
          <CiCircleCheck size={52} color="#16a34a" />
        </div>

        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#065f46", margin: "0 0 8px" }}>
          ধন্যবাদ, {name}! 🎉
        </h1>

        <p style={{ color: "#475569", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px" }}>
          আপনার অর্ডারটি সফলভাবে কনফার্ম করা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার নাম্বারে কল করে ডেলিভারি নিশ্চিত করবেন।
        </p>

        {/* অর্ডার সামারি কার্ড */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: "16px",
            padding: "20px",
            border: "1px dashed #94a3b8",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "26px",
          }}
        >
          <h3
            style={{
              margin: "0 0 4px",
              fontSize: "16px",
              color: "#0f172a",
              fontWeight: "700",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "8px",
            }}
          >
            📋 আপনার অর্ডারের বিবরণ:
          </h3>

          <div style={rowStyle}>
            <span style={labelStyle}>👤 নাম:</span>
            <span style={valStyle}>{name}</span>
          </div>

          <div style={rowStyle}>
            <span style={labelStyle}>📞 মোবাইল:</span>
            <span style={valStyle}>{phone}</span>
          </div>

          <div style={rowStyle}>
            <span style={labelStyle}>📍 ঠিকানা:</span>
            <span style={valStyle}>{area}</span>
          </div>

          <div style={rowStyle}>
            <span style={labelStyle}>📦 পরিমাণ:</span>
            <span style={valStyle}>{quantity} পিস (Ultra Hot)</span>
          </div>

          <div
            style={{
              ...rowStyle,
              borderTop: "1px solid #e2e8f0",
              paddingTop: "10px",
              marginTop: "4px",
            }}
          >
            <span style={{ fontWeight: "700", color: "#0f172a", fontSize: "16px" }}>
              💰 সর্বমোট বিল:
            </span>
            <span style={{ fontWeight: "800", color: "#059669", fontSize: "20px" }}>
              ৳{price} (ক্যাশ অন ডেলিভারি)
            </span>
          </div>
        </div>

        <Link
          href="/"
          style={{
            display: "inline-block",
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            fontWeight: "700",
            fontSize: "16px",
            textDecoration: "none",
            boxShadow: "0 8px 20px rgba(15, 23, 42, 0.2)",
          }}
        >
          ← হোমপেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  fontSize: "15px",
};

const labelStyle = {
  color: "#64748b",
  fontWeight: "600",
  whiteSpace: "nowrap",
};

const valStyle = {
  color: "#0f172a",
  fontWeight: "700",
  textAlign: "right",
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}