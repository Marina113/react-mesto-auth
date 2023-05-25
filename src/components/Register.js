import { useState } from "react";
import { Link} from "react-router-dom";

function Register({handleRegister}) {

    // const [errorMessage, setErrorMessage] = useState("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function handleChangeEmail(evt) {
      setEmail(evt.target.value);
    }
  
    function handleChangePassword(evt) {
      setPassword(evt.target.value); 
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(email, password);
    };

    return (
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <input
                    id="email-input"
                    type="email"
                    className="register__input"
                    value={email}
                    placeholder="Email"
                    onChange={handleChangeEmail}
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
                    value={password}
                    onChange={handleChangePassword}
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
