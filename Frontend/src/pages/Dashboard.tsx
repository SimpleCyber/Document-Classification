import { DashboardOverview } from "../components/DashboardOverview";
import { QuickUpload } from "../components/QuickUpload";
import { RecentUploads } from "../components/RecentUploads";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-navy-900 text-white p-6 ">

      <div className="max-w-7xl mx-auto space-y-6 mt-20">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Stats Overview */}
        <DashboardOverview />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RecentUploads />
          </div>
          <div className="mt-6">
            <QuickUpload  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
