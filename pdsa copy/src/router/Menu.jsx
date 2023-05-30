import { Link } from "react-router-dom";
const Menu = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 flex-col">
        <div className="flex bg-blue-gray-50 m-6">PDSA Assignment</div>
        <ul className="space-y-4">
          <li className="">
            <Link to="/option/eight-queens" className="text-gray-800 hover:text-gray-50">Eight Queens Puzzle</Link>
          </li>
          <li>
            <Link to="/option/huffman_enc" className="text-gray-800 hover:text-gray-600">Huffman Encode/Decoder</Link>
          </li>
          <li>
            <Link to="/option/tic-tac-toe" className="text-gray-800 hover:text-gray-600 ">Tic-Tac-Toe</Link>
          </li>
          <li>
            <Link to="/option/spf" className="text-gray-800 hover:text-gray-600">Shotest Distance and Path</Link>
          </li>
          <li>
            <Link to="/option/mst" className="text-gray-800 hover:text-gray-600">Identifying Minimum Connectors</Link>
          </li>
        </ul>
      </div>
    );
};

export default Menu;
