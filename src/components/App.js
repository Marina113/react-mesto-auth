import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState([]); //открытие попапа просмотра
    const [currentUser, setCurrentUser] = useState("");
    const [cards, setCards] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isInfoTooltip, setInfoTooltip] = useState({
        isOpen: false,
        successful: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        handleTokenCheck();
      }, [])
    
      const handleTokenCheck = () => {
        if (localStorage.getItem('jwt')){
        const jwt = localStorage.getItem('jwt')
        auth.checkToken(jwt).then((res) => {
            if (res){
                setIsLoggedIn(true);
              navigate("/main", {replace: true})
            }
          });
      }
      }

    const handleLogin = (email, password) => {
        auth.login(email, password).then((data) => {
            localStorage.setItem("jwt",data.jwt);
            setIsLoggedIn(true);
            setUserData(data.user);
            navigate("/main");
        });
    };

    const handleRegister = (email, password) => {
        return auth.register(email, password).then(() => {
            navigate("/signin");
        });
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleInfoTooltip(result) {
        setInfoTooltip({ ...isInfoTooltip, isOpen: true, successful: result });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.toggleLikes(card._id, isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((newCards) =>
                    newCards.filter((item) => item._id !== card._id)
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(avatar) {
        api.changeAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(data) {
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        // setIsDeleteCardPopupOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="body">
                    <div className="page">
                        <Header />
                        <Routes>
                            <Route
                                path="/main"
                                element={
                                    <ProtectedRouteElement
                                        element={Main}
                                        isLoggedIn={isLoggedIn}
                                        userData={userData}
                                    />
                                }
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                            />
                            <Route
                                path="/"
                                element={
                                    isLoggedIn ? (
                                        <Navigate to="/main" replace />
                                    ) : (
                                        <Navigate to="/signin" replace />
                                    )
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    <Register handleRegister={handleRegister} />
                                }
                            />
                            <Route
                                path="/signin"
                                element={<Login handleLogin={handleLogin} />}
                            />
                            <Route path="*" element={<h2>Not found</h2>} />
                        </Routes>
                        <Footer />
                        <InfoTooltip onClose={closeAllPopups} />
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                        />
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlaceSubmit}
                        />
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}
                        />
                        <ImagePopup
                            card={selectedCard}
                            onClose={closeAllPopups}
                        />
                    </div>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
