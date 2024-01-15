/* global chrome */
import React, { useState, useRef, useEffect } from "react";
import * as Tesseract from 'tesseract.js';


const Tessaract_OCR = () => {
  const [imageFile, setImageFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = handleImageLoad;
    }
  }, [imageRef]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setLoading(false); // Reset loading state for new image
      const reader = new FileReader();
      reader.onload = () => {
        imageRef.current.src = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      // Handle invalid file type
      console.error('Invalid file type. Please select an image.');
    }
  };

  const handleImageLoad = async () => {
    try {
      setLoading(true);

      const { data: { text } } = await Tesseract.recognize(imageRef.current, 'eng', {
        workerPath: chrome.runtime.getURL('./worker.min.js')
      });
      setExtractedText(text);
      console.log(text);
    } catch (error) {
      console.error('Error recognizing text:', error);
      // Display an error message to the user
    } finally {
      setLoading(false); // Reset loading state after OCR, whether successful or not
    }
  };

  return (
    <div>
      <button className="neonButton" onClick={handleImageLoad} disabled={!imageFile || loading}>
        Extract Text
      </button>
      <input type="file" height={100} width={100} onChange={handleImageChange} />
      <div>Extracted Text: {extractedText}</div>
      {loading && <div>Loading...</div>}
      <img ref={imageRef} alt="Preview" />
      <p style={{ color: '#fff' }}>{extractedText}</p>
    </div>
  );
};

export default Tessaract_OCR;
