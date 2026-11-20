import Slot from '../components/Slot.jsx';

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
};

/* Blank dashboard: put your own components where the <Slot /> placeholders are. */
const WIDGETS = [
  { title: 'Stat 1', size: 's3' }, { title: 'Stat 2', size: 's3' }, { title: 'Stat 3', size: 's3' }, { title: 'Stat 4', size: 's3' },
  { title: 'Main area', size: 's8 tall', label: 'chart, calendar or table' },
  { title: 'Side list', size: 's4 tall', label: 'live list or queue' },
  { title: 'Panel A', size: 's6' }, { title: 'Panel B', size: 's6' },
];

export default function Dashboard({ user }) {
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  return (
    <>
      <div className="head">
        <p className="eyebrow">{today}</p>
        <h1>{greeting()}, <span className="grad">{user.name.split(' ')[0]}</span></h1>
        <p className="sub">Your {user.role.toLowerCase()} overview goes here.</p>
      </div>
      <div className="grid">
        {WIDGETS.map((w, i) => (
          <div key={w.title} className={'glass widget ' + w.size} style={{ '--i': i }}>
            <h3>{w.title}</h3>
            <Slot label={w.label} />
          </div>
        ))}
      </div>
    </>
  );
}
