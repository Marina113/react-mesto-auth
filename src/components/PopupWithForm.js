import React from "react";

function PopupWithForm({ name, isOpen, onClose, title, children, textButton, onSubmit }) {
    return (
        <div
            className={`popup popup_type_${name} ${
                isOpen ? `popup_opened` : ""
            }`}
        >
            <div className="popup__content">
                <button
                    type="reset"
                    className="popup__close"
                    onClick={onClose}
                />
                <h2 className="popup__profil">{title}</h2>
                <form
                    className="popup__container popup__container_type_edit"
                    name={name}
                    onSubmit={onSubmit}
                >
                    {children}
                    <button type="submit" className="popup__save">
                        {textButton}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
