import React, { useState, useCallback } from "react";
import { ShortUrl, URLGenerationProps } from "../lib/types";
import axios from "axios";

const URLGeneration: React.FC<URLGenerationProps> = ({ addShortUrl }) => {
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_APISERVER_URL}/url`,
          { fullUrl: url },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          const newShortUrl: ShortUrl = {
            _id: response.data.shortUrl._id,
            fullUrl: url,
            shortUrl: response.data.shortUrl.shortUrl,
            visitHistory: [],
            createdAt: response.data.shortUrl.createdAt,
            updatedAt: response.data.shortUrl.updatedAt,
            __v: response.data.shortUrl.__v,
          };
          setShortenedUrl(
            `${process.env.NEXT_PUBLIC_APISERVER_URL}/url/${response.data.shortUrl.shortUrl}`
          );
          setUrl("");
          addShortUrl(newShortUrl);
        } else {
          setError("Failed to shorten URL");
        }
      } catch (error) {
        setError("Error shortening URL");
        console.error("Error shortening URL:", error);
      } finally {
        setLoading(false);
      }
    },
    [url, addShortUrl]
  );

  return (
    <div className="flex flex-col items-center w-full max-w-md">
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
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {shortenedUrl && (
        <div className="mt-4 text-primaryAccent w-full">
          Shortened URL:{" "}
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default URLGeneration;