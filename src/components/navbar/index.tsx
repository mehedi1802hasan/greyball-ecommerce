"use client";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { CartDrawer } from "./cart-drawer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
interface RootState {
  cart: {
    cart: CartItem[];
  };
}

export function Navbar() {
  const cart = useSelector((state: RootState) => state.cart);
  const totalQuantity =
    cart && cart.cart
      ? cart.cart.reduce((acc, item) => acc + item.quantity, 0)
      : 0;

  return (
    <div>
      <div className="w-full fixed z-10 bg-slate-100">
        <div className="mx-2 lg:mx-16 flex justify-between items-center px-4 lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <a className="font-serif text-black text-xl md:text-2xl lg:text-2xl">
                Greyball-Ecommerce
              </a>
            </div>
          </div>

          {/* ------------drawer cart---------------------- */}
          <div className="drawer w-24 drawer-end z-20 ">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="drawer-button">
                <div className="flex justify-center items-center cursor-pointer">
                  <h2 className="text-black text-[17px]">Cart</h2>
                  <div className="relative">
                    <CiShoppingCart className="text-lg lg:text-[22px]" />
                    <span className="absolute -top-2 left-5 bg-blue-500 w-[22px] h-[22px] rounded-full font-bold text-[12px] text-white flex justify-center items-center">
                      {totalQuantity}
                    </span>
                  </div>
                </div>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu px-3 lg:px-8 py-7 flex flex-col justify-between w-52 lg:w-80 min-h-fit bg-base-200 text-base-content">
                {/* ----------------Sidebar content here */}
                <CartDrawer />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
