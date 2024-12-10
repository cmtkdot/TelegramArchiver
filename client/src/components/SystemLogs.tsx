import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { fetchSystemLogs } from "../lib/api";

export default function SystemLogs() {
  const { data: logs, isLoading, refetch } = useQuery({
    queryKey: ["systemLogs"],
    queryFn: () => fetchSystemLogs(),
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const handleRefresh = () => {
    void refetch().catch((error) => {
      console.error('Failed to refresh logs:', error);
    });
  };

  if (isLoading) return <div>Loading logs...</div>;

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh Logs"}
        </Button>
      </div>
      <ScrollArea className="h-[400px] rounded-md border bg-zinc-900 p-4">
        <div className="space-y-2 font-mono text-sm">
          {logs?.map((log) => (
            <div
              key={log.id}
              className={`flex items-center space-x-2 ${
                log.level === "error" ? "text-red-400" : 
                log.level === "warning" ? "text-yellow-400" : "text-green-400"
              }`}
            >
              <span className="text-zinc-500">
                {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'N/A'}
              </span>
              <span className="uppercase text-xs">{log.level}</span>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
