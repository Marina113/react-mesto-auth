import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({    
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    cards,
    onClose,
    onCardClick,
    onCardLike,
    onCardDelete
}) {    

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__two-info">
                    <div className="profile__ava-box">
                        <button
                            type="button"
                            className="profile__ava-button"
                            title="Изменить аватар"
                            onClick={onEditAvatar}
                        ></button>
                        <img
                            className="profile__ava"
                            src={currentUser.avatar}
                            alt="аватар"
                        />
                    </div>
                    <div className="profile__information">
                        <div className="profile__info">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button
                                type="button"
                                className="profile__open-popup"
                                onClick={onEditProfile}
                            ></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                ></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        data={card}
                        onClose={onClose}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;
