import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchSystemLogs } from "../lib/api";

export default function SystemLogs() {
  const { data: logs, isLoading } = useQuery({
    queryKey: ["systemLogs"],
    queryFn: () => fetchSystemLogs(),
    refetchInterval: 5000,
  });

  if (isLoading) return <div>Loading logs...</div>;

  return (
    <ScrollArea className="h-[400px] rounded-md border bg-zinc-900 p-4">
      <div className="space-y-2 font-mono text-sm">
        {logs?.map((log) => (
          <div
            key={log.id}
            className={`flex items-center space-x-2 ${
              log.level === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            <span className="text-zinc-500">
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
            <span className="uppercase text-xs">{log.level}</span>
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
