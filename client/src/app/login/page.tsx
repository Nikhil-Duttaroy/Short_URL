"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header.component";
import Loader from "../../components/Loader.component";
import withAuth from "@/components/withAuth.components";
import { fetcher } from "../../utils/fetcher";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const router = useRouter();

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const handleEmailBlur = useCallback(() => {
    if (!validateEmail(username)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  }, [username, validateEmail]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      if (!validateEmail(username)) {
        setEmailError("Invalid email address");
        setLoading(false);
        return;
      } else {
        setEmailError("");
      }
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_APISERVER_URL}/auth/login`,
          "post",
          { username, password }
        );
        if (response?.success) {
          if (response?.token) {
            localStorage.setItem("token", response.token);
          }
          router.push("/");
        } else {
          setError(response?.message || "Login failed. Please try again.");
        }
      } catch {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [username, password, validateEmail, router]
  );

  useEffect(() => {
    if (username) {
      handleEmailBlur();
    }
  }, [username, handleEmailBlur]);
  return (
    <div className="h-screen w-full bg-darkBackground text-primaryForeground">
      <Header />
      <main className="flex flex-col items-center justify-center h-full px-8 md:px-2 gap-6">
        <h1 className="text-2xl font-bold text-center text-primaryAccent">
          Simplify your links and track their performance effortlessly.
          <br />
          Join us now!
        </h1>
        <div className="w-full max-w-md p-8 space-y-8 bg-primaryBackground rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-primaryAccent">
            Login
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="block text-base font-medium text-primaryForeground"
              >
                Email
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={handleEmailBlur}
                required
                placeholder="JohnDoe@email.com"
                className="w-full p-3 mb-4 border-2 border-primaryBorder rounded-md bg-primaryBackground text-primaryForeground focus:outline-none focus:border-primaryAccent"
              />
              {emailError && <p className="text-red-500 -mt-4">{emailError}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="block text-base font-medium text-primaryForeground"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full p-3 mb-4 border-2 border-primaryBorder rounded-md bg-primaryBackground text-primaryForeground focus:outline-none focus:border-primaryAccent"
              />
            </div>
            {error && <p className="text-red-500 ">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-primaryAccent rounded-md hover:bg-primaryAccent/20 transition-colors disabled:bg-gray-300 disabled:text-black"
              disabled={!username || !password || !!emailError}
            >
              {loading ? <Loader /> : "Login"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Login, false);