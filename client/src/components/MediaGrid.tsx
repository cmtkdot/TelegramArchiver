import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { fetchMedia } from "../lib/api";

interface MediaGridProps {
  channelId?: string;
  page?: number;
}

export default function MediaGrid({ channelId, page = 1 }: MediaGridProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["media", channelId, page],
    queryFn: () => fetchMedia(channelId, page),
  });

  if (isLoading) return <div>Loading media...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.media.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="aspect-square relative">
            {item.type === "photo" ? (
              <img
                src={`/api/media/file/${item.filePath}`}
                alt={item.caption || ""}
                className="object-cover w-full h-full"
              />
            ) : (
              <video
                src={`/api/media/file/${item.filePath}`}
                className="object-cover w-full h-full"
                controls
              />
            )}
          </div>
          {item.caption && (
            <div className="p-2 text-sm truncate">{item.caption}</div>
          )}
        </Card>
      ))}
    </div>
  );
}
