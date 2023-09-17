"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { Suspense } from "react";
import LogoutButton from "@/components/LogoutButton";

export default function TodoLayout({
  children, // will be a page or nested layout
}) {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              TodoList App
            </span>
            <LogoutButton logout={logout} />
          </div>
        </nav>
      </header>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
}
