import { Link } from "react-router-dom";

const Header = () => {

    return (
        <header className="header">
            <nav>
                <div>   
                <ul className="navbar">
                    <li className="navbar-element">
                        <Link to="about">About</Link>
                    </li>
                    <li className="navbar-element">
                        <Link to="">Jokes</Link>
                    </li>
                    <li className="navbar-element">
                        <Link to="favourites">Favourites</Link>
                    </li>                  
                </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
