"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { login as apiLogin, logout as apiLogout, checkSession } from "@/lib/api";

interface AuthState {
  token: string | null;
  userId: string | null;
  user: Record<string, unknown> | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "slic_auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null,
    userId: null,
    user: null,
    loading: true,
  });

  const syncState = useCallback((token: string | null, userId: string | null, user: Record<string, unknown> | null) => {
    setState({ token, userId, user, loading: false });
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }
    checkSession(stored)
      .then((res) => syncState(stored, (res.data?.$id as string) || null, res.data ?? null))
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        setState({ token: null, userId: null, user: null, loading: false });
      });
  }, [syncState]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    syncState(res.data.session, res.data.userId, null);
    // fetch user profile
    try {
      const sessionRes = await checkSession(res.data.session);
      syncState(res.data.session, res.data.userId, sessionRes.data ?? null);
    } catch {
      // session works even without fetching profile
    }
  }, [syncState]);

  const logout = useCallback(async () => {
    if (state.token) {
      try { await apiLogout(state.token); } catch { /* ignore */ }
    }
    syncState(null, null, null);
  }, [state.token, syncState]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, isAuthenticated: !!state.token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
