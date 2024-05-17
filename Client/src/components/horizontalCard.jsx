import { useState } from "react";
import Modal from "./modal";

export default function HorizontalCard({order, onDelete, onUpdate}){
  const [open, setOpen] = useState(false);

    return (
        <div className="card h__card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={order.Product.imgUrl}
            alt="Album"
            className=""
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{order.Product.name}</h2>
          <p>{order.Product.description}</p>
          <p>Price: {order.Product.price}</p>
          <p>Size: {order.size}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => setOpen(true)}>Update</button>
            <button className="btn btn-primary"  onClick={() => onDelete(order.id)}>Delete</button>
            <Modal open={open} id={order.id} onUpdate={onUpdate} onClose={() => setOpen(false)}/>
          </div>
        </div>
      </div>
    )
}