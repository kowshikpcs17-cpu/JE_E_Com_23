import{Link} from "react-router-dom";
import {Menu, Search, ShoppingBag, ShoppingCart, User, X} from "lucide-react";
import { useState } from "react";
const Navbar = () => {
    const[open,setOpen] = useState(false);
    const isAuthenticated = false;

  return (
    <nav className="sticky top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-5 h-16 flex  items-center justify-between">
            {/*LOGO*/}
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <ShoppingBag />
            <span>My Store</span>
            </Link>
            {/*Desktop Links*/}
            <div className="hidden md:flex items-center gap-8">
                <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/">Home</Link>
                <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/product">Products</Link>
                <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/about-us">About Us</Link>
                <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/contact-us">Contact Us</Link>
            </div>
             {/*Right Section*/}
            <div className="flex items-center gap-5">
                <form className="hidden sm:flex items-center border border-slate-300 rounded overflow-hidden">
                    <input type="text" placeholder="Search Product" className="px-3 py-2 text-sm w-40 focus:outline-none"></input>
                    <button className="px-3 text-gray-500 hover:text-blue-600 transition">
                        <Search size={18} />
                    </button>
                </form>
                {/*cart*/}
                <Link to={"/cart"}className="relative text-gray-700 hover:text-blue-600 transition">
                <ShoppingCart/>
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white font-semibold min-w-4 h-5 flex items-center justify-center rounded-full">6</span>
                </Link>
                {/*Register*/}
                {!isAuthenticated && (<Link to="/register" className="hidden sm:flex gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:text-blue-700 transition">
                    <User size={18} /> 
                    Register
                </Link>)}

                {/*Hamburger*/}
                <button onClick={()=>setOpen(!open)} className="text-gray-700 md:hidden">
                    {open?<X />:<Menu />}
                </button>
            </div>
        </div>
    
    
    <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ?"max-h-96 opacity-100 translate-y-0":"max-h-0 opacity-0 translate-y-2" }`}>
        <div className="flex flex-col p-4 gap-4"> 
        <Link onClick={()=>setOpen(!open)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/">Home</Link>
        <Link onClick={()=>setOpen(!open)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/">Products</Link>
        <Link onClick={()=>setOpen(!open)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/about-us">About Us</Link>
        <Link onClick={()=>setOpen(!open)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/contact-us">Contact Us</Link>
        </div>
    </div>    
    </nav>
  )
}

export default Navbar;
