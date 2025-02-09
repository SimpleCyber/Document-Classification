import { CheckCircle, Clock, Eye, FileText, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Upload {
  id: string;
  filename: string;
  uploadDate: string;
  status: "matched" | "unmatched" | "pending";
}

const StatusIcon = ({ status }: { status: Upload["status"] }) => {
  switch (status) {
    case "pending":
      return <Clock className="text-yellow-500" size={20} />;
    case "matched":
      return <CheckCircle className="text-green-500" size={20} />;
    case "unmatched":
      return <XCircle className="text-red-500" size={20} />;
  }
};

export const RecentUploads = () => {
  const navigate = useNavigate();
  const uploads: Upload[] = [
    {
      id: "1",
      filename: "travel-invoice.pdf",
      uploadDate: "2024-03-15 14:30",
      status: "matched",
    },
    {
      id: "2",
      filename: "Email.png",
      uploadDate: "2024-03-15 13:45",
      status: "pending",
    },
    {
      id: "3",
      filename: "Advertisement.jpeg",
      uploadDate: "2024-03-15 12:20",
      status: "unmatched",
    },
  ];

  const handleViewClick = (status: string) => {
    navigate(`/results?status=${status}`);
  };

  return (
    <div className="bg-navy-800 rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Recent Uploads</h2>
      <div className="space-y-4">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="flex items-center justify-between p-4 bg-navy-700 rounded-lg hover:bg-navy-600 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <FileText className="text-gray-400" size={20} />
              <div>
                <p className="text-white font-medium">{upload.filename}</p>
                <p className="text-gray-400 text-sm">{upload.uploadDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <StatusIcon status={upload.status} />
              <button
                className="p-2 hover:bg-navy-500 rounded-full transition-colors"
                onClick={() => handleViewClick(upload.status)}
              >
                <Eye className="text-gray-400 hover:text-white" size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
