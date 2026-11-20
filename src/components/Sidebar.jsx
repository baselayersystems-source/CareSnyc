import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

export default function Sidebar({ nav, active, onNavigate, collapsed, open, user, onLogout }) {
  const refs = useRef({});
  const ind = useRef(null);
  const [ready, setReady] = useState(false);

  const place = () => {
    const el = refs.current[active];
    if (!el || !ind.current) return;
    ind.current.style.height = el.offsetHeight + 'px';
    ind.current.style.transform = `translateY(${el.offsetTop}px)`;
  };

  useLayoutEffect(place, [active, collapsed, nav]);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    const on = () => place();
    window.addEventListener('resize', on);
    document.fonts?.ready.then(on);
    const t = setTimeout(on, 480); // after collapse / drawer transitions finish
    return () => { cancelAnimationFrame(id); clearTimeout(t); window.removeEventListener('resize', on); };
  }, [active, collapsed, open]);

  return (
    <aside className="sidebar glass" aria-label="Sidebar">
      <div className="brand">
        <span className="brand-mark"><Icon name="cross" size={18} /></span>
        <span className="hide-collapsed">Your Clinic</span>
      </div>

      <div className="nav-label hide-collapsed">Menu</div>
      <nav className="nav">
        <span ref={ind} className={'nav-indicator' + (ready ? ' ready' : '')} />
        {nav.map((n) => (
          <button
            key={n.id}
            ref={(el) => (refs.current[n.id] = el)}
            type="button"
            className="nav-item"
            title={n.label}
            aria-current={active === n.id ? 'page' : undefined}
            onClick={() => onNavigate(n.id)}
          >
            <Icon name={n.icon} />
            <span className="hide-collapsed">{n.label}</span>
            {n.badge ? <em className="badge hide-collapsed">{n.badge}</em> : null}
          </button>
        ))}
      </nav>

      <div className="side-foot">
        <div className="user-card">
          <span className="avatar">{initials(user.name)}</span>
          <div className="who hide-collapsed">
            <strong>{user.name}</strong>
            <small>{user.role}</small>
          </div>
        </div>
        <button type="button" className="logout-btn" onClick={onLogout} title="Log out">
          <Icon name="logout" />
          <span className="hide-collapsed">Log out</span>
        </button>
      </div>
    </aside>
  );
}
