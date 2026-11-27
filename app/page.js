"use client";

import { BsLightningCharge } from "react-icons/bs";
import { GrSecure } from "react-icons/gr";
import { TbTruckDelivery } from "react-icons/tb";
import { CiCircleCheck } from "react-icons/ci";
import { FaChessKing, FaPen, FaStopwatch } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import { FaHourglassStart } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ViewCounter from "./ViewCounter";

export default function Home() {
  const router = useRouter();
  const orderFormRef = useRef(null);

  const scroll = () => {
    orderFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const price = 1250;

  const handle = async (e) => {
    e.preventDefault();

    if (!name.trim() || !area.trim() || !phone.trim()) {
      toast.error("দয়া করে আপনার নাম, ঠিকানা এবং মোবাইল নাম্বার পূরণ করুন!");
      return;
    }

    try {
      setLoading(true);
      const totalPrice = quantity * price;
      const orderData = {
        name,
        area,
        phone,
        quantity,
        price: totalPrice,
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const resdata = await res.json();

      if (resdata.success) {
        toast.success("অভিনন্দন! আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে 🎉");

        // Thank You পেজে ডাটা পাঠানোর জন্য URL Query ব্যবহার করা হলো
        const params = new URLSearchParams({
          name,
          area,
          phone,
          quantity: quantity.toString(),
          price: totalPrice.toString(),
        });

        setArea("");
        setPhone("");
        setName("");

        setTimeout(() => {
          router.push(`/thank-you?${params.toString()}`);
        }, 1200);
      } else {
        toast.error("সার্ভার সমস্যার কারণে অর্ডার সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      toast.error("নেটওয়ার্ক সমস্যা! দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* গ্লোবাল অ্যানিমেশন ও স্ক্রলিং CSS */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulseBtn {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 25px rgba(245, 158, 11, 0.45); }
          50% { transform: scale(1.03); box-shadow: 0 14px 32px rgba(245, 158, 11, 0.65); }
        }
        .cta-btn {
          animation: pulseBtn 2s infinite ease-in-out;
          transition: all 0.25s ease;
        }
        .cta-btn:hover {
          filter: brightness(1.06);
        }
      `}</style>

      <ViewCounter />

      {/* মেইন মোবাইল-ফ্রেন্ডলি কন্টেইনার */}
      <div style={styles.container}>
        {/* ১. হিরো সেকশন */}
        <section style={styles.heroSection}>
          <div style={styles.badge}>🌿 ১০০% ন্যাচারাল ও পার্শ্বপ্রতিক্রিয়ামুক্ত</div>

          <h1 style={styles.mainTitle}>ULTRA HOT</h1>
          <p style={styles.subBadge}>মালয়েশিয়ান প্রযুক্তিতে তৈরি (100% Original)</p>

          <div style={styles.mediaCard}>
            <img src="/ling1.jpg" alt="Ultra Hot Product" style={styles.uniformMedia} />
          </div>

          <p style={styles.heroDesc}>
            হতাশাকে বলুন বিদায়! আধুনিক মালয়েশিয়ান প্রযুক্তিতে তৈরি{" "}
            <strong style={{ color: "#fde047" }}>আলট্রা হট ক্যাপসুল</strong> আপনাকে দেবে
            হারানো যৌবন এবং অফুরন্ত এনার্জি।
          </p>

          {/* ফিচার লিস্ট */}
          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <BsLightningCharge size={22} color="#38bdf8" />
              <span>এনার্জি ও স্ট্যামিনা বুস্টার</span>
            </div>
            <div style={styles.featureItem}>
              <GrSecure size={22} color="#34d399" />
              <span>কোয়ালিটি কন্ট্রোলড ও নিরাপদ</span>
            </div>
            <div style={styles.featureItem}>
              <TbTruckDelivery size={22} color="#fbbf24" />
              <span>সারা বাংলাদেশে হোম ডেলিভারি</span>
            </div>
            <div style={styles.featureItem}>
              <CiCircleCheck size={24} color="#a78bfa" />
              <span>১০০% অরিজিনাল ইম্পোর্টেড</span>
            </div>
          </div>

          <button onClick={scroll} className="cta-btn" style={styles.primaryCta}>
            🛒 অর্ডার করতে ক্লিক করুন
          </button>
        </section>

        {/* ২. YouTube Shorts ভিডিও সেকশন */}
        <section style={styles.sectionBlock}>
          <div style={styles.videoOuterBorder}>
            <div style={styles.videoInnerBox}>
              <iframe
                src="https://www.youtube.com/embed/FDAWBHtvYIg?autoplay=1&mute=1&loop=1&playlist=FDAWBHtvYIg&controls=1&rel=0&modestbranding=1"
                title="YouTube Shorts Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* ৩. সমাধান ও GIF সেকশন */}
        <section style={styles.whiteCard}>
          <div style={styles.gifBorderBox}>
            <img src="/23765626_l-2.gif" alt="Solution" style={styles.uniformMedia} />
          </div>

          <h2 style={styles.darkHeading}>
            ইরেক্টাইল ডিসফাংশন এবং অকাল বীর্যপাতের স্থায়ী সমাধান
          </h2>

          <div style={styles.highlightBanner}>✨ এক ফাইলেই স্থায়ী সমাধান ✨</div>

          <button onClick={scroll} className="cta-btn" style={styles.primaryCta}>
            🛒 অর্ডার করতে ক্লিক করুন
          </button>
        </section>

        {/* ৪. সেরা ভ্যালু প্যাকেজ কার্ড */}
        <section style={styles.packageWrapper}>
          <span style={styles.offerTag}>🔥 সীমিত সময়ের স্পেশাল অফার</span>
          <h2 style={styles.sectionTitleDark}>সেরা ভ্যালু প্যাকেজ</h2>
          <p style={styles.sectionSubDark}>
            আপনার যৌন স্বাস্থ্য সুরক্ষায় আজই বেছে নিন অরিজিনাল আলট্রা হট ক্যাপসুল।
          </p>

          <div style={styles.pricingCard}>
            <div style={styles.crownCircle}>
              <FaChessKing size={30} color="#fde047" />
            </div>

            <h3 style={{ margin: "12px 0 4px", fontSize: "22px", color: "#0f172a", fontWeight: "800" }}>
              ULTRA HOT CAPSULES
            </h3>

            <div style={styles.priceTag}>
              <span style={{ textDecoration: "line-through", color: "#94a3b8", fontSize: "20px", marginRight: "10px" }}>
                ৳1500
              </span>
              <span>৳1250</span>
            </div>

            <hr style={{ border: "none", borderTop: "1px dashed #cbd5e1", margin: "18px 0" }} />

            <div style={styles.packageList}>
              <div style={styles.packageRow}>
                <CiCircleCheck size={24} color="#059669" />
                <span>৬০ টি ক্যাপসুল (২ মাসের পূর্ণ কোর্স)</span>
              </div>
              <div style={styles.packageRow}>
                <CiCircleCheck size={24} color="#059669" />
                <span>ফ্রি হোম ডেলিভারি সুবিধা</span>
              </div>
              <div style={styles.packageRow}>
                <CiCircleCheck size={24} color="#059669" />
                <span>নিশ্চিন্তে ক্যাশ অন ডেলিভারি</span>
              </div>
              <div style={styles.packageRow}>
                <CiCircleCheck size={24} color="#059669" />
                <span>১০০% অরিজিনাল ইম্পোর্টেড পণ্য</span>
              </div>
            </div>

            <button onClick={scroll} className="cta-btn" style={styles.greenCta}>
              🛒 অর্ডার করতে ক্লিক করুন
            </button>
          </div>
        </section>

        {/* ৫. কার্যকারিতা ও স্লাইডার সেকশন */}
        <section style={styles.whiteCard}>
          <h2 style={styles.darkHeading}>🧠 Ultra Hot আপনার যেসব সমস্যার সাপোর্ট দেয়</h2>
          <p style={{ color: "#475569", marginBottom: "18px", fontSize: "15px" }}>
            বিশেষ সময়ে তৃপ্তির জন্য এটির কোনো বিকল্প নেই
          </p>

          <div style={styles.gifBorderBox}>
            <img src="/sweet-honey-1-1-1.gif" alt="Benefits" style={styles.uniformMedia} />
          </div>

          {/* অটো স্ক্রলিং বেনিফিট কার্ড */}
          <div style={{ marginTop: "24px", overflow: "hidden", padding: "10px 0" }}>
            <div
              style={{
                display: "flex",
                gap: "14px",
                width: "max-content",
                animation: "scrollLeft 18s linear infinite",
              }}
            >
              {[
                { icon: <BsLightningCharge size={22} />, bg: "#fef08a", text: "মিলনে সময় বাড়াবে ২৫-৩৫ মিনিট" },
                { icon: <FaPen size={20} />, bg: "#bae6fd", text: "গোপনাঙ্গকে মোটা ও লম্বা করবে" },
                { icon: <GiSelfLove size={22} color="#fff" />, bg: "#16a34a", text: "ভালো ফিলিংস ও উত্তেজনা আনবে" },
                { icon: <FaHourglassStart size={20} />, bg: "#fde047", text: "লিঙ্গকে স্ট্রং ও মজবুত করবে" },
                { icon: <BsLightningCharge size={22} />, bg: "#bae6fd", text: "পাতলা বীর্য ঘন করবে" },
              ].map((item, idx) => (
                <div key={idx} style={styles.sliderCard}>
                  <div style={{ ...styles.sliderIconBox, backgroundColor: item.bg }}>{item.icon}</div>
                  <p style={{ margin: 0, fontWeight: "600", color: "#1e293b", fontSize: "14px" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={scroll} className="cta-btn" style={styles.primaryCta}>
            🛒 অর্ডার করতে ক্লিক করুন
          </button>

          <div style={{ ...styles.mediaCard, marginTop: "28px" }}>
            <img src="/1111.jpg" alt="Product Bottle" style={styles.uniformMedia} />
          </div>
        </section>

        {/* ৬. ক্যাপসুল সেবন বিধি */}
        <section style={styles.whiteCard}>
          <h2 style={styles.darkHeading}>💊 ক্যাপসুল সেবন বিধি</h2>
          <p style={{ color: "#475569", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
            প্রতিদিন রাত্রে খাবার পর একটি করে ক্যাপসুল খাবেন। এক বোতলে ৬০ টি ক্যাপসুল আছে, যা ২ মাসের পূর্ণাঙ্গ কোর্স।
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={styles.usageCard}>
              <div style={{ ...styles.usageIcon, backgroundColor: "#fbcfe8", color: "#be185d" }}>
                <FaStopwatch size={22} />
              </div>
              <span>প্রতি রাতে খাবার পর ১টি ক্যাপসুল</span>
            </div>

            <div style={styles.usageCard}>
              <div style={{ ...styles.usageIcon, backgroundColor: "#dbeafe", color: "#1d4ed8" }}>
                <SlCalender size={20} />
              </div>
              <span>৬০টি ক্যাপসুল - পূর্ণ ২ মাসের কোর্স</span>
            </div>

            <div style={styles.usageCard}>
              <div style={{ ...styles.usageIcon, backgroundColor: "#dcfce7", color: "#15803d" }}>
                <BsLightningCharge size={22} />
              </div>
              <span>২-৩ দিনের মধ্যেই পরিবর্তন লক্ষ্য করবেন</span>
            </div>
          </div>

          <button onClick={scroll} className="cta-btn" style={styles.primaryCta}>
            🛒 অর্ডার করতে ক্লিক করুন
          </button>
        </section>

        {/* ৭. অর্ডার ফর্ম সেকশন */}
        <section ref={orderFormRef} style={styles.formSection}>
          <div style={styles.formHeaderBanner}>
            অর্ডার করতে নিচের ফরমটি সঠিক তথ্য দিয়ে পূরণ করুন
          </div>

          <form onSubmit={handle} style={styles.formCard}>
            <div style={{ textAlign: "center", marginBottom: "6px" }}>
              <h2 style={{ margin: "0 0 4px 0", color: "#0f172a", fontSize: "22px", fontWeight: "800" }}>
                আপনার ডেলিভারি তথ্য দিন
              </h2>
              <p style={{ margin: 0, color: "#64748b", fontSize: "13px" }}>
                কোনো অগ্রিম টাকা ছাড়াই ক্যাশ অন ডেলিভারিতে অর্ডার করুন
              </p>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>আপনার নাম *</label>
              <input
                type="text"
                placeholder="সম্পূর্ণ নাম লিখুন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>সম্পূর্ণ ঠিকানা *</label>
              <textarea
                placeholder="বাসা নং, রোড, থানা, জেলা লিখুন"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                rows={3}
                style={{ ...styles.input, resize: "vertical", fontFamily: "inherit" }}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>মোবাইল নাম্বার *</label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="01[0-9]{9}"
                maxLength={11}
                style={styles.input}
              />
            </div>

            {/* পরিমাণ ও মোট মূল্য বক্স */}
            <div style={styles.summaryBox}>
              <div>
                <span style={{ fontSize: "13px", color: "#64748b", display: "block", marginBottom: "6px", fontWeight: "600" }}>
                  পরিমাণ (পিস)
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                    style={styles.qtyBtnMinus}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", minWidth: "24px", textAlign: "center" }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    style={styles.qtyBtnPlus}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "13px", color: "#64748b", display: "block", marginBottom: "4px", fontWeight: "600" }}>
                  সর্বমোট মূল্য
                </span>
                <span style={{ fontSize: "24px", fontWeight: "800", color: "#059669" }}>
                  ৳{quantity * price}
                </span>
              </div>
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "⏳ অর্ডার প্রসেস হচ্ছে..." : "✅ অর্ডার কনফার্ম করুন"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

/* প্রফেশনাল CSS অবজেক্ট */
const styles = {
  pageWrapper: {
    backgroundColor: "#f1f5f9",
    minHeight: "100vh",
    fontFamily: "'Hind Siliguri', 'Segoe UI', sans-serif",
    paddingBottom: "50px",
  },
  container: {
    maxWidth: "540px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
  },
  heroSection: {
    background: "linear-gradient(160deg, #1e1b4b 0%, #311042 50%, #4c0519 100%)",
    color: "#ffffff",
    padding: "32px 20px 38px",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.4)",
    padding: "6px 16px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "14px",
  },
  mainTitle: {
    fontSize: "38px",
    fontWeight: "900",
    letterSpacing: "2px",
    color: "#fde047",
    margin: "0 0 6px",
    textShadow: "0 4px 15px rgba(253, 224, 71, 0.3)",
  },
  subBadge: {
    color: "#e2e8f0",
    fontSize: "15px",
    marginBottom: "22px",
  },
  mediaCard: {
    width: "100%",
    maxWidth: "380px",
    height: "280px",
    margin: "0 auto",
    borderRadius: "18px",
    padding: "5px",
    background: "linear-gradient(135deg, #f59e0b, #ec4899, #6366f1)",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
  },
  gifBorderBox: {
    width: "100%",
    maxWidth: "380px",
    height: "260px",
    margin: "0 auto 20px",
    borderRadius: "18px",
    padding: "4px",
    background: "linear-gradient(135deg, #10b981, #3b82f6)",
    boxShadow: "0 12px 25px rgba(16, 185, 129, 0.2)",
    overflow: "hidden",
  },
  uniformMedia: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "14px",
    display: "block",
    backgroundColor: "#0f172a",
  },
  heroDesc: {
    marginTop: "22px",
    fontSize: "16px",
    lineHeight: "1.65",
    color: "#f8fafc",
    padding: "0 8px",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "380px",
    margin: "24px auto",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    padding: "12px 18px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#ffffff",
  },
  primaryCta: {
    marginTop: "22px",
    background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
    color: "#0f172a",
    border: "2px solid #fef08a",
    padding: "15px 32px",
    borderRadius: "14px",
    fontSize: "19px",
    fontWeight: "800",
    cursor: "pointer",
    width: "100%",
    maxWidth: "340px",
  },
  greenCta: {
    marginTop: "22px",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "#ffffff",
    border: "none",
    padding: "15px 32px",
    borderRadius: "14px",
    fontSize: "19px",
    fontWeight: "800",
    cursor: "pointer",
    width: "100%",
    boxShadow: "0 10px 25px rgba(5, 150, 105, 0.35)",
  },
  sectionBlock: {
    padding: "28px 20px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  videoOuterBorder: {
    padding: "5px",
    borderRadius: "24px",
    background: "linear-gradient(135deg, #6366f1, #ec4899, #f59e0b)",
    boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.4)",
    width: "100%",
    maxWidth: "330px",
  },
  videoInnerBox: {
    position: "relative",
    width: "100%",
    aspectRatio: "9 / 16",
    borderRadius: "20px",
    overflow: "hidden",
    backgroundColor: "#0f172a",
  },
  whiteCard: {
    padding: "32px 20px",
    textAlign: "center",
    borderTop: "1px solid #f1f5f9",
    backgroundColor: "#ffffff",
  },
  darkHeading: {
    fontSize: "23px",
    fontWeight: "800",
    color: "#0f172a",
    lineHeight: "1.4",
    marginBottom: "14px",
  },
  highlightBanner: {
    backgroundColor: "#ffe4e6",
    color: "#be123c",
    border: "1px solid #fecdd3",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "800",
    margin: "12px auto",
    maxWidth: "360px",
  },
  packageWrapper: {
    background: "linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%)",
    padding: "36px 20px",
    textAlign: "center",
  },
  offerTag: {
    display: "inline-block",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    padding: "5px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  sectionTitleDark: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#064e3b",
    margin: "0 0 8px",
  },
  sectionSubDark: {
    color: "#334155",
    fontSize: "15px",
    marginBottom: "24px",
  },
  pricingCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "28px 22px",
    maxWidth: "400px",
    margin: "0 auto",
    border: "2px solid #10b981",
    boxShadow: "0 20px 35px rgba(6, 78, 59, 0.12)",
  },
  crownCircle: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#065f46",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    boxShadow: "0 6px 15px rgba(6, 95, 70, 0.3)",
  },
  priceTag: {
    fontSize: "34px",
    fontWeight: "900",
    color: "#059669",
    marginTop: "6px",
  },
  packageList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    textAlign: "left",
  },
  packageRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e293b",
  },
  sliderCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "16px 20px",
    whiteSpace: "nowrap",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  sliderIconBox: {
    padding: "10px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  usageCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 16px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "left",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  },
  usageIcon: {
    padding: "10px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formSection: {
    backgroundColor: "#f8fafc",
    padding: "28px 16px 40px",
    borderTop: "2px solid #e2e8f0",
  },
  formHeaderBanner: {
    backgroundColor: "#dc2626",
    color: "#ffffff",
    padding: "12px 16px",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "17px",
    fontWeight: "700",
    maxWidth: "440px",
    margin: "0 auto 20px",
    boxShadow: "0 6px 15px rgba(220, 38, 38, 0.25)",
  },
  formCard: {
    maxWidth: "440px",
    margin: "0 auto",
    padding: "28px 22px",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.07)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    textAlign: "left",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#334155",
  },
  input: {
    padding: "13px 15px",
    borderRadius: "10px",
    border: "1.5px solid #cbd5e1",
    backgroundColor: "#f8fafc",
    color: "#0f172a",
    fontWeight: "600",
    fontSize: "15px",
    outline: "none",
  },
  summaryBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  qtyBtnMinus: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  qtyBtnPlus: {
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "none",
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  submitBtn: {
    marginTop: "6px",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "800",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(5, 150, 105, 0.35)",
  },
};