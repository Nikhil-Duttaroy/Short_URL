"use client";
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithAuthComponent;
};

export default withAuth;