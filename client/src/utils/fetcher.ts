import { ShortUrl } from "@/lib/types";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface FetcherResponse {
  success?: boolean;
  shortUrls?: ShortUrl[];
  token?: string | undefined;
  message?: string | undefined;
  shortUrl?: ShortUrl | undefined;
}

// Add interfaces for error response structure
interface ErrorResponse {
  message?: string;
  error?: {
    message?: string;
  } | string;
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

    if (response.status < 200 || response.status >= 300) {
      const err = new Error("Error fetching data");
      const customError = err as Error & { status?: number };
      customError.status = response.status;
      throw customError;
    }
    console.log("🚀 ~ respoaaanse:", response.data);

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<ErrorResponse>;
      
      if (axiosError.response?.status === 401) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
      
      // Handle the error message with proper type checking
      let errorMessage: string | undefined;
      const responseData = axiosError.response?.data;
      
      if (responseData) {
        errorMessage = responseData.message 
          || (typeof responseData.error === 'object' && responseData.error?.message) 
          || (typeof responseData.error === 'string' ? responseData.error : undefined);
      }
      
      console.log(errorMessage);
      
      return axiosError.response?.data as FetcherResponse;
    } else {
      // Handle non-Axios errors
      console.log("Unexpected error:", err);
      return undefined;
    }
  }
}