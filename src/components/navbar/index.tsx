"use client";
// import { CartItemModal } from "@/modals/navbar-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { addItem, decreaseQuantity, increaseQuantity, removeItem } from "@/redux/slices/cartslice";

export function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
 
  const cart = useSelector(state => state.cart);
  const totalQuantity = cart && cart.cart ? cart.cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  // console.log(cart.cart);
  const dispatch = useDispatch();
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
    (total, item) => total + item.quantity * item.offerPrice,
    0
  );
  const closeDrawer = () => {
    document.getElementById("my-drawer-4").checked = false;
  };






  return (
    <div>
      <nav className="w-full bg-emerald-200">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <Link href="/">
                <h2 className="text-2xl text-cyan-600 font-bold ">LOGO</h2>
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image src="/close.svg" width={30} height={30} alt="logo" />
                  ) : (
                    <Image
                      src="/hamburger-menu.svg"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
           



          <div>
            <div className="drawer drawer-end z-20">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button">
                  <div className=" relative mx-2">
                    <HiOutlineShoppingCart className="text-xl cursor-pointer" />

                    <span className="absolute -top-2 left-4  bg-[#5259FF]  w-[15px] h-[15px] rounded-full font-bold text-[10px] text-white flex justify-center items-center">
                      {'totalQuantity'}
                    </span>
                  </div>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu px-3 lg:px-8 py-7  flex flex-col justify-between  w-52 lg:w-80 min-h-fit   bg-base-200 text-base-content">
                  {/* Sidebar content here */}

                  <div>

                    <div className="flex justify-between items-center ">
                      <div className="flex  items-center gap-1 text-[15px] lg:text-[20px]">
                        <CiShoppingCart className="text-lg lg:text-2xl" />
                     
                        <span className="text-[#000000]">{cart?.cart.length}</span> Item
                      </div>
                      <div>
                        {/*--TODO-- drawer close by click  */}
                        <RxCross1   className="font-semibold hover:font-bold text-lg lg:text-2xl hover:text-red-600  " />
                      </div>
                    </div>

                    <div className="my-7 flex flex-col gap-6">
                      {
                        cart ?.cart.map(item => (
                          <div key={item.id} className="flex items-center justify-between  ">
                            <div className="flex justify-center items-center  gap-1 lg:gap-3">
                              <div className="  flex flex-col justify-center  lg:gap-1">
                                <p onClick={() => handleIncreaseQuantity(item)} className="border border-[#FF5151] text-[#FF5151] text-[14px] lg:text-[16px] font-bold p-2 w-[22px] h-[10px] lg:w-[25px] lg:h-[25px] flex  justify-center items-center rounded-full pb-3 cursor-pointer hover:bg-slate-200">
                                  +
                                </p>
                                <p className="w-[20px] lg:w-[25px] text-center text-[12px] lg:text-[14px] text-[#3F3F3F] font-bold ">
                                  {item.quantity}
                                </p>
                                <p onClick={() => handleDecreaseQuantity(item)} className="border border-[#7E7E7E80] text-[#7E7E7E80] text-[14px] lg:text-[16px] font-bold p-2 w-[22px] h-[20px] lg:w-[25px] lg:h-[25px] flex  justify-center items-center rounded-full pb-3 cursor-pointer hover:bg-slate-200">
                                  -
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={item.image} alt="" className="h-[70px] w-[40px] lg:w-[62px]" />
                                <div className="flex flex-col gap-[2px]">
                                  <p className="text-[9px] lg:text-[12px] text-[#3F3F3F]">
                                    {item.title}
                                  </p>
                                  {/* <p className="text-[8px] lg:text-[10px] text-[#7E7E7E]">
                                    {item.category}
                                  </p> */}
                                  <p className="text-[9px] lg:text-[12px] text-[#3F3F3F] font-bold">
                                    {(item.quantity) * (item.price)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <MdDeleteSweep onClick={() => handleDeleteToCart(item)} className="text-[22px] lg:text-[35px] text-[#FF5151] cursor-pointer" />
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                 
                </ul>
              </div>
            </div>
          </div>







          </div>
        </div>
      </nav>
    </div>
  );
}
