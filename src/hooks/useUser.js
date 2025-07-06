import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return { ...user?.user_metadata, id: user?.id };
};

export default useUser;
