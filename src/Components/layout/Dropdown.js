// // src/Components/layout/Dropdown.js
// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// export default function Dropdown({
//   trigger,
//   items = [],
//   mode = 'hover',
//   align = 'left',
//   width = 'w-64',
// }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClickToggle = () => { if (mode === 'click') setIsOpen(!isOpen); };
//   const handleMouseEnter = () => { if (mode === 'hover') setIsOpen(true); };
//   const handleMouseLeave = () => { if (mode === 'hover') setIsOpen(false); };

//   return (
//     <div
//       className="relative inline-block text-left"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div onClick={handleClickToggle} className="cursor-pointer">
//         {trigger}
//       </div>

//       {isOpen && (
//         <div
//           className={`absolute top-full mt-0 ${width} bg-white rounded-md shadow-xl z-50 border border-gray-100 py-2 ${align === 'right' ? 'right-0' : 'left-0'
//             }`}
//         >
//           {items.map((item, index) => (
//             <div key={index} className="group/item relative">
//               <Link
//                 href={item.href}
//                 className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors"
//                 onClick={() => { if (mode === 'click') setIsOpen(false); }}
//               >
//                 <span>{item.label}</span>
//                 {item.subItems?.length > 0 && (
//                   <span className="text-gray-400 text-xs">›</span>
//                 )}
//               </Link>

//               {/* Nested sub-items (fly-out on the right) */}
//               {item.subItems?.length > 0 && (
//                 <div className="hidden group-hover/item:block absolute top-0 left-full ml-1 w-56 bg-white rounded-md shadow-xl border border-gray-100 py-2 z-50">
//                   {item.subItems.map((sub) => (
//                     <Link
//                       key={sub.name}
//                       href={sub.href}
//                       className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-500"
//                       onClick={() => { if (mode === 'click') setIsOpen(false); }}
//                     >
//                       {sub.name}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }