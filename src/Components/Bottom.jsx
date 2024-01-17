import React, { useState, useEffect ,useRef} from 'react';
import { Stack, Button, Icon, Text, Tooltip } from '@chakra-ui/react';
import { FaImage, FaFilePdf } from 'react-icons/fa';
import axios from 'axios';

const Bottom = () => {
  
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [del,setdel]=useState(0);
  const [uploadProgress,setUploadProgress]=useState(0);

  const handleFileChange = async (event) => {
    
    setFile(event.target.files[0]);

  };

  const handleDel = async () => {
    if (del === 1) {
      try {
        await axios.delete(`http://localhost:3000/api/deletefile/${file.name}`);
        console.log('File deleted successfully!');
        setFile(null); // Clear the file reference after deletion
        setdel(0);     // Reset del state to 0 after deletion
      } catch (error) {
        console.error('File deletion failed:', error);
      }
    } else {
      console.log('nothing to delete');
    }
  };
  
  useEffect(() => {
    async function upload() {
      if (!file) {
        console.error('No file selected.');
        return;
      }
  
      const formData = new FormData();
      formData.append('myFile', file);
      console.log(formData);
  
      try {
        const response = await axios.post('http://localhost:3000/api/uploadfile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          console.log('File uploaded successfully!');
        } else {
          console.error('File upload failed.');
        }
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  
    if (del === 0 && file !== null) {
      upload();
    }
  
    console.log(file);
  }, [file, del]);
  


  return (
    <Stack direction="row" spacing={3} width="100%" marginTop="0.5rem" align="center">
      <Tooltip label="Upload Image" fontSize="md">
        <Button colorScheme="orange" variant="solid" onClick={handleDel}>
          <Icon as={FaImage} />
        </Button>
      </Tooltip>

      <Tooltip label="Upload PDF" fontSize="md">
         <Button colorScheme="blue" variant="solid" onClick={() => inputRef.current.click()}>
            <Icon as={FaFilePdf} />
         </Button>
      </Tooltip>

      {file && <Text marginLeft="2" color="white">{file.name}</Text>}
      <input type="file" onChange={handleFileChange}     accept="application/pdf" style={{display:'none'}} ref={inputRef}/>

    </Stack>
  );
};

export default Bottom;
