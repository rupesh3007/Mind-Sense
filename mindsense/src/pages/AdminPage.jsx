import { useEffect } from "react";

export default function AdminPage({ setPage }) {
  useEffect(() => {
    setPage("home");
  }, [setPage]);

  return null;
}
