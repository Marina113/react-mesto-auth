import React from "react";
import logo from "../images/logo.svg";
import { Link, Routes, Route } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <a href="#" className="header__logo-link">
                <img src={logo} alt="Место Россия" className="header__logo" />
            </a>
            <Routes>
                <Route path="/signin">
                    <Link className="header__title" to="/signup">
                        Регистрация
                    </Link>
                </Route>
                <Route path="/signup">
                    <Link className="header__title" to="/signin">
                        Войти
                    </Link>
                </Route>
                <Route path="/cards">
                    <Link className="header__title" to="/signin">
                        Выйти
                    </Link>
                </Route>
            </Routes>
        </header>
    );
}

export default Header;
