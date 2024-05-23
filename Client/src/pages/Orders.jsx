import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

export default function MyOrders() {
  const [orders, setOrders] = useState({});
  const [isExtended, setIsExtended] = useState(false);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: "/orders?filter=Completed",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleExtended = () => {
    setIsExtended(!isExtended);
  };

  useEffect(() => {
      fetchOrders();
      console.log(orders);
  }, []);

  return (
    <div className="max-w-md comp flex flex-column justify-center items-center bg-white mx-auto rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">My Orders</div>
      </div>
      {isExtended && (
  <>
    {(!orders || !orders.OrderDetails) ? (
      <p>No completed orders</p>
    ) : (
      orders.OrderDetails && orders.OrderDetails.map((order, index) => (
        <div key={order.id} className="px-2 py-2">
          <p className="text-gray-700 text-base">
            {index + 1}: {order.Product.name} | {order.size} | {order.Product.price} 
          </p>
        </div>
      ))
    )}
  </>
)}

      <div className="px-6 py-4">
        <button
          className="transition duration-300 bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={toggleExtended}
        >
          Click here to see your orders
        </button>
      </div>
    </div>
  );
}
