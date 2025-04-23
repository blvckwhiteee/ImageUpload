import React, { useState } from 'react';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedPath, setUploadedPath] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const res = await fetch('http://localhost:8080/api/images/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const path = await res.text(); // например: "/uploads/image.jpg"
                setUploadedPath(`http://localhost:8080${path}`);
            } else {
                alert('Ошибка при загрузке');
            }
        } catch (err) {
            console.error(err);
            alert('Ошибка при загрузке');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4 text-center">Загрузка изображения</h1>

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4 w-full"
                />
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    Загрузить
                </button>

                {uploadedPath && (
                    <div className="mt-6 text-center">
                        <p className="mb-2">Картинка загружена:</p>
                        <img
                            src={uploadedPath}
                            alt="Загружено"
                            className="max-w-full h-auto rounded-lg border"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadImage;
