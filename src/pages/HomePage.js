import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { MdEmojiPeople } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import AuthModal from "../components/AuthModal";
import AddRequestModal from "../components/AddRequestModal";
import useRoute from "../hooks/useRoute";

function HomePage() {
  const fullText = "Find your perfect commute companion!";
  const [displayedText, setDisplayedText] = useState("");
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [addRequestModalOpen, setAddRequestModalOpen] = useState(false);
  const navigate = useNavigate();
  const { route, loading } = useRoute();

  // typewriter effect for text
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoClick = () => {
    if (user && route) navigate("/university");
    else if (user) {
      navigate("/bus");
      toast.error("You must add a route first");
    } else openAuthModal("signin");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 ">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Commuter Buddy</h1>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-white text-sm font-bold">
                    Welcome, {user.user_metadata?.full_name || user.email}!
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal("signin")}
                    className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="flex items-center justify-center"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="flex flex-col justify-center items-center">
          <motion.img
            alt="Commuter Buddy"
            src="/Logo.png"
            className="mb-4"
            initial={{ x: "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          />
          <motion.p
            className="text-xl text-white mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {displayedText}
          </motion.p>
          <motion.button
            onClick={handleGoClick}
            className="flex justify-center items-center gap-2 bg-white relative z-20 text-blue-600 px-16 py-6 rounded-full text-2xl font-semibold hover:bg-gray-100 transition-colors shadow-lg mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          >
            <MdEmojiPeople className="text-3xl" />
            Find a Buddy
          </motion.button>
          {loading ? (
            <div className="text-white text-center">Loading...</div>
          ) : (
            user &&
            (route ? (
              <button
                onClick={() => navigate("/bus")}
                className="flex justify-center items-center gap-3 text-white hover:text-blue-200 px-3 py-2 rounded-md text-xl font-medium"
              >
                <FaMapMarkedAlt className="text-xl" />
                Update Your Route
              </button>
            ) : (
              <button
                onClick={() => navigate("/bus")}
                className="flex justify-center items-center gap-3 text-white hover:text-blue-200 px-3 py-2 rounded-md text-xl font-medium"
              >
                <FaMapMarkedAlt className="text-xl" />
                Add Your Route
              </button>
            ))
          )}
        </div>
        <footer className="h-10 flex justify-center items-center absolute bottom-0 w-screen px-4">
          <a href="https://github.com/mfsohail12/CommuterBuddy">
            <FaGithub className="text-white text-xl" />
          </a>
          <p className="text-white text-xs ml-auto">© 2025</p>
        </footer>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
        onSuccess={() => {
          setAuthModalOpen(false);
          if (authMode === "signup")
            toast.success(`A verification email was sent to your account`);
        }}
      />

      {/* Add Request Modal */}
      <AddRequestModal
        isOpen={addRequestModalOpen}
        onClose={() => setAddRequestModalOpen(false)}
        onSuccess={() => {
          setAddRequestModalOpen(false);
          // Optionally show success message
        }}
      />
    </div>
  );
}

export default HomePage;
