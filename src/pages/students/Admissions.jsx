// Admissions.jsx - Students > Admissions (routes: /students/admissions and /admissions).
// Page order: hero -> title + "apply" card -> 4 admission steps -> programmes and seats -> notices, downloads and merit lists -> FAQ -> help strip.
// Own hero, own styles (Admissions.css, every class starts with "adm-").
//
// HOW THE COLLEGE UPDATES THIS PAGE EACH YEAR - everything is a list at the top of this file:
//   session     the admission year shown in the title and the apply card
//   portalUrl   the state technical admissions portal
//   posters     the admission poster / notice pictures (public/images/admission/)
//   documents   the files students download (public/docs/)
//   notices     latest merit lists and notices, newest first - each has a date and a file
//   courses     the six diplomas and their seats (same numbers as the Courses page)
// Nothing is loaded from the old website. A missing picture shows a clean placeholder tile.
//
// FILES TO COPY INTO THE PROJECT (they are on the old website under /media/page_files/ and /media/Notice/):
//   public/images/admission/admission-2026.jpeg           <- Admission_2026.jpeg
//   public/images/admission/admission-notice-2026.jpeg    <- the 22 May 2026 admission notice picture
//   public/docs/admission-key-dates.jpeg                  <- Admission_Dates.jpeg
//   public/docs/admission-counselling-dates.pdf           <- admission_CsweCeS.pdf
//   public/docs/admission-documents-list.docx             <- document_list_1.docx
//   public/docs/manual-admission-form.pdf                 <- Manual_Form.pdf
//   public/docs/notices/det-merit-list-2026.pdf           <- DET_MERIT_LIST_26.pdf
//   public/docs/notices/det-l-merit-list-2026.pdf         <- Det-L_merit_list_26.pdf
//   public/docs/notices/admission-notice-2026.jpeg        <- the 3 July 2026 admission notice picture
import { useState } from "react";
import {
  FiArrowUpRight, FiArrowRight, FiFileText, FiDownload, FiCalendar, FiEdit3, FiUsers, FiCheckCircle, FiPhone, FiMail,
  FiBox, FiCpu, FiZap, FiRadio, FiSettings, FiDroplet, FiImage, FiPlus, FiHelpCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { FiMapPin, FiChevronRight as FiCrumbArrow } from "react-icons/fi";
import "./Admissions.css";

const hero = { image: "/images/pages-banner.png" }; // wide photo; if it is missing a patterned navy banner shows instead

const session = "2026-27";
const portalUrl = "https://techadmissionshry.gov.in/";

const intro = {
  eyebrow: "Students",
  title: `Admissions ${session}`,
  lead: "Admissions are open for the three-year diploma programmes. Follow the four steps below, keep the key dates handy and apply on the state admissions portal.",
};

const contact = { phones: ["01262-274667", "01262-285667"], email: "crprohtak@hry.nic.in" };

// Same six programmes and seats as the Courses page.
const courses = [
  { id: "civil", name: "Civil Engineering", icon: FiBox, seats: 60 },
  { id: "computer", name: "Computer Engineering", icon: FiCpu, seats: 54 },
  { id: "electrical", name: "Electrical Engineering", icon: FiZap, seats: 60 },
  { id: "electronics", name: "Electronics & Communication", icon: FiRadio, seats: 54 },
  { id: "mechanical", name: "Mechanical Engineering", icon: FiSettings, seats: 60 },
  { id: "plastic", name: "Plastic Technology", icon: FiDroplet, seats: 54 },
];

const steps = [
  { icon: FiCalendar, title: "Note the key dates", text: "Check the online admission dates and the counselling dates first. Both are in the downloads on this page." },
  { icon: FiEdit3, title: "Apply on the state portal", text: "Online admissions to the diploma programmes run through the Haryana technical admissions portal. Register and complete your application there." },
  { icon: FiUsers, title: "Attend counselling", text: "Seats are allotted through counselling, based on the merit lists. Merit lists and counselling details are posted on this page and on the Notices page." },
  { icon: FiCheckCircle, title: "Verify and join", text: "Bring the documents listed for physical verification to the institute to confirm your seat." },
];

const posters = [
  { src: "/images/admission/admission-2026.jpeg", label: `Admissions open ${session}` },
  { src: "/images/admission/admission-notice-2026.jpeg", label: "Official admission notice" },
];

const documents = [
  { label: "Key dates for online admissions", href: "/docs/admission-key-dates.jpeg", type: "JPEG" },
  { label: "Counselling dates", href: "/docs/admission-counselling-dates.pdf", type: "PDF" },
  { label: "Documents required for physical verification", href: "/docs/admission-documents-list.docx", type: "DOCX" },
  { label: "Manual admission form", href: "/docs/manual-admission-form.pdf", type: "PDF" },
];

// Newest first. Add a line here whenever a new merit list or admission notice is published.
const notices = [
  { title: "DET merit list 2026", date: "8 July 2026", href: "/docs/notices/det-merit-list-2026.pdf", type: "PDF" },
  { title: "DET-L merit list 2026", date: "8 July 2026", href: "/docs/notices/det-l-merit-list-2026.pdf", type: "PDF" },
  { title: "Admission notice 2026", date: "3 July 2026", href: "/docs/notices/admission-notice-2026.jpeg", type: "JPEG" },
];

const faqs = [
  { q: "Where do I apply?", a: "Online admissions run through the state technical admissions portal. Use the Apply button at the top of this page to open it." },
  { q: "Which programmes can I choose?", a: "Six three-year diplomas: Civil, Computer, Electrical, Electronics & Communication, Mechanical and Plastic Technology, approved by DTE Haryana and AICTE." },
  { q: "Where are the merit lists and counselling dates?", a: "Both are on this page under Notices and downloads. New lists are also posted on the Notices page." },
  { q: "What if seats are still vacant after counselling?", a: "The institute holds manual counselling for vacant seats and announces it on the Notices page. The manual admission form is in the downloads." },
  { q: "Who can I ask for help?", a: "Call the institute office or send an email - the details are at the bottom of this page." },
];

const totalSeats = courses.reduce((sum, course) => sum + course.seats, 0);
const topSeats = Math.max(...courses.map((course) => course.seats));

// A notice picture. If the file is missing, a clean placeholder tile is shown instead.
function Poster({ src, label }) {
  const [failed, setFailed] = useState(false);
  return (
    <a className="adm-poster" href={src} target="_blank" rel="noopener noreferrer">
      <span className="adm-poster__frame">
        {failed ? (
          <span className="adm-poster__empty" aria-hidden="true">
            <FiImage />
            <span>Notice coming soon</span>
          </span>
        ) : (
          <img src={src} alt={label} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        )}
      </span>
      <span className="adm-poster__label">
        {label}
        <small>
          View full size
          <FiArrowUpRight aria-hidden="true" />
        </small>
      </span>
    </a>
  );
}

export default function Admissions() {
  return (
    <main id="main" className="adm-page">
      <section className="adm-hero" aria-label="Admissions" style={{ "--img": `url("${hero.image}")` }}>
        <div className="adm-hero__photo" />
        <div className="adm-hero__tags">
          <span className="adm-hero__tag adm-hero__tag--left">
            <span className="adm-hero__tag-icon"><FaGraduationCap aria-hidden="true" /></span>
            Government Polytechnic
          </span>
          <span className="adm-hero__tag adm-hero__tag--right">
            <span className="adm-hero__tag-icon"><FiMapPin aria-hidden="true" /></span>
            Rohtak (Haryana)
          </span>
        </div>
        <nav className="adm-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiCrumbArrow aria-hidden="true" />
          <span>Students</span>
          <FiCrumbArrow aria-hidden="true" />
          <span aria-current="page">Admissions</span>
        </nav>
      </section>

      <div className="container adm-wrap">
        {/* ---- title + apply card ---- */}
        <div className="adm-top">
          <header className="adm-intro">
            <span className="adm-eyebrow">{intro.eyebrow}</span>
            <h1>{intro.title}</h1>
            <p>{intro.lead}</p>
            <div className="adm-intro__actions">
              <a className="adm-btn adm-btn--primary" href={portalUrl} target="_blank" rel="noopener noreferrer">
                Apply on the state portal
                <FiArrowUpRight aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a className="adm-btn adm-btn--line" href="#adm-notices">
                Dates and downloads
                <FiArrowRight aria-hidden="true" />
              </a>
            </div>
          </header>

          <aside className="adm-apply" aria-label="Admissions at a glance">
            <span className="adm-apply__pill"><i aria-hidden="true" /> Admissions open</span>
            <p className="adm-apply__session">Session <strong>{session}</strong></p>
            <dl>
              <div><dt>{courses.length}</dt><dd>Diploma programmes</dd></div>
              <div><dt>{totalSeats}</dt><dd>Approved seats</dd></div>
              <div><dt>3 yrs</dt><dd>Each diploma</dd></div>
            </dl>
          </aside>
        </div>

        {/* ---- four steps ---- */}
        <section className="adm-block" aria-labelledby="adm-steps-title">
          <header className="adm-head">
            <span className="adm-eyebrow adm-eyebrow--line">How it works</span>
            <h2 id="adm-steps-title">Your admission in <span>4 steps</span></h2>
          </header>
          <ol className="adm-steps">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="adm-step">
                  <span className="adm-step__no" aria-hidden="true">{index + 1}</span>
                  <span className="adm-step__icon"><Icon aria-hidden="true" /></span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ---- programmes and seats ---- */}
        <section className="adm-block" aria-labelledby="adm-prog-title">
          <header className="adm-head">
            <span className="adm-eyebrow adm-eyebrow--line">Programmes</span>
            <h2 id="adm-prog-title">Choose your <span>branch</span></h2>
          </header>
          <ul className="adm-prog">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <li key={course.id}>
                  <Link className="adm-prog__card" to={`/departments/${course.id}`}>
                    <span className="adm-prog__icon"><Icon aria-hidden="true" /></span>
                    <span className="adm-prog__body">
                      <strong>{course.name}</strong>
                      <span className="adm-prog__seats">{course.seats} seats</span>
                      <span className="adm-prog__bar" aria-hidden="true"><i style={{ width: `${(course.seats / topSeats) * 100}%` }} /></span>
                    </span>
                    <FiArrowRight className="adm-prog__go" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ---- notices, downloads, merit lists ---- */}
        <section id="adm-notices" className="adm-block" aria-labelledby="adm-docs-title">
          <header className="adm-head">
            <span className="adm-eyebrow adm-eyebrow--line">Notices and downloads</span>
            <h2 id="adm-docs-title">Everything you <span>need to download</span></h2>
          </header>

          <div className="adm-posters">
            {posters.map((poster) => (
              <Poster key={poster.src} {...poster} />
            ))}
          </div>

          <div className="adm-lists">
            <div className="adm-list">
              <h3>Downloads</h3>
              <ul>
                {documents.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      <span className="adm-list__icon"><FiFileText aria-hidden="true" /></span>
                      <span className="adm-list__label">{item.label}</span>
                      <span className="adm-list__type">{item.type}</span>
                      <FiDownload className="adm-list__go" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="adm-list">
              <h3>Merit lists and latest notices</h3>
              <ul>
                {notices.map((item) => (
                  <li key={item.title}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      <span className="adm-list__icon"><FiFileText aria-hidden="true" /></span>
                      <span className="adm-list__label">
                        {item.title}
                        <small>{item.date}</small>
                      </span>
                      <span className="adm-list__type">{item.type}</span>
                      <FiDownload className="adm-list__go" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <Link className="adm-list__all" to="/notices">
                All notices
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ---- questions ---- */}
        <section className="adm-block" aria-labelledby="adm-faq-title">
          <header className="adm-head">
            <span className="adm-eyebrow adm-eyebrow--line">Questions</span>
            <h2 id="adm-faq-title">Quick <span>answers</span></h2>
          </header>
          <div className="adm-faq">
            {faqs.map((item) => (
              <details key={item.q} className="adm-faq__item">
                <summary>
                  <span className="adm-faq__q"><FiHelpCircle aria-hidden="true" />{item.q}</span>
                  <FiPlus className="adm-faq__plus" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---- help strip ---- */}
        <section className="adm-help" aria-labelledby="adm-help-title">
          <div>
            <h2 id="adm-help-title">Need help with your admission?</h2>
            <p>The institute office will guide you with dates, documents and counselling.</p>
          </div>
          <div className="adm-help__actions">
            <a className="adm-btn adm-btn--primary" href={`tel:${contact.phones[0].replace(/-/g, "")}`}>
              <FiPhone aria-hidden="true" />
              {contact.phones.join(" / ")}
            </a>
            <a className="adm-btn adm-btn--ghost" href={`mailto:${contact.email}`}>
              <FiMail aria-hidden="true" />
              {contact.email}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}