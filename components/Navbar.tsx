// import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
// import { Account } from '../components/connections/account'
// import { WalletOptions } from '../components/connections/walletOptions'
// import Modal from './connections/Modal'

// const Navbar = () => {
//     function ConnectWallet() {
//         const { isConnected } = useAccount()
//         if (isConnected) return <Account />
//         return (
//           <div className="flex gap-10">
//             <WalletOptions />
//           </div>
//         )
//       }
//       const { address } = useAccount()

//     return(
//         <div className='h-24 flex items-center'>
//             <ConnectWallet />
//             <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
//                 Toggle modal
//             </button>
//             <Modal />
//         </div>
//     )
// }


"use client";
import Link from "next/link";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import User1Img from "@/public/img/user-1.jpg"

const Navbar = () => {
  const navigation = [
    "Documentation",
    "Features",
    "Pricing",
    "Company",
  ];

  const { address } = useAccount()

  const router = useRouter()
  
//   const [dashboardHref, setDashboardHref] = useState('login')

//   useEffect(() => {
//     if(!address) {
//         setDashboardHref('login')
//     } else {
//         setDashboardHref('dashboard')
//     }
//   }, [address])
 
  return (
    <div className="w-full h-24 bg-gray-800 z-50 fixed top-0 left-0">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-3xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/trackUIcon.png"
                        alt="N"
                        width="100"
                        height="100"
                        className="w-8"
                      />
                    </span>
                    <span>TrackU</span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link key={index} href="/" className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none">
                          {item}
                      </Link>
                    ))}
                    <Link href="/dashboard" className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5">         
                        Dashboard
                    </Link>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link href={`/${menu}`} className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800">
                    {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {
            router.pathname === '/dashboard' ? (
                <div className="mr-3 space-x-4 lg:flex nav__item flex items-center justify-center text-gray-200 bg-gray-500 py-2 px-4 rounded-md gap-5 font-semibold"> 
                    <Image src={User1Img} className="h-8 w-8 rounded-full" alt="User Image" /> {address?.slice(0, 7) + "..."}
                </div>
            ) : (
                <div className="hidden mr-3 space-x-4 lg:flex nav__item">
                    <Link href={address ? '/dashboard' : '/login'} className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
                        Dashboard
                    </Link>
                </div>
            )
        }
       
      </nav>
    </div>
  );
}

export default Navbar;