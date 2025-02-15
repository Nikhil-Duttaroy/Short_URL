"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  useEffect(() => {
    const fetchShortUrls = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/url/");
        const data = await response.json();
        if (data.success) {
          setShortUrls(data.shortUrls);
        }
      } catch (error) {
        console.error("Error fetching short URLs:", error);
      }
    };

    fetchShortUrls();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APISERVER_URL}/url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullUrl: url }),
      }
    );
    const data = await response.json();
    const { shortUrl } = data;
    setShortenedUrl(
      `${process.env.NEXT_PUBLIC_APISERVER_URL}/url/${shortUrl.shortUrl}`
    );
  };

  return (
    <div className="h-screen w-full bg-darkBackground text-primaryForeground">
      {/* Header */}
      <header className="flex flex-col items-center justify-center h-16 py-8 border-b-2 border-primaryBorder">
        <h1 className="text-primaryAccent text-3xl">Short URL</h1>
      </header>
      {/* Main */}
      <main className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl mb-4">Shorten your URL here</h2>
        <form
          className="flex flex-col items-center w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            placeholder="Enter your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 mb-4 border-2 border-primaryBorder rounded-md bg-primaryBackground text-primaryForeground focus:outline-none focus:border-primaryAccent"
          />
          <button
            type="submit"
            className="w-full p-3 bg-primaryAccent text-primaryForeground rounded-md hover:bg-primaryAccent/20 transition-colors"
          >
            Shorten URL
          </button>
        </form>
        {shortenedUrl && (
          <div className="mt-4 text-primaryAccent">
            Shortened URL:{" "}
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-center">All Shortened URLs</h2>
          <table className="w-full table-auto border-collapse border border-primaryBorder">
            <thead>
              <tr>
                <th className="border border-primaryBorder px-4 py-2">
                  Full URL
                </th>
                <th className="border border-primaryBorder px-4 py-2">
                  Shortened URL
                </th>
                <th className="border border-primaryBorder px-4 py-2">
                  Visit Count
                </th>
              </tr>
            </thead>
            <tbody>
              {shortUrls.map((url) => (
                <tr key={url._id}>
                  <td className="border border-primaryBorder px-4 py-2">
                    {url.fullUrl}
                  </td>
                  <td className="border border-primaryBorder px-4 py-2">
                    <a
                      href={`${process.env.NEXT_PUBLIC_APISERVER_URL}/url/${url.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {process.env.NEXT_PUBLIC_APISERVER_URL}/url/{url.shortUrl}
                    </a>
                  </td>
                  <td className="border border-primaryBorder px-4 py-2 text-center">
                    {url.visitHistory.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
