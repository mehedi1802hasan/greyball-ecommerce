import star from "../../../../public/star.png";
import Image from "next/image";

export type Book = {
  image: string;
  title: string;
  description: string;
  rating: number;
  price: number;
};

type BookCardProps = {
  book: Book;
  handleAddToCart: (book: Book) => void;
};

export function BookCard({ book, handleAddToCart }: BookCardProps) {
  return (
    <div className="product-card bg-white p-4 shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-36 md:h-48 lg:h-48 object-cover rounded-t-lg "
      />
      <h3 className="mt-2 text-base font-semibold text-center">{book.title}</h3>
      <p className="text-[13px] text-gray-600 h-[75px] md:h-[88px] lg:h-[50px]">
        {book.description.split(" ").slice(0, 10).join(" ")}
        {book.description.split(" ").length > 5 && "..."}
      </p>

      <div className="  lg:flex justify-between items-center  ">
        <div className="flex justify-between items-center gap-5 ">
          <div className="flex justify-between items-center   ">
            <p className=" text-[14px]"> {book.rating}</p>
            <Image
              src={star}
              alt="Description of the image"
              width={16}
              height={16}
              layout="intrinsic"
            />
          </div>
          <p className=" text-[19px] font-semibold font-serif">${book.price}</p>
        </div>
        <button
          onClick={() => handleAddToCart(book)}
          className="w-full mt-2 md:mt-0 lg:mt-0 lg:w-24 bg-blue-400 hover:bg-blue-700 text-white px-4 py-[6px] text-[12px] rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
