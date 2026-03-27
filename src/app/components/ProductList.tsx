import ProductCard from "./product-card/ProductCard";
import styles from "../styles/product.module.css";
import { ProductService } from "../services/products-services";

export default async function ProductList() {
  try {
    const products = await ProductService.getProducts();
    
    if (!Array.isArray(products)) {
        console.error("Expected array from getProducts, got:", products);
        return <p>Error: Invalid product data received.</p>;
    }

    return (
      <div className={styles.container}>
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products in ProductList:", error);
    return <p>Error loading products. Please try again later.</p>;
  }
}
