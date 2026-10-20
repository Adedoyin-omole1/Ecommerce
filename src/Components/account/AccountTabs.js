// // src/Components/account/AccountTabs.js
// 'use client';

// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faUser,
//     faHeart,
//     faBagShopping,
//     faLocationDot,
//     faKey,
//     faRightFromBracket,
// } from '@fortawesome/free-solid-svg-icons';
// import { useUser } from '@/contexts/UserContext';

// export default function AccountTabs() {
//     const pathname = usePathname();
//     const router = useRouter();
//     const { logout } = useUser();

//     const TABS = [
//         { label: 'Profile', href: '/account/profile', icon: faUser },
//         { label: 'Wishlist', href: '/wishlist', icon: faHeart },
//         { label: 'My Order', href: '/account/orders', icon: faBagShopping },
//         { label: 'Saved Address', href: '/account/addresses', icon: faLocationDot },
//         { label: 'Change Password', href: '/account/password', icon: faKey },
//     ];

//     const handleLogout = () => {
//         logout();
//         router.push('/login');
//     };

//     return (
//         <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1">
//             {TABS.map((tab) => {
//                 const isActive = pathname.startsWith(tab.href);
//                 return (
//                     <Link
//                         key={tab.href}
//                         href={tab.href}
//                         className={`shrink-0 inline-flex items-center gap-2 h-9 px-4 rounded-full text-[12.5px] font-semibold transition-all ${isActive
//                                 ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
//                                 : 'bg-white border border-gray-100 text-gray-600 hover:border-orange-200 hover:text-orange-500'
//                             }`}
//                     >
//                         <FontAwesomeIcon icon={tab.icon} className="w-3 h-3" />
//                         <span className="whitespace-nowrap">{tab.label}</span>
//                     </Link>
//                 );
//             })}
//             <button
//                 onClick={handleLogout}
//                 className="shrink-0 inline-flex items-center gap-2 h-9 px-4 rounded-full text-[12.5px] font-semibold bg-white border border-gray-100 text-gray-600 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all"
//             >
//                 <FontAwesomeIcon icon={faRightFromBracket} className="w-3 h-3" />
//                 <span className="whitespace-nowrap">Logout</span>
//             </button>
//         </div>
//     );
// }