import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({handleLogin}) {
    const [formValue, setFormValue] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    function handleSubmit(e) {
        const {email, password} = formValue;
        e.preventDefault();
        handleLogin(email, password);
    //     if (!formValue.email || !formValue.password){
    //         return;
    // }
}

    return (
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input
                    id="login-input"
                    type="email"
                    className="login__input"
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
                    className="login__input"
                    placeholder="Пароль"
                    value={formValue.password}
                    onChange={handleChange}
                    minLength="2"
                    maxLength="12"
                    autoComplete="off"
                    required
                />
            <button type="submit" className="login__button">
                Войти
            </button>
            </form>
        </section>
    );
}

export default Login;
