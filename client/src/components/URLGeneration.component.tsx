import React, { useState, useCallback } from "react";

const URLGeneration = ({ addShortUrl }) => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
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
      if (response.ok) {
        const { shortUrl } = data;
        const newShortUrl = {
          fullUrl: url,
          shortUrl: shortUrl.shortUrl,
          visitHistory: [],
        };
        setShortenedUrl(
          `${process.env.NEXT_PUBLIC_APISERVER_URL}/url/${shortUrl.shortUrl}`
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
  }, [url, addShortUrl]);

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