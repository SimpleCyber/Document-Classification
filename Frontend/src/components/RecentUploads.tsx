import { useState, useEffect } from "react";
import { CheckCircle, Clock, Eye, FileText, Calendar, File, PercentCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Upload {
  id: string;
  filename: string;
  uploadDate: string;
  status: "matched" | "unmatched" | "pending";
  type?: string;
  confidence?: number;
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
  const navigate = useNavigate();
  const [uploads, setUploads] = useState<Upload[]>([]);

  // Load upload history from localStorage on mount
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
                
                <button className="p-2 hover:bg-navy-500 rounded-full transition-colors" onClick={() => navigate(`/results?status=${upload.status}`)}>
                  <Eye className="text-gray-400 hover:text-white" size={20} />
                </button>

                <button
                  className="p-2 hover:bg-red-600 rounded-full transition-colors"
                  onClick={() => handleDelete(upload.id)}
                >
                  <Trash2 className="text-red-500 hover:text-white" size={20} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
