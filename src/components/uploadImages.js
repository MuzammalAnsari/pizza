"use client";
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

const UploadImages = () => {
  const [publicId, setPublicId] = useState('');

  return (
    <>
      <CldUploadWidget
        uploadPreset='dfawvgek6'
        onSuccess={(info, event) => {
          if (event === 'success') {
            setPublicId(info?.public_id);
          }
        }}
      >
        {({ open }) => {
          return (
            <button
              onClick={open}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Upload Image
            </button>
          );
        }}
      </CldUploadWidget>
      {publicId && (
        <CldImage publicId={publicId} alt={publicId} width="300" height="180" />
      )}
    </>
  );
};

export default UploadImages;
