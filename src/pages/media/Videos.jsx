// Videos.jsx - Media > Videos (route: /media/videos).
// Page order: hero -> title -> video cards -> popup player.
//
// HOW THE COLLEGE FILLS THIS PAGE - every video is one object in the `videos` list:
//   id       any unique word
//   title    shown on the card and above the player
//   text     one short line under the title
//   type     "youtube" (source = the video id)  or  "file" (source = a path inside public/videos/)
//   source   YouTube id like "91vKQc6-W5o", or "/videos/cr-video.mp4"
//   poster   cover image path inside public/images/videos/ (a missing file shows a navy tile)
// An empty list ([]) shows a friendly "Videos coming soon" message instead of cards.
import { useEffect, useRef, useState } from "react";
import { FiPlay, FiX, FiFilm, FiYoutube, FiVideo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { FiMapPin, FiChevronRight } from "react-icons/fi";
import "./Videos.css";

const hero = { image: "/images/pages-banner.png" }; // if it is missing a patterned navy banner shows instead

const intro = {
  eyebrow: "Media",
  title: "Videos",
  lead: "Watch the campus in motion. Choose a video to play it right here on the page.",
};

const videos = [
  {
    id: "welcome",
    title: "Welcome to C.R. Polytechnic",
    text: "An introduction to the institute.",
    type: "youtube",
    source: "91vKQc6-W5o",
    poster: "/images/campus-workshop.jpg",
  },
];

// Cover picture for a card. If the file is missing, the navy tile with an icon is enough.
function Poster({ src, Icon }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="vid-poster">
      {src && !failed && <img src={src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} />}
      {(!src || failed) && <Icon className="vid-poster__fallback" aria-hidden="true" />}
      <span className="vid-poster__play" aria-hidden="true"><FiPlay /></span>
    </div>
  );
}

export default function Videos() {
  const [current, setCurrent] = useState(null);
  const closeRef = useRef(null);
  const returnRef = useRef(null);

  const openVideo = (video, button) => {
    returnRef.current = button;
    setCurrent(video);
  };
  const closeVideo = () => {
    setCurrent(null);
    returnRef.current?.focus();
  };

  // While the player is open: Esc closes it and the page behind does not scroll.
  useEffect(() => {
    if (!current) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") closeVideo();
    };
    document.addEventListener("keydown", onKey);
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = before;
    };
  }, [current]);

  return (
    <main id="main" className="vid-page">
      <section className="vid-hero" aria-label="Videos" style={{ "--img": `url("${hero.image}")` }}>
        <div className="vid-hero__photo" />
        <div className="vid-hero__tags">
          <span className="vid-hero__tag vid-hero__tag--left">
            <span className="vid-hero__tag-icon"><FaGraduationCap aria-hidden="true" /></span>
            C.R. Polytechnic
          </span>
          <span className="vid-hero__tag vid-hero__tag--right">
            <span className="vid-hero__tag-icon"><FiMapPin aria-hidden="true" /></span>
            Rohtak (Haryana)
          </span>
        </div>
        <nav className="vid-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight aria-hidden="true" />
          <span>Media</span>
          <FiChevronRight aria-hidden="true" />
          <span aria-current="page">Videos</span>
        </nav>
      </section>

      <div className="container vid-wrap">
        <header className="vid-intro">
          <span className="vid-eyebrow">{intro.eyebrow}</span>
          <h1>{intro.title}</h1>
          <p>{intro.lead}</p>
        </header>

        {videos.length > 0 ? (
          <ul className="vid-grid">
            {videos.map((video) => (
              <li key={video.id}>
                <button type="button" className="vid-card" onClick={(event) => openVideo(video, event.currentTarget)} aria-label={`Play video: ${video.title}`}>
                  <Poster src={video.poster} Icon={video.type === "youtube" ? FiYoutube : FiFilm} />
                  <span className="vid-card__body">
                    <span className="vid-card__kind">{video.type === "youtube" ? "YouTube" : "Campus film"}</span>
                    <strong>{video.title}</strong>
                    <span>{video.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="vid-empty">
            <span className="vid-empty__icon"><FiVideo aria-hidden="true" /></span>
            <h2>Videos coming soon</h2>
            <p>We are preparing campus videos. Please check back shortly.</p>
          </div>
        )}
      </div>

      {current && (
        <div className="vid-modal" role="dialog" aria-modal="true" aria-label={current.title} onClick={closeVideo}>
          <div className="vid-modal__box" onClick={(event) => event.stopPropagation()}>
            <div className="vid-modal__top">
              <h2>{current.title}</h2>
              <button ref={closeRef} type="button" className="vid-modal__close" onClick={closeVideo} aria-label="Close video">
                <FiX aria-hidden="true" />
              </button>
            </div>
            <div className="vid-modal__player">
              {current.type === "youtube" ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${current.source}?autoplay=1&rel=0`}
                  title={current.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <video src={current.source} controls autoPlay playsInline />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
