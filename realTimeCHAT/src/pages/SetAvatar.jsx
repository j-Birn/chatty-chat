import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetAvatar = () => {
  const api = `https://avatars.dicebear.com/api/adventurer/`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const imgUrl = `${api}/${generateString(4)}.svg?b=%232e2e2e`;
      data.push(imgUrl);
    }
    setAvatars(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const setProfilePicture = () => {
    toast.error("Please select an avatar", toastOptions);
  };

  return (
    <div className="avatars-container">
      {isLoading ? (
        <div className="loader">
          <img
            src="https://avatars.dicebear.com/api/adventurer-neutral/ddfgggdfssf33434f.svg"
            alt="loader"
          />
          <p>Loading in progress...</p>
        </div>
      ) : (
        <>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                key={index}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button className="avatar-submit-btn" onClick={setProfilePicture}>
            Set as profile picture
          </button>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default SetAvatar;
