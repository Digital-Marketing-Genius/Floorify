"use client";

import { useEffect, useMemo, useState } from "react";
import products from "./showroom-products.json";

const heroImages = [
  "https://floorifycanada.ca/wp-content/uploads/2026/03/IMG_7001-scaled.jpg",
  "https://floorifycanada.ca/wp-content/uploads/2026/03/IMG_6997-scaled.jpg",
  "https://floorifycanada.ca/wp-content/uploads/2026/03/IMG_6998-scaled.jpg",
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = setInterval(() => setActive((n) => (n + 1) % heroImages.length), 5000); return () => clearInterval(timer); }, []);
  return <div className="hero-slides" aria-hidden="true">{heroImages.map((src, i) => <div key={src} className={`hero-slide ${i === active ? "active" : ""}`} style={{ backgroundImage: `url(${src})` }} />)}<div className="hero-dots">{heroImages.map((_, i) => <button key={i} className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-label={`Show slide ${i + 1}`} />)}</div></div>;
}

const labels: Record<string,string> = { carpet:"Carpet", hardwood:"Hardwood", "vinyl-sheet":"Sheet Vinyl", laminate:"Laminate", lvp:"Luxury Vinyl", tile:"Tile & Stone", blinds:"Windows & Blinds" };

export function ShowroomCatalog() {
  const [department, setDepartment] = useState("flooring");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const categories = ["all","carpet","hardwood","vinyl-sheet","laminate","lvp","tile"];
  const shown = useMemo(() => products.filter(p => department === "blinds" ? p.category === "blinds" : p.category !== "blinds").filter(p => category === "all" || p.category === category), [department,category]);
  return <>
    <section className="showroom-intro"><div className="shell"><p className="eyebrow">Explore the collection</p><h1>Your virtual showroom</h1><p>Browse Floorify’s flooring and window-fashion collection from home. Filter by category, compare specifications and request a quote for anything you love.</p><div className="showroom-stats"><span><strong>7</strong> product categories</span><span><strong>20+</strong> premium brands</span><span><strong>49</strong> featured products</span></div></div></section>
    <section className="section shell showroom-catalog">
      <div className="dept-tabs"><button className={department === "flooring" ? "active" : ""} onClick={() => {setDepartment("flooring");setCategory("all")}}>Flooring</button><button className={department === "blinds" ? "active" : ""} onClick={() => {setDepartment("blinds");setCategory("all")}}>Windows & Blinds</button></div>
      {department === "flooring" && <div className="catalog-filters">{categories.map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c === "all" ? "All flooring" : labels[c]}</button>)}</div>}
      {department === "blinds" && <div className="alta-callout"><strong>ALTA Window Fashions</strong><span>Custom shades and blinds selected for privacy, light control and Calgary’s climate.</span></div>}
      <div className="catalog-grid">{shown.map(p => <article className="catalog-card" key={p.id} onClick={() => setSelected(p)}><div className="catalog-image"><img src={p.image} alt={p.name} loading="lazy"/><span>{labels[p.category] || "Flooring"}</span></div><div className="catalog-copy"><small>{p.collection}</small><h2>{p.name}</h2><p>{p.description}</p><div><span>{p.type}</span><span>{p.finish}</span></div><button>View details →</button></div></article>)}</div>
    </section>
    {selected && <div className="product-modal" role="dialog" aria-modal="true" aria-label={selected.name} onClick={() => setSelected(null)}><div className="product-modal-card" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}>×</button><img src={selected.image} alt={selected.name}/><div><p className="eyebrow">{labels[selected.category]}</p><h2>{selected.name}</h2><p>{selected.description}</p><dl><div><dt>Collection</dt><dd>{selected.collection}</dd></div><div><dt>Type</dt><dd>{selected.type}</dd></div><div><dt>Width</dt><dd>{selected.width}</dd></div><div><dt>Finish</dt><dd>{selected.finish}</dd></div><div><dt>Warranty</dt><dd>{selected.warranty}</dd></div></dl><a className="button button-dark" href={`/#estimate`}>Request a quote →</a></div></div></div>}
  </>;
}

const replies = [
  {keys:["pet","kid","child"], text:"For pets and children, start with waterproof luxury vinyl or a durable stain-resistant carpet. We can show you samples suited to your room and routine."},
  {keys:["water"], text:"Our strongest moisture-ready options include luxury vinyl, selected waterproof laminates, porcelain tile and stone-core products."},
  {keys:["blind","shade","window"], text:"Floorify carries ALTA honeycomb shades, faux-wood blinds, softstyle shades and roller shades, including selected motorized options."},
  {keys:["financ","payment"], text:"Financing may be available on qualifying purchases. A Floorify specialist can explain the current options and eligibility."},
  {keys:["brand"], text:"Our showroom features 20+ brands across carpet, hardwood, laminate, luxury vinyl, tile and ALTA window fashions."},
  {keys:["price","cost"], text:"Pricing depends on the product, room preparation and installation requirements. Book a free estimate for an accurate project total."},
];

export function ChatWidget() {
  const [open,setOpen]=useState(false); const [input,setInput]=useState(""); const [messages,setMessages]=useState<{from:"bot"|"user",text:string}[]>([{from:"bot",text:"Hi! I’m the Floorify showroom assistant. Ask me about flooring, blinds, estimates or showroom visits."}]);
  function send(text=input){if(!text.trim())return; const q=text.trim(); setMessages(m=>[...m,{from:"user",text:q}]);setInput(""); const lower=q.toLowerCase(); const match=replies.find(r=>r.keys.some(k=>lower.includes(k))); setTimeout(()=>setMessages(m=>[...m,{from:"bot",text:match?.text || "A Floorify specialist can give you a tailored answer. Call +1 (403) 463-9833 or book a free estimate and tell us about your space."}]),450)}
  return <><button className="chat-fab" onClick={()=>setOpen(!open)} aria-label="Chat with a Floorify expert">{open?"×":"✦"}<span>1</span></button><aside className={`chat-panel ${open?"open":""}`} aria-hidden={!open}><div className="chat-head"><div><strong>Floorify Expert</strong><small>Online • ready to help</small></div><button onClick={()=>setOpen(false)}>×</button></div><div className="chat-messages">{messages.map((m,i)=><div className={`chat-message ${m.from}`} key={i}>{m.text}</div>)}</div><div className="quick-replies">{["Pets & kids","Waterproof floors","Window blinds","Financing"].map(q=><button key={q} onClick={()=>send(q)}>{q}</button>)}</div><div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send()}} placeholder="Ask about flooring or blinds…"/><button onClick={()=>send()}>→</button></div></aside></>;
}
