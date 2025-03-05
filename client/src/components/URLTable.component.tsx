import React, { useMemo } from "react";
import { URLTableProps } from "../lib/types";

const URLTable: React.FC<URLTableProps> = ({ shortUrls, loading, error }) => {
  const tableRows = useMemo(() => {
    return shortUrls?.map((url) => (
      <tr key={url.shortUrl}>
        <td className="border border-primaryBorder px-4 py-2 overflow-hidden truncate">
          {url.fullUrl}
        </td>
        <td className="border border-primaryBorder px-4 py-2 overflow-hidden truncate">
          <a
            href={`${process.env.NEXT_PUBLIC_APISERVER_URL}/url/${url.shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {process.env.NEXT_PUBLIC_APISERVER_URL}/url/{url.shortUrl}
          </a>
        </td>
        <td className="border border-primaryBorder px-4 py-2 text-center overflow-hidden truncate">
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
          <table className="w-full border-collapse border border-primaryBorder mt-4 table-fixed">
            <colgroup>
              <col style={{ width: "50%" }} />
              <col style={{ width: "40%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
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
            <tbody>{tableRows}</tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default URLTable;