import { Link } from "react-router-dom";


export default function Card({product}) {
  return (
    <div className="card v__card w-96 bg-base-100 shadow-xl z-0 rounded-lg">
      <Link to={`/addProduct/${product.id}`}>
      <figure>
        <img
          src={product.imgUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
      <div className="card-actions justify-between">
          <div className="badge badge-outline">{product.Category.name}</div>
        </div>
        <h2 className="card-title">
          {product.name}
        </h2>
        <p>{product.description}</p>
      </div>
      </Link>
    </div>
  );
}
