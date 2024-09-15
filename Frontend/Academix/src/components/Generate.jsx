import React, { useState } from 'react';
import { Useronly } from './Useronly';
import upload from '../assets/Upload.png';
import { specialties } from './Data/samplecourses';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Generate = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [previewData, setPreviewData] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileId, setFileId] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false); // For the "Questions are being generated" popup
  const [uploadProgress, setUploadProgress] = useState(0); //progress bar during file upload
  const [isUploading, setIsUploading] = useState(false); // Display progress bar or not

  const navigate = useNavigate();

  // Handle Selected file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Dropdown handler
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handlePreview = () => {
    if (previewData) {
      setIsPreview(true);
    } else {
      alert('Please upload a file before previewing');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleDone = () => {
    setIsPreview(false);
  };

  const handleQuestionName = (e) => {
    setQuestionName(e.target.value);
  };

  const uploadurl = 'https://9148-13-60-211-71.ngrok-free.app/api/upload_pdf/';

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) return alert("No file selected!");

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(uploadurl, formData, {
        withCredentials: true,
        headers: {
          "Authorization": 'Token ' + localStorage.getItem('token'),
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress); // Update the progress bar
        },
      });

      setPreviewData(response.data.extracted_text);
      setFileName(response.data.file_name);
      setIsUploading(false); // Hide progress bar once uploaded successfully
    } catch (error) {
      console.error('An Error has occurred:', error);
      setIsUploading(false); // Hide progress bar if error
    }
  };

  const generateurl = 'https://9148-13-60-211-71.ngrok-free.app/api/generate/';

  const handleGenerate = async (event) => {
    if (previewData && selectedOption && questionName) {
      event.preventDefault();
      setIsGenerating(true); // Show the green popup when "Generate" is clicked

      try {
        const response = await axios.post(generateurl, {
          file_name: fileName,
          question_name: questionName,
          extracted_text: previewData,
          category: selectedOption.label,
        }, {
          withCredentials: true,
          headers: {
            "Authorization": 'Token ' + localStorage.getItem('token'),
          },
        });

        setFileId(response.data.file_id);
        setIsGenerating(false);
        navigate(`/user/questiondetails/${response.data.file_id}`); //Move to questions page after generating the questions successfully
      } catch (error) {
        console.error('An Error has occurred:', error);
        setIsGenerating(false); // Hide the popup on error
      }
    } else if (!previewData) {
      alert('Please Select a File and Upload');
    } else if (!selectedOption) {
      alert('Please pick your specialty');
    } else if (!questionName) {
      alert('Please name your Study');
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <div className='font-Inter text-[#313131]'>
      <Useronly />

      {/*The Small Green Popup when questions are being generated*/}
      {isGenerating && (
        <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md z-50">
          Questions are being generated...
        </div>
      )}

      {/* Conditional for Preview or UploadForm */}
      {!isPreview ? (
        <>
          <div className='text-3xl font-semibold w-11/12 mx-auto text-[#313131]'>
            <h2>Generate Question</h2>
          </div>

          <div className='w-10/12 ml-12 mt-4'>
            <div className="flex justify-center items-center">
              <div className="border border-[#313131] border-solid rounded-3xl py-12 w-full flex flex-col justify-center items-center">
                <img src={upload} alt="Upload" className="" />

                {/* Info about uploaded document */}
                {selectedFile ? (
                  <div>
                    <p className="text-4xl text-[#313131] font-light mt-4 max-w-[80%] mx-auto text-center">{selectedFile.name}</p>
                    <p className="text-4xl text-[#313131] font-light mb-4 mx-auto max-w-[80%] text-center">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>

                    {/* Progress bar */}
                    {isUploading && (
                      <div className="w-full h-4 bg-gray-200 rounded-full mt-4">
                        <div className="h-4 bg-[#0E2633] rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    )}

                    {/* Upload status */}
                    {!isUploading && uploadProgress === 100 && (
                      <p className="text-[#0E2633] mb-2 text-center">File uploaded successfully!</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-4xl text-[#313131] font-light text-opacity-50 mt-4 text-center">Upload files</p>
                    <p className="text-4xl text-[#313131] font-light text-opacity-50 mb-7">
                      (.pdf, .pptx)
                    </p>
                  </div>
                )}

                {/* Hidden input for file upload */}
                {selectedFile ? (
                  <div className='flex gap-6'>
                    <button className= {`cursor-pointer inline-block bg-[#0E2633] text-white py-4 px-10 rounded-lg text-sm font-medium`} onClick={handleUpload}>Upload</button>
                    <button className='cursor-pointer inline-block bg-red-500 text-white py-4 px-10 rounded-lg text-sm font-medium' onClick={removeFile}>Remove</button>
                  </div>
                ) : (
                  <label className="cursor-pointer inline-block bg-[#0E2633] text-white py-4 px-10 rounded-lg text-sm font-medium">
                    Browse
                    <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.pptx" />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className='w-10/12 ml-12 shadow-select mt-4 rounded-lg'>
            <input type="text" required className='w-full outline-none h-10 px-4 rounded-lg' placeholder='Name Your Study...' value={questionName} onChange={handleQuestionName}/>
          </div>

          {/* Specialty Dropdown */}
          <div className='w-10/12 ml-12 shadow-select mt-4'>
            <Select value={selectedOption} onChange={handleChange} options={specialties} placeholder="Select question specialty" isSearchable={true} />
          </div>

          <div className='flex justify-end gap-8 w-10/12 ml-12 mt-6'>
            <button className='border border-solid border-[#0E2633] py-2 px-5 text-[#0E2633] font-semibold rounded-lg' onClick={handlePreview}>
              Preview
            </button>
            <button className='py-2 px-5 bg-[#0E2633] text-white font-semibold rounded-lg' onClick={handleGenerate}>Generate</button>
          </div>
        </>
      ) : (
        // Preview mode
        <div className='w-10/12 ml-12 mt-8 p-6 bg-gray-100 shadow-lg rounded-lg '>
          {/* File Preview Header */}
          <div className='bg-[#0E2633] text-white p-3 rounded-t-lg text-xl font-semibold'>
            {fileName}
          </div>

          {/* File Preview Content */}
          <div className='p-4 bg-white rounded-b-lg max-h-[60vh] overflow-scroll'>
            <p className='text-gray-600 '>
              {previewData}
            </p>
          </div>

          {/* Done Button */}
          <div className='flex justify-end mt-4'>
            <button className='py-2 px-5 bg-[#0E2633] text-white font-semibold rounded-lg' onClick={handleDone}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
