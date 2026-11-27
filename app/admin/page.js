"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return <div>Loading orders...</div>;
  }

  return (
    <div>
      <h2>Hello admin, how are you?</h2>

      <div>
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          orders.map((item) => (
            <div key={item._id || item.id}>
              <h1>{item.name}</h1>
              <h1>{item.area}</h1>
              <h1>{item.phone}</h1>
              <h1>{item.quantity}</h1>
              <h1>{item.price}</h1>

            </div>
          ))
        )}
      </div>
    </div>
  );
}