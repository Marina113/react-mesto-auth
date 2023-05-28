import { useState, useEffect } from "react";
import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";
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
    const [selectedCard, setSelectedCard] = useState({}); //открытие попапа просмотра
    const [currentUser, setCurrentUser] = useState("");
    const [cards, setCards] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const [isInfoTooltip, setInfoTooltip] = useState({
        isOpen: false,
        success: false,
    });
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    useEffect(() => {
        if(isLoggedIn){
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if(isLoggedIn){
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        handleTokenCheck();
    }, []);

    const handleTokenCheck = () => {
        const token = localStorage.getItem("token");
        if (token) {
            auth.getContent(token)
                .then((data) => {
                    if (data) {
                        setIsLoggedIn(true);
                        setUserData(data);
                        setEmail(data.data.email);
                        navigate(location.pathname);
                    } else {
                        setIsLoggedIn(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    function handleLogin(email, password) {
        auth.login(email, password)
            .then((data) => {
                localStorage.setItem("token", data.token);
                setIsLoggedIn(true);
                setEmail(email);
                setUserData(data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                handleInfoTooltip(false);
            });
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then(() => {
                handleInfoTooltip(true);
                navigate("/signin");
            })
            .catch((err) => {
                console.log(err);
                handleInfoTooltip(false);
            });
    }

    function signOut(){
        localStorage.removeItem("token");
        setEmail("");
        setIsLoggedIn(false);
        navigate('/signin');
    }

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
        setInfoTooltip({ ...isInfoTooltip, isOpen: true, success: result });
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
        setInfoTooltip({ isOpen: false, success: false });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="body">
                    <div className="page">
                        <Header email={email}
                        signOut={signOut} />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRouteElement
                                        element={Main}
                                        isLoggedIn={isLoggedIn}
                                        userData={userData}
                                        onEditAvatar={handleEditAvatarClick}
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onCardClick={handleCardClick}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleCardDelete}
                                        cards={cards}
                                    />
                                }
                            />
                            <Route
                                path="*"
                                element={
                                    isLoggedIn ? (
                                        <Navigate to="/" replace />
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
                        </Routes>
                        <Footer />
                        <InfoTooltip
                            onClose={closeAllPopups}
                            result={isInfoTooltip}
                        />
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
