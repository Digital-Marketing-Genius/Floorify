"use client";

import { FormEvent, useState } from "react";

const LEAD_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_FORM_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbyK2ec2q9BVOMJSgbdR5A4U7fdaz_usUlcOJiAE9hnZoSHuiQougIbHe2kNl0-BQ7-Wxw/exec";

export function Icon({ name }: { name: string }) {
  const symbols: Record<string, string> = { arrow: "→", check: "✓", phone: "☎", clock: "◷", pin: "⌖" };
  return <span className={`icon icon-${name}`} aria-hidden="true">{symbols[name]}</span>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return <><div className="topbar"><div className="shell"><span>Serving Calgary, Chestermere & surrounding communities</span><div><a href="tel:+14034639833">+1 (403) 463-9833</a><span className="top-sep">Mon–Sat, 10 a.m.–5 p.m.</span></div></div></div>
    <header className="header"><div className="shell nav-wrap"><a href="/" className="logo" aria-label="Floorify Canada home"><img src="/floorify-logo-cropped.png" alt="Floorify Canada" /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><span/><span/><span/></button>
      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation"><a href="/flooring">Flooring</a><a href="/services">Services</a><a href="/projects">Projects</a><a href="/blogs">Blog</a><a href="/about">About</a><a href="/service-areas/calgary">Service Areas</a><a href="/showroom">Showroom</a><a className="nav-cta" href="/#estimate">Free estimate</a></nav>
    </div></header></>;
}

export function ServiceAreas() {
  return <section className="section areas"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Proudly local</p><h2>Flooring across Calgary and beyond</h2></div><p>Visit our Chestermere showroom or book an in-home estimate in one of the communities we serve.</p></div><div className="area-links">{["Calgary","Chestermere","Airdrie","Cochrane","Okotoks","Strathmore"].map(city => <a href={`/service-areas/${city.toLowerCase()}`} key={city}>{city}<Icon name="arrow" /></a>)}</div></div></section>;
}

export function EstimateForm() {
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    const payload={
      formType:"Quote Request",
      bookingType:"",
      firstName:data.get("firstName"),
      lastName:data.get("lastName"),
      email:data.get("email"),
      phone:data.get("phone"),
      preferredDate:"",
      projectLocation:data.get("projectLocation"),
      projectType:data.get("projectType")||"",
      interestArea:data.get("interestArea"),
      projectDescription:data.get("projectDescription"),
      pageUrl:window.location.href,
      website:data.get("website")
    };
    try {
      await fetch(LEAD_FORM_ENDPOINT,{
        method:"POST",
        mode:"no-cors",
        headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify(payload)
      });
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }
  return <form className="estimate-form" onSubmit={submit}><div className="form-row"><label>First name<input required name="firstName" autoComplete="given-name" /></label><label>Last name<input required name="lastName" autoComplete="family-name" /></label></div><div className="form-row"><label>Email<input required type="email" name="email" autoComplete="email" /></label><label>Phone<input required type="tel" name="phone" autoComplete="tel" /></label></div><div className="form-row"><label>Project location<input name="projectLocation" placeholder="City or community" /></label><label>Interested in<select name="interestArea" defaultValue=""><option value="" disabled>Select a category</option><option>Luxury vinyl</option><option>Laminate</option><option>Hardwood</option><option>Carpet</option><option>Tile</option><option>Windows and Blinds</option><option>Commercial flooring</option><option>Not sure yet</option></select></label></div><div className="form-row"><label>Project type<select name="projectType"><option>Residential</option><option>Commercial</option></select></label><span/></div><label>Tell us about your project<textarea name="projectDescription" rows={4} placeholder="Rooms, approximate size, preferred timing…" /></label><div className="form-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div><button className="button button-dark" type="submit" disabled={status==="sending"}>{status==="sending"?"Sending…":"Request my free estimate"} <Icon name="arrow" /></button><div aria-live="polite">{status==="sent"&&<p className="form-success">Thank you. Your request has been received.</p>}{status==="error"&&<p className="form-error">We couldn’t send this request. Please call +1 (403) 463-9833.</p>}</div><small>Your information is sent securely to the Floorify team.</small></form>;
}

export const recentProjects = [
  { title: "Main-floor tile transformation", client: "Shahid Hameed", type: "Residential tile", image: "/projects/shahid-1.jpg", href: "/projects#shahid-hameed" },
  { title: "Whole-home carpet refresh", client: "Jennifer Stevens", type: "Residential carpet", image: "/projects/jennifer-1.jpg", href: "/projects#jennifer-stevens" },
  { title: "Complete Health clinic", client: "Complete Health", type: "Commercial flooring", image: "/projects/complete-health-1.jpg", href: "/projects#complete-health" },
];

export function RecentProjects() {
  return <section className="section recent-projects"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Recent projects</p><h2>Real spaces. Thoughtfully finished.</h2></div><a className="text-link" href="/projects">View all projects <Icon name="arrow" /></a></div><div className="recent-project-grid">{recentProjects.map(project=><a href={project.href} key={project.client}><img src={project.image} alt={`${project.title} for ${project.client}`} loading="lazy"/><div><span>{project.type}</span><h3>{project.title}</h3><p>{project.client}</p></div></a>)}</div></div></section>;
}

export function Footer() {
  return <><RecentProjects/><footer><div className="shell footer-grid"><div><a href="/" className="logo logo-light"><img src="/floorify-logo-cropped.png" alt="Floorify Canada" /></a><p>Thoughtful flooring guidance and professional installation for homes and businesses across Calgary and surrounding communities.</p></div><div><h3>Explore</h3><a href="/flooring">Flooring</a><a href="/services">Services</a><a href="/projects">Projects</a><a href="/blogs">Blog</a><a href="/showroom">Showroom</a><a href="/about">About us</a></div><div><h3>Visit us</h3><a href="https://maps.app.goo.gl/r5ciYjbxDoyne1Uw9" target="_blank" rel="noreferrer"><p>100 Marina Dr #405<br/>Chestermere, AB T1X 0A9</p></a><p>Monday–Saturday<br/>10 a.m.–5 p.m.</p></div><div><h3>Talk to us</h3><a href="tel:+14034639833">+1 (403) 463-9833</a><a href="mailto:info@floorifycanada.ca">info@floorifycanada.ca</a><a href="https://wa.me/14034639833" target="_blank" rel="noreferrer">Chat on WhatsApp</a><a className="footer-cta" href="/#estimate">Book a free estimate →</a></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Floorify Canada. All rights reserved.</span><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div></footer></>;
}
