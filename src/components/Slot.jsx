/* A blank, dashed placeholder. Replace <Slot /> with your own module component. */
export default function Slot({ label = 'Module area' }) {
  return (
    <div className="slot">
      <div className="slot-inner">
        <span className="shimmer" />
        <span className="shimmer short" />
        <small>{label}</small>
      </div>
    </div>
  );
}
