import { ProductService } from '@/app/services/products-services';
import type { Metadata, ResolvingMetadata } from 'next';
import { title } from 'process';
import styles from "../../styles/product.module.css"
import React from 'react'
import GotoCartButton from '@/app/components/GotoCartButton';

export async function generateMetadata(props: any) {
  console.log("generateMetadata: ", props);
  const productId = props.params.productId;
  var product;
  if(productId) {
    product = await ProductService.getProductById(productId);
    return {
      title: product.title
    }
  }
  return {
    title: "Product Detail Page"
  }
}
export default async function ProductDetails(props:any){
    const productId = props.params.productId;
  let product = null;

  if (productId) {
    product = await ProductService.getProductById(productId);
  }

  // Show loader or fallback if product not found
  if (!product) {
    return <p>Loading product...</p>;
  }

    return(
         <div className={styles.detail}>
      <img src={product.image} alt={product.title} width={250} />
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className={styles.price}>₹ {product.price}</p>
        <GotoCartButton product={product} />
      </div>
    </div>
    )
}