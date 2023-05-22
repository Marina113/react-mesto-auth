import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({isOpen, onClose,onAddPlace}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name,link});
  }

    return (
      <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      textButton="Создать"
      onSubmit={handleSubmit}
  >
      <label className="popup__label">
          <input
              id="title-input"
              type="text"
              className="popup__input-container popup__input-container_type_name"
              placeholder="Название"
              name="title"
              value={name}
              onChange={handleChangeName}
              minLength="2"
              maxLength="30"
              autoComplete="off"
              required
          />
          <span className="title-input-error popup__input-container-error"></span>
      </label>
      <label className="popup__label">
          <input
              id="url-input"
              type="url"
              className="popup__input-container popup__input-container_type_info"
              placeholder="Ссылка на картинку"
              name="way"
              value={link}
              onChange={handleChangeLink}
              autoComplete="off"
              required
          />
          <span className="url-input-error popup__input-container-error"></span>
      </label>
  </PopupWithForm>
    );
}

export default AddPlacePopup;