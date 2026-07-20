import { EstimateForm, Footer, Header, Icon, ServiceAreas } from "./site-components";
import { HeroSlider } from "./interactive-components";

const products = [
  { name: "Luxury Vinyl", copy: "Waterproof performance, natural textures and easy everyday care.", href: "/flooring/luxury-vinyl", image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=85" },
  { name: "Hardwood", copy: "Warm, enduring floors with character that deepens over time.", href: "/flooring/hardwood", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85" },
  { name: "Carpet", copy: "Soft, quiet comfort for bedrooms, family rooms and stairs.", href: "/flooring/carpet", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85" },
  { name: "Laminate", copy: "Durable wood-look flooring designed for busy homes.", href: "/flooring/laminate", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85" },
  { name: "Tile", copy: "Timeless surfaces for kitchens, bathrooms and entryways.", href: "/flooring/tile", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85" },
  { name: "Windows & Blinds", copy: "Custom shades and blinds for privacy, comfort and light control.", href: "/flooring/blinds", image: "/wp-assets/2026/03/Honeycomb-Cellular-Shades.png" },
];

export default function Home() {
  return <>
    <Header />
    <main>
      <section className="hero">
        <HeroSlider />
        <div className="hero-shade" />
        <div className="shell hero-content">
          <p className="eyebrow light">Flooring, thoughtfully done</p>
          <h1>Beautiful floors.<br/>Expertly installed.</h1>
          <p className="hero-lede">From the first sample to the final walkthrough, Floorify makes it easier to choose and install the right floor for your Calgary-area home or business.</p>
          <div className="button-row">
            <a className="button button-primary" href="#estimate">Book a free estimate <Icon name="arrow" /></a>
            <a className="button button-ghost" href="/showroom">Visit our showroom</a>
          </div>
          <div className="hero-proof"><span>10+ years in business</span><span>252 happy clients</span><span>Calgary-area service</span></div>
        </div>
      </section>

      <section className="trust-strip"><div className="shell trust-grid">
        <div><strong>Personal guidance</strong><span>Advice for your space, style and budget</span></div>
        <div><strong>Professional installation</strong><span>Careful preparation and a polished finish</span></div>
        <div><strong>Local showroom</strong><span>See and feel materials before you decide</span></div>
        <div><strong>Free estimates</strong><span>Clear next steps for your project</span></div>
      </div></section>

      <section className="section shell" id="flooring">
        <div className="section-heading"><div><p className="eyebrow">Find your floor</p><h2>Made for the way you live</h2></div><p>Explore dependable flooring for every room and routine. We’ll help you compare looks, performance and care requirements.</p></div>
        <div className="product-grid">{products.map((p) => <a className="product-card" href={p.href} key={p.name}>
          <img src={p.image} alt={`${p.name} flooring inspiration`} />
          <div className="product-copy"><h3>{p.name}</h3><p>{p.copy}</p><span>Explore {p.name} <Icon name="arrow" /></span></div>
        </a>)}</div>
      </section>

      <section className="split-section">
        <div className="split-image"><img src="https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1500&q=88" alt="Modern kitchen with natural flooring" /></div>
        <div className="split-copy"><p className="eyebrow">Why Floorify</p><h2>A simpler path to a floor you’ll love</h2><p>Flooring is a lasting decision. Our team helps you move from inspiration to installation with straightforward guidance, practical options and attention to the details that make a room feel finished.</p>
          <ul className="check-list"><li><Icon name="check" /> Curated options for homes and businesses</li><li><Icon name="check" /> Accurate in-home measurement</li><li><Icon name="check" /> Skilled, professional installation</li><li><Icon name="check" /> One team from selection to final walkthrough</li></ul>
          <a className="text-link" href="/about">Meet Floorify <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="section process shell"><p className="eyebrow">How it works</p><h2>From vision to finished floor</h2><div className="steps">
        <div><b>01</b><h3>Tell us about your space</h3><p>Share your rooms, priorities, timing and ideas.</p></div>
        <div><b>02</b><h3>Compare the right options</h3><p>See samples and get clear, practical guidance.</p></div>
        <div><b>03</b><h3>Measure and plan</h3><p>We confirm the space and prepare your estimate.</p></div>
        <div><b>04</b><h3>Install with care</h3><p>Our team completes the work and final walkthrough.</p></div>
      </div></section>

      <section className="project-banner"><div className="project-image" role="img" aria-label="Elegant open concept home with hardwood floors"/><div className="shell project-card"><p className="eyebrow light">Real spaces, renewed</p><h2>See what the right floor can do</h2><p>Browse products, colours and specifications in our new interactive showroom.</p><a className="button button-primary" href="/showroom">Explore the virtual showroom <Icon name="arrow" /></a></div></section>

      <section className="section reviews shell"><div className="section-heading"><div><p className="eyebrow">Customer experience</p><h2>Trusted in local homes</h2></div><a className="text-link" href="https://www.google.com/maps/place/Floorify+Canada/@51.0480889,-113.8292758,17z" target="_blank" rel="noreferrer">View Google profile <Icon name="arrow" /></a></div>
        <div className="review-grid"><blockquote><div className="stars">★★★★★</div><p>“The Floorify team helped me select carpet for my house and I’m fully satisfied with their work.”</p><cite>Michael S.</cite></blockquote><blockquote><div className="stars">★★★★★</div><p>“We had tile installed in our home. Their work was excellent and the quality was clear.”</p><cite>Sohaib</cite></blockquote><div className="review-stat"><strong>252</strong><span>happy clients and counting</span><p>Ready to make your space the next one?</p></div></div>
      </section>

      <ServiceAreas />
      <section className="estimate-section" id="estimate"><div className="shell estimate-grid"><div><p className="eyebrow light">Start your project</p><h2>Let’s find the right floor for your space.</h2><p>Tell us a little about your project. A Floorify specialist will follow up to discuss your needs and the next best step.</p><div className="contact-notes"><span><Icon name="phone" /> <a href="tel:+14034639833">+1 (403) 463-9833</a></span><span><Icon name="clock" /> Mon–Sat, 10 a.m.–5 p.m.</span><span><Icon name="pin" /> 100 Marina Dr #405, Chestermere</span></div></div><EstimateForm /></div></section>
    </main>
    <Footer />
  </>;
}
