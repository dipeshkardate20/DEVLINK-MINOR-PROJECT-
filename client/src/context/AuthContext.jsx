import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getMe, login as loginRequest, register as registerRequest } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("devlink_token"));
  const [loading, setLoading] = useState(Boolean(token));

  const persistSession = useCallback((data) => {
    localStorage.setItem("devlink_token", data.token);
    setToken(data.token);
    setUser(data.user);
  }, []);

  const register = async (payload) => {
    const data = await registerRequest(payload);
    persistSession(data);
    return data;
  };

  const login = async (payload) => {
    const data = await loginRequest(payload);
    persistSession(data);
    return data;
  };

  const logout = useCallback(() => {
    localStorage.removeItem("devlink_token");
    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!localStorage.getItem("devlink_token")) {
      setLoading(false);
      return;
    }

    try {
      const data = await getMe();
      setUser(data.user);
    } catch (_error) {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const value = useMemo(
    () => ({ user, setUser, token, loading, register, login, logout, refreshUser, isAuthenticated: Boolean(token) }),
    [user, token, loading, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
