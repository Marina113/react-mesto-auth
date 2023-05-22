import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef} from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }
    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            textButton="Сохранить"
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    id="url-inputAva"
                    type="url"
                    className="popup__input-container popup__input-container_type_avatar"
                    name="avatar"
                    ref={avatarRef}
                    placeholder="Ссылка на картинку"
                    autoComplete="off"
                    required
                />
                <span className="url-inputAva-error popup__input-container-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
