import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductDetail,
  fetchProductDetail,
} from "../../features/productDetailSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function AddProductToCart() {
  const nav = useNavigate();
  const { id } = useParams();
  const productDetail = useSelector((state) => state.productDetail.data);
  const dispatch = useDispatch();

  const [size, setSize] = useState("");

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addProductDetail(size, id));
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cart-container">
      <div className="d__card card lg:card-side bg-base-100 shadow-xl">
        <figure className="flex justify-center items-center h-full">
          <img src={productDetail.imgUrl} alt="Album" />
        </figure>
        <div className="card-body flex flex-col justify-center h-full">
          <h2 className="card-title">{productDetail.name}</h2>
          <p>{productDetail.description}</p>
          <p>IDR {productDetail.price}</p>
          <div className="card-actions flex justify-end">
            {/* eslint-disable-next-line */}
            <form onSubmit={handleSubmit}>
              <select
                name="size"
                id=""
                className=""
                onChange={(event) => setSize(event.target.value)}
              >
                <option disabled selected value="">
                  Choose size
                </option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
              <button className="ml-9 btn btn-primary">Add to Cart</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
