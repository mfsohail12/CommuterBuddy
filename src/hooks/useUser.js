import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return user;
};

export default useUser;
