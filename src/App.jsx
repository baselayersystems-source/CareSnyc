import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext.jsx';
import { useHashRoute } from './hooks/useHashRoute.js';
import { NAV } from './config/nav.js';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ModulePage from './pages/ModulePage.jsx';
import Login from './pages/Login.jsx';

function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="orb a" /><div className="orb b" /><div className="orb c" /><div className="grain" />
    </div>
  );
}

function Shell({ user, onLogout }) {
  const items = NAV.filter((n) => !n.roles || n.roles.includes(user.role));
  const [route, navigate] = useHashRoute('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const item = items.find((n) => n.id === route) || items[0];

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, []);

  return (
    <div className={'app' + (collapsed ? ' collapsed' : '') + (open ? ' open' : '')}>
      <div className="scrim" onClick={() => setOpen(false)} />
      <Sidebar
        nav={items}
        active={item.id}
        collapsed={collapsed}
        open={open}
        user={user}
        onLogout={onLogout}
        onNavigate={(id) => { navigate(id); setOpen(false); }}
      />
      <div className="main">
        <Topbar title={item.label} user={user} onMenu={() => setOpen(true)} onCollapse={() => setCollapsed((c) => !c)} onLogout={onLogout} />
        <main key={item.id} className="page">
          {item.id === 'dashboard' ? <Dashboard user={user} /> : <ModulePage item={item} />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const { user, logout } = useAuth();
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const handleLogout = () => { logout(); setToast('You have been logged out.'); };

  return (
    <>
      <Background />
      {user ? <Shell key="shell" user={user} onLogout={handleLogout} /> : <Login key="login" />}
      {toast && <div className="toast glass" role="status">{toast}</div>}
    </>
  );
}
