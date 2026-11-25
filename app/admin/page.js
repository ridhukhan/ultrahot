"use client"
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Admin(){
    const router = useRouter()
    const [orders,setOrders]=useState([])
const checkAdminStatus = async () => {
    try {
      const res = await fetch("/api/me");
      const data = await res.json();
      if(data.success){
        setIsadmin(true)
      }else{
        router.push("/login")
      }
    } catch (err) {
      setIsAdmin(false);
    }
  };
async function fetchorder(){
  const data =await fetch("/api/order")
  const gokgok = await data.json()

  if(gokgok.success){
setOrders(data.orders)
  }else{
    alert("no order found")
  }
}
  useEffect(() => {
    checkAdminStatus();
    fetchorder()
  }, []);

    

    return(
        <div>
            hello admin how are are you


            <div>
{orders.map((item)=>(
<div key={item.id}>
<h1>{item.name}</h1>
<h1>{item.area}</h1>
<h1>{item.phone}</h1>

</div>
))}

            </div>
        </div>
    )
}