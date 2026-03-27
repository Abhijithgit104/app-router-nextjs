import { ProductService } from '@/app/services/products-services';
import type { Metadata } from 'next';
import styles from "../../styles/product.module.css"
import React from 'react'
import GotoCartButton from '@/app/components/GotoCartButton';

interface ProductDetailsProps {
  params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: ProductDetailsProps): Promise<Metadata> {
  const { productId } = await params;
  
  if (productId) {
    const product = await ProductService.getProductById(productId);
    if (product) {
        return {
          title: product.title
        };
    }
  }
  return {
    title: "Product Detail Page"
  };
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { productId } = await params;
  let product = null;

  if (productId) {
    product = await ProductService.getProductById(productId);
  }

  // Show loader or fallback if product not found
  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className={styles.detail}>
      <img src={product.image} alt={product.title} width={250} />
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className={styles.price}>₹ {product.price}</p>
        <GotoCartButton product={product} />
      </div>
    </div>
  );
}