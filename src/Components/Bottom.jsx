import React, { useState, useEffect, useRef } from "react";
import { Stack, Button, Icon, Text, Tooltip } from "@chakra-ui/react";
import { FaImage, FaFilePdf } from "react-icons/fa";
import axios from "axios";

const Bottom = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploadInProgress, setUploadInProgress] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || uploadInProgress) {
      console.error("No file selected or upload in progress.");
      return;
    }

    setUploadInProgress(true);
    console.log(file);
    const formData = new FormData();
    formData.append("myFile", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/uploadfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log("Upload Progress: " + progress + "%");
          },
        }
      );

      if (response.status === 200) {
        console.log("File uploaded successfully!");
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setUploadInProgress(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/deletefile/${file.name}`);
      console.log("File deleted successfully!");
      setFile(null); // Clear the file reference after successful deletion
      inputRef.current.value = "";
    } catch (error) {
      console.error("File deletion failed:", error);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={3}
      width="100%"
      marginTop="0.5rem"
      align="center"
    >
      <Tooltip label="Upload Image" fontSize="md">
        <Button
          colorScheme="orange"
          variant="solid"
          onClick={handleUpload}
          disabled={uploadInProgress}
        >
          <Icon as={FaImage} />
        </Button>
      </Tooltip>

      <Tooltip label="Upload PDF" fontSize="md">
        <Button
          colorScheme="blue"
          variant="solid"
          onClick={() => inputRef.current.click()}
          disabled={uploadInProgress}
        >
          <Icon as={FaFilePdf} />
        </Button>
      </Tooltip>

      {file && (
        <>
          <Text marginLeft="2" color="white">
            {file.name}
          </Text>
          <Tooltip label="Delete File" fontSize="md">
            <Button
              colorScheme="red"
              variant="solid"
              onClick={handleDelete}
              disabled={uploadInProgress}
            >
              Delete
            </Button>
          </Tooltip>
        </>
      )}
      <input
        type="file"
        onChange={handleFileChange}
        accept="application/pdf"
        style={{ display: "none" }}
        ref={inputRef}
        disabled={uploadInProgress}
      />
    </Stack>
  );
};

export default Bottom;
