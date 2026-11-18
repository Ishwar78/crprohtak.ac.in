// Notices.jsx - Notices (route: /notices).
// Page order: hero -> title + navy "latest" card -> tabs, search and category chips -> notice list -> help strip.
// Own hero, own styles (Notices.css, every class starts with "ntc-").
//
// WHAT IS REAL AND WHAT IS ASSUMED
//   REAL     all 40 notices and 10 activities below, in the same order as the live Notices page (newest first), with the same
//            titles. The live page has NO date field, so every `date` is empty - a year appears only where it is already in a title.
//   ASSUMED  the `category` of each notice (Admissions, Exams, ...). It is our grouping from the titles, not from the live site.
//   NO FILE  "Directions for manual counselling" and the second "Inviting Tender..." have no file on the live site (file: "").
//            They show as text only, with no dead link.
//
// ADMIN-READY: this page only reads two lists, `notices` and `activities`. Each item is one row:
//     { id, title, category, file, date, note }
//   id        a unique number          category  one of the ids in `categories` below (activities ignore it)
//   file      the file name inside public/docs/notices/ (".pdf .jpg .jpeg .png .docx .xlsx"), or "" for no file.
//             The file type badge (PDF / Image / Document / Sheet) is worked out from the extension.
//   date      optional, "YYYY-MM-DD". If set it is shown on the row and the list is sorted newest first.
//   note      optional one-line text under the title.
// To connect an admin panel later, replace the two lists with data fetched from the server in the same shape.
// To add a notice by hand: add a row at the TOP of `notices` and save the file in public/docs/notices/.
//
// FILES TO COPY: save every file in notice-files-list.txt into public/docs/notices/ with the SAME name.
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import {
  FiMapPin, FiChevronRight as FiCrumbArrow, FiSearch, FiFileText, FiImage, FiGrid, FiExternalLink, FiClock,
  FiBell, FiPhone, FiMail, FiArrowRight, FiChevronDown,
} from "react-icons/fi";
import "./Notices.css";

const hero = { image: "/images/pages-banner.png" }; // wide photo; if it is missing a patterned navy banner shows instead

const intro = {
  eyebrow: "Latest updates",
  title: "Notices",
  lead: "Admission lists, exam datesheets, scholarships, holidays and other announcements from the institute.",
};

const contact = { phones: ["01262-274667", "01262-285667"], email: "crprohtak@hry.nic.in" };

const FILE_FOLDER = "/docs/notices/"; // every `file` below lives in this folder (public/docs/notices)
const PAGE_SIZE = 10; // rows shown at first, and added each time "Show more" is pressed

// Category chips (notices tab only). Add a new one here, then use its id in `category`.
const categories = [
  { id: "admissions", label: "Admissions" },
  { id: "exams", label: "Exams" },
  { id: "scholarships", label: "Scholarships" },
  { id: "events", label: "Holidays & events" },
  { id: "tenders", label: "Tenders" },
  { id: "other", label: "Other" },
];

// REAL - the live "Notices" table, in order.
const notices = [
  { id: 1, title: "Tender", category: "tenders", file: "d436029d-7b43-4fd1-8f24-edaee6853c9b.jpeg", date: "", note: "" },
  { id: 2, title: "DET-L MERIT LIST 2026", category: "admissions", file: "Det-L_merit_list_26.pdf", date: "", note: "" },
  { id: 3, title: "DET MERIT LIST 2026", category: "admissions", file: "DET_MERIT_LIST_26.pdf", date: "", note: "" },
  { id: 4, title: "Admission Notice 2026", category: "admissions", file: "23face6d-e7bd-4d5c-97d5-ea9814f050ca.jpeg", date: "", note: "" },
  { id: 5, title: "Reappear Internal Assessments", category: "exams", file: "f2804319-cd4a-45a1-976f-3a5c51c71822.jpeg", date: "", note: "" },
  { id: 6, title: "Fee Submission Update", category: "other", file: "5f80d130-3131-454b-af1e-f5a4b62a2563.jpeg", date: "", note: "" },
  { id: 7, title: "Scholarship Update", category: "scholarships", file: "04d8f828-9833-47b5-9c0b-4d0d88c47ec8.jpeg", date: "", note: "" },
  { id: 8, title: "Institute Level Manual Counselling 2025-26", category: "admissions", file: "manual_admissions.jpeg", date: "", note: "" },
  { id: 9, title: "Documents required for Verification", category: "admissions", file: "document_list.docx", date: "", note: "" },
  { id: 10, title: "First Counselling Details", category: "admissions", file: "admission_CsweCeS.pdf", date: "", note: "" },
  { id: 11, title: "Documents Required for Admission", category: "admissions", file: "f90e3923-35d3-4c6c-b874-bde5f48fe733.jpeg", date: "", note: "" },
  { id: 12, title: "Schedule for Admissions 2025-26", category: "admissions", file: "admission2.jpeg", date: "", note: "" },
  { id: 13, title: "Scholarship for SC students", category: "scholarships", file: "1966d634-759e-435b-bd88-3635884bbbfd.jpeg", date: "", note: "" },
  { id: 14, title: "Reappear Sessional Datesheet", category: "exams", file: "c32069ad-5a6d-43aa-a1d1-47e15b537e58.jpeg", date: "", note: "" },
  { id: 15, title: "Reappear Internal Assessment Exam from 14/10/2024 to 18/10/2024", category: "exams", file: "d94d2520-d761-4519-97f9-f0fd1a527e25.jpeg", date: "", note: "" },
  { id: 16, title: "MERIT LIST - DET-L 2024-25", category: "admissions", file: "DET-L_MERIT_LIST.pdf", date: "", note: "" },
  { id: 17, title: "MERIT LIST - DET 2024-25", category: "admissions", file: "DET_MERIT_LIST.pdf", date: "", note: "" },
  { id: 18, title: "List of Documents Required for Admission", category: "admissions", file: "d0a7ebbb-d7b6-4459-96ab-4d95f1dc18d0.jpeg", date: "", note: "" },
  { id: 19, title: "Verification for SC/BC students for PMS scholarship", category: "scholarships", file: "2a77d92d-5282-4891-adcf-26dbbc3533d4.jpeg", date: "", note: "" },
  { id: 20, title: "Christmas Leave", category: "events", file: "Holiday.pdf", date: "", note: "" },
  { id: 21, title: "Hawan Ceremony and Hockey Tournament on 24th November 2023", category: "events", file: "77a58295-08fe-4465-9a34-abd2afbde8f1.jpeg", date: "", note: "" },
  { id: 22, title: "Parents Teacher Meeting", category: "events", file: "e2b35a9e-5dbc-42d6-a75e-6e6234cd5b6e.jpeg", date: "", note: "" },
  { id: 23, title: "Decision of UMC Examination Committee", category: "exams", file: "Decision_of_UMC_Committee_Meeting_July_2023.pdf", date: "", note: "" },
  { id: 24, title: "Documents required for admission", category: "admissions", file: "56fec8a8-7693-449e-acf9-151f6e5d8391.jpeg", date: "", note: "" },
  { id: 25, title: "DET result / rank manual counselling", category: "admissions", file: "2445824119.pdf", date: "", note: "" },
  { id: 26, title: "Directions for manual counselling", category: "admissions", file: "", date: "", note: "Candidates on the rank / merit list report on 24.8.23 at 9:00 AM with documents and the admission fee." },
  { id: 27, title: "DET-L manual counselling merit / rank", category: "admissions", file: "72221ccb-2278-4b4f-8378-743a065f5dcf.jpeg", date: "", note: "Candidates on the rank / merit list report on 24.8.23 at 9:00 AM with documents." },
  { id: 28, title: "Manual Counselling for Admission in Diploma (DET/DET-L)", category: "admissions", file: "7a1bc903-19a8-4ab6-b294-d82cd0f44b1d_3r0gEWN.jpeg", date: "", note: "" },
  { id: 29, title: "Manual Counselling for Admission in Diploma (DET/DET-L)", category: "admissions", file: "7a1bc903-19a8-4ab6-b294-d82cd0f44b1d.jpeg", date: "", note: "" },
  { id: 30, title: "Revised Datesheet", category: "exams", file: "Revised_Datesheet_for_Diploma_HSBTE_Exam_July__2023.xlsx", date: "", note: "" },
  { id: 31, title: "Final Datesheet for diploma HSBTE exam July 2023", category: "exams", file: "Final_Datesheet_for_Diploma_HSBTE_Exam_July__2023_N4epya9.xlsx", date: "", note: "" },
  { id: 32, title: "Steps to generate Admit Card", category: "exams", file: "UM_Admit_Card.pdf", date: "", note: "" },
  { id: 33, title: "Holiday on account of Id-uz-Zuha", category: "events", file: "8d62f936-fadc-44b2-ac69-7b34b82ce312.jpeg", date: "", note: "" },
  { id: 34, title: "Annual Function: special fine of Rs 500 on absentees", category: "events", file: "30c39a79-4656-4a3e-baf1-1815b7589f6b.jpeg", date: "", note: "" },
  { id: 35, title: "Parents Teacher Meeting on 18.04.2023", category: "events", file: "ptm.jpg", date: "", note: "" },
  { id: 36, title: "62nd Annual Athletic Meet", category: "events", file: "IMG-20230325-WA0000.jpg", date: "", note: "" },
  { id: 37, title: "Internal complaints committee", category: "other", file: "WhatsApp_Image_2023-02-22_at_12.48.57_PM.jpeg", date: "", note: "" },
  { id: 38, title: "Parents Teacher Meeting", category: "events", file: "IMG-20221207-WA0011.jpg", date: "", note: "" },
  { id: 39, title: "Admission Notice 2022", category: "admissions", file: "63296657ccb561894fbcf421.pdf", date: "", note: "" },
  { id: 40, title: "Inviting Tender for Supply of Manpower", category: "tenders", file: "", date: "", note: "" },
];

// REAL - the live "Activities" table, in order. (category is not used on this tab)
const activities = [
  { id: 1, title: "CR Celebration 21 January 2026", category: "activities", file: "b4e6daee-f286-42db-a0a8-47b131b76db3.jpeg", date: "", note: "" },
  { id: 2, title: "CR Celebration 22 January 2026", category: "activities", file: "8e6be03e-2230-4beb-9064-684b11b63e77.jpeg", date: "", note: "" },
  { id: 3, title: "Application Form", category: "activities", file: "Application_Form.pdf", date: "", note: "" },
  { id: 4, title: "Advertisement", category: "activities", file: "Advertisement_.pdf", date: "", note: "" },
  { id: 5, title: "Manual Counselling for vacant / leftover seat at C.R. Polytechnic", category: "activities", file: "f67d424b-9fd8-4af9-b20a-ba663c510577.jpeg", date: "", note: "" },
  { id: 6, title: "External practicals for Regular & Reappear students", category: "activities", file: "443bab90-6862-4bba-a193-0d9fb727f079.jpeg", date: "", note: "" },
  { id: 7, title: "Er. Jaisingh Dabas Best Sportsperson Award 2024", category: "activities", file: "Sports_award.pdf", date: "", note: "" },
  { id: 8, title: "I card distribution of Life Members of Jat Education Society", category: "activities", file: "1049420e-96d6-4b43-a521-60512a5f879d.jpeg", date: "", note: "" },
  { id: 9, title: "Name struck off", category: "activities", file: "4ecececc-eb37-412d-ba7e-0116f53e5728.jpeg", date: "", note: "" },
  { id: 10, title: "Dead voter list", category: "activities", file: "Dead_voter-list.pdf", date: "", note: "" },
];

// ---- helpers (no need to edit) ----
const FILE_TYPES = {
  pdf: { label: "PDF", icon: FiFileText },
  jpg: { label: "Image", icon: FiImage },
  jpeg: { label: "Image", icon: FiImage },
  png: { label: "Image", icon: FiImage },
  docx: { label: "Document", icon: FiFileText },
  doc: { label: "Document", icon: FiFileText },
  xlsx: { label: "Sheet", icon: FiGrid },
  xls: { label: "Sheet", icon: FiGrid },
};

const fileType = (file) => FILE_TYPES[file.split(".").pop().toLowerCase()] || { label: "File", icon: FiFileText };
const categoryLabel = (id) => categories.find((item) => item.id === id)?.label ?? "";
const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// newest first when dates are given; rows without a date keep the order of the list
const sortRows = (rows) =>
  rows
    .map((row, index) => ({ row, index }))
    .sort((a, b) => (b.row.date || "").localeCompare(a.row.date || "") || a.index - b.index)
    .map((entry) => entry.row);

export default function Notices() {
  const [tab, setTab] = useState("notices"); // "notices" or "activities"
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [pickOpen, setPickOpen] = useState(false); // the category dropdown on small screens
  const pickRef = useRef(null);

  // close the dropdown on an outside click or Escape
  useEffect(() => {
    if (!pickOpen) return undefined;
    const onDown = (event) => { if (pickRef.current && !pickRef.current.contains(event.target)) setPickOpen(false); };
    const onKey = (event) => { if (event.key === "Escape") setPickOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [pickOpen]);

  const source = tab === "notices" ? notices : activities;

  const rows = useMemo(() => {
    const text = query.trim().toLowerCase();
    return sortRows(source).filter(
      (row) =>
        (tab === "activities" || category === "all" || row.category === category) &&
        (!text || row.title.toLowerCase().includes(text)),
    );
  }, [source, tab, category, query]);

  const visible = rows.slice(0, shown);
  const latest = sortRows(notices)[0];

  const changeTab = (next) => { setTab(next); setCategory("all"); setShown(PAGE_SIZE); };
  const changeCategory = (next) => { setCategory(next); setShown(PAGE_SIZE); setPickOpen(false); };
  const changeQuery = (value) => { setQuery(value); setShown(PAGE_SIZE); };

  return (
    <main id="main" className="ntc-page">
      <section className="ntc-hero" aria-label="Notices" style={{ "--img": `url("${hero.image}")` }}>
        <div className="ntc-hero__photo" />
        <div className="ntc-hero__tags">
          <span className="ntc-hero__tag ntc-hero__tag--left">
            <span className="ntc-hero__tag-icon"><FaGraduationCap aria-hidden="true" /></span>
            Government Polytechnic
          </span>
          <span className="ntc-hero__tag ntc-hero__tag--right">
            <span className="ntc-hero__tag-icon"><FiMapPin aria-hidden="true" /></span>
            Rohtak (Haryana)
          </span>
        </div>
        <nav className="ntc-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiCrumbArrow aria-hidden="true" />
          <span aria-current="page">Notices</span>
        </nav>
      </section>

      <div className="container ntc-wrap">
        {/* ---- title + navy "at a glance" card ---- */}
        <div className="ntc-top">
          <header className="ntc-intro">
            <span className="ntc-eyebrow">{intro.eyebrow}</span>
            <h1>{intro.title}</h1>
            <p>{intro.lead}</p>
          </header>

          <aside className="ntc-glance" aria-labelledby="ntc-glance-title">
            <span className="ntc-glance__icon"><FiBell aria-hidden="true" /></span>
            <h2 id="ntc-glance-title">At a glance</h2>
            <dl>
              <div>
                <dt>Notices</dt>
                <dd>{notices.length}</dd>
              </div>
              <div>
                <dt>Activities</dt>
                <dd>{activities.length}</dd>
              </div>
            </dl>
            {latest && (
              <p className="ntc-glance__latest">
                <span>Latest notice</span>
                {latest.title}
              </p>
            )}
          </aside>
        </div>

        {/* ---- tabs, search, chips and the list ---- */}
        <section className="ntc-block" aria-labelledby="ntc-list-title">
          <header className="ntc-head">
            <span className="ntc-eyebrow ntc-eyebrow--line">Browse</span>
            <h2 id="ntc-list-title">All <span>announcements</span></h2>
          </header>

          <div className="ntc-bar">
            <div className="ntc-tabs" role="group" aria-label="Choose a list">
              <button type="button" aria-pressed={tab === "notices"} onClick={() => changeTab("notices")}>
                Notices <span>{notices.length}</span>
              </button>
              <button type="button" aria-pressed={tab === "activities"} onClick={() => changeTab("activities")}>
                Activities <span>{activities.length}</span>
              </button>
            </div>

            <label className="ntc-search">
              <span className="sr-only">Search notices by title</span>
              <FiSearch aria-hidden="true" />
              <input
                type="search"
                value={query}
                placeholder="Search by title"
                onChange={(event) => changeQuery(event.target.value)}
              />
            </label>
          </div>

          {tab === "notices" && (
            <div className="ntc-chips" role="group" aria-label="Filter by category">
              <button type="button" aria-pressed={category === "all"} onClick={() => changeCategory("all")}>All</button>
              {categories.map((item) => (
                <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => changeCategory(item.id)}>
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* small screens: "All" stays outside, the other categories are in a dropdown (two per row) */}
          {tab === "notices" && (
            <div className="ntc-pick" ref={pickRef} role="group" aria-label="Filter by category">
              <button type="button" className="ntc-pick__all" aria-pressed={category === "all"} onClick={() => changeCategory("all")}>All</button>
              <button
                type="button"
                className={`ntc-pick__btn${category !== "all" ? " is-set" : ""}`}
                aria-expanded={pickOpen}
                aria-controls="ntc-pick-panel"
                onClick={() => setPickOpen((open) => !open)}
              >
                <span>{category === "all" ? "Choose a category" : categoryLabel(category)}</span>
                <FiChevronDown aria-hidden="true" />
              </button>
              {pickOpen && (
                <div id="ntc-pick-panel" className="ntc-pick__panel">
                  {categories.map((item) => (
                    <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => changeCategory(item.id)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="ntc-count" aria-live="polite">
            Showing {visible.length} of {rows.length}
          </p>

          {visible.length > 0 ? (
            <ul className="ntc-list">
              {visible.map((row) => {
                const type = row.file ? fileType(row.file) : null;
                const Icon = type ? type.icon : FiClock;
                return (
                  <li key={`${tab}-${row.id}`} className="ntc-row">
                    <span className="ntc-row__icon"><Icon aria-hidden="true" /></span>
                    <div className="ntc-row__body">
                      <h3>{row.title}</h3>
                      <p className="ntc-row__meta">
                        {tab === "notices" && row.category && <span className="ntc-row__tag">{categoryLabel(row.category)}</span>}
                        {type && <span className="ntc-row__type">{type.label}</span>}
                        {row.date && <span className="ntc-row__date">{formatDate(row.date)}</span>}
                      </p>
                      {row.note && <p className="ntc-row__note">{row.note}</p>}
                    </div>
                    {row.file ? (
                      <a className="ntc-open" href={`${FILE_FOLDER}${row.file}`} target="_blank" rel="noopener noreferrer">
                        Open
                        <FiExternalLink aria-hidden="true" />
                        <span className="sr-only"> {row.title} (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="ntc-soon">File coming soon</span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="ntc-empty">No notices match your search. Try a different word or choose All.</p>
          )}

          {rows.length > shown && (
            <button type="button" className="ntc-more" onClick={() => setShown(shown + PAGE_SIZE)}>
              Show more
            </button>
          )}
        </section>

        {/* ---- help strip ---- */}
        <section className="ntc-help" aria-labelledby="ntc-help-title">
          <div>
            <h2 id="ntc-help-title">Can&apos;t find a notice?</h2>
            <p>Ask the institute office. Some older notices may not be on this page.</p>
          </div>
          <div className="ntc-help__actions">
            <a className="ntc-btn ntc-btn--primary" href={`tel:${contact.phones[0].replace(/-/g, "")}`}>
              <FiPhone aria-hidden="true" />
              {contact.phones.join(" / ")}
            </a>
            <a className="ntc-btn ntc-btn--ghost" href={`mailto:${contact.email}`}>
              <FiMail aria-hidden="true" />
              {contact.email}
            </a>
            <Link className="ntc-btn ntc-btn--ghost" to="/events">
              Events
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}