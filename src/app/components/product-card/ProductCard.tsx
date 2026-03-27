"use client";
import Link from "next/link";
import styles from "../../styles/product.module.css";

export default function ProductCard({ product }: any) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className={styles.card}>
        <img src={product.image} alt={product.title} width={150} height={150} />
        <h4>{product?.title ? product.title.slice(0, 30) : "No Title Available"}...</h4>
        <p className={styles.price}>₹ {product.price}</p>
      </div>
    </Link>
  );
}
