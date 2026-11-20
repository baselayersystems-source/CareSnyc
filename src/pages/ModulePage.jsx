import Slot from '../components/Slot.jsx';

/* Generic blank page used by every sidebar item except the dashboard. */
export default function ModulePage({ item }) {
  return (
    <>
      <div className="head">
        <h1>{item.label}</h1>
        <p className="sub">{item.sub}</p>
      </div>
      <div className="glass page-slot">
        <Slot label="Put your module here" />
      </div>
    </>
  );
}
