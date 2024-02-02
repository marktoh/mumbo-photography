import { Link } from "react-router-dom";

import "./Header.css";

function Header() {
  return (
    <header>
      <Link to="/">
        <div className="logo">
          <span>Mark</span>
        </div>
      </Link>
    </header>
  );
}

export default Header;
