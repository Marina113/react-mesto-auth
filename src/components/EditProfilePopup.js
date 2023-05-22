import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({name:name,about:about});
  }

    return (
            <PopupWithForm
                name="edit"
                title="Редактировать профиль"
                isOpen={isOpen}
                onClose={onClose}
                textButton="Сохранить"
                onSubmit={handleSubmit}
            >
                <label className="popup__label">
                    <input
                        id="text-input"
                        type="text"
                        className="popup__input-container popup__input-container_type_name"
                        name="name"
                        placeholder="Имя"
                        value={name || ''}
                        onChange={handleChangeName}
                        minLength="2"
                        maxLength="40"
                        autoComplete="off"
                        required
                    />
                    <span className="text-input-error popup__input-container-error"></span>
                </label>
                <label className="popup__label">
                    <input
                        id="info-input"
                        type="text"
                        className="popup__input-container popup__input-container_type_info"
                        name="subtitle"
                        minLength="2"
                        maxLength="200"
                        placeholder="О себе"
                        value={about || ''}
                        onChange={handleChangeAbout}
                        autoComplete="off"
                        required
                       />
                    <span className="info-input-error popup__input-container-error"></span>
                </label>
            </PopupWithForm>
    );
}

export default EditProfilePopup;