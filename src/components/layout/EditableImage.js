"use client";
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Script from 'next/script';

export default function EditableImage({ link, setLink }) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = (result) => {
        if (result.info?.secure_url) {
            setLink(result.info.secure_url);
            toast.success('Upload complete');
        } else {
            toast.error('Upload failed');
        }
        setUploading(false);
    };

    return (
        <>
        <Script
                src="https://upload-widget.cloudinary.com/global/all.js"
                strategy="lazyOnload"
                onLoad={() => console.log('Cloudinary script loaded')}
        />

            {link ? (
                <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
            ) : (
                <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                    No image
                </div>
            )}
            <label>
                <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                        setUploading(true);
                        const widget = window.cloudinary.createUploadWidget(
                            {
                                cloudName: 'dfawvgek6',
                                uploadPreset: 'dfawvgek6',
                                folder: 'ecommerce', // Optional
                                sources: ['local'], // Only allow file upload from local files
                            },
                            (error, result) => {
                                if (result.event === 'success') {
                                    handleUpload(result);
                                }
                            }
                        );
                        widget.open();
                    }}
                />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                    {uploading ? 'Uploading...' : 'Change image'}
                </span>
            </label>
        </>
    );
}
