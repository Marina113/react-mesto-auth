import { useState} from "react";

function Login({handleLogin}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function handleChangeEmail(evt) {
      setEmail(evt.target.value);
    }
  
    function handleChangePassword(evt) {
      setPassword(evt.target.value); 
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(email, password);
}

    return (
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input
                    id="login-input"
                    type="email"
                    className="login__input"
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
                    className="login__input"
                    placeholder="Пароль"
                    value={password}
                    onChange={handleChangePassword}
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
