import { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiPlus, FiUpload, FiTrash2 } from 'react-icons/fi';
import ActionButton from './ActionButton';
import { useUploadFilesMutation } from '../graphql/generated/graphql';

export const MultipleUpload: FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const [uploadImages, { data }] = useUploadFilesMutation();

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.filter(
      (file) => !selectedImages.some((selected) => selected.name === file.name)
    );
    const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));

    setSelectedImages((prev) => [...prev, ...newFiles]);
    setImagePreviewUrls((prev) => [...prev, ...newImageUrls]);
  };

  const handleUpload = async () => {
    try {
      await uploadImages({
        variables: {
          payload: selectedImages,
        },
      });
      handleClearImages();
    } catch (error) {
      console.error(`SOmething wentr wrong with iamges uploads`, error);
    }
  };

  const handleClearImages = () => {
    setSelectedImages([]);
    setImagePreviewUrls([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div className="mt-4">
      {/* Image Previews */}
      <div
        className={`flex flex-wrap justify-center max-h-[40vh] mb-2 overflow-y-auto ${imagePreviewUrls.length ? `border-2 border-dashed rounded-lg border-gray-400` : ``}`}
      >
        {imagePreviewUrls.length > 0 ? (
          imagePreviewUrls.map((url, index) => (
            <div key={index} className="relative m-2">
              <img
                src={url}
                alt={`Selected ${index}`}
                className="w-32 h-48 object-cover rounded-md shadow-lg"
              />
              <button
                onClick={() => {
                  const updatedImages = selectedImages.filter(
                    (_, i) => i !== index
                  );
                  const updatedUrls = imagePreviewUrls.filter(
                    (_, i) => i !== index
                  );
                  setSelectedImages(updatedImages);
                  setImagePreviewUrls(updatedUrls);
                }}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            No images selected
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
          <p className="text-blue-500">Drop the images here ...</p>
        ) : (
          <p className="text-gray-500">
            Drag & drop images here, or click to select them
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
        className="hidden"
        multiple
      />

      <div className="flex max-sm:flex-col md:flex-row justify-around items-center flex-wrap gap-2">
        <ActionButton
          onClick={() => document.getElementById('file-input')?.click()}
          className="bg-green-600 hover:bg-green-800"
        >
          <FiPlus />
          Add More Images
        </ActionButton>

        <ActionButton
          onClick={handleUpload}
          className={`${
            selectedImages.length === 0
              ? 'bg-blue-800 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={selectedImages.length === 0}
          icon={FiUpload}
        >
          {selectedImages.length === 0
            ? 'Upload Image(s)'
            : `Upload ${selectedImages.length} Image(s)`}
        </ActionButton>

        {selectedImages.length > 0 && (
          <ActionButton
            onClick={handleClearImages}
            className="bg-red-500 hover:bg-red-600"
          >
            <FiTrash2 />
            Clear Selection
          </ActionButton>
        )}
      </div>

      <div className="uploaded-images">
        <h4 className="text-center mt-4">Uploaded Images</h4>
        <div
          className={`flex flex-wrap justify-center max-h-[40vh] mt-2 overflow-y-auto ${data?.uploadFiles?.length ? `border-2 border-dashed rounded-lg border-gray-400` : ``}`}
        >
          {data?.uploadFiles && data?.uploadFiles?.length > 0
            ? data?.uploadFiles?.map((url, index) => (
                <div key={index} className="relative m-2">
                  {url && (
                    <img
                      src={url}
                      alt={`Selected ${url}`}
                      className="w-32 h-48 object-cover rounded-md shadow-lg"
                    />
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
