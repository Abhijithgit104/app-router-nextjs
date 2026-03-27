import ProductCard from "@/app/components/product-card/ProductCard";
import { ProductService } from "@/app/services/products-services";

interface CategoryProductProps {
  params: Promise<{ categoryName: string; productId: string }>;
}

export default async function CategoryProduct({ params }: CategoryProductProps) {
  const { categoryName, productId } = await params;
  const decodedCategory = decodeURIComponent(categoryName);
  
  let productList = [];

  if (decodedCategory) {
    productList = await ProductService.getProductsByCategory(decodedCategory);
  }

  return (
    <div>
      <div>Category: {decodedCategory}</div>
      <div>ProductId: {productId}</div>
      <br />
      <h3>{decodedCategory} Products</h3>
      <div className="d-flex flex-wrap gap-2">
        {productList && productList.length > 0 ? (
          productList.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
