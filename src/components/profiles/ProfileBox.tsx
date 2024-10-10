"use client";

import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfileProps {
  profile: Profile;
}

export function ProfileBox({ profile }: ProfileProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: profile.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      });
  }, [profile, router]);

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 px-4 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <Avatar className="relative">
        <AvatarImage src={profile.imageUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-sm font-medium text-gray-900">{profile.name}</p>
    </div>
  );
}
