"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, ComponentType } from "react";
import Loader from "./Loader.component";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  redirectToLogin: boolean = true
): ComponentType<P> => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (redirectToLogin) {
        if (!token) {
          router.push("/login");
        } else {
          setLoading(false);
        }
      } else {
        if (token) {
          router.push("/");
        } else {
          setLoading(false);
        }
      }
    }, [router]);

    if (loading) {
      return (
        <div className="h-screen w-full bg-darkBackground text-primaryForeground justify-center items-center flex flex-col">
          <Loader size="lg" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAuth;