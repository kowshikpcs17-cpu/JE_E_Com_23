import { Github, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react"

const Footer = () => {
  return (
    <footer
     className="bg-gray-800 text-white mt-8 ">
        {/*Main Container*/}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-center md:text-left py-5">
            {/*Sectin 1: Contact*/}
            <div className="flex-1 min-w-62.5">
                <h3 className="text-xl font-semibold mb-4 text-white" >Contact Us</h3>
               <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-2"><Phone size={16} />Phone : 9790786555</p>
               <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-2"><Mail  size={16}/>Email : kaushik@gmail.com</p>
            </div>
            {/*Sectin 2: Social*/}
            <div className="flex-1 min-w-62.5 items-center gap-4">
                 <h3 className="text-xl font-semibold mb-4 text-white" >Fellow Me</h3>
                 <div className="flex gap-4 items-center justify-center md:justify-start">
                    <a href="#" target="_blank"><Instagram className="w-7 h-7 text-gray-500 transition-transform duration-300  hover:scale-110 hover:text-pink-500" /></a>
                    <a href="#" target="_blank"><Youtube className="w-7 h-7 text-gray-500 transition-transform duration-300  hover:scale-110 hover:text-red-500"/></a>
                    <a href="#" target="_blank"><Linkedin className="w-7 h-7 text-gray-500 transition-transform duration-300  hover:scale-110 hover:text-blue-600" /></a>
                 </div>
            </div>
            {/*Sectin 3: About-Us*/}
            <div className="flex-1 min-w-62.5">
                 <h3 className="text-xl font-semibold mb-4 text-white" >About</h3>
                 <p className="text-gray-400 leading-relaxed">Avirah Herbs 🌿  Pure, natural herbal products crafted to support healthy living the natural way.</p>

            </div>
            </div>
            {/*Footer Content*/}
            <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">© 2026 Kaushik. All rights reserved.</div>
     </footer>
  )
}

export default Footer