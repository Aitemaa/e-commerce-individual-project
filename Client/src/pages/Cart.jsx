import { useDispatch, useSelector } from "react-redux";
import HorizontalCard from "../components/horizontalCard";
import { useEffect } from "react";
import {
  deleteProductFromCart,
  fetchOrders,
  updateProductFromCart,
} from "../../features/orderSlice";
import { createMidtransOrder } from "../../features/paymentSlice";
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

  const handleClick = () => {
     dispatch(createMidtransOrder()).then((res)=> {
      window.snap.pay(res.transactionToken, {
        onSuccess: function(result){
          /* You may add your own implementation here */
          alert("payment success!"); console.log(result);
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
          {order.OrderDetails &&
            order.OrderDetails.map((e) => (
              <HorizontalCard
                onDelete={handleDelete}
                onUpdate={handleSubmit}
                key={e.id}
                order={e}
              />
            ))}
        </div>
      </div>
    </>
  );
}
