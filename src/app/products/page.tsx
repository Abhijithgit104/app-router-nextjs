import { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Suspense } from "react";
import ProductList from "../components/ProductList";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Products List Page"
};

export default async function ProductsPage(props: any) {
  // In Next.js 15, props.params and props.searchParams are promises.
  // We await them even if not used, to follow conventions.
  const params = await props.params;
  const searchParams = await props.searchParams;

  console.log("Products list page accessed", { params, searchParams });

  // Safe access to cookies and headers
  try {
      const cookieList = await cookies();
      const tokenCookie = cookieList.get('authToken');
      if (tokenCookie) {
          console.log("Token present:", tokenCookie.value);
      }

      const headerList = await headers();
      const referer = headerList.get('referer');
      const userAgent = headerList.get('user-agent');
      const host = headerList.get('host');

      console.log("Request context:", { referer, userAgent, host });
  } catch (e) {
      console.error("Failed to read context (cookies/headers):", e);
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Our Products</h1>
      <Suspense fallback={
          <div style={{ textAlign: 'center', padding: '20px' }}>
              <span style={{ color: '#0070f3', fontWeight: 'bold' }}>Loading product list...</span>
          </div>
      }>
        <ProductList />
      </Suspense>
    </div>
  );
}
