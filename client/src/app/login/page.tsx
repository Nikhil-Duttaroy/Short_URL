"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "../../components/Header.component";
import Loader from "../../components/Loader.component";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APISERVER_URL}/auth/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-darkBackground text-primaryForeground">
      <Header />
      <main className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-md p-8 space-y-8 bg-primaryBackground rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-primaryAccent">
            Login
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          {loading ? (
            <Loader />
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-primaryForeground"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md bg-secondaryBackground text-primaryForeground"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-primaryForeground"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md bg-secondaryBackground text-primaryForeground"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-primaryAccent rounded-md"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}