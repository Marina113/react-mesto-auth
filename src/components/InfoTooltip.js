import successImage from "../images/success.jpg";
import failImage from "../images/fail.jpg";

function InfoTooltip({ isOpen, onClose, success }) {
    return (
        <div
            className={`popup popup_type_info ${isOpen ? "popup_opened" : ""}`}
            onClick={onClose}
        >
            <div className="popup__content">
                <button
                    type="reset"
                    className="popup__close"
                    onClick={onClose}
                ></button>
                <img
                    src={success ? successImage : failImage}
                    alt={
                        success ? "Регистрация успешна!" : "Ошибка регистрации"
                    }
                    className="popup__icon"
                />
                <h3 className="popup__message">
                    {success
                        ? "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так! Попробуйте ещё раз."}
                </h3>
            </div>
        </div>
    );
}

export default InfoTooltip;
