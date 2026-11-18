// Electronics.jsx - Departments > Electronics & Communication Engineering (route: /departments/electronics).
// Page order: hero (same as About / Facilities) -> title block + department picture -> department switcher
//             -> search + About / Staff tabs -> department highlights.
// Own styles (Electronics.css, every class starts with "ece-"). Nothing here is shared with another department.
//
// HOW THE DEPARTMENT UPDATES THIS PAGE - everything is a list at the top of this file:
//   dept         title, short introduction, quick facts and the framed department picture
//   collage      the three About pictures: [small left, small right, large below]
//   about        the About sections (first one = the card with the collage, the rest = cards below it)
//   staff        one object per person: name, role, photo, and OPTIONAL qualification / interest / email
//                (empty fields are simply not shown - add them whenever they are available)
//   highlights   the four visual cards at the bottom
// Department and collage photos use /images/faculty/electronics-communication/; staff photos remain under /images/departments/electronics/staff/.
// A missing picture shows a clean placeholder, a missing staff photo shows the person's initials.
//
// CONTENT SOURCE: live page https://crprohtak.ac.in/ece and staff list https://crprohtak.ac.in/faculty_electronics.
// The About text follows the live page (condensed where it was long). To use the exact live wording, paste it into the lists below.
// The live page names no laboratories and no established year, so those sections/facts are left out.
// FILES TO COPY from the old website (old path -> new path):
//   /media/teachers/<file>   -> public/images/departments/electronics/staff/<file>   (photo file names used in the staff list below)
//   hero.jpg, about-1.jpg, about-2.jpg, about-3.jpg -> /images/faculty/electronics-communication/ (department picture and About collage)
//   electronics-highlight-*.jpg (4 files named in the highlights list) -> backgrounds of the highlight cards
// The banner /images/pages-banner.png is the same one the About / Facilities pages use.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import {
  FiChevronRight, FiMapPin, FiSearch, FiX, FiImage, FiInfo, FiBriefcase, FiAward, FiTrendingUp, FiCheckCircle,
  FiFileText, FiUsers, FiUser, FiCalendar, FiBookOpen, FiMail, FiChevronDown,
} from "react-icons/fi";
import "./Electronics.css";

const IMG = "/images/departments/electronics";
const DEPT_IMG = "/images/faculty/electronics-communication";

// Same banner as the About / Facilities pages (a patterned navy banner shows if it is missing).
const banner = "/images/pages-banner.png";

const dept = {
  titleLines: ["Electronics & Communication", "Engineering"],
  lead: "Electronics, communication and related technologies - a strong academic and practical foundation for industry.",
  facts: [
    { icon: FiBookOpen, text: "3-year diploma" },
    { icon: FiUsers, text: "54 seats" },
    { icon: FiCalendar, text: "Annual placement drive" },
  ],
  image: `${DEPT_IMG}/hero.jpg`,
  imageAlt: "Electronics & Communication Engineering department",
};

// All eight departments. Wide screens show them as a row of pills, small screens as a dropdown.
// The same list is repeated in every department file on purpose.
const switcher = [
  { label: "Civil", to: "/departments/civil" },
  { label: "Computer", to: "/departments/computer" },
  { label: "Electrical", to: "/departments/electrical" },
  { label: "Electronics", to: "/departments/electronics" },
  { label: "Mechanical", to: "/departments/mechanical" },
  { label: "Plastic", to: "/departments/plastic" },
  { label: "Applied Sciences", to: "/departments/applied-science" },
  { label: "Workshop", to: "/departments/workshop" },
  { label: "Administrative", to: "/departments/administrative" },
];
const CURRENT = "/departments/electronics";
const currentLabel = switcher.find((item) => item.to === CURRENT)?.label;

// Two small pictures on top, one wide picture below (the layout of the About card).
const collage = [
  { src: `${DEPT_IMG}/about-1.jpg`, alt: "Electronics & Communication Engineering department - picture 1" },
  { src: `${DEPT_IMG}/about-2.jpg`, alt: "Electronics & Communication Engineering department - picture 2" },
  { src: `${DEPT_IMG}/about-3.jpg`, alt: "Electronics & Communication Engineering department - picture 3" },
];

// The three small tiles in the About card.
const aboutTiles = [
  { icon: FiBriefcase, value: "9", label: "Recruiters" },
  { icon: FiAward, value: "10", label: "Placed in 2021-22" },
  { icon: FiTrendingUp, value: "84.5%", label: "Top academic score" },
];

// view: "text" = paragraphs only, "chips" = items shown as chips, "list" = items shown as a tick list.
// paragraphs come before the items, closing paragraphs after them. The FIRST section sits in the card beside the collage.
const about = [
  {
    id: "intro",
    title: "About the Department",
    icon: FiInfo,
    view: "text",
    paragraphs: [
      "The Department of Electronics & Communication Engineering aims to give students a strong academic and practical foundation in electronics, communication and related technologies.",
      "The department focuses on technical competence, innovation and problem-solving. It promotes hands-on learning, research orientation and professional development to prepare students for the demands of industry.",
    ],
  },
  {
    id: "recruiters",
    title: "Our recruiters",
    icon: FiBriefcase,
    view: "chips",
    paragraphs: [
      "Many students of the department have joined well-known technical companies, including:",
    ],
    items: [
      "Motherson Sumi Pvt. Ltd.", "Tech Mahindra", "VVDN Manesar", "Ambar Enterprises Ltd.", "Alpex Solar Ltd.",
      "Aditya Birla Pvt. Ltd.", "Airtel Ltd.", "Micron Pvt. Ltd.", "Wipro Pvt. Ltd.",
    ],
  },
  {
    id: "toppers",
    title: "Academic toppers",
    icon: FiTrendingUp,
    view: "list",
    paragraphs: [
      "The academic record of students reflects their achievements:",
    ],
    items: [
      "Ranjan Kumar (Batch 2019) - 80.45%, Network Engineer at Airtel Pvt. Ltd.",
      "Anisha Hooda (Batch 2020) - 84.5%, pursuing B.Tech at Guru Jambheshwar University of Science and Technology, Hisar",
      "Ritu (Batch 2021) - 83.2%, campus placement at Aditya Birla, Panipat",
    ],
  },
  {
    id: "placements",
    title: "Placement status",
    icon: FiAward,
    view: "list",
    wide: true,
    paragraphs: [
      "An on-campus placement drive is held every year for final-year students, connecting them with private sector organizations.",
    ],
    items: [
      "Batch 2022: Yash Kumar - Motherson Sumi Ltd.",
      "Batch 2022: Kishan - Motherson Sumi Ltd.",
      "Batch 2022: Rohan Kumar - Motherson Sumi Ltd.",
      "Batch 2022: Deepak Kumar - Motherson Sumi Ltd.",
      "Batch 2021: Harsh - VVDN, Manesar",
      "Batch 2021: Ashutosh Kumar Anand - VVDN, Manesar",
      "Batch 2021: Gaurav - Motherson Sumi Ltd. and Ambar Enterprises Ltd.",
      "Batch 2021: Ritu - Aditya Birla, Panipat",
      "Batch 2021: Tanvi Jha - Alpex Solar Ltd., Greater Noida",
      "Batch 2021: Parvesh - VVDN, Manesar",
    ],
  },
  {
    id: "activities",
    title: "Activities and industry exposure",
    icon: FiUsers,
    view: "list",
    wide: true,
    paragraphs: [
      "The department prepares students for industry through:",
    ],
    items: [
      "Workshops and expert sessions on emerging technologies and industry trends",
      "Team-based student projects, supported by a project laboratory",
      "An institute-wide project exhibition - projects are judged on originality, practical application and creativity",
      "Industrial visits giving first-hand exposure to industry practices",
      "The annual campus placement drive",
    ],
  },
];

// One object per person (REAL data from each person's page on the live website).
// interest is empty for everyone on the live site, so that row is hidden until you fill it in. email shows as a mailto link
// (left out when the live page has none). The date of birth is NOT shown on purpose (it is personal information).
const staff = [
  { name: "Mr. Jai Kanwar", role: "Head of Department", photo: `${IMG}/staff/jai-kanwar.jpeg`, qualification: "B.E", interest: "", email: "jaiatulantil@yahoo.co.in" },
  { name: "Dr Sukhbir Singh Kinha", role: "Senior Lecturer", photo: `${IMG}/staff/23434_s2P8s6Q.jpg`, qualification: "B.E.(Hons), M.E.,PhD", interest: "", email: "sukhbirkinha@gmail.com" },
  { name: "Dr. Sitender Kumar", role: "Lecturer", photo: `${IMG}/staff/sitender-kumar.jpeg`, qualification: "BE,MS,Phd.", interest: "", email: "dr.pawadia@gmail.com" },
  { name: "Mr. Navinder Malik", role: "Lecturer", photo: `${IMG}/staff/navinder-malik.jpeg`, qualification: "B.Tech", interest: "", email: "navindermalik@yahoo.com" },
  { name: "Mr. Alok Kumar", role: "Lecturer", photo: `${IMG}/staff/alok-kumar.jpeg`, qualification: "B.E", interest: "", email: "alok_kumar_619@yahoo.com" },
  { name: "Ms. Ashima Singh", role: "Lecturer", photo: `${IMG}/staff/ashima-singh.jpeg`, qualification: "B.Tech in E.C.E", interest: "", email: "ashima.singh.hooda9@gmail.com" },
  { name: "Mr. Manoj Takshak", role: "Lab Instructor", photo: `${IMG}/staff/manoj-takshak.jpeg`, qualification: "B.E", interest: "", email: "takshakm@gmail.com" },
  { name: "Mr. Rajesh Hooda", role: "Lab Instructor", photo: `${IMG}/staff/rajesh-hooda.jpeg`, qualification: "Diploma", interest: "", email: "ssnandal60@gmail.com" }, // email as shown on the live page
  { name: "Sh. Suresh Nehra", role: "Workshop Instructor", photo: `${IMG}/staff/suresh-nehra_SKf7hQ9.jpeg`, qualification: "B.Tech", interest: "", email: "satyarth70@gmail.com" },
];

// Four visual cards, real facts from this department's page only.
const highlights = [
  {
    icon: FiBriefcase, value: "9", label: "Recruiters", image: `${IMG}/electronics-highlight-recruiters.jpg`,
    text: "Motherson Sumi, Tech Mahindra, VVDN, Wipro, Airtel, Micron and more.",
  },
  {
    icon: FiAward, value: "10", label: "Students placed", image: `${IMG}/electronics-highlight-placements.jpg`,
    text: "Campus placements of the 2021 and 2022 batches (4 students in 2022, 6 in 2021).",
  },
  {
    icon: FiTrendingUp, value: "84.5%", label: "Top academic score", image: `${IMG}/electronics-highlight-results.jpg`,
    text: "Anisha Hooda (Batch 2020) went on to B.Tech at Guru Jambheshwar University, Hisar.",
  },
  {
    icon: FiUsers, value: "54", label: "Seats", image: `${IMG}/electronics-highlight-seats.jpg`,
    text: "A three-year diploma in Electronics & Communication Engineering.",
  },
];

// ---------------------------------------------------------------------------------------------

const initials = (name) =>
  name
    .replace(/^(dr|mr|ms|mrs|er)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

// Wraps the searched word in <mark> so it is easy to spot.
function Mark({ text, query }) {
  if (!query) return text;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.split(new RegExp(`(${safe})`, "ig")).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? <mark key={i}>{part}</mark> : part,
  );
}

// One picture with a placeholder when the file is missing.
function Photo({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`ece-photo ${className}`}>
      {failed ? (
        <div className="ece-photo__empty" aria-hidden="true">
          <FiImage />
          <span>Photo coming soon</span>
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
      )}
    </figure>
  );
}

function Avatar({ person }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="ece-avatar">
      {failed || !person.photo ? (
        <span aria-hidden="true">{initials(person.name) || <FiUser />}</span>
      ) : (
        <img src={person.photo} alt={person.name} loading="lazy" decoding="async" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

// Keeps only the parts of a section that contain the searched word (the whole section if its heading matches).
function filterSection(section, q) {
  if (!q) return section;
  const has = (text) => text.toLowerCase().includes(q);
  if (has(section.title)) return section;
  const paragraphs = (section.paragraphs || []).filter(has);
  const items = (section.items || []).filter(has);
  const closing = (section.closing || []).filter(has);
  if (!paragraphs.length && !items.length && !closing.length) return null;
  return { ...section, paragraphs, items, closing };
}

export default function Electronics() {
  const [tab, setTab] = useState("about");
  const [query, setQuery] = useState("");
  const tabRefs = useRef({});
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const q = query.trim().toLowerCase();

  // The department dropdown (small screens) closes when you click outside it or press Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const pickTab = (id, focus = false) => {
    setTab(id);
    setQuery("");
    if (focus) tabRefs.current[id]?.focus();
  };

  const onTabKey = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      pickTab(tab === "about" ? "staff" : "about", true);
    }
  };

  // Without a search the first section is the collage card; with a search every section is a normal card.
  const [feature, ...rest] = about;
  const sections = (q ? about : rest).map((section) => filterSection(section, q)).filter(Boolean);
  const people = staff.filter((person) =>
    !q || [person.name, person.role, person.qualification, person.interest].filter(Boolean).join(" ").toLowerCase().includes(q),
  );

  return (
    <main id="main" className="ece-page">
      {/* ---- hero (same as About us / Facilities) ---- */}
      <section className="ece-hero" aria-label="Electronics & Communication Engineering department" style={{ "--img": `url("${banner}")` }}>
        <div className="ece-hero__photo" />
        <div className="ece-hero__tags">
          <span className="ece-hero__tag ece-hero__tag--left">
            <span className="ece-hero__tag-icon"><FaGraduationCap aria-hidden="true" /></span>
            Government Polytechnic
          </span>
          <span className="ece-hero__tag ece-hero__tag--right">
            <span className="ece-hero__tag-icon"><FiMapPin aria-hidden="true" /></span>
            Rohtak (Haryana)
          </span>
        </div>
        <nav className="ece-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight aria-hidden="true" />
          <span>Departments</span>
          <FiChevronRight aria-hidden="true" />
          <span aria-current="page">Electronics</span>
        </nav>
      </section>

      <div className="container ece-wrap">
        {/* ---- title block + department picture ---- */}
        <header className="ece-top">
          <div className="ece-top__text">
            <span className="ece-eyebrow">Department</span>
            <h1>{dept.titleLines.map((line) => <span key={line}>{line}</span>)}</h1>
            <p>{dept.lead}</p>
            <ul className="ece-facts">
              {dept.facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <li key={fact.text}>
                    <Icon aria-hidden="true" />
                    {fact.text}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="ece-frame">
            <Photo src={dept.image} alt={dept.imageAlt} className="ece-frame__photo" />
          </div>
        </header>

        {/* ---- department switcher: pills on wide screens, a dropdown on small screens ---- */}
        <nav className="ece-switch" aria-label="Departments">
          <ul className="ece-switch__list">
            {switcher.map((item) => {
              const isCurrent = item.to === CURRENT;
              return (
                <li key={item.to}>
                  <Link to={item.to} className={`ece-switch__link${isCurrent ? " is-current" : ""}`} aria-current={isCurrent ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ece-switch__menu" ref={menuRef}>
            <button
              type="button"
              className="ece-switch__button"
              aria-expanded={menuOpen}
              aria-controls="ece-switch-panel"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="ece-switch__label">Department</span>
              <span className="ece-switch__current">{currentLabel}</span>
              <FiChevronDown aria-hidden="true" />
            </button>
            {menuOpen && (
              <ul id="ece-switch-panel" className="ece-switch__panel">
                {switcher.map((item) => {
                  const isCurrent = item.to === CURRENT;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`ece-switch__link${isCurrent ? " is-current" : ""}`}
                        aria-current={isCurrent ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </nav>

        {/* ---- search + tabs ---- */}
        <section className="ece-info" aria-label="Department information">
          <div className="ece-toolbar">
            <label className="ece-search">
              <FiSearch aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={tab === "about" ? "Search the department information" : "Search staff by name or role"}
                aria-label={tab === "about" ? "Search the department information" : "Search staff"}
              />
              {query && (
                <button type="button" className="ece-search__clear" onClick={() => setQuery("")} aria-label="Clear search">
                  <FiX aria-hidden="true" />
                </button>
              )}
            </label>

            <div className="ece-tabs" role="tablist" aria-label="Department sections" onKeyDown={onTabKey}>
              <button
                ref={(el) => { tabRefs.current.about = el; }}
                type="button" role="tab" id="ece-tab-about" aria-selected={tab === "about"} aria-controls="ece-panel"
                tabIndex={tab === "about" ? 0 : -1} className={`ece-tab${tab === "about" ? " is-active" : ""}`} onClick={() => pickTab("about")}
              >
                <FiFileText aria-hidden="true" /> About
              </button>
              <button
                ref={(el) => { tabRefs.current.staff = el; }}
                type="button" role="tab" id="ece-tab-staff" aria-selected={tab === "staff"} aria-controls="ece-panel"
                tabIndex={tab === "staff" ? 0 : -1} className={`ece-tab${tab === "staff" ? " is-active" : ""}`} onClick={() => pickTab("staff")}
              >
                <FiUsers aria-hidden="true" /> Staff <span className="ece-tab__n">{staff.length}</span>
              </button>
            </div>
          </div>

          <div id="ece-panel" className="ece-panel" role="tabpanel" aria-labelledby={`ece-tab-${tab}`} tabIndex={0}>
            {tab === "about" ? (
              <>
                {!q && (
                  <article className="ece-feature">
                    <div className="ece-collage">
                      <Photo src={collage[0].src} alt={collage[0].alt} className="ece-collage__a" />
                      <Photo src={collage[1].src} alt={collage[1].alt} className="ece-collage__b" />
                      <Photo src={collage[2].src} alt={collage[2].alt} className="ece-collage__c" />
                    </div>
                    <div className="ece-feature__text">
                      <span className="ece-feature__bar" aria-hidden="true" />
                      <h2>{feature.title}</h2>
                      {feature.paragraphs.map((text) => <p key={text}>{text}</p>)}
                      <ul className="ece-tiles">
                        {aboutTiles.map((tile) => {
                          const Icon = tile.icon;
                          return (
                            <li key={tile.label}>
                              <Icon aria-hidden="true" />
                              <strong>{tile.value}</strong>
                              <span>{tile.label}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </article>
                )}

                {sections.length > 0 ? (
                  <div className="ece-about">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <article key={section.id} className={`ece-block${section.wide ? " ece-block--wide" : ""}`}>
                          <h2><span className="ece-block__icon"><Icon aria-hidden="true" /></span><Mark text={section.title} query={q} /></h2>
                          {section.paragraphs?.map((text) => <p key={text}><Mark text={text} query={q} /></p>)}
                          {section.items?.length > 0 && (
                            <ul className={`ece-items ece-items--${section.view}`}>
                              {section.items.map((item) => (
                                <li key={item}>
                                  {section.view === "list" && <FiCheckCircle aria-hidden="true" />}
                                  <span><Mark text={item} query={q} /></span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {section.closing?.map((text) => <p key={text}><Mark text={text} query={q} /></p>)}
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <p className="ece-none">Nothing found for "{query}". Try another word.</p>
                )}
              </>
            ) : people.length > 0 ? (
              <ul className="ece-staff">
                {people.map((person) => (
                  <li key={person.name} className="ece-card">
                    <Avatar person={person} />
                    <div className="ece-card__body">
                      <h3><Mark text={person.name} query={q} /></h3>
                      <span className="ece-card__role"><Mark text={person.role} query={q} /></span>
                      <dl>
                        <div>
                          <dt>Qualification</dt>
                          <dd>{person.qualification ? <Mark text={person.qualification} query={q} /> : <span className="ece-card__none" aria-label="Not added yet">-</span>}</dd>
                        </div>
                        {person.interest && (
                          <div>
                            <dt>Interested area</dt>
                            <dd><Mark text={person.interest} query={q} /></dd>
                          </div>
                        )}
                      </dl>
                    </div>
                    {person.email && (
                      <a className="ece-card__mail" href={`mailto:${person.email}`}>
                        <FiMail aria-hidden="true" />
                        <span>{person.email}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ece-none">No staff found for "{query}". Try another name or role.</p>
            )}
          </div>
        </section>

        {/* ---- department highlights ---- */}
        <section className="ece-highlights" aria-labelledby="ece-hl-title">
          <header className="ece-head">
            <span className="ece-eyebrow ece-eyebrow--line">At a glance</span>
            <h2 id="ece-hl-title">Department <span>highlights</span></h2>
          </header>
          <ul className="ece-hl">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="ece-hl__card" style={{ "--hl-img": `url("${item.image}")` }}>
                  <div className="ece-hl__top">
                    <span className="ece-hl__icon"><Icon aria-hidden="true" /></span>
                    <strong>{item.value}</strong>
                  </div>
                  <span className="ece-hl__label">{item.label}</span>
                  <p>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}