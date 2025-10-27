import ProductCard from "./product-card/ProductCard";
import styles from "../styles/product.module.css";

 export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
  return res.json();
}

export default async function ProductList() {
  const products = await getProducts();
  return (
    <div className={styles.container}>
      {products.map((p: any) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
