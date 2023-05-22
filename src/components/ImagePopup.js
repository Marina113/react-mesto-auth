import React from "react";

function ImagePopup({ card, onClose }) {
    return (
        <div
            className={`popup popup_type_watch ${
                Object.keys(card).length != 0 ? `popup_opened` : ``
            }`}
        >
            <div className="popup__img">
                <button
                    type="reset"
                    className="popup__close"
                    onClick={onClose}
                ></button>
                <img
                    src={card ? card.link : ""}
                    alt={card.name}
                    className="popup__picture"
                />
                <h2 className="popup__text">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;
