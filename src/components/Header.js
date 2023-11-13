import React from "react";
import logo from "../images/logo.svg";
import { Link, useLocation} from "react-router-dom";

function Header({ email, signOut }) {
    const location = useLocation();

    return (
        <header className="header">
            <a href="#" className="header__logo-link">
                <img src={logo} alt="Место Россия" className="header__logo" />
            </a>
            {location.pathname === "/signin" && (
                <div>
                    <Link className="header__title" to="/signup">
                        Регистрация
                    </Link>
                </div>
            )}
            {location.pathname === "/signup" && (
                <div>
                    <Link className="header__title" to="/signin">
                        Войти
                    </Link>
                </div>
            )}
            {location.pathname === "/" && (
                <div className="header__info">
                    <p className="header__email">{email}</p>
                    <Link
                        className="header__title"
                        to="/signin"
                        onClick={signOut}
                    >
                        Выйти
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;