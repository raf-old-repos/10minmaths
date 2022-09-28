import { useSession } from "next-auth/react";
import useRouter from "next/router";

export default function PrivateRoute({ children, fallback }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!fallback && status === "unauthenticated") {
      router.push("/signup");
    } else if (fallback) {
      router.push(fallback);
    }
  }, [status, fallback]);

  if (status === "authenticated") {
    return children;
  } else if (status === "loading") {
    return (
      <>
        <h1>
          {/* Add fancier loader later */}
          Loading page...
        </h1>
      </>
    );
  }

  return (
    <>
      <h1>Redirecting to Sign Up....</h1>
    </>
  );
}
