import { useState, useEffect } from "react";
import { CheckCircle, Clock, Eye, FileText, Calendar, File, PercentCircle, Trash2, X } from "lucide-react";

interface Upload {
  id: string;
  filename: string;
  uploadDate: string;
  status: "matched" | "unmatched" | "pending";
  type?: string;
  confidence?: number;
  imageUrl?: string;
}

const StatusIcon = ({ status }: { status: Upload["status"] }) => {
  switch (status) {
    case "pending":
      return <Clock className="text-yellow-500" size={20} />;
    case "matched":
      return <CheckCircle className="text-green-500" size={20} />;
    case "unmatched":
      return <CheckCircle className="text-green-500" size={20} />;
  }
};

export const RecentUploads = () => {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [selectedUpload, setSelectedUpload] = useState<Upload | null>(null);

  useEffect(() => {
    const storedUploads = localStorage.getItem("uploadHistory");
    if (storedUploads) {
      setUploads(JSON.parse(storedUploads));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedUploads = uploads.filter((upload) => upload.id !== id);
    setUploads(updatedUploads);
    localStorage.setItem("uploadHistory", JSON.stringify(updatedUploads));
    setSelectedUpload(null);
  };

  return (
    <div className="bg-navy-800 rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Recent Uploads</h2>
      {uploads.length === 0 ? (
        <p className="text-gray-400">No uploads found.</p>
      ) : (
        <div className="space-y-4">
          {uploads.map((upload) => (
            <div key={upload.id} className="flex items-center justify-between p-4 bg-navy-700 rounded-lg hover:bg-navy-600 transition-colors">
              <div className="flex items-center space-x-4">
                <FileText className="text-gray-400" size={20} />
                <div>
                  <p className="text-white font-medium">{upload.filename}</p>
                  <p className="text-gray-400 text-sm flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Calendar className="text-blue-400" size={16} />
                      <span>{upload.uploadDate}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <File className="text-yellow-400" size={16} />
                      <span> {upload.type || "N/A"}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <PercentCircle className="text-green-400" size={16} />
                      <span>{upload.confidence ? `${upload.confidence.toFixed(2)}%` : "N/A"}</span>
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <StatusIcon status={upload.status} />
                <button className="p-2 hover:bg-navy-500 rounded-full transition-colors" onClick={() => setSelectedUpload(upload)}>
                  <Eye className="text-gray-400 hover:text-white" size={20} />
                </button>
                <button className="p-2 hover:bg-red-600 rounded-full transition-colors" onClick={() => handleDelete(upload.id)}>
                  <Trash2 className="text-red-500 hover:text-white" size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Popup */}
      {/* Modal Popup */}
{selectedUpload && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div 
      className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
      onClick={() => setSelectedUpload(null)}
    />
    
    <div className="bg-navy-700 rounded-xl shadow-xl w-80 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-navy-600">
        <h3 className="text-lg font-semibold text-white">Upload Details</h3>
        <button 
          className="p-2 hover:bg-navy-600 rounded-full transition-colors"
          onClick={() => setSelectedUpload(null)}
        >
          <X className="text-gray-400 hover:text-white" size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* <div className="aspect-video w-full overflow-hidden rounded-lg bg-navy-800">
          <img 
            src={selectedUpload.imageUrl || "https://flixier.com/ai/ai-image-generator/random-image-generator"} 
            alt={selectedUpload.filename} 
            className="w-full h-full object-cover"
          />
        </div> */}

        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-white font-medium truncate">
              {selectedUpload.filename}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <StatusIcon status={selectedUpload.status} />
              <span>{"Parsed Successfully"}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <PercentCircle size={16} />
              <span>Confidence: {selectedUpload.confidence ? `${selectedUpload.confidence.toFixed(2)}%` : "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>{selectedUpload.uploadDate}</span>
            </div>
            {selectedUpload.type && (
              <div className="flex items-center space-x-2">
                <File size={16} />
                <span>Type : {selectedUpload.type}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-navy-600 flex justify-end">
        <button 
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors flex items-center space-x-2"
          onClick={() => handleDelete(selectedUpload.id)}
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};