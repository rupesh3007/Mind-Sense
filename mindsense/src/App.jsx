import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Particles } from "./components/UI";

import HomePage from "./pages/HomePage";
import PlatformPage from "./pages/PlatformPage";
import AIEnginePage from "./pages/AIEnginePage";
import DashboardPage from "./pages/DashboardPage";
import AlertsPage from "./pages/AlertsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

const VALID_PAGES = [
  "home",
  "platform",
  "ai-engine",
  "dashboard",
  "alerts",
  "privacy",
  "contact",
  "login",
  "admin",
];

function getInitialPage() {
  if (typeof window === "undefined") return "home";

  const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  if (VALID_PAGES.includes(hash)) return hash;

  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get("page")?.toLowerCase();
  if (pageParam && VALID_PAGES.includes(pageParam)) return pageParam;

  const path = window.location.pathname.replace(/^\/|\/$/g, "").toLowerCase();
  if (VALID_PAGES.includes(path)) return path;

  return "home";
}

export default function App() {
  const [page, setPageState] = useState(getInitialPage);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem("mindsense_admin_auth") === "true";
    } catch (e) {
      return false;
    }
  });

  const setPage = useCallback((newPage) => {
    if (VALID_PAGES.includes(newPage)) {
      setPageState(newPage);
      if (window.location.hash.replace(/^#\/?/, "").toLowerCase() !== newPage) {
        window.location.hash = newPage;
      }
    }
  }, []);

  const handleAdminLogout = useCallback(() => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem("mindsense_admin_auth");
    } catch (e) {}
    setPage("login");
  }, [setPage]);

  const handleAdminClick = useCallback(() => {
    if (isAdminAuthenticated) {
      setPage("admin");
    } else {
      setPage("login");
    }
  }, [isAdminAuthenticated, setPage]);

  // Listen for browser navigation (back/forward or URL hash changes)
  useEffect(() => {
    const handleHashChange = () => {
      const current = window.location.hash.replace(/^#\/?/, "").toLowerCase();
      if (VALID_PAGES.includes(current)) {
        setPageState(current);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage setPage={setPage} />;
      case "platform":
        return <PlatformPage setPage={setPage} />;
      case "ai-engine":
        return <AIEnginePage setPage={setPage} />;
      case "dashboard":
        return <DashboardPage setPage={setPage} />;
      case "alerts":
        return <AlertsPage setPage={setPage} />;
      case "privacy":
        return <PrivacyPage setPage={setPage} />;
      case "contact":
        return <ContactPage setPage={setPage} />;
      case "login":
        return (
          <LoginPage
            setPage={setPage}
            initialRole="student"
            setIsAdminAuthenticated={setIsAdminAuthenticated}
          />
        );
      case "admin":
        // ROUTE PROTECTION: If not authenticated, require Admin verification
        if (!isAdminAuthenticated) {
          return (
            <LoginPage
              setPage={setPage}
              initialRole="admin"
              setIsAdminAuthenticated={setIsAdminAuthenticated}
              redirectReason="Administrator verification required to access the Admin Panel."
            />
          );
        }
        return <AdminPage setPage={setPage} onLogout={handleAdminLogout} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  const showFooter = page !== "login" && (page !== "admin" || isAdminAuthenticated);

  return (
    <div
      className="noise"
      style={{ minHeight: "100vh", background: "var(--bg)" }}
    >
      <Particles />
      <Navbar
        page={page}
        setPage={setPage}
        isAdminAuthenticated={isAdminAuthenticated}
        onLogout={handleAdminLogout}
        onAdminClick={handleAdminClick}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${page}-${isAdminAuthenticated}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", zIndex: 1 }}
        >
          {renderPage()}
          {showFooter && <Footer setPage={setPage} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
