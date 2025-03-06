import { ShortUrl } from "@/lib/types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface FetcherResponse {
  success?: boolean;
  shortUrls?: ShortUrl[];
  token?: string | undefined;
  message?: string | undefined;
  shortUrl?: ShortUrl | undefined;
}

export async function fetcher(
  url: string,
  method: "get" | "post" | "put" | "delete" = "get",
  data: unknown = null
): Promise<FetcherResponse | undefined> {
  const authToken = localStorage.getItem("token");
  const headers: AxiosRequestConfig["headers"] = {
    Accept: "application/json",
  };

  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

  try {
    const response: AxiosResponse = await axios({
      url: url,
      method,
      data: data,
      headers,
    });

    if (response.status < 200 && response.status > 300) {
      const err = new Error("Error fetching data");
      const customError = err as Error & { status?: number };
      customError.status = response.status;
      throw customError;
      throw err;
    }
    console.log("🚀 ~ respoaaanse:", response.data)

    return response.data;
  } catch (err:any) {
    if (err.response?.status === 401) {
      if(localStorage.getItem("authToken")){

        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    const error =
      err?.response?.data?.message ||
      err?.response?.data?.error?.message ||
      err?.response?.data?.error;
    console.log(error);
    return err.response;
  }
}