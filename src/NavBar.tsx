import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-white h-[40px] fixed top-5 left-0 w-full z-50">
      <div className="ml-[70px]">
        <ul className="flex space-x-8 text-gray-800 font-medium">
          <li><Link to="" className="hover:text-orange-600 cursor-pointer font-bold">Task With</Link></li>
          <li><Link to="/" className="hover:text-orange-600 cursor-pointer">Icons Click</Link></li>
          <li><Link to="/vertical" className="hover:text-orange-600 cursor-pointer">Vertical Scroll</Link></li>
          <li><Link to="/horizontal" className="hover:text-orange-600 cursor-pointer">Horizontal Scroll</Link></li>
        </ul>
      </div>
    </nav>
  );
}
