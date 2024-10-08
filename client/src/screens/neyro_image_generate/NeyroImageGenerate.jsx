import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const NeyroImageGenerate = () => {
  const [aiImageGeneratedName, setAiImageGeneratedName] = useState("");
  const location = useLocation();
  const { file } = location.state || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      return navigate("/camera");
    }
  }, [file]);

  async function uploadImage() {
    try {
      if (file.name) {
        const neyroFormData = new FormData();

        neyroFormData.append("image", file);
        neyroFormData.append("overwrite", "false");
        neyroFormData.append("subfolder", "facesImages");
        neyroFormData.append("type", "input");

        const data = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/aiUpload`,
          neyroFormData
        );

        if (data.error) {
          return console.log("Smething went wrong");
        }

        return data.data;
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  }

  async function generateImage(filename) {
    try {
      const uploadImageRes = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/uploadImage`,
        { filename: `${filename}` }
      );

      if (uploadImageRes.data.images) {
        setAiImageGeneratedName(
          uploadImageRes.data.images[118][0].image.filename
        );
      }
    } catch (err) {}
  }

  async function completeGenerateFunctions() {
    const imageData = await uploadImage();
    await generateImage(imageData.name);
  }

  useEffect(() => {
    if (file.name) {
      completeGenerateFunctions();
    }
  }, [file]);

  console.log(aiImageGeneratedName);

  return (
    <section className={style.neyro_image_generate}>
      <div className="container">
        <div className={`wrapper ${style.neyro_image_generate__wrapper}`}>
          {/* {aiImageGeneratedName ? (
            <div className={style.neyro_image_generate__processing}>
              <p></p>
            </div>
          ) : (
            <div></div>
          )} */}

          <div className={style.neyro_image_generate__processing}>
            <div className={style.neyro_image_generate__banner}></div>
            <p>Waiting.....</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeyroImageGenerate;
