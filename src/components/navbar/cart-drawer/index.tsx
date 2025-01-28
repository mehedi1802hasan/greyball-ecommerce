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

// Define types for cart items and the cart state
interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

export function CartDrawer() {
  const dispatch = useDispatch();
  const cart = useSelector((state: { cart: CartState }) => state.cart);

  const handleDeleteToCart = (item: CartItem) => {
    dispatch(removeItem(item.id));
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    dispatch(decreaseQuantity(item.id));
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch(increaseQuantity());
    dispatch(addItem(item));
  };

  const totalCost = cart.cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const closeDrawer = () => {
    const drawer = document.getElementById("my-drawer-4") as HTMLInputElement;
    if (drawer) drawer.checked = false;
  };

  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex  items-center gap-1 text-[15px] lg:text-[20px]">
          <CiShoppingCart className="text-lg lg:text-2xl" />
          <span className="text-[#000000]">{cart?.cart.length}</span> Item
        </div>
        <div>
          <RxCross1
            onClick={closeDrawer}
            className="cursor-pointer font-semibold hover:font-bold text-lg lg:text-2xl hover:text-red-600"
          />
        </div>
      </div>

      <div className="my-7 flex flex-col gap-6">
        {cart?.cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-1 lg:gap-3">
              <div className="flex flex-col justify-center lg:gap-1">
                <p
                  onClick={() => handleIncreaseQuantity(item)}
                  className="border border-blue-400 text-[#0b5e53] text-[14px] lg:text-[16px] font-bold p-2 w-[22px] h-[10px] lg:w-[25px] lg:h-[25px] flex justify-center items-center rounded-full pb-3 cursor-pointer hover:bg-slate-200 pt-3"
                >
                  +
                </p>
                <p className="w-[20px] lg:w-[25px] text-center text-[12px] lg:text-[14px] text-[#3F3F3F] font-bold">
                  {item.quantity}
                </p>
                <p
                  onClick={() => handleDecreaseQuantity(item)}
                  className="border border-blue-400 text-[#FF5151] text-[14px] lg:text-[16px] font-bold p-2 w-[22px] h-[20px] lg:w-[25px] lg:h-[25px] flex justify-center items-center rounded-full pb-3 cursor-pointer hover:bg-slate-200"
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

                  <p className="text-[9px] lg:text-[12px] text-[#3F3F3F] font-bold">
                    ${item.quantity * item.price}
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
          className= "cursor-pointer hover:bg-blue-700 bg-blue-500 h-[35px] lg:h-[42px] text-[12px] text-white rounded-md flex justify-center items-center"
        >
          <p>Total Price : $ {totalCost}</p>
        </div>
      )}
    </div>
  );
}
