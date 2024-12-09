import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChannel } from "../lib/api";
import ChannelList from "../components/ChannelList";

const addChannelSchema = z.object({
  channelId: z.string().min(1),
});

export default function Channels() {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(addChannelSchema),
  });

  const addChannelMutation = useMutation({
    mutationFn: (channelId: string) => addChannel(channelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      form.reset();
    },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Channel Management</h1>
      
      <Card className="p-4 mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => addChannelMutation.mutate(data.channelId))}>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="channelId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Add Channel</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter channel ID or @username" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-8">Add Channel</Button>
            </div>
          </form>
        </Form>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Monitored Channels</h2>
        <ChannelList />
      </Card>
    </div>
  );
}
