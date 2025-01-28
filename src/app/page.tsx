// src/app/page.tsx

import { Navbar } from '@/components/navbar';
import ProductList from '@/components/product-list';

export const metadata = {
  title: 'greyball-ecommerce',
  description: 'explore our product list page',
};

export default function Home() {
  return (
    <div>
      <Navbar />
      <ProductList/>
    </div>
  );
}
