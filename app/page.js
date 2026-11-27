"use client";

import { BsLightningCharge } from "react-icons/bs";
import { GrSecure } from "react-icons/gr";
import { TbTruckDelivery } from "react-icons/tb";
import { CiCircleCheck } from "react-icons/ci";
import { FaChessKing } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import { FaHourglassStart } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { FaStopwatch } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { useRef, useState } from "react";
export default function Home() {

  const orderFormRef =useRef(null)

  const scroll =()=>{
orderFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center", 
    });
  }


  const [name,setName]=useState("")
  const [area,setArea]=useState("")
  const [phone,setPhone]=useState("")
  const [quantity,setQuantity]=useState(1)
  const [loading,setLoading]=useState(false)
const price=1250
  const handle=async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
if(!name || !area || !phone){
  return alert(
    "plz all filed are required"
  )

}
      const orderData={
        name,area,phone,quantity,price
      }
      const res =await fetch("/api/order",{
         method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      const resdata = await res.json()
      if(resdata.success){
         alert("অর্ডার সফল হয়েসে")
         setArea("")
         setPhone("")
         setName("")
      }else{
        alert("server error")

      }
    } catch (error) {
      alert("whole server problem pound")
    }finally{
      setLoading("")
    }
  }
    return (
    <div style={{backgroundColor:"#458b00",width:"100%",height:"auto",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
     
<img
src="/ling1.jpg"

alt="lingo compare"
style={
  {
    width:"80%",
    height:"30vh",
    justifyContent:"center",
    marginTop:"25px",
    borderRadius:"15px"
  }
}
/>
<h3 style={{color:"yellow",justifyContent:"center",alignItems:"center",
   textAlign:"center",marginTop:"10px",
   backgroundColor:"#0e9931",marginLeft:"35%",marginRight:"35%",borderRadius:"25%",padding:"5px"}}>
১০০% ন্যাচারাল
</h3>
<h1 style={{color:"yellow",marginTop:"10px",fontFamily:"fangsong"}}>ULTRA HOT</h1>
<p>মালেশিয়ান প্রযুক্তিতে তৈরি (100% Original)</p>
<p style={{marginTop:"20px"}}>হতাশাকে বলুন বিদায়! আধুনিক মালেশিয়ান প্রযুক্তিতে তৈরি ু আলট্রা হট ক্যাপসুল আপনাকে দেবে হারানো যৌবন এবং অফুরন্ত এনার্জি।</p>

<div style={{flexDirection:"column",marginTop:"20px",}}>
  <div style={{flexDirection:"row",backgroundColor:"#0e5f8554",
    width:"70%",marginLeft:"50px",borderRadius:"15px",marginBottom:"9px",border:"solid,2px,#4cfcd6"}}>
    <span><BsLightningCharge size={26} style={{color:"#4cfcd6"}}/></span>
    <span style={{marginLeft:"29px",textAlign:"center"}}>এনার্জি ও স্ট্যামিনা বুস্টার</span>
  </div>
<div style={{flexDirection:"row",backgroundColor:"#0e5f8554",
  width:"70%",marginLeft:"50px",borderRadius:"15px",marginBottom:"9px",border:"solid,2px,#4cfcd6"}}>
    <span><GrSecure size={26} style={{color:"#4cfcd6"}}/></span>
    <span style={{marginLeft:"29px",textAlign:"center"}}>কোয়ালিটি কন্ট্রোলড</span>
  </div>
  <div style={{flexDirection:"row",backgroundColor:"#0e5f8554",width:"70%",
    marginLeft:"50px",borderRadius:"15px",marginBottom:"9px",border:"solid,2px,#4cfcd6"}}>
    <span><TbTruckDelivery size={26} style={{color:"#4cfcd6"}}/></span>
    <span style={{marginLeft:"29px",textAlign:"center"}}>ডেলিভারি বাংলাদেশ</span>
  </div><div style={{flexDirection:"row",backgroundColor:"#0e5f8554",width:"70%",
    marginLeft:"50px",borderRadius:"15px",marginBottom:"9px",border:"solid,2px,#4cfcd6"}}>
    <span><CiCircleCheck size={26} style={{color:"#4cfcd6"}}/></span>
    <span style={{marginLeft:"29px",textAlign:"center"}}>অরিজিনাল ইম্পোর্টেড</span>
  </div>
  <button 
  onClick={scroll}
  style={{backgroundColor:"#f8e807",color:"black", marginTop:"30px",padding:"15px",borderRadius:"16px",fontFamily:"fangsong",fontSize:"20px"}}>অর্ডার করতে ক্লিক করুন</button>
</div>


<div style={{width:"100%",backgroundColor:"white",height:"auto",marginTop:"20px"}}>
  <img
  src="/23765626_l-2.gif"
  style={{marginTop:"10px"}}
  />
<h1 style={{color:"black"}}>ইরেক্টাইল ডিসফাংশন এবং অকাল বীর্যপাতের স্থায়ী সমাধান</h1>

<h1 style={{color:"black",marginTop:"16px",backgroundColor:"#0c4719",margin:"15px",borderRadius:"10px"}}>এক ফাইলেই স্থায়ী সমাধান</h1>
  <button 
  onClick={scroll}
  
  style={{backgroundColor:"#f8e807",color:"black", marginTop:"30px",padding:"15px",borderRadius:"16px",fontFamily:"fangsong",fontSize:"20px"}}>অর্ডার করতে ক্লিক করুন</button>

</div>
<div style={{backgroundColor:"#bfecd2",width:"100%",height:"auto"}}>

  <h3 style={{color:"#0c5e61",marginTop:"30px"}}>সেরা ভ্যালু প্যাকেজ</h3>
<p style={{color:"black",marginTop:"30px"}}>আপনার যৌন স্বাস্থ্য সুরক্ষায় আজই বেছে নিন জাপানি প্রযুক্তির লিং লং ক্যাপসুল। সীমিত সময়ের অফার!</p>

<div style={{marginTop:"30px",width:"80%",backgroundColor:"#f5ee8b",
  justifyContent:"center",paddingBottom:"20px",borderRadius:"15px",border:"2px,solid,yellow",height:"auto",marginLeft:"20px"}}>



<div style={{backgroundColor:"#1f5e19",borderRadius:"60%",width:"50px",marginLeft:"40%", justifyContent:"center",}}>
<FaChessKing size={40} style={{color:"yellow",marginTop:"5%"}}/>

</div>
<h2 style={{color:"black",marginTop:"20px"}}>ULTRA HOT CAPSULES</h2>
<h1 style={{color:"#244915",marginTop:"20px"}}>৳1500</h1>
<hr style={{color:"black",marginTop:"40px"}}/>

<p style={{marginTop:"30px"}}><span><CiCircleCheck size={26} 
style={{backgroundColor:"#114615",borderRadius:"50%",fontStyle:"oblique"}}/></span>
<span style={{color:"black",marginLeft:"20px",fontWeight:"bold"}}>৬০ টি ক্যাপসুল (২ মাসের কোর্স)</span></p>
<p style={{marginTop:"10px"}}><span><CiCircleCheck size={26} 
style={{backgroundColor:"#114615",borderRadius:"50%",fontStyle:"oblique"}}/></span>
<span style={{color:"black",marginLeft:"20px",fontWeight:"bold"}}>ফ্রি হোম ডেলিভারি সুবিধা</span></p>
<p style={{marginTop:"10px"}}><span><CiCircleCheck size={26} 
style={{backgroundColor:"#114615",borderRadius:"50%",fontStyle:"oblique"}}/></span>
<span style={{color:"black",marginLeft:"20px",fontWeight:"bold"}}>নিশ্চিন্তে ক্যাশ অন ডেলিভারি</span></p>
<p style={{marginTop:"10px"}}><span><CiCircleCheck size={26} 
style={{backgroundColor:"#114615",borderRadius:"50%",fontStyle:"oblique"}}/></span>
<span style={{color:"black",marginLeft:"20px",fontWeight:"bold"}}>100% অরিজিনাল জাপানি পণ্য</span></p>

  <button 
  onClick={scroll}
  
  style={{backgroundColor:"#145e30",color:"black", marginTop:"30px",padding:"15px",borderRadius:"16px",fontFamily:"fangsong",fontSize:"20px"}}>অর্ডার করতে ক্লিক করুন</button>


</div>
</div>
     <h2 style={{marginTop:"30px"}}>🧠 ultra hot আপনার যে সব সমস্যার সাপোর্ট দেয়</h2>
    
    <p style={{marginTop:"10px"}}>বিশেষ সময়ে তৃপ্তির জন্য এটির কোন বিকল্প নেই
</p>

<img 
src="/sweet-honey-1-1-1.gif"
style={{marginTop:"20px",borderRadius:"15px"}}
/>
<div style={{ marginTop: "30px", overflow: "hidden" }}>
  <div
    style={{
      display: "flex",
      gap: "16px",
      width: "max-content",
      animation: "scrollLeft 20s linear infinite",
    }}
  >
    {/* Card 1 */}
    <div
      style={{
        display: "flex",
          flexDirection:"column",
        alignItems: "center",
        gap: "12px",
        padding: "12px 18px",
        whiteSpace: "nowrap",
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "10px",
          background: "#ffd54f",
        }}
      >
        <BsLightningCharge size={26} />
      </div>
      <p style={{ marginTop: "30px" }}>মিলনে সময় বাড়াবে ২৫-৩৫ মিনিট</p>
    </div>

    {/* Card 2 */}
    <div
      style={{
        display: "flex",
          flexDirection:"column",
        alignItems: "center",
        gap: "12px",
        padding: "12px 18px",
        whiteSpace: "nowrap",
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "10px",
          background: "#81d4fa",
        }}
      >
        <FaPen size={26} />
      </div>
      <p style={{ marginTop: "30px" }}>গোপনাঙ্গকে মোটা ও লম্বা করবে</p>
    </div>
<div
      style={{
        display: "flex",
          flexDirection:"column",
        alignItems: "center",
        gap: "12px",
        padding: "12px 18px",
        whiteSpace: "nowrap",
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "10px",
          background: "#0d6619",
        }}
      >
        <GiSelfLove size={26} />
      </div>
      <p style={{ marginTop: "30px" }}>ভাল ফিলিংস আসবে</p>
    </div>
<div
      style={{
        display: "flex",
          flexDirection:"column",
        alignItems: "center",
        gap: "12px",
        padding: "12px 18px",
        whiteSpace: "nowrap",
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "10px",
          background: "#fcf823",
        }}
      >
        <FaHourglassStart size={26} />
      </div>
      <p style={{marginTop: "30px" }}>লিঙ্গ কে স্ট্রং ও মজবুত করবে
      </p>
    </div>
<div
      style={{
        display: "flex",
          flexDirection:"column",
        alignItems: "center",
        gap: "12px",
        padding: "12px 18px",
        whiteSpace: "nowrap",
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "10px",
          background: "#81d4fa",
        }}
      >
        <BsLightningCharge size={26} />
      </div>
      <p style={{ marginTop: "30px" }}>বীর্য পাতলাকে ঘন করবে</p>
    </div>

   
  </div>
</div>
  <button 
  onClick={scroll}
  
  style={{backgroundColor:"#f8e807",color:"black", marginTop:"30px",padding:"15px",borderRadius:"16px",fontFamily:"fangsong",fontSize:"20px"}}>অর্ডার করতে ক্লিক করুন</button>
<img 
src="/1111.jpg"
style={{width:"70%",height:"50vh",marginTop:"40px"}}
/>
<div style={{backgroundColor:"white",paddingBottom:"50px",width:"100%", marginTop:"40px",color:"black"}}>


  <h1 style={{marginTop:"100px"}}>ক্যাপসুল সেবন বিধি</h1>
  <p style={{marginTop:"60px"}}>প্রতিদিন রাত্রে খাবার পর একটি করে ক্যাপসুল খাবেন। এক বোতলে ৬০ টি ক্যাপসুল আছে, যা ২ মাসের পূর্ণাঙ্গ কোর্স।</p>
<div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop:"40px",
        gap: "12px",
        padding: "12px 18px",
        whiteSpace: "nowrap",
        background: "rgba(21, 102, 34, 0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "10px",
          background: "#fa81e0",
        }}
      >
        <FaStopwatch size={26} />
      </div>
      <p>প্রতি রাতে খাবার পর ১টি ক্যাপসুল</p>
    </div>
<div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop:"40px",
        gap: "12px",
        padding: "12px 18px",
        whiteSpace: "nowrap",
        background: "rgba(21, 102, 34, 0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "10px",
          background: "#0a1f7a",
        }}
      >
        <SlCalender size={26} />
      </div>
      <p>30টি ক্যাপসুল - পূর্ণ 1 মাসের কোর্স</p>
    </div>
<div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop:"40px",
        gap: "12px",
        padding: "12px 18px",
        whiteSpace: "nowrap",
        background: "rgba(21, 102, 34, 0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "10px",
          background: "#81d4fa",
        }}
      >
        <BsLightningCharge size={26} />
      </div>
      <p>২-৩ দিনের মধ্যেই পরিবর্তন লক্ষ্য করবেন</p>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        marginTop:"40px",
        gap: "12px",
        padding: "12px 18px",
        whiteSpace: "nowrap",
        background: "rgba(40, 202, 107, 0.97)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
           flexDirection:"column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "10px",
          background: "#81d4fa",
        }}
      >
        <BsLightningCharge size={26} />
      </div>
      <p>২-৩ দিনের মধ্যেই পরিবর্তন লক্ষ্য করবেন</p>
    </div>
  <button 
  
  onClick={scroll}
  
  style={{backgroundColor:"#f8e807",color:"black", marginTop:"30px",padding:"15px",borderRadius:"16px",fontFamily:"fangsong",fontSize:"20px"}}>অর্ডার করতে ক্লিক করুন</button>

</div>
<div style={{backgroundColor:"whitesmoke",width:"100%",height:"auto",paddingBottom:"14px"}}>

  <h1 style={{backgroundColor:"red",color:"black"}}>
    অর্ডার করতে নিচের ফরম পূরণ করুন
  </h1>
<form
onSubmit={handle}
  ref={orderFormRef}
  style={{
    maxWidth: "440px",
    margin: "30px auto",
    padding: "32px 28px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
  }}
>
  <div style={{ textAlign: "center", marginBottom: "8px" }}>
    <h2
      style={{
        margin: "0 0 6px 0",
        color: "#0f172a",
        fontSize: "22px",
        fontWeight: "700",
      }}
    >
      আপনার তথ্য দিন
    </h2>
    <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
      অর্ডারটি কনফার্ম করতে নিচের তথ্যগুলো পূরণ করুন
    </p>
  </div>

  <input
    type="text"
    name="name"
    placeholder="আপনার নাম"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    required
    style={{
      padding: "13px 16px",
      borderRadius: "10px",
      border: "1px solid #cbd5e1",
      backgroundColor: "#f8fafc",
      color: "#0a0a0a",
      fontWeight:"bold",
      fontSize: "15px",
      
      outline: "none",
    }}
  />

  <textarea
    name="address"
    placeholder="আপনার সম্পূর্ণ ঠিকানা (বাসা নং, রোড, থানা, জেলা)"
    required
     value={area}
    onChange={(e)=>setArea(e.target.value)}
    rows={3}
    style={{
      padding: "13px 16px",
      borderRadius: "10px",
      border: "1px solid #cbd5e1",
      backgroundColor: "#f8fafc",
    color: "#0a0a0a",
      fontWeight:"bold",
      fontSize: "15px",
      outline: "none",
      resize: "vertical",
      fontFamily: "inherit",
    }}
  />

  <input
    type="tel"
    name="mobile"
    placeholder="আপনার মোবাইল নাম্বার (01XXXXXXXXX)"
    required
     value={phone}
    onChange={(e)=>setPhone(e.target.value)}
    pattern="01[0-9]{9}"
    maxLength={11}
    style={{
      padding: "13px 16px",
      borderRadius: "10px",
      border: "1px solid #cbd5e1",
      backgroundColor: "#f8fafc",
      color: "#0a0a0a",
      fontWeight:"bold",
      fontSize: "15px",
      outline: "none",
    }}
  />
  <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
    <h3 style={{color:"green"}}>পিস</h3>
    <h3 style={{color:"red"}}>প্রাইস</h3>
  </div>
  <div   style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
< div style={{display:"flex",flexDirection:"row",gap:"14px"}}>

<button 


type="button"
onClick={()=>setQuantity(quantity?quantity+1:quantity)}

 style={{backgroundColor:"red",paddingInline:"17px",borderRadius:"10px",fontWeight:"bold"}}>+</button>
<h1 style={{color:"#000"}}>

{quantity}

</h1>
<button 


type="button"
onClick={()=>setQuantity(quantity>1?quantity - 1:1)}

  style={{backgroundColor:"green",paddingInline:"17px",borderRadius:"10px",fontWeight:"bold"}}>-</button>
</div>

<div>
<h1 style={{color:"black"}}>{quantity*price}</h1>
</div>
</div>
  <button
    type="submit"
    style={{
      marginTop: "6px",
      padding: "14px",
      borderRadius: "10px",
      border: "none",
      backgroundColor: "#0f172a", // প্রিমিয়াম ডার্ক নেভি বা চাইলে #059669 (Emerald Green) দিতে পারেন
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.2)",
    }}
    disabled={loading}
  >
   {loading?"ওয়েট....":" অর্ডার কনফার্ম করুন"}
  </button>
</form>

</div>

    </div>
  );
}
