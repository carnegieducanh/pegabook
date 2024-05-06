import React, { useEffect, useRef, useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

import app from "../firebase/firebase.config";

import dropFile from "../assets/drag-drop-add-document-file.webp";

const BookUpload = ({ onBookImageChange, imageUrl }) => {
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);

    const [imageError, setImageError] = useState(false);
    const [formData, setFormDate] = useState({});

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("Upload is " + progress + "% done");
                setImagePercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormDate({ ...formData, profilePicture: downloadURL });
                    onBookImageChange(downloadURL);
                });
            }
        );
    };

    // Drag 'n' drop an image here, or click to select one
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setImage(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="mb-10" onDrop={handleDrop} onDragOver={handleDragOver}>
            {" "}
            <div>
                <div className="mx-auto">
                    {/* firebase storage rules:
    allow read;
    allow write: if
    request.resource.size < 2 * 1024 * 1024 &&
    request.resource.contentType.matches('image/.*') */}
                    <img
                        src={formData.profilePicture || imageUrl || dropFile}
                        alt=""
                        className="h-52 w-36 object-cover   focus:shadow-xl shrink-0 rounded-tr-lg rounded-br-lg mx-auto"
                        onClick={() => fileRef.current.click()}
                    />

                    <p className="text-center mt-2">
                        Drag 'n' drop an image here, or click to select one
                    </p>

                    <p className="text-center">
                        {imageError ? (
                            <span className="text-red-700">
                                Error uploading image (file size must be less
                                than 2 MB)
                            </span>
                        ) : imagePercent > 0 && imagePercent < 100 ? (
                            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                        ) : imagePercent === 100 ? (
                            <span className="text-green-700 text-md font-semibold whitespace-nowrap">
                                Image uploaded successfully
                            </span>
                        ) : (
                            ""
                        )}
                    </p>
                </div>
            </div>
            <div className="my-auto">
                <div className="flex justify-between w-full text-sm">
                    <input
                        type="file"
                        ref={fileRef}
                        hidden
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookUpload;
