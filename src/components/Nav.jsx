import { Navbar, Button, Dropdown, Indicator, Badge } from "react-daisyui";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import localforage from "localforage";
import { logout } from "@/pages/api/users";
import { useQuery, useQueryClient } from "react-query";
import jwt_decode from "jwt-decode";
export default function Nav() {
  const [navbar, setNavbar] = useState(false);
  const [auth, setAuth] = useState();
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setLoading(false);
        setAuth(token);
      }
    };
    getToken();
  }, []);

  const decoded = auth ? jwt_decode(localStorage.getItem('token')) : null
  return (
<div>
      <nav className="w-full bg-accent">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link href="/">
              {navbar ? (
                    <Image src="/E-PETSTORE.png" width={80} height={80} alt="logo" className="focus:border-none active:border-none rounded-3xl object-contain h-20 w-20" />
                  ) : (
                    <Image
                      src="/E-PETSTORE.png"
                      width={80}
                      height={80}
                      alt="logo"
                      className="focus:border-none active:border-none rounded-3xl object-contain h-20 w-20"
                    />
                  )}
              </Link>
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
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                <li className="pb-6 text-xl text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="/orders" onClick={() => setNavbar(!navbar)}>
                    Orders
                  </Link>
                </li>
                <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="/cart" onClick={() => setNavbar(!navbar)}>
                   Cart
                  </Link>
                </li>
                {auth && decoded?.data?.isAdmin ? 
                <>
                <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="/products/create" onClick={() => setNavbar(!navbar)}>
                    Add Product
                  </Link>
                </li>
                <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="/dashboard" onClick={() => setNavbar(!navbar)}>
                    Dashboard
                  </Link>
                </li>
                </> : null
                }
                {auth ? (
                  <>
                    <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                    <Link href="/login"  onClick={() => {
                      logout();
                      setAuth(false);
                      push("/");
                    }}
                  >
                    Logout
                    </Link>
                  </li>
                  </>
              ) : (
                <>
                <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="/login" onClick={() => setNavbar(!navbar)}>
                   Login
                  </Link>
                </li>
                <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="/register" onClick={() => setNavbar(!navbar)}>
                    SignUp
                  </Link>
                </li>
                </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
