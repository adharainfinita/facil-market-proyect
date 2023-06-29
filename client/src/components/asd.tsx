import React from 'react'

const asd = () => {
  const [images, setImages] = useState<string[]>([]);
const uploadImages = async (files: File[]): Promise<void> => {
        setLoading(true);

        try {
            const uploadPromises = files.map(async (file: File) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("tags", "codeinfuse, medium, gist");
                formData.append("upload_preset", "facilmarket");
                formData.append("api_key", "711728988333761");

                const res = await axios.post(
                    "https://api.cloudinary.com/v1_1/facilmarket/image/upload",
                    formData,
                    {
                        headers: { "X-Requested-With": "XMLHttpRequest" },
                    }
                );

                return res.data.secure_url;
            });

            const uploadedImages = await Promise.all(uploadPromises);
            setImages((prevImages) => [...prevImages, ...uploadedImages]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const imagePreview = () => {
        if (loading === true) {
            return <h3>Cargando Imagenes...</h3>;
        }
        if (loading === false) {
            return (
                <div>
                    {images.length <= 0 ? (
                        <p>No hay imágenes</p>
                    ) : (
                        images.map((item, index) => (
                            <img
                                key={index}
                                alt="image preview"
                                width={60}
                                height={60}
                                src={item}
                            />
                        ))
                    )}
                </div>
            );
        }
    };
  return (
    <div>asd</div>
  )
}

export default asd