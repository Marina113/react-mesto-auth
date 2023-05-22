import React, { useState } from "react";
import { Link} from "react-router-dom";

function Register() {
    const [formValue, setFormValue] = useState("");

    // const [errorMessage, setErrorMessage] = useState("");
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };
    
    const handleSubmit = (e) => {
        // const {email, password} = formValue
        e.preventDefault();
        // handleRegister(email, password);
        // .catch((e) => setErrorMessage(e));
    };

    return (
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <input
                    id="register-input"
                    type="email"
                    className="register__input"
                    value={formValue.email}
                    placeholder="Email"
                    onChange={handleChange}
                    minLength="2"
                    maxLength="40"
                    autoComplete="off"
                    required
                />
                <input
                    id="password-input"
                    type="password"
                    className="register__input"
                    placeholder="Пароль"
                    value={formValue.password}
                    onChange={handleChange}
                    minLength="2"
                    maxLength="12"
                    autoComplete="off"
                    required
                />
                <button type="submit" className="register__button">
                    Зарегистрироваться
                </button>
            </form>
            <div className="register__signin">
                <p>
                    Уже зарегистрированы?{" "}
                    <Link to="/signin" className="register__login-link">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
