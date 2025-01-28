'use client';
import { addItem } from "@/redux/slices/cartslice";
// import { addProductToCart } from "@/redux/slices/cartslice";
import { useDispatch } from "react-redux";

export function ProductList () {
    const products = [
        {
          id: 1,
          title: "Product 1",
          description: "Product Description 1",
          price: '55',
          currency: "USD",
          image: "https://example.com/product1.jpg",
          rating: 4.5
        },
        {
          id: 2,
          title: "Product 2",
          description: "Product Description 2",
          price: '40',
          currency: "USD",
          image: "https://example.com/product2.jpg",
          rating: 4.0
        },
        {
          id: 3,
          title: "Product 3",
          description: "Product Description 3",
          price: '75',
          currency: "USD",
          image: "https://example.com/product3.jpg",
          rating: 4.8
        },
        {
          id: 4,
          title: "Product 4",
          description: "Product Description 4",
          price: '30',
          currency: "USD",
          image: "https://example.com/product4.jpg",
          rating: 3.9
        },
        {
          id: 5,
          title: "Product 5",
          description: "Product Description 5",
          price: '99',
          currency: "USD",
          image: "https://example.com/product5.jpg",
          rating: 5.0
        },
        {
          id: 6,
          title: "Product 6",
          description: "Product Description 6",
          price: '60',
          currency: "USD",
          image: "https://example.com/product6.jpg",
          rating: 4.3
        },
        {
          id: 7,
          title: "Product 7",
          description: "Product Description 7",
          price: '25',
          currency: "USD",
          image: "https://example.com/product7.jpg",
          rating: 4.1
        }
      ];
      const dispatch = useDispatch(); // Hook to dispatch actions

      const handleAddToCart = (product) => {
        dispatch(addItem(product));
      };
    
  return (
   <div className=" ">
<div className="flex justify-between">
<h3>Our lattest Gagests</h3>
<div className="flex gap-16 justify-between">
<h3>Sort</h3>
<h3>Search</h3>
</div>
</div>
<div>


<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="product-card bg-white p-4 shadow-lg rounded-lg">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-t-lg" />
          <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="mt-2 font-bold">{product.currency} {product.price}</p>
          <p className="mt-2 text-yellow-500">Rating: {product.rating}</p>
          <button
           onClick={() => handleAddToCart(product)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>        </div>
      ))}
    </div>


</div>

   </div>
  )
}

