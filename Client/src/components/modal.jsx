import { useState } from "react";

export default function Modal({ open, id, onUpdate, onClose }) {
  const [size, setSize] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(id, size);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center ${
        open ? "visible bg-black/20" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white w-52 h-32 p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <select
            name="size"
            id="size"
            onChange={(event) => setSize(event.target.value)}
            className="block w-full mb-4"
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
