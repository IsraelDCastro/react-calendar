import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

function GalleryForm({ selected, onChange, backendName, isMultiple }) {
  const [selectedImage, setSelectedImage] = useState(selected);
  const [images, setImages] = useState(selected ? [selected] : []);
  const handleImageChange = (event) => {
    let files = event.target.files;
    if (!isMultiple) files = [files[0]];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        setImages((prevState) => [...prevState, reader.result]);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setSelectedImage(selected);
  }, [selected]);

  return (
    <div className="w-full space-y-4">
      <label
        htmlFor="dropzone-file"
        className={
          selectedImage
            ? "text-primary-600 text-sm relative"
            : "relative flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        }
      >
        {selectedImage ? (
          <span>Cambiar imagen</span>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <h5 className="mb-4 font-semibold text-secondary-700">
              Seleccione una imagen
            </h5>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              o arrástrelo y suéltelo aquí
            </p>
            <span className="mt-2 font-semibold text-gray-500" />
          </div>
        )}
        <input
          onChange={(event) => {
            onChange({ name: backendName, value: event.target });
            handleImageChange(event);
          }}
          name={backendName}
          id="dropzone-file"
          accept="image/*"
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          multiple={isMultiple}
        />
      </label>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isMultiple &&
          images.length > 1 &&
          images.map((image, index) => (
            <div
              className="relative w-full h-20 rounded shadow-sm"
              key={index}
            >
              <img
                src={image}
                className="object-cover object-center w-full h-full rounded"
              />
              <Button variant="flat" size="sm" className="absolute p-1 text-lg rounded-full -right-4 -top-4" isIconOnly onClick={() => removeImage(index)}>
                <i className="fa-solid fa-xmark" />
              </Button>
            </div>
          ))}
      </div>

      {!isMultiple && images[0] && (
        <figure>
          <img src={images[0]} />
        </figure>
      )}
    </div>
  );
}

export default GalleryForm;
