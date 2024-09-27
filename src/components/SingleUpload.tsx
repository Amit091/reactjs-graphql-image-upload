import { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiPlus, FiUpload, FiTrash2 } from 'react-icons/fi';

import ActionButton from './ActionButton';
import { useUploadFileMutation } from '../graphql/generated/graphql';

export const SingleUpload: FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [uploadImage, { data }] = useUploadFileMutation();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);

      setSelectedImage(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleUpload = async () => {
    try {
      await uploadImage({
        variables: {
          payload: selectedImage,
        },
      });
      handleClearImage();
    } catch (error) {
      console.error(`SOmething wentr wrong with iamges uploads`, error);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div className="mt-4">
      <div
        className={`flex justify-center max-h-[40vh] mb-2 overflow-y-auto ${
          imagePreviewUrl
            ? 'border-2 border-dashed rounded-lg border-gray-400'
            : ''
        }`}
      >
        {imagePreviewUrl ? (
          <div className="relative m-2">
            <img
              src={imagePreviewUrl}
              alt="Selected"
              className="w-32 h-48 object-cover rounded-md shadow-lg"
            />
            <button
              onClick={handleClearImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            No image selected
          </div>
        )}
      </div>

      <div
        {...getRootProps()}
        className={`w-[100%] h-24 border-2 border-dashed rounded-md flex items-center justify-center mb-4 ${
          isDragActive ? 'border-blue-500' : 'border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the image here ...</p>
        ) : (
          <p className="text-gray-500">
            Drag & drop an image here, or click to select one
          </p>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            onDrop(Array.from(e.target.files));
          }
        }}
        onError={(e) => {
          console.log(`e`, e);
        }}
        className="hidden"
        multiple={false}
      />

      <div className="flex max-sm:flex-col md:flex-row justify-around items-center flex-wrap gap-2">
        <ActionButton
          onClick={() => document.getElementById('file-input')?.click()}
          className="bg-green-600 hover:bg-green-800"
        >
          <FiPlus />
          Add Image
        </ActionButton>

        <ActionButton
          onClick={handleUpload}
          className={`${
            !selectedImage
              ? 'bg-blue-800 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={!selectedImage}
          icon={FiUpload}
        >
          {!selectedImage ? 'Upload Image' : `Upload ${selectedImage.name}`}
        </ActionButton>

        {selectedImage && (
          <ActionButton
            onClick={handleClearImage}
            className="bg-red-500 hover:bg-red-600"
          >
            <FiTrash2 />
            Clear Selection
          </ActionButton>
        )}
      </div>
      <div className="uploaded-image">
        <h4 className="text-center mt-4">Uploaded Image</h4>
        <div
          className={`flex flex-wrap justify-center max-h-[40vh] mt-2 overflow-y-auto ${data?.uploadFile ? `border-2 border-dashed rounded-lg border-gray-400` : ``}`}
        >
          {data?.uploadFile ? (
            <div key={data?.uploadFile} className="relative m-2">
              {data?.uploadFile && (
                <img
                  src={data?.uploadFile}
                  alt={`Selected ${data?.uploadFile}`}
                  className="w-32 h-48 object-cover rounded-md shadow-lg"
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
