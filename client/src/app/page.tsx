"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header.component";
import URLGeneration from "../components/URLGeneration.component";
import URLTable from "../components/URLTable.component";
import { ShortUrl } from "../lib/types";

export default function Home() {
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShortUrls = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APISERVER_URL}/url`
        );
        const data = await response.json();
        if (response.ok) {
          setShortUrls(data.shortUrls);
        } else {
          setError("Failed to fetch URLs");
        }
      } catch (error) {
        setError("Error fetching short URLs");
        console.error("Error fetching short URLs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShortUrls();
  }, []);

  const addShortUrl = (newUrl: ShortUrl) => {
    setShortUrls((prevUrls) => [...prevUrls, newUrl]);
  };

  return (
    <div className="h-screen w-full bg-darkBackground text-primaryForeground">
      <Header />
      <main className="flex flex-col items-center justify-center h-full">
        <URLGeneration addShortUrl={addShortUrl} />
        <URLTable shortUrls={shortUrls} loading={loading} error={error} />
      </main>
    </div>
  );
}