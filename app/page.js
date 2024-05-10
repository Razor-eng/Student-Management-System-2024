"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import Spinner from "@/components/Spinner";
import Body from "./components/Body";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      }
    }
  }, [loading, user])

  return (
    <>
      {(loading || user) ?
        <Spinner />
        :
        <div className="w-screen h-screen overflow-hidden">
          <Header />
          <Body />
        </div>
      }
    </>
  );
}
