import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const useRoute = () => {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setRoute(null);
      setLoading(false);
      return;
    }

    const fetchRoute = async () => {
      try {
        const { data, error } = await supabase
          .from("commute_requests")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Error fetching route:", error);
          throw error;
        }

        if (data && data.length > 0) {
          setRoute(data[0]);
        } else {
          setRoute(null);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
        setRoute(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [user]);

  return { route, loading };
};

export default useRoute;
