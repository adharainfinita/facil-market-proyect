import { useState, ChangeEvent } from "react";
import axios from "axios";

const useImageUploader = (upload_preset: string) => {
  const [image, setImage] = useState<string>("");

  const uploadImg = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", `${upload_preset}`);
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/facilmarket/image/upload",
          data
        );
        setImage(res.data.secure_url);
      } catch (error) {
        console.error("Error al subir la imagen", error);
      }
    }
  };

  return { image, uploadImg };
};

export default useImageUploader;