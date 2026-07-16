"use client";

import { FormEvent, useState } from "react";

export function Icon({ name }: { name: string }) {
  const symbols: Record<string, string> = { arrow: "→", check: "✓", phone: "☎", clock: "◷", pin: "⌖" };
  return <span className={`icon icon-${name}`} aria-hidden="true">{symbols[name]}</span>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return <><div className="topbar"><div className="shell"><span>Serving Calgary, Chestermere & surrounding communities</span><div><a href="tel:+14024639833">+1 (402) 463-9833</a><span className="top-sep">Mon–Sat, 10 a.m.–5 p.m.</span></div></div></div>
    <header className="header"><div className="shell nav-wrap"><a href="/" className="logo" aria-label="Floorify Canada home"><span className="logo-mark">F</span><span>FLOORIFY<small>CANADA</small></span></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><span/><span/><span/></button>
      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation"><a href="/flooring">Flooring</a><a href="/services">Services</a><a href="/projects">Projects</a><a href="/about">About</a><a href="/service-areas/calgary">Service Areas</a><a href="/showroom">Showroom</a><a className="nav-cta" href="/#estimate">Free estimate</a></nav>
    </div></header></>;
}

export function ServiceAreas() {
  return <section className="section areas"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Proudly local</p><h2>Flooring across Calgary and beyond</h2></div><p>Visit our Chestermere showroom or book an in-home estimate in one of the communities we serve.</p></div><div className="area-links">{["Calgary","Chestermere","Airdrie","Cochrane","Okotoks","Strathmore"].map(city => <a href={`/service-areas/${city.toLowerCase()}`} key={city}>{city}<Icon name="arrow" /></a>)}</div></div></section>;
}

export function EstimateForm() {
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [...data.entries()].map(([k,v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:info@floorifycanada.ca?subject=${encodeURIComponent("Free flooring estimate request")}&body=${encodeURIComponent(body)}`;
  }
  return <form className="estimate-form" onSubmit={submit}><div className="form-row"><label>First name<input required name="First name" autoComplete="given-name" /></label><label>Last name<input required name="Last name" autoComplete="family-name" /></label></div><div className="form-row"><label>Email<input required type="email" name="Email" autoComplete="email" /></label><label>Phone<input required type="tel" name="Phone" autoComplete="tel" /></label></div><div className="form-row"><label>Project location<input name="Project location" placeholder="City or community" /></label><label>Interested in<select name="Flooring type" defaultValue=""><option value="" disabled>Select flooring</option><option>Luxury vinyl</option><option>Laminate</option><option>Hardwood</option><option>Carpet</option><option>Tile</option><option>Commercial flooring</option><option>Not sure yet</option></select></label></div><label>Tell us about your project<textarea name="Project details" rows={4} placeholder="Rooms, approximate size, preferred timing…" /></label><button className="button button-dark" type="submit">Request my free estimate <Icon name="arrow" /></button><small>Submitting opens your email app with your project details addressed to Floorify.</small></form>;
}

export function Footer() {
  return <footer><div className="shell footer-grid"><div><a href="/" className="logo logo-light"><span className="logo-mark">F</span><span>FLOORIFY<small>CANADA</small></span></a><p>Thoughtful flooring guidance and professional installation for homes and businesses across Calgary and surrounding communities.</p></div><div><h3>Explore</h3><a href="/flooring">Flooring</a><a href="/services">Services</a><a href="/projects">Projects</a><a href="/about">About us</a></div><div><h3>Visit us</h3><p>100 Marina Dr #405<br/>Chestermere, AB T1X 0A9</p><p>Monday–Saturday<br/>10 a.m.–5 p.m.</p></div><div><h3>Talk to us</h3><a href="tel:+14024639833">+1 (402) 463-9833</a><a href="mailto:info@floorifycanada.ca">info@floorifycanada.ca</a><a className="footer-cta" href="/#estimate">Book a free estimate →</a></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Floorify Canada. All rights reserved.</span><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div></footer>;
}
