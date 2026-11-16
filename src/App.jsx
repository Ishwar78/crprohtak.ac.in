// App.jsx - the route table: Preloader + Navbar around the pages. Every menu path without a real page yet shows the Placeholder.
import { Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Placeholder from "./pages/placeholder/Placeholder";
import History from "./pages/about/History";
import PrincipalMessage from "./pages/about/PrincipalMessage";
import RankAccreditation from "./pages/about/RankAccreditation";
import Alumni from "./pages/about/Alumni";
import Results from "./pages/about/Results";
import Entrepreneurship from "./pages/about/Entrepreneurship";
import Placements from "./pages/about/Placements";
import Courses from "./pages/about/Courses";
import Facilities from "./pages/about/Facilities";
import Luminaries from "./pages/about/Luminaries";
import Projects from "./pages/about/Projects";
import Extracurricular from "./pages/about/Extracurricular";
import UnnatBharatAbhiyan from "./pages/about/UnnatBharatAbhiyan";
import Gallery from "./pages/media/Gallery";
import Videos from "./pages/media/Videos";
import SocialLinks from "./pages/media/SocialLinks";
import Admissions from "./pages/students/Admissions";
import OnlineLearning from "./pages/students/OnlineLearning";
import SkillCourses from "./pages/students/SkillCourses";
import Freelancing from "./pages/students/Freelancing";
import Incubator from "./pages/students/Incubator";
import Apprenticeship from "./pages/students/Apprenticeship";
import NccNss from "./pages/students/NccNss";
import StudentHelpline from "./pages/students/StudentHelpline";
import GrievanceRedressal from "./pages/students/GrievanceRedressal";
import EServices from "./pages/students/EServices";
import Notices from "./pages/notices/Notices";
import Events from "./pages/events/Events";
import Contact from "./pages/about/Contact";
import TrainingPolicy from "./pages/faculty/TrainingPolicy";
import AntiRagging from "./pages/faculty/AntiRagging";
import AntiSexualHarassment from "./pages/faculty/AntiSexualHarassment";
import ServiceRules from "./pages/faculty/ServiceRules";
import IQAC from "./pages/faculty/IQAC";
import FacultyEServices from "./pages/faculty/FacultyEServices";
import Computer from "./pages/faculty/Computer";

const routeLabels = {
  "/about/mandatory-disclosure": "Mandatory disclosure",
  "/about/annual-report": "Annual report",
  "/students/academic-calendar": "Academic calendar",
};
const placeholderPaths = Object.keys(routeLabels);

export default function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/principal-message" element={<PrincipalMessage />} />
        <Route path="/about/rank-accreditation" element={<RankAccreditation />} />
        <Route path="/about/alumni" element={<Alumni />} />
        <Route path="/about/results" element={<Results />} />
        <Route path="/about/entrepreneurship" element={<Entrepreneurship />} />
        <Route path="/about/placements" element={<Placements />} />
        <Route path="/about/courses" element={<Courses />} />
        <Route path="/about/facilities" element={<Facilities />} />
        <Route path="/about/luminaries" element={<Luminaries />} />
        <Route path="/about/projects" element={<Projects />} />
        <Route path="/about/extracurricular" element={<Extracurricular />} />
        <Route path="/about/unnat-bharat-abhiyan" element={<UnnatBharatAbhiyan />} />
        <Route path="/media/photos" element={<Gallery />} />
        <Route path="/media/videos" element={<Videos />} />
        <Route path="/media/social" element={<SocialLinks />} />
        <Route path="/students/admissions" element={<Admissions />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/students/online-learning" element={<OnlineLearning />} />
        <Route path="/students/skill-courses" element={<SkillCourses />} />
        <Route path="/students/freelancing" element={<Freelancing />} />
        <Route path="/students/incubator" element={<Incubator />} />
        <Route path="/students/apprenticeship" element={<Apprenticeship />} />
        <Route path="/students/ncc-nss" element={<NccNss />} />
        <Route path="/students/helpline" element={<StudentHelpline />} />
        <Route path="/students/grievance" element={<GrievanceRedressal />} />
        <Route path="/students/e-services" element={<EServices />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about/contact" element={<Contact />} />
        <Route path="/faculty/training-policy" element={<TrainingPolicy />} />
        <Route path="/faculty/anti-ragging" element={<AntiRagging />} />
        <Route path="/faculty/anti-sexual-harassment" element={<AntiSexualHarassment />} />
        <Route path="/faculty/service-rules" element={<ServiceRules />} />
        <Route path="/faculty/iqac" element={<IQAC />} />
        <Route path="/faculty/e-services" element={<FacultyEServices />} />
        <Route path="/departments/computer" element={<Computer />} />
        {placeholderPaths.map((path) => <Route key={path} path={path} element={<Placeholder routeLabels={routeLabels} />} />)}
        <Route path="/departments/:id" element={<Placeholder routeLabels={routeLabels} />} />
        <Route path="*" element={<Placeholder notFound routeLabels={routeLabels} />} />
      </Routes>
      <Footer />
    </>
  );
}
