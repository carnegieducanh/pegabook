import React, { useEffect, useRef, useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase/firebase.config";
import userAvatar from "../assets/user avatar.jpg";

const ImageUpload = ({ onAvatarChange, memberAvatar }) => {
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
                    onAvatarChange(downloadURL);
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
        <div className="mb-16" onDrop={handleDrop} onDragOver={handleDragOver}>
            {" "}
            <div>
                <div className="relative mx-auto w-32 h-32">
                    {/* firebase storage rules:
                allow read;
                allow write: if
                request.resource.size < 2 * 1024 * 1024 &&
                request.resource.contentType.matches('image/.*') */}
                    <img
                        // src={`https://pega-book-server.onrender.com/${memberAvatar}`}
                        src={
                            formData.profilePicture ||
                            memberAvatar ||
                            userAvatar
                        }
                        alt=""
                        className="rounded-full object-cover border-4 border-[lightgray] w-full h-full"
                        onClick={() => fileRef.current.click()}
                    />

                    <p className="whitespace-nowrap">
                        Drag 'n' drop an image here, <br />
                        or click to select one
                    </p>

                    <p className="text-sm self-center">
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

export default ImageUpload;
