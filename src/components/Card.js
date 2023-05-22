import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, onCardDelete, onCardLike, data }) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = data.owner._id === currentUser._id;

    const isLiked = data.likes.some((i) => i._id === currentUser._id);

    const cardLikeButtonClassName = `elements__like ${
        isLiked && "elements__like_active"
    }`;

    const cardDeleteButtonClassName = isOwn
        ? "elements__trash elements__trash_visible"
        : "elements__trash elements__trash_hidden";

    function handleClick() {
        onCardClick(data);
    }

    function handleLikeClick() {
        onCardLike(data);
    }

    function handleDeleteClick() {
        onCardDelete(data);
    }

    return (
        <div className="elements__item">
            <img
                src={data.link}
                alt={data.name}
                onClick={handleClick}
                className="elements__picture elements__picture_type_alt"
            />
            {isOwn && <button
                    className={cardDeleteButtonClassName}
                    onClick={handleDeleteClick}
                />
            }
            <div className="elements__block">
                <h2 className="elements__text">{data.name}</h2>
                <div className="elements__like-box">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    ></button>
                    <h2 className="elements__like-click">
                        {data.likes.length}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Card;
