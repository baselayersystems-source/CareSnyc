import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

export default function Topbar({ title, user, onMenu, onCollapse, onLogout }) {
  const [menu, setMenu] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!menu) return;
    const close = (e) => { if (!box.current?.contains(e.target)) setMenu(false); };
    const esc = (e) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc); };
  }, [menu]);

  return (
    <header className="topbar glass">
      <button className="icon-btn menu-btn" type="button" onClick={onMenu} aria-label="Open menu"><Icon name="menu" /></button>
      <button className="icon-btn collapse-btn" type="button" onClick={onCollapse} aria-label="Collapse sidebar"><Icon name="panel" /></button>
      <h2 className="page-title">{title}</h2>

      <label className="search">
        <Icon name="search" size={17} />
        <input id="search" type="search" placeholder="Search" />
      </label>
      <span className="live"><i />Live</span>
      <button className="icon-btn" type="button" aria-label="Notifications"><Icon name="bell" /><span className="dot" /></button>
      <ThemeToggle />

      <div className="user-menu" ref={box}>
        <button className="avatar btn" type="button" onClick={() => setMenu((m) => !m)} aria-haspopup="menu" aria-expanded={menu} aria-label="Account menu">
          {initials(user.name)}
        </button>
        {menu && (
          <div className="dropdown glass" role="menu">
            <div className="dd-head">
              <strong>{user.name}</strong>
              <small>{user.email}</small>
              <span className="role-tag">{user.role}</span>
            </div>
            <button type="button" role="menuitem" className="dd-item danger" onClick={onLogout}>
              <Icon name="logout" size={18} /> Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
