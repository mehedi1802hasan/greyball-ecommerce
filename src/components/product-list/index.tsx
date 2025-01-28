'use client'
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/slices/cartslice";
import { LuArrowUpDown } from "react-icons/lu";
import ResponsivePaginationComponent from "react-responsive-pagination";
import 'react-responsive-pagination/themes/classic.css';

type Book = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
};

const ProductList = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (product: Book) => {
    dispatch(addItem(product));
  };

  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>(''); // State for sorting option
  const [showSortOptions, setShowSortOptions] = useState(false); // State to toggle sorting options
  const booksPerPage = 10;

  const sortOptionsRef = useRef<HTMLDivElement | null>(null); // Reference to the sort options dropdown

  useEffect(() => {
    fetch('https://mehedi1802hasan.github.io/data/data.json')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        console.log(data);
      });
  }, []);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortOptionsRef.current && !sortOptionsRef.current.contains(event.target as Node)) {
        setShowSortOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortBooks = (books: Book[]) => {
    if (sortOption === 'price-low-high') {
      return [...books].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      return [...books].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-high-low') {
      return [...books].sort((a, b) => b.rating - a.rating);
    } else {
      return books;
    }
  };

  const getBooksForCurrentPage = () => {
    const sortedBooks = sortBooks(filteredBooks);
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return sortedBooks.slice(startIndex, endIndex);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to the first page when search text changes
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    setShowSortOptions(false); // Hide the options after selecting one
  };

  const toggleSortOptions = () => {
    setShowSortOptions((prev) => !prev);
  };

  return (
    <div className="mx-6 lg:mx-24 pt-[70px] lg:pt-24">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl text-center font-serif">
          Total Books: {filteredBooks.length}
        </h3>
        <div className="flex gap-6 justify-between items-center">
          <div className="relative">
            {/* Sort Button */}
            <button
              onClick={toggleSortOptions}
              className="btn bg-white text-black border rounded-lg py-2 px-4 hover:bg-gray-100 transition ease-in-out duration-200 flex items-center"
            >
              Sort
              <LuArrowUpDown className="ml-2" />
            </button>

            {/* Sorting Options Dropdown */}
            {showSortOptions && (
              <div
                ref={sortOptionsRef}
                className="absolute mt-2 w-48 z-10 bg-white border shadow-xl rounded-lg p-2 transition-all ease-in-out duration-200"
              >
                <button
                  onClick={() => handleSortChange('price-low-high')}
                  className={`block w-full text-left text-[14px] px-4 py-2 rounded-lg mb-2 transition duration-200 ${sortOption === 'price-low-high' ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-blue-100'}`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => handleSortChange('price-high-low')}
                  className={`block w-full text-left text-[14px]  px-4 py-2 rounded-lg mb-2 transition duration-200 ${sortOption === 'price-high-low' ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-blue-100'}`}
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => handleSortChange('rating-high-low')}
                  className={`block w-full text-left text-[14px]  px-4 py-2 rounded-lg mb-2 transition duration-200 ${sortOption === 'rating-high-low' ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-blue-100'}`}
                >
                  Rating: High to Low
                </button>
              </div>
            )}
          </div>
          <div className="text-center">
            <input
              onChange={handleSearchChange}
              value={searchText}
              type="text"
              placeholder="Search by Title"
              className="input input-bordered input-md md:w-[400px] p-6 lg:rounded-3xl md:rounded-3xl h-[55px]"
            />
            <button className="btn btn-md text-white hover-bg-blue-500 lg:rounded-3xl md:rounded-3xl hover:bg-blue-500 bg-[#645BC8] md:w-[100px] lg:w-[100px] lg:-ml-[105px] md:-ml-[105px] -ml-[4px]">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-600">No products found.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {getBooksForCurrentPage().map((book) => (
              <div key={book.id} className="product-card bg-white p-4 shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="mt-4 text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.description}</p>
                <p className="mt-2 font-bold">
                  {book.currency} {book.price}
                </p>
                <p className="mt-2 text-yellow-500">Rating: {book.rating}</p>
                <button
                  onClick={() => handleAddToCart(book)}
                  className="mt-4 bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <ResponsivePaginationComponent
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;
