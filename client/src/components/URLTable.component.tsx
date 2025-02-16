import React, { useMemo } from "react";

const URLTable = ({ shortUrls, loading, error }) => {
  const tableRows = useMemo(() => {
    return shortUrls?.map((url) => (
      <tr key={url.shortUrl}>
        <td className="border border-primaryBorder px-4 py-2">{url.fullUrl}</td>
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
    ));
  }, [shortUrls]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-8 ">
      {shortUrls?.length === 0 ? (
        <h2 className="text-xl font-bold text-center">No Short URLs present</h2>
      ) : (
        <>
      <h2 className="text-xl font-bold text-center">All Shortened URLs</h2>
        <table className="w-full table-auto border-collapse border border-primaryBorder mt-4">
          <thead>
            <tr>
              <th className="border border-primaryBorder px-4 py-2">Full URL</th>
              <th className="border border-primaryBorder px-4 py-2">Shortened URL</th>
              <th className="border border-primaryBorder px-4 py-2">Visit Count</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </>
      )}
    </div>
  );
};

export default URLTable;