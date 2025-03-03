"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "../../components/Header.component";
import Loader from "../../components/Loader.component";
import withAuth from "@/components/withAuth.components";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(username)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include a special character and a number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(username)) {
      setEmailError("Invalid email address");
      setLoading(false);
      return;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include a special character and a number"
      );
      setLoading(false);
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APISERVER_URL}/auth/register`,
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
        setError(
          response.data.message || "Registration failed. Please try again."
        );
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
            Register
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          {loading ? (
            <Loader />
          ) : (
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
                {emailError && (
                  <p className="text-red-500 -mt-4">{emailError}</p>
                )}
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
                  onBlur={handlePasswordBlur}
                  required
                  placeholder="********"
                  className="w-full p-3 mb-4 border-2 border-primaryBorder rounded-md bg-primaryBackground text-primaryForeground focus:outline-none focus:border-primaryAccent"
                />
                {passwordError && (
                  <p className="text-red-500 -mt-4">{passwordError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-primaryAccent rounded-md hover:bg-primaryAccent/20 transition-colors disabled:bg-gray-300 disabled:text-black"
                disabled={
                  !username || !password || !!emailError || !!passwordError
                }
              >
                Register
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default withAuth(Register, false);