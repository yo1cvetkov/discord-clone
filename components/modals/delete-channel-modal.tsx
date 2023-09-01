"use client";

import * as React from "react";

import qs from "query-string";

import { useRouter } from "next/navigation";

import axios from "axios";

import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface DeleteChannelModalProps {}

export function DeleteChannelModal({}: DeleteChannelModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteChannel";

  const { server, channel } = data;

  async function handleConfirm() {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this ?
            <span className="font-semibold text-indigo-500">
              #{channel?.name}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant={"ghost"}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant={"primary"}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Added frontend for deleting channel and modal for that

// TODO: Create backend route for deletion of specific channel
