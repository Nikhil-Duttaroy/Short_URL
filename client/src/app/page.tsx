"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.component";
import URLGeneration from "../components/URLGeneration.component";
import URLTable from "../components/URLTable.component";
import Loader from "../components/Loader.component";
import { ShortUrl } from "../lib/types";
import withAuth from "../components/withAuth.components";

const Home: React.FC = () => {
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShortUrls = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APISERVER_URL}/url`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setShortUrls(response.data.shortUrls);
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
    <div className="h-dvh w-full bg-darkBackground text-primaryForeground justify-center items-center flex flex-col ">
      <Header />
      <main className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-8 md:px-2">
        <URLGeneration addShortUrl={addShortUrl} />
        <div className="min-h-[200px] w-full flex items-center justify-center">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <URLTable shortUrls={shortUrls} loading={loading} error={error} />
          )}
        </div>
      </main>
    </div>
  );
};

export default withAuth(Home, true);