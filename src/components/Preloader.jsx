// Preloader.jsx - full-screen logo loader shown while the page loads (uses the college's existing loader GIF in /public).
import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 1400; // keep the animation on screen long enough to be seen

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const started = Date.now();
    const finish = () => setTimeout(() => setDone(true), Math.max(0, MIN_VISIBLE_MS - (Date.now() - started)));
    if (document.readyState === "complete") { finish(); return; }
    window.addEventListener("load", finish);
    return () => window.removeEventListener("load", finish);
  }, []);

  return (
    <div className={`preloader${done ? " is-done" : ""}`} aria-hidden={done} role="status" aria-label="Loading">
      <img className="preloader__logo" src="/images/crlogogif.gif" alt="Chhotu Ram Polytechnic" onError={(e) => { e.currentTarget.style.display = "none"; }} />
    </div>
  );
}
