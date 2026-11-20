import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { ROLES } from '../config/nav.js';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(0);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email: email.trim(), password, role, remember });
    } catch (err) {
      setError(err.message || 'Could not sign in. Try again.');
      setShake((n) => n + 1);
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="login-theme"><ThemeToggle /></div>

      <section className="login-hero" aria-hidden="true">
        <div className="brand big"><span className="brand-mark"><Icon name="cross" size={18} /></span><span>Your Clinic</span></div>
        <h2>Welcome to your<br /><em>clinic workspace</em></h2>
        <p>Sign in to manage your day. Add your own tagline here.</p>
        <svg className="ecg" viewBox="0 0 400 80" preserveAspectRatio="none">
          <path pathLength="1" d="M0 40h110l14-26 20 56 18-44 12 14h226" />
        </svg>
        <div className="hero-chips">
          <span className="chip glass">Secure</span>
          <span className="chip glass">Real-time</span>
          <span className="chip glass">Multilingual</span>
        </div>
      </section>

      <section className="login-card-wrap">
        <form key={shake} className={'login-card glass' + (shake ? ' shake' : '')} onSubmit={onSubmit} noValidate>
          <div className="brand mobile-only"><span className="brand-mark"><Icon name="cross" size={18} /></span><span>Your Clinic</span></div>
          <h1>Sign in</h1>
          <p className="muted">Use your clinic account to continue.</p>

          <div className="role-pick" role="radiogroup" aria-label="Sign in as">
            {ROLES.map((r) => (
              <button type="button" key={r} role="radio" aria-checked={role === r} className={role === r ? 'on' : ''} onClick={() => setRole(r)}>
                {r}
              </button>
            ))}
          </div>

          <label className="field" htmlFor="email">
            <Icon name="mail" size={18} />
            <input id="email" type="email" autoComplete="username" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} />
            <span>Email</span>
          </label>

          <label className="field" htmlFor="password">
            <Icon name="lock" size={18} />
            <input id="password" type={show ? 'text' : 'password'} autoComplete="current-password" placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} />
            <span>Password</span>
            <button type="button" className="eye" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'}>
              <Icon name={show ? 'eyeOff' : 'eye'} size={18} />
            </button>
          </label>

          <div className="row">
            <label className="check" htmlFor="remember">
              <input id="remember" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span className="box" />
              Remember me
            </label>
            <button type="button" className="link">Forgot password?</button>
          </div>

          {error && <div className="form-error" role="alert">{error}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? <span className="spinner" aria-label="Signing in" /> : <>Sign in <Icon name="arrow" size={18} /></>}
          </button>
          <p className="hint">Demo mode: any valid email and a password of 4+ characters works.</p>
        </form>
      </section>
    </div>
  );
}
