"use client";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/slices/cartslice";
import { LuArrowUpDown } from "react-icons/lu";
import ResponsivePaginationComponent from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import BookCard from "./bookCard";


type Book = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  quantity?: number; // Optional quantity field
};

type CartItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  quantity: number; // Ensure quantity is a number
};

const ProductList = () => {
  const dispatch = useDispatch();

  // Add to cart handler
  const handleAddToCart = (product: Book): void => {
    // Ensure quantity is always a number, defaulting to 1 if undefined
    const updatedProduct: CartItem = {
      ...product,
      quantity: product.quantity ?? 1, // Default to 1 if quantity is undefined
    };
    dispatch(addItem(updatedProduct)); // Dispatch the action to add item to cart
  };

  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const booksPerPage = 10;

  const sortOptionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("https://mehedi1802hasan.github.io/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortOptionsRef.current &&
        !sortOptionsRef.current.contains(event.target as Node)
      ) {
        setShowSortOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter books based on search text
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Sorting function
  const sortBooks = (books: Book[]) => {
    if (sortOption === "price-low-high") {
      return [...books].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      return [...books].sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-high-low") {
      return [...books].sort((a, b) => b.rating - a.rating);
    } else {
      return books;
    }
  };

  // Get books for the current page
  const getBooksForCurrentPage = () => {
    const sortedBooks = sortBooks(filteredBooks);
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return sortedBooks.slice(startIndex, endIndex);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  // Handle sorting option change
  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    setShowSortOptions(false);
  };

  // Toggle sort options dropdown
  const toggleSortOptions = () => {
    setShowSortOptions((prev) => !prev);
  };

  return (
    <div className="mx-6 lg:mx-24 pt-[70px] lg:pt-24">
      <div className="lg:flex justify-between items-center">
        <h3 className="font-bold text-[16px] md:text-[22px] lg:text-[22px] text-center font-serif">
          Total Books: {filteredBooks.length}
        </h3>
        <div className="flex md:gap-6 lg:gap-6 justify-between items-center mt-3 md:mt-0 lg:mt-0">
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
                className="absolute mt-2 w-40 md:w-48 lg:w-48 z-10 bg-white border shadow-xl rounded-lg p-2 transition-all ease-in-out duration-200"
              >
                <button
                  onClick={() => handleSortChange("price-low-high")}
                  className={`block w-full text-left text-[11px] md:text-[14px] lg:text-[14px] px-4 py-2 rounded-lg mb-2 transition duration-200 ${
                    sortOption === "price-low-high"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black hover:bg-blue-100"
                  }`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => handleSortChange("price-high-low")}
                  className={`block w-full text-left text-[11px] md:text-[14px] lg:text-[14px] px-4 py-2 rounded-lg mb-2 transition duration-200 ${
                    sortOption === "price-high-low"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black hover:bg-blue-100"
                  }`}
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => handleSortChange("rating-high-low")}
                  className={`block w-full text-left text-[11px] md:text-[14px] lg:text-[14px] px-4 py-2 rounded-lg mb-2 transition duration-200 ${
                    sortOption === "rating-high-low"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black hover:bg-blue-100"
                  }`}
                >
                  Rating: High to Low
                </button>
              </div>
            )}
          </div>
          <div className="text-center relative">
            <input
              onChange={handleSearchChange}
              value={searchText}
              type="text"
              placeholder="Search by Title"
              className="input input-bordered input-md md:w-[400px] p-6 lg:rounded-3xl md:rounded-3xl h-[30px] md:h-[55px] lg:h-[55px]"
            />
            <button className="absolute top-1 right-2 hidden md:block lg:block btn btn-md text-white hover:bg-blue-500 lg:rounded-3xl md:rounded-3xl hover:bg-blue-500 bg-[#645BC8] md:w-[100px] lg:w-[100px]">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center text-lg font-semibold pt-12 text-gray-600">
          OOPS! No Books found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 md:pt-5 lg:pt-5">
            {getBooksForCurrentPage().map((book) => (
              <BookCard
                key={book.id}
                handleAddToCart={handleAddToCart} // Pass the function directly
                book={book}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="pt-10 pb-16">
            <ResponsivePaginationComponent
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;