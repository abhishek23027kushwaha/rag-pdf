'use client';
import * as React from 'react';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';

const FileUploadComponent: React.FC = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState<string>('');
  const [fileName, setFileName] = React.useState<string>('');
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      setIsUploading(true);
      setUploadStatus('Uploading...');

      const formData = new FormData();
      formData.append('pdf', file);

      try {
        const response = await fetch('http://localhost:8000/upload/pdf', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          setUploadStatus('Uploaded Successfully!');
        } else {
          setUploadStatus('Upload failed.');
        }
      } catch (error) {
        setUploadStatus('Error uploading file.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className="bg-slate-900 text-white shadow-2xl flex flex-col justify-center items-center p-8 rounded-lg border-slate-700 border-2 w-full max-w-sm cursor-pointer hover:bg-slate-800 transition-all text-center" 
      onClick={handleButtonClick}
    >
      <input 
        type="file" 
        accept="application/pdf" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
      
      {isUploading ? (
         <div className="flex flex-col items-center">
           <Loader2 className="animate-spin mb-3" size={40} />
           <p className="text-sm text-slate-300">Uploading: {fileName}</p>
           <p className="font-semibold mt-1">{uploadStatus}</p>
         </div>
      ) : uploadStatus === 'Uploaded Successfully!' ? (
         <div className="flex flex-col items-center text-green-400">
           <CheckCircle className="mb-3" size={40} />
           <p className="font-semibold text-white truncate w-56">{fileName}</p>
           <p className="text-sm mt-1">Uploaded Successfully!</p>
           <p className="text-xs mt-3 text-slate-400">Click here to upload another PDF</p>
         </div>
      ) : (
         <div className="flex flex-col items-center">
           <Upload className="mb-3" size={40} />
           <h3 className="font-semibold text-lg">Upload PDF File</h3>
           <p className="text-xs text-slate-400 mt-2">Click to browse your files</p>
           {uploadStatus && uploadStatus !== 'Uploaded Successfully!' && (
             <p className="text-sm text-red-400 mt-3">{uploadStatus}</p>
           )}
         </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
