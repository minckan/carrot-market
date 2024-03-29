import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import useSwr from "swr";

export default function useUser() {
  const { data, error } = useSwr("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  return {
    user: data?.profile,
    isLoading: !data && !error,
  };
}
