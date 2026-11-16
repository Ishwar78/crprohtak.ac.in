// Placeholder.jsx - stand-in page for every route that has no real page yet (also used for "page not found").
import { Link, useLocation, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./placeholder.css";

const departmentNames = {
  civil: "Civil Engineering",
  computer: "Computer Engineering",
  electrical: "Electrical Engineering",
  electronics: "Electronics & Communication",
  mechanical: "Mechanical Engineering",
  plastic: "Plastic Technology",
  "applied-science": "Applied Sciences",
  workshop: "Workshop Department",
};

export default function Placeholder({ notFound = false, routeLabels }) {
  const { pathname } = useLocation();
  const { id } = useParams();
  const title = notFound ? "Page not found" : (id && departmentNames[id]) || routeLabels[pathname] || "This page";
  return (
    <main id="main" className="placeholder">
      <div className="container placeholder__box">
        <span className="eyebrow">{notFound ? "Error 404" : "Coming soon"}</span>
        <h1>{title}</h1>
        <p>{notFound ? "We could not find the page you were looking for." : "This page is being redesigned and will be available shortly."}</p>
        <Link className="btn btn--navy" to="/"><FiArrowLeft aria-hidden="true" /> Back to home</Link>
      </div>
    </main>
  );
}
