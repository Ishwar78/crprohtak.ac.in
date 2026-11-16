// Footer.jsx - site footer on every page: logo + contact, three link columns, copyright bar.
import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiArrowUpRight } from "react-icons/fi";
import "./Footer.css";

const site = {
  name: "Chhotu Ram Polytechnic",
  city: "Rohtak",
  phones: ["01262-274667", "01262-285667"],
  email: "crprohtak@hry.nic.in",
  address: "Delhi Road, Rohtak, Haryana 124001",
  affiliation: "Affiliated to HSBTE, Panchkula & AICTE, New Delhi",
  map: { url: "https://www.google.com/maps?q=28.885496,76.617082" },
};

const columns = [
  { title: "Explore", links: [
    { label: "History", to: "/about/history" }, { label: "Principal's desk", to: "/about/principal-message" }, { label: "Facilities", to: "/about/facilities" },
    { label: "Courses offered", to: "/about/courses" }, { label: "Placements", to: "/about/placements" }, { label: "Contact us", to: "/about/contact" },
  ] },
  { title: "Students", links: [
    { label: "Admissions", to: "/students/admissions" }, { label: "Academic calendar", to: "/students/academic-calendar" }, { label: "Exams (HSBTE)", href: "https://hsbte.org.in" },
    { label: "Student helpline", to: "/students/helpline" }, { label: "Grievance redressal", to: "/students/grievance" }, { label: "E-services", to: "/students/e-services" },
  ] },
  { title: "Faculty", links: [
    { label: "Training policy", to: "/faculty/training-policy" }, { label: "Service rules", to: "/faculty/service-rules" }, { label: "Anti ragging", to: "/faculty/anti-ragging" },
    { label: "Anti sexual harassment", to: "/faculty/anti-sexual-harassment" }, { label: "IQAC", to: "/faculty/iqac" }, { label: "HRMS", to: "/faculty/hrms" },
  ] },
];

export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" aria-label={`${site.name}, ${site.city} - home`}><img src="/logo.png" width="1233" height="204" alt="" loading="lazy" /></Link>
          <address>
            <p><FiMapPin aria-hidden="true" /> <span>{site.address}</span></p>
            <p><FiPhone aria-hidden="true" /> <span>{site.phones.map((phone, i) => <a key={phone} href={`tel:${phone.replace(/-/g, "")}`}>{phone}{i < site.phones.length - 1 ? ", " : ""}</a>)}</span></p>
            <p><FiMail aria-hidden="true" /> <a href={`mailto:${site.email}`}>{site.email}</a></p>
          </address>
          <a className="footer__map" href={site.map.url} target="_blank" rel="noopener noreferrer">How to reach us <FiArrowUpRight aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map((item) => (
                <li key={item.label}>
                  {item.href
                    ? <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label} <FiArrowUpRight aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>
                    : <Link to={item.to}>{item.label}</Link>}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-row">
          <p>© {new Date().getFullYear()} {site.name}, {site.city}. All rights reserved.</p>
          <p>{site.affiliation}</p>
        </div>
      </div>
    </footer>
  );
}