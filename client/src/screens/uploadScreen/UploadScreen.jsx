import axios from "axios";
import React, { useState } from "react";

const UploadScreen = () => {
  const [image, setImage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    try {
      if (!image) return;

      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "screenshot.jpeg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/upload`,
          formData
        );

        if (res.data.message === "Успешно") {
          alert("Изображение успешно загружено!");
          setIsSaved(true);
        } else {
          throw new Error("Ошибка при загрузке изображения");
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {}
  };

  return (
    <div>
      <input
        id="create-post-img"
        type="file"
        hidden
        onChange={handleChangeFile}
        accept=".jpg, .png, .jpeg"
      />
      <label htmlFor="create-post-img">Загрузить</label>

      {image && (
        <div>
          <img src={image} />
          <button>Загрузить</button>
        </div>
      )}
    </div>
  );
};

export default UploadScreen;