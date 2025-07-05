import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { MdEmojiPeople } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import AuthModal from "../components/AuthModal";
import AddRequestModal from "../components/AddRequestModal";
import useRoute from "../hooks/useRoute";

function HomePage() {
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [addRequestModalOpen, setAddRequestModalOpen] = useState(false);
  const navigate = useNavigate();
  const route = useRoute();

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
    navigate("/university");
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
          <img alt="Commuter Buddy" src="/Logo.webp" className="scale-125 -my-10 -mb-20 -ml-22 -mr-26" />
          <p className="text-xl text-white mb-12">
            Find your perfect commute companion
          </p>
          <button
            onClick={handleGoClick}
            className="flex justify-center items-center gap-2 bg-white relative z-20 text-blue-600 px-16 py-6 rounded-full text-2xl font-semibold hover:bg-gray-100 transition-colors shadow-lg mb-4"
          >
            <MdEmojiPeople className="text-3xl" />
            Find a Buddy
          </button>
          {route != null ? (
            <button
              onClick={() => {}}
              className="flex justify-center items-center gap-3 text-white hover:text-blue-200 px-3 py-2 rounded-md text-xl font-medium"
            >
              <FaMapMarkedAlt className="text-xl" />
              Update Your Route
            </button>
          ) : (
            <button
              onClick={() => setAddRequestModalOpen(true)}
              className="flex justify-center items-center gap-3 text-white hover:text-blue-200 px-3 py-2 rounded-md text-xl font-medium"
            >
              <FaMapMarkedAlt className="text-xl" />
              Add Your Route
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSuccess={() => {
          setAuthModalOpen(false);
          // Optionally show success message
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
