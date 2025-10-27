"use client";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "../styles/cart.module.css";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum: number, p: any) => sum + p.price, 0);

  return (
    <div className={styles.cart}>
      <h1>Your Cart</h1>
      {cart.length === 0 && <p>No items yet.</p>}
     {cart.map((p: any, index: number) => (
  <div key={p.id || index} className={styles.item}>
    <img src={p.image} width={80} alt={p.title || "Product"} />
    <div>
      <h4>{p.title}</h4>
      <p>₹ {p.price}</p>
      <button onClick={() => removeFromCart(p.id)}>Remove</button>
      {/* <button>{p.category}</button> */}
    </div>
  </div>
))}

      <h3>Total: ₹ {total.toFixed(2)}</h3>
    </div>
  );
}
