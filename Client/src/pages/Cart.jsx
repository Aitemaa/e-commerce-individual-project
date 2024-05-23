import { useDispatch, useSelector } from "react-redux";
import HorizontalCard from "../components/horizontalCard";
import { useEffect } from "react";
import {
  deleteProductFromCart,
  fetchOrders,
  updateProductFromCart,
} from "../../features/orderSlice";
import { createMidtransOrder } from "../../features/paymentSlice";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";

export default function Cart() {
  const order = useSelector((state) => state.order.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const handleDelete = async (id) => {
    dispatch(deleteProductFromCart(id));
  };

  const handleSubmit = async (id, size) => {
    dispatch(updateProductFromCart(id, size));
  };

  const updateStatus = async () => {
    try {
      await axiosInstance({
        method: 'patch',
        url:`/orders/${order.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const handleClick = () => {
     dispatch(createMidtransOrder()).then((res)=> {
      window.snap.pay(res.transactionToken, {
        onSuccess: function(result){
          /* You may add your own implementation here */
          alert("payment success!"); console.log(result);
          updateStatus()
        },
        onPending: function(result){
          /* You may add your own implementation here */
          alert("wating your payment!"); console.log(result);
        },
        onError: function(result){
          /* You may add your own implementation here */
          alert("payment failed!"); console.log(result);
        },
        onClose: function(){
          /* You may add your own implementation here */
          alert('you closed the popup without finishing the payment');
        }
      })

     }) 
  };

  return (
    <>
      <div className="cart-container">
        <div className="checkout-container">
          <button id="" onClick={handleClick} className="checkout-button">Checkout</button>
        </div>
        <div className="card__container flex">
          { (!order || !order.OrderDetails) ? 
            <div className="card h__card lg:card-side bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Cart is Empty</h2>
            </div>
          </div>
            : 
            order.OrderDetails.map((e) => (
              <HorizontalCard
                onDelete={handleDelete}
                onUpdate={handleSubmit}
                key={e.id}
                order={e}
              />
            ))
              
          }
        </div>
      </div>
    </>
  );
}
