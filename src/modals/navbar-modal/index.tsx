// // ModalComponent.js
// "use client";

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   DialogTitle,
// } from "@headlessui/react";
// import { useDispatch, useSelector } from "react-redux";
// import { removeProductFromCart } from "@/redux/slices/cartslice";
// import { CiShoppingCart } from "react-icons/ci";
// import { RxCross1 } from "react-icons/rx";

// // import { MdDeleteSweep } from "react-icons/md";
// export function CartItemModal({ open, setOpen }) {
//   useEffect(() => {
//     // Log to check if modal state changes
//     console.log("Modal open:", open);
//   }, [open]); // This will trigger every time `open` changes
//   const cartItems = useSelector((state) => state.cart.items); // Get the cart items from Redux store
//   const dispatch = useDispatch();

//   const handleRemoveFromCart = (product) => {
//     dispatch(removeProductFromCart(product)); // Dispatch the action to remove product
//   };
//   return (
//     <Dialog open={open} onClose={setOpen} className="relative z-10 ">
//       <DialogBackdrop
//         transition
//         className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
//       />

//       <div className="fixed inset-0 z-10 w-screen overflow-y-auto  p-[122px]">
//         <div className="flex min-h-full items-end justify-center p-[122px] text-center sm:items-center sm:p-0">
//           <DialogPanel
//             transition
//             className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
//           >
//             <div className=" p-[442px] mr-56 ">
//               <h2 className="text-red-600 p-5">Your Cart</h2>
//               {cartItems.length === 0 ? (
//                 <p>Your cart is empty</p>
//               ) : (
//                 <ul>
//                   <div className="flex justify-between items-center ">
//                     <div className=" gap-1 text-[15px] lg:text-[20px]">
//                       <CiShoppingCart className="text-lg lg:text-2xl" />
//                       <span className="text-[#000000]">
//                         {" "}
//                         {cartItems.length === 0 ? 0 : cartItems.length}
//                       </span>{" "}
//                       Item
//                     </div>
//                     <div>
//                       {/*--TODO-- drawer close by click  */}
//                       <RxCross1 className="font-semibold hover:font-bold text-lg lg:text-2xl hover:text-red-600  " />
//                     </div>
//                   </div>
//                   {cartItems.map((product) => (
//                     <li
//                       key={product.id}
//                       className="flex justify-between items-center text-red-600"
//                     >
//                       <p className="text-red-600">{product.title}</p>
//                       <p>{product.rating}</p>
//                       <p>{product.title}</p>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   );
// }
