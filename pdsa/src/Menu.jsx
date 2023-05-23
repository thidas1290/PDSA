import { Link } from "react-router-dom";
const Menu = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <ul className="space-y-4">
          <li>
            <Link to="/option" className="text-gray-100 hover:text-gray-50">Option 1</Link>
          </li>
          <li>
            <Link to="/option" className="text-gray-800 hover:text-gray-600">Option 2</Link>
          </li>
          <li>
            <Link to="/option" className="text-gray-800 hover:text-gray-600">Option 3</Link>
          </li>
          <li>
            <Link to="/option" className="text-gray-800 hover:text-gray-600">Option 4</Link>
          </li>
        </ul>
      </div>
    );
};

export default Menu;
