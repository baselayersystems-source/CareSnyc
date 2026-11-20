import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

const isDark = () => {
  const t = document.documentElement.dataset.theme;
  return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
};

export default function ThemeToggle() {
  const [dark, setDark] = useState(isDark);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('clinic_theme');
      if (saved) { document.documentElement.dataset.theme = saved; setDark(saved === 'dark'); }
    } catch { /* ignore */ }
  }, []);

  function toggle() {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setDark(!dark);
    try { localStorage.setItem('clinic_theme', next); } catch { /* ignore */ }
  }

  return (
    <button className="icon-btn spin" type="button" onClick={toggle} aria-label="Toggle light and dark theme">
      <Icon name={dark ? 'sun' : 'moon'} />
    </button>
  );
}
