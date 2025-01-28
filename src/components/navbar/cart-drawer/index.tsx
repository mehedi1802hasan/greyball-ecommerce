import {
  addItem,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/redux/slices/cartslice";
import { CiShoppingCart } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
export function CartDrawer() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const handleDeleteToCart = (item) => {
    dispatch(removeItem(item.id));
  };
  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item.id));
    // dispatch(addItem(product));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity());
    dispatch(addItem(item));
  };
  const totalCost = cart.cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const closeDrawer = () => {
    document.getElementById("my-drawer-4").checked = false;
  };
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex  items-center gap-1 text-[15px] lg:text-[20px]">
          <CiShoppingCart className="text-lg lg:text-2xl" />
          <span className="text-[#000000]">{cart?.cart.length}</span> Item
        </div>
        <div>
          {/*--TODO-- drawer close by click  */}
          <RxCross1
            onClick={closeDrawer}
            className="font-semibold hover:font-bold text-lg lg:text-2xl hover:text-red-600  "
          />
        </div>
      </div>

      <div className="my-7 flex flex-col gap-6">
        {cart?.cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between  ">
            <div className="flex justify-center items-center  gap-1 lg:gap-3">
              <div className="  flex flex-col justify-center  lg:gap-1">
                <p
                  onClick={() => handleIncreaseQuantity(item)}
                  className="border border-[#0b5e53] text-[#0b5e53] text-[14px] lg:text-[16px] font-bold p-2 w-[22px] h-[10px] lg:w-[25px] lg:h-[25px] flex  justify-center items-center rounded-full pb-3 cursor-pointer hover:bg-slate-200 pt-3"
                >
                  +
                </p>
                <p className="w-[20px] lg:w-[25px] text-center text-[12px] lg:text-[14px] text-[#3F3F3F] font-bold ">
                  {item.quantity}
                </p>
                <p
                  onClick={() => handleDecreaseQuantity(item)}
                  className="border border-[#7E7E7E80] text-[#FF5151] text-[14px] lg:text-[16px] font-bold p-2 w-[22px] h-[20px] lg:w-[25px] lg:h-[25px] flex  justify-center items-center rounded-full pb-3 cursor-pointer hover:bg-slate-200"
                >
                  -
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt=""
                  className="h-[70px] w-[40px] lg:w-[62px]"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[9px] lg:text-[12px] text-[#3F3F3F]">
                    {item.title}
                  </p>
                  {/* <p className="text-[8px] lg:text-[10px] text-[#7E7E7E]">
                  {item.category}
                </p> */}
                  <p className="text-[9px] lg:text-[12px] text-[#3F3F3F] font-bold">
                    {item.quantity * item.price}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <MdDeleteSweep
                onClick={() => handleDeleteToCart(item)}
                className="text-[22px] lg:text-[35px] text-[#FF5151] cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
      {cart?.cart.length !== 0 && (
        <div
          onClick={closeDrawer}
          className="  hover:bg-blue-700  bg-blue-500 h-[35px] lg:h-[42px] text-[12px] text-white rounded-md flex justify-center items-center"
        >
          <p>Checkout Now : $ {totalCost}</p>
        </div>
      )}
    </div>
  );
}












[
  {
    "id": 1,
    "title": "Silent Path",
    "description": "A tale of self-discovery and inner peace, following a spiritual journey.",
    "price": 18,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.5
  },
  {
    "id": 2,
    "title": "Whispers",
    "description": "The mysteries of an ancient world are uncovered through whispers from the past.",
    "price": 28,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.0
  },
  {
    "id": 3,
    "title": "Timeless",
    "description": "A gripping journey through time, where history and future collide.",
    "price": 45,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.8
  },
  {
    "id": 4,
    "title": "Eternity",
    "description": "A story of love, loss, and the infinite cycle of life.",
    "price": 53,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 3.9
  },
  {
    "id": 5,
    "title": "Awakening",
    "description": "A quest for meaning in a chaotic world, filled with hope and inspiration.",
    "price": 64,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 5.0
  },
  {
    "id": 6,
    "title": "Revelation",
    "description": "A discovery that changes everything, leading to unimaginable consequences.",
    "price": 122,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.3
  },
  {
    "id": 7,
    "title": "Serenity",
    "description": "A peaceful escape from the turbulence of life, finding calm in the storm.",
    "price": 234,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.1
  },
  {
    "id": 8,
    "title": "Journey",
    "description": "A life-changing adventure that takes the protagonist to the edge of their limits.",
    "price": 18,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.5
  },
  {
    "id": 9,
    "title": "Solitude",
    "description": "A story of isolation and the discovery of self in moments of complete solitude.",
    "price": 28,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.0
  },
  {
    "id": 10,
    "title": "Fate",
    "description": "A powerful tale of destiny, choices, and the unseen forces that shape our lives.",
    "price": 45,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.8
  },
  {
    "id": 11,
    "title": "Legacy",
    "description": "A family’s legacy is unraveled, revealing dark secrets from the past.",
    "price": 53,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 3.9
  },
  {
    "id": 12,
    "title": "Passion",
    "description": "A tale of love and passion, where emotions run deep and nothing is ever certain.",
    "price": 64,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 5.0
  },
  {
    "id": 13,
    "title": "Hope",
    "description": "A story of overcoming adversity, where hope is the only thing that keeps us going.",
    "price": 122,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.3
  },
  {
    "id": 14,
    "title": "Darkness",
    "description": "An exploration of the human soul and the darkness that resides within.",
    "price": 234,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.1
  },
  {
    "id": 15,
    "title": "Wings",
    "description": "A journey of transformation, where the protagonist learns to fly beyond limits.",
    "price": 18,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.5
  },

  {
    "id": 16,
    "title": "Courage",
    "description": "A story of bravery, standing tall in the face of fear and challenges.",
    "price": 35,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.6
  },
  {
    "id": 17,
    "title": "Betrayal",
    "description": "A shocking tale of trust broken, and the journey of dealing with the consequences.",
    "price": 45,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.2
  },
  {
    "id": 18,
    "title": "Eclipse",
    "description": "The lives of two individuals intertwine under the rarest of circumstances, during an eclipse.",
    "price": 39,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.4
  },
  {
    "id": 19,
    "title": "Phoenix",
    "description": "Rising from the ashes, this is a tale of resilience, strength, and rebirth.",
    "price": 52,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.8
  },
  {
    "id": 20,
    "title": "Labyrinth",
    "description": "A journey through the maze of life, where each turn offers new challenges and revelations.",
    "price": 50,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.3
  },
  {
    "id": 21,
    "title": "Twilight",
    "description": "A moment of transition, a story of hope, where the darkness gives way to light.",
    "price": 30,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.1
  },
  {
    "id": 22,
    "title": "Mirage",
    "description": "A fleeting illusion of reality, where nothing is quite what it seems.",
    "price": 67,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.7
  },
  {
    "id": 23,
    "title": "Destiny",
    "description": "The paths we choose and the fate that awaits us, a gripping exploration of destiny.",
    "price": 48,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.4
  },
  {
    "id": 24,
    "title": "Odyssey",
    "description": "A hero's journey across time and space, facing trials and discovering hidden truths.",
    "price": 55,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.6
  },
  {
    "id": 25,
    "title": "Rebirth",
    "description": "A powerful transformation, where one must embrace change to survive and thrive.",
    "price": 39,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.5
  },
  {
    "id": 26,
    "title": "Shadow",
    "description": "The dark side of the human soul is brought to light in this intense psychological thriller.",
    "price": 29,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.2
  },
  {
    "id": 27,
    "title": "Crimson",
    "description": "A love story drenched in passion and mystery, where secrets threaten to tear them apart.",
    "price": 58,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.3
  },
  {
    "id": 28,
    "title": "Frozen",
    "description": "A chilling tale of survival in the harshest conditions, where humanity is tested.",
    "price": 60,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.7
  },
  {
    "id": 29,
    "title": "Revenge",
    "description": "A gripping story of vengeance and the consequences it has on the soul.",
    "price": 72,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.4
  },
  {
    "id": 30,
    "title": "Wanderer",
    "description": "The story of a traveler, seeking purpose, encountering strange lands and experiences.",
    "price": 65,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.8
  },
  {
    "id": 31,
    "title": "Fury",
    "description": "A tale of rage and redemption, where anger drives the protagonist to drastic actions.",
    "price": 48,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.6
  },
  {
    "id": 32,
    "title": "Vengeance",
    "description": "A dark story about the cycle of vengeance, and the cost of seeking justice.",
    "price": 53,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.2
  },
  {
    "id": 33,
    "title": "Serenity",
    "description": "A peaceful journey of self-reflection and mindfulness, finding calm amidst chaos.",
    "price": 40,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.4
  },
  {
    "id": 34,
    "title": "Freedom",
    "description": "A tale of liberation, where characters seek freedom in a world full of restrictions.",
    "price": 50,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.5
  },
  {
    "id": 35,
    "title": "Revelation",
    "description": "A life-altering discovery that leads the protagonist to the brink of understanding the universe.",
    "price": 63,
    "currency": "USD",
    "image": "https://i.ibb.co.com/ygPn0Qm/pexels-photo-2294408.jpg",
    "rating": 4.7
  }

]










