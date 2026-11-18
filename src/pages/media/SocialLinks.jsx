// SocialLinks.jsx - Media > Social Links.
// Page order: hero -> title + "reach us" card -> official page cards -> share strip.
//
// ADDING A CHANNEL: add one object to the `channels` list. The cards re-flow by themselves
// (two across for two channels, three across for three, and so on).
//   id       any unique word
//   name     platform name
//   handle   the account name people will see
//   url      full link to the account (opens in a new tab)
//   icon     an icon component imported below, e.g. FaYoutube, FaLinkedinIn, FaWhatsapp from "react-icons/fa"
//   accent   "orange" or "sky" - the glow colour of the card
//   text     one or two sentences about what people find there
//   topics   up to 4 short words shown as small chips
//   cta      the button label
// To change the address, phone numbers or email, edit the `reach` list.
import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import {
  FiArrowUpRight, FiCopy, FiCheck, FiCheckCircle, FiShare2, FiPhone, FiMail, FiMapPin as FiPin,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { FiMapPin, FiChevronRight } from "react-icons/fi";
import "./SocialLinks.css";

const hero = { image: "/images/pages-banner.png" }; // if it is missing a patterned navy banner shows instead

const intro = {
  eyebrow: "Media",
  title: "Social Links",
  lead: "Follow Chhotu Ram Polytechnic for campus updates, events and announcements. Our official pages are listed below - always use these links.",
};

const channels = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@crprohtak",
    url: "https://www.instagram.com/crprohtak/",
    icon: FaInstagram,
    accent: "orange",
    text: "Photos and short stories from campus life, events and celebrations.",
    topics: ["Campus life", "Events", "Student moments"],
    cta: "Follow on Instagram",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "C.R. Polytechnic Rohtak",
    url: "https://www.facebook.com/C.R.POLYTECHNIC.ROHTAK",
    icon: FaFacebookF,
    accent: "sky",
    text: "The official page for news, notices and event updates from the institute.",
    topics: ["Notices", "News", "Event updates"],
    cta: "Visit our Facebook page",
  },
];

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Chhotu Ram Polytechnic, Delhi Road, Rohtak, Haryana 124001")}`;

const reach = [
  { id: "phone", icon: FiPhone, label: "Phone", value: "01262 - 274667, 285667", action: "Call now", href: "tel:01262274667" },
  { id: "email", icon: FiMail, label: "Email", value: "crprohtak1956@gmail.com", action: "Write an email", href: "mailto:crprohtak1956@gmail.com" },
  { id: "address", icon: FiPin, label: "Address", value: "Delhi Road, Rohtak, Haryana 124001", action: "Open in Maps", href: MAP_URL, external: true },
];

export default function SocialLinks() {
  const [copied, setCopied] = useState(null); // id of the link that was just copied
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt("Copy this link", text); // very old browsers
      return;
    }
    setCopied(id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 2000);
  };

  const sharePage = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
      } catch {
        /* the person closed the share sheet */
      }
      return;
    }
    copy("page", url);
  };

  return (
    <main id="main" className="soc-page">
      <section className="soc-hero" aria-label="Social links" style={{ "--img": `url("${hero.image}")` }}>
        <div className="soc-hero__photo" />
        <div className="soc-hero__tags">
          <span className="soc-hero__tag soc-hero__tag--left">
            <span className="soc-hero__tag-icon"><FaGraduationCap aria-hidden="true" /></span>
            Government Polytechnic
          </span>
          <span className="soc-hero__tag soc-hero__tag--right">
            <span className="soc-hero__tag-icon"><FiMapPin aria-hidden="true" /></span>
            Rohtak (Haryana)
          </span>
        </div>
        <nav className="soc-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight aria-hidden="true" />
          <span>Media</span>
          <FiChevronRight aria-hidden="true" />
          <span aria-current="page">Social Links</span>
        </nav>
      </section>

      <div className="container soc-wrap">
        {/* ---- title + reach-us card ---- */}
        <div className="soc-top">
          <header className="soc-intro">
            <span className="soc-eyebrow">{intro.eyebrow}</span>
            <h1>{intro.title}</h1>
            <p>{intro.lead}</p>
          </header>

          <aside className="soc-reach" aria-label="Contact details">
            <h2>Reach us directly</h2>
            <ul>
              {reach.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <span className="soc-reach__icon"><Icon aria-hidden="true" /></span>
                    <div>
                      <span className="soc-reach__label">{item.label}</span>
                      <strong>{item.value}</strong>
                      <a href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {item.action}
                        <FiArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>

        {/* ---- official pages ---- */}
        <section className="soc-channels" aria-labelledby="soc-channels-title">
          <header className="soc-head">
            <span className="soc-eyebrow">Official pages</span>
            <h2 id="soc-channels-title">
              Find us <span>online</span>
            </h2>
          </header>

          <ul className="soc-grid">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.id}>
                  <article className={`soc-card soc-card--${channel.accent}`}>
                    <Icon className="soc-card__ghost" aria-hidden="true" />
                    <div className="soc-card__head">
                      <span className="soc-card__icon"><Icon aria-hidden="true" /></span>
                      <span className="soc-card__badge">
                        <FiCheckCircle aria-hidden="true" />
                        Official page
                      </span>
                    </div>

                    <div className="soc-card__body">
                      <span className="soc-card__name">{channel.name}</span>
                      <strong>{channel.handle}</strong>
                      <p>{channel.text}</p>
                      {channel.topics?.length > 0 && (
                        <ul className="soc-card__topics" aria-label={`What you will find on ${channel.name}`}>
                          {channel.topics.map((topic) => (
                            <li key={topic}>{topic}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="soc-card__actions">
                      <a className="soc-btn soc-btn--primary" href={channel.url} target="_blank" rel="noopener noreferrer">
                        {channel.cta}
                        <FiArrowUpRight aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        className="soc-btn soc-btn--ghost"
                        onClick={() => copy(channel.id, channel.url)}
                        aria-label={`Copy the ${channel.name} link`}
                      >
                        {copied === channel.id ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                        {copied === channel.id ? "Copied" : "Copy link"}
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ---- share strip ---- */}
        <section className="soc-share" aria-label="Share this page">
          <div>
            <h2>Know someone who should follow us?</h2>
            <p>Share this page with friends, parents and alumni so they never miss an update.</p>
          </div>
          <button type="button" className="soc-btn soc-btn--primary" onClick={sharePage}>
            {copied === "page" ? <FiCheck aria-hidden="true" /> : <FiShare2 aria-hidden="true" />}
            {copied === "page" ? "Link copied" : "Share this page"}
          </button>
        </section>
      </div>
    </main>
  );
}