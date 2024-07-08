"use client";
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useState, useEffect } from 'react';

const UploadImages = () => {
  const [publicId, setPublicId] = useState('');

  useEffect(() => {
    console.log('publicId state:', publicId); // Log whenever publicId state updates
  }, [publicId]);

  return (
    <>
      {publicId && (
        <>
          <p>publicId: {publicId}</p> {/* Display publicId for debugging */}
          <CldImage src={publicId} publicId={publicId} alt="Uploaded Image" width="300" height="180" />
        </>
      )}
      
      <CldUploadWidget
        uploadPreset="dfawvgek6"
        onSuccess={(result) => {
          console.log('result', result); // Log the full result object
          const publicId = result.info?.public_id;
          console.log('Extracted publicId:', publicId); // Log the extracted publicId
          setPublicId(publicId); // Set the publicId state
        }}
      >
        {({ open }) => (
          <button
            onClick={open}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadImages;
