import { ServiceBase } from "./service-base";

export class ProductService extends ServiceBase {
    static getProducts = async () => {
        try {
            // Adding User-Agent and broader headers as some public APIs require them
            const productResp = await fetch(this.getUrl('/products'), { 
                cache: 'no-store',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Vercel Fetch)',
                    'Accept': 'application/json'
                }
            });
            
            if (!productResp.ok) {
                const errorText = await productResp.text();
                console.error(`Fetch failed with status: ${productResp.status}. Body: ${errorText.slice(0, 100)}`);
                return [];
            }
            
            const products = await productResp.json();
            return Array.isArray(products) ? products : [];
        } catch (error) {
            console.error("Error in getProducts service:", error);
            return [];
        }
    }


    static getProductById = async(id: number | string) => {
        try {
            var productResp = await fetch(this.getUrl(`/products/${id}`), {
                headers: { 'User-Agent': 'Mozilla/5.0 (Vercel Fetch)' }
            });
            if (!productResp.ok) {
                console.error(`Fetch By ID failed with status: ${productResp.status}`);
                return null;
            }
            var product = await productResp.json();
            return product;
        } catch (error) {
            console.error(`Error in getProductById for ID ${id}:`, error);
            return null;
        }
    }

    static getProductsByCategory = async (category: string) => {
        try {
            const productResp = await fetch(this.getUrl(`/products/category/${category}`), {
                headers: { 'User-Agent': 'Mozilla/5.0 (Vercel Fetch)' }
            });
            if (!productResp.ok) {
                console.error(`Fetch Category failed with status: ${productResp.status}`);
                return [];
            }
            const products = await productResp.json();
            return products;
        } catch (error) {
            console.error(`Error in getProductsByCategory for category ${category}:`, error);
            return [];
        }
    }

}