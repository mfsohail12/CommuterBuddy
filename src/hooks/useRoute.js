import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchRoute = async () => {
      const { data, error } = await supabase
        .from("commute_requests")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      if (data.length > 0) {
        setRoute(data[0]);
      }
    };

    fetchRoute();
  }, [user]);

  return route;
};

export default useUser;
