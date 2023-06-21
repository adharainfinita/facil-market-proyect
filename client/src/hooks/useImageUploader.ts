import { useState, ChangeEvent } from "react";
import axios from "axios";

const useImageUploader = (upload_preset: string) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const uploadImg = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("file", files[i]);
      }
      data.append("upload_preset", `${upload_preset}`);
      setLoading(true);
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/facilmarket/image/upload",
          data
        );

        if (res.data && Array.isArray(res.data)) {
          setImages((prevImages) => [
            ...prevImages,
            ...res.data.map((image: { secure_url: string }) => image.secure_url),
          ]);
        } else {
          console.error("La respuesta del servidor no contiene un arreglo de imágenes");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al subir la imagen", error);
        setLoading(false);
      }
    }
  };

  return { images, loading, uploadImg };
};

export default useImageUploader;