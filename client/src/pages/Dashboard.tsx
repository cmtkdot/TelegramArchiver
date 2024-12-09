import { Card } from "@/components/ui/card";
import SystemLogs from "../components/SystemLogs";
import ChannelList from "../components/ChannelList";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">System Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Active Channels</h2>
            <ChannelList />
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">System Logs</h2>
            <SystemLogs />
          </Card>
        </div>
      </div>
    </div>
  );
}
