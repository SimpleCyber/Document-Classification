import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Upload, FileUp, X, FileText, Loader2 } from "lucide-react";

interface Upload {
  id: string;
  filename: string;
  uploadDate: string;
  status: "matched" | "unmatched" | "pending";
  type?: string;
  confidence?: number;
  description?: string;
}

interface FileUploadAreaProps {
  label: string;
  file: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
}

const FileUploadArea = ({ label, file, onFileSelect, onFileRemove }: FileUploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) onFileSelect(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-white">{label}</h3>
      <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])} className="hidden" />
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-xl p-12 cursor-pointer ${isDragging ? "border-blue-500 bg-navy-700" : "border-gray-600"} transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center text-center">
            <Upload className="text-gray-400 mb-2" size={24} />
            <p className="text-gray-400 text-sm">Drag and drop or click to select</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-navy-700 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <FileText size={16} className="text-gray-400" />
            <span className="text-sm text-white">{file.name}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onFileRemove(); }} className="p-1 hover:bg-navy-600 rounded-full transition-colors">
            <X size={16} className="text-gray-400 hover:text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

interface APIResponse {
  class: string;
  confidence: number;
  description: {
    response?: string;
    error?: string;
  };
}

export const QuickUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (result && file) {
      const newUpload: Upload = {
        id: Date.now().toString(),
        filename: file.name,
        uploadDate: new Date().toLocaleString(),
        status: result.class === "matched" ? "matched" : "unmatched",
        type: result.class,
        confidence: result.confidence * 100,
        description: result.description.response || result.description.error || "No description available",
      };
      const previousUploads = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
      localStorage.setItem("uploadHistory", JSON.stringify([newUpload, ...previousUploads]));
    }
  }, [result]);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-navy-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Quick Upload</h2>
      <FileUploadArea label="Upload Image" file={file} onFileSelect={setFile} onFileRemove={() => setFile(null)} />

      <button
        onClick={handleUpload}
        className={`w-full mt-6 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 ${file ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-600 cursor-not-allowed"} transition-colors`}
        disabled={!file || loading}
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : <FileUp size={20} />}
        <span>{loading ? "Processing..." : "Get Prediction"}</span>
      </button>

      {result && !loading && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg text-white">
          <p><strong>Type:</strong> {result.class}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
          <p><strong>Description:</strong> {result.description.response || result.description.error || "No description available"}</p>
        </div>
      )}
    </div>
  );
};