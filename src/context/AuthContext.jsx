import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const KEY = 'clinic_user';

function readStored() {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStored);

  /* DEMO LOGIN: accepts any email and a password of 4+ characters.
     Replace the body with your Django call, for example:
       const res = await fetch('/api/auth/login/', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password }),
       });
       if (!res.ok) throw new Error('Wrong email or password.');
       const data = await res.json();   // { token, user: { name, role } }
  */
  const login = useCallback(async ({ email, password, role, remember }) => {
    await new Promise((r) => setTimeout(r, 900));
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.');
    if (password.length < 4) throw new Error('Password must be at least 4 characters.');
    const name = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const next = { name, email, role };
    setUser(next);
    try {
      if (remember) localStorage.setItem(KEY, JSON.stringify(next));
    } catch { /* storage unavailable: stay signed in for this visit only */ }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
