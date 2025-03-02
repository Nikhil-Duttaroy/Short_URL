import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="w-full p-4 bg-primaryBackground text-primaryForeground flex justify-between items-center">
      <h1 className="text-2xl font-bold">Short URL</h1>
      <nav>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primaryAccent text-white rounded-md"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 bg-primaryAccent text-white rounded-md"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-primaryAccent text-white rounded-md"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
