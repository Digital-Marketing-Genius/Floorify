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

const labels: Record<string,string> = { carpet:"Carpet", hardwood:"Hardwood", laminate:"Laminate", lvp:"Luxury Vinyl", tile:"Tile & Stone", blinds:"Windows & Blinds" };
type Product = (typeof products)[number];

export function ShowroomCatalog() {
  const [department, setDepartment] = useState("flooring");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const categories = ["all","carpet","hardwood","laminate","lvp","tile"];
  const departmentProducts = useMemo(() => products.filter(p => p.category !== "vinyl-sheet").filter(p => department === "blinds" ? p.category === "blinds" : p.category !== "blinds"), [department]);
  const brands = useMemo(() => [...new Set(departmentProducts.filter(p => category === "all" || p.category === category).map(p => p.brand).filter(Boolean))].sort(), [departmentProducts,category]);
  const shown = useMemo(() => departmentProducts.filter(p => category === "all" || p.category === category).filter(p => brand === "all" || p.brand === brand), [departmentProducts,category,brand]);
  function chooseProduct(product:Product){setSelected(product);setPreviewImage(product.image)}
  function switchDepartment(next:string){setDepartment(next);setCategory("all");setBrand("all")}
  return <>
    <section className="showroom-intro"><div className="shell"><p className="eyebrow">Explore the collection</p><h1>Your virtual showroom</h1><p>Browse Floorify’s flooring and window-fashion collection from home. Filter by category and brand, compare specifications and request a quote for anything you love.</p><div className="showroom-stats"><span><strong>6</strong> product categories</span><span><strong>20+</strong> premium brands</span><span><strong>{products.filter(p => p.category !== "vinyl-sheet").length}</strong> featured products</span></div></div></section>
    <section className="section shell showroom-catalog">
      <div className="dept-tabs"><button className={department === "flooring" ? "active" : ""} onClick={() => switchDepartment("flooring")}>Flooring</button><button className={department === "blinds" ? "active" : ""} onClick={() => switchDepartment("blinds")}>Windows & Blinds</button></div>
      {department === "flooring" && <div className="catalog-filters">{categories.map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => {setCategory(c);setBrand("all")}}>{c === "all" ? "All flooring" : labels[c]}</button>)}</div>}
      <div className="brand-filter"><label htmlFor="brand-filter">Filter by brand</label><select id="brand-filter" value={brand} onChange={e=>setBrand(e.target.value)}><option value="all">All brands</option>{brands.map(b=><option value={b} key={b}>{b.replaceAll("-"," ").replace(/\b\w/g,c=>c.toUpperCase())}</option>)}</select><span>{shown.length} products</span></div>
      {department === "blinds" && <div className="alta-callout"><strong>ALTA Window Fashions</strong><span>Custom shades and blinds selected for privacy, light control and Calgary’s climate.</span></div>}
      <div className="catalog-grid">{shown.map(p => <article className="catalog-card" key={p.id} onClick={() => chooseProduct(p)}><div className="catalog-image"><img src={p.image} alt={p.name} loading="lazy"/><span>{labels[p.category] || "Flooring"}</span></div><div className="catalog-copy"><small>{p.collection}</small><h2>{p.name}</h2><p>{p.description}</p><div><span>{p.type}</span><span>{p.finish}</span></div><button>View details →</button></div></article>)}</div>
    </section>
    {selected && <div className="product-modal" role="dialog" aria-modal="true" aria-label={selected.name} onClick={() => setSelected(null)}><div className="product-modal-card" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}>×</button><div className="modal-images"><img src={previewImage || selected.image} alt={selected.name}/>{selected.images?.length>1&&<div>{selected.images.map(img=><button className={previewImage===img.url?"active":""} key={img.url} onClick={()=>setPreviewImage(img.url)}><img src={img.url} alt={`${selected.name} — ${img.label}`} loading="lazy"/><span>{img.label}</span></button>)}</div>}</div><div><p className="eyebrow">{labels[selected.category]}</p><h2>{selected.name}</h2><p>{selected.description}</p><dl><div><dt>Collection</dt><dd>{selected.collection}</dd></div><div><dt>Type</dt><dd>{selected.type}</dd></div><div><dt>Width</dt><dd>{selected.width}</dd></div><div><dt>Finish</dt><dd>{selected.finish}</dd></div><div><dt>Warranty</dt><dd>{selected.warranty}</dd></div></dl><a className="button button-dark" href="/#estimate">Request a quote →</a></div></div></div>}
  </>;
}

export function ChatWidget() {
  const message=encodeURIComponent("Hi Floorify Canada, I would like help with a flooring or blinds project.");
  return <a className="whatsapp-fab" href={`https://wa.me/14034639833?text=${message}`} target="_blank" rel="noreferrer" aria-label="Chat with Floorify Canada on WhatsApp"><span>WhatsApp</span><b>◔</b></a>;
}
