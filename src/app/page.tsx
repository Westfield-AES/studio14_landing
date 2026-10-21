import Image from "next/image";

import { ArrowIcon } from "../components/arrow-icon";
import { MotionController } from "../components/motion-controller";

const collectionCards = [
  {
    title: "The Signature",
    note: "Clean lines · Quiet confidence",
    image: "/images/studio14-signature-triptych.webp",
    alt: "Three-frame studio shoot featuring a woman in a black tailored suit",
    className: "collection-card-signature",
  },
  {
    title: "After Hours",
    note: "Deep colour · Sharp tailoring",
    image: "/images/studio14-after-hours.webp",
    alt: "Studio portrait of a man in a burgundy velvet dinner jacket",
    className: "",
  },
  {
    title: "In Full Colour",
    note: "Big energy · Bright light",
    image: "/images/studio14-in-full-colour.webp",
    alt: "Joyful studio portrait of a woman in a violet dress",
    className: "",
  },
];

const faqs = [
  {
    question: "What comes with a studio shoot?",
    answer:
      "Every shoot is a coordinated set of three portraits built around one creative direction—three poses, one mood, and a complete visual story.",
  },
  {
    question: "What kind of photo should I use?",
    answer:
      "Choose a clear, well-lit photo of yourself with one visible face. A simple front-facing or three-quarter angle gives your shoot the strongest start.",
  },
  {
    question: "What happens to the photo I upload?",
    answer:
      "It is used privately to create your shoot. We keep the portraits you choose to save, while your original photo and temporary previews are cleared within 24 hours.",
  },
  {
    question: "How are the portraits created?",
    answer:
      "Studio14 uses automated image-generation technology to place your facial identity into the studio photographs you choose while preserving their styling, pose, light, and setting.",
  },
];

function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`wordmark${footer ? " wordmark-footer" : ""}`} aria-hidden="true">
      Studio<span>14</span>
    </span>
  );
}

export default function Home() {
  const studioAppOrigin =
    process.env.NEXT_PUBLIC_STUDIO_APP_URL ?? "https://app.studio14.example";
  const studioCatalogueUrl = `${studioAppOrigin.replace(/\/+$/, "")}/studio`;

  return (
    <>
      <MotionController />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="Studio14 home">
          <Wordmark />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#shoots">Studio shoots</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a className="header-cta" href={studioCatalogueUrl}>
          Open the studio <ArrowIcon />
        </a>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />

          <div className="hero-copy">
            <p className="eyebrow eyebrow-light">
              <span /> Your portrait era starts here
            </p>
            <h1>
              <span>Walk in</span>
              <span>as you are.</span>
              <em>Leave iconic.</em>
            </h1>
            <p className="hero-lede">
              Choose a fully styled three-photo studio shoot, add one clear photo, and step into
              every frame.
            </p>
            <div className="hero-actions">
              <a className="button button-flash" href={studioCatalogueUrl}>
                Find your shoot <ArrowIcon />
              </a>
              <a className="quiet-link" href="#shoots">
                See what&apos;s waiting <ArrowIcon direction="down" />
              </a>
            </div>
            <p className="hero-note">
              <span aria-hidden="true">✦</span> Your first guest shoot is ready when you are.
            </p>
          </div>

          <figure className="hero-stage">
            <div className="hero-frame hero-frame-one" aria-hidden="true">
              <span>01</span>
            </div>
            <div className="hero-frame hero-frame-two" aria-hidden="true">
              <span>02</span>
            </div>
            <div className="hero-frame hero-frame-three" aria-hidden="true">
              <span>03</span>
            </div>
            <div className="frame-orbit" aria-hidden="true" />
            <figcaption>
              Three portraits from The Signature studio shoot, featuring one model in coordinated
              styling.
            </figcaption>
            <p className="stage-caption" aria-hidden="true">
              One shoot <span>—</span> three portraits
            </p>
          </figure>

          <a className="scroll-cue" href="#intro" aria-label="Scroll to discover Studio14">
            <span>Scroll to enter</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>One photo</span><i>✦</i><span>Three portraits</span><i>✦</i><span>Your moment</span><i>✦</i>
            <span>One photo</span><i>✦</i><span>Three portraits</span><i>✦</i><span>Your moment</span><i>✦</i>
          </div>
        </div>

        <section className="intro section-shell" id="intro">
          <p className="section-index" data-reveal>
            01 / The idea
          </p>
          <div className="intro-statement" data-reveal>
            <p className="eyebrow">A new kind of sitting</p>
            <h2>
              Not just a headshot. A whole <em>mood.</em>
            </h2>
          </div>
          <div className="intro-copy" data-reveal>
            <p>
              Studio14 brings the creative direction, the styling, and the light. You choose the
              world you want to step into.
            </p>
            <p>
              Every studio shoot arrives as a set of three portraits—considered together and made
              to feel unmistakably yours.
            </p>
          </div>
        </section>

        <section className="collections" id="shoots">
          <div className="section-shell collections-heading">
            <div data-reveal>
              <p className="eyebrow">Inside the studio</p>
              <h2>Choose your moment.</h2>
            </div>
            <div className="collections-side" data-reveal>
              <p>Polished. Playful. Powerful. There&apos;s a shoot for every version of you.</p>
              <a className="arrow-link" href={studioCatalogueUrl}>
                Explore all shoots <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="collection-grid section-shell">
            {collectionCards.map((card, index) => (
              <a
                className={`collection-card ${card.className}`}
                href={studioCatalogueUrl}
                key={card.title}
                data-reveal
                aria-label={`Explore ${card.title} studio shoot`}
              >
                <div className="collection-image-wrap">
                  <Image
                    src={card.image}
                    width={index === 0 ? 1772 : index === 1 ? 1023 : 1024}
                    height={index === 0 ? 887 : index === 1 ? 1537 : 1536}
                    alt={card.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    unoptimized
                  />
                  <span className="card-count">0{index + 1}</span>
                  <span className="card-arrow" aria-hidden="true"><ArrowIcon /></span>
                </div>
                <div className="collection-meta">
                  <h3>{card.title}</h3>
                  <p>{card.note}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="shoot-story" aria-labelledby="shoot-story-title">
          <div className="shoot-story-copy section-shell" data-reveal>
            <p className="section-index">02 / The reveal</p>
            <p className="eyebrow eyebrow-light">One choice. Three frames.</p>
            <h2 id="shoot-story-title">
              A portrait is nice.
              <br />A full shoot is a <em>statement.</em>
            </h2>
            <p>
              The pose changes. The energy builds. The three images land together as one complete
              story.
            </p>
          </div>
          <div className="reveal-triptych" aria-hidden="true">
            <div className="reveal-frame reveal-frame-one" data-reveal />
            <div className="reveal-frame reveal-frame-two" data-reveal />
            <div className="reveal-frame reveal-frame-three" data-reveal />
          </div>
        </section>

        <section className="process section-shell" id="how">
          <div className="process-heading" data-reveal>
            <p className="section-index">03 / How it works</p>
            <p className="eyebrow">From camera roll to contact sheet</p>
            <h2>Three easy moves. One unforgettable result.</h2>
          </div>

          <ol className="process-list">
            <li data-reveal>
              <span className="step-number">01</span>
              <div className="step-icon step-icon-frames" aria-hidden="true"><i /><i /><i /></div>
              <h3>Pick your energy</h3>
              <p>Browse complete shoots by mood, moment, and style. Choose the one that feels like you.</p>
            </li>
            <li data-reveal>
              <span className="step-number">02</span>
              <div className="step-icon step-icon-focus" aria-hidden="true"><i /></div>
              <h3>Add one good photo</h3>
              <p>A clear solo photo is all you need. We&apos;ll guide you if the light or angle needs a tweak.</p>
            </li>
            <li data-reveal>
              <span className="step-number">03</span>
              <div className="step-icon step-icon-spark" aria-hidden="true">✦</div>
              <h3>Meet your portraits</h3>
              <p>Your three-frame shoot arrives together, ready to review, save, and share your way.</p>
            </li>
          </ol>
        </section>

        <section className="privacy" id="privacy">
          <div className="privacy-art" aria-hidden="true" data-reveal>
            <div className="privacy-ring privacy-ring-one" />
            <div className="privacy-ring privacy-ring-two" />
            <div className="privacy-core"><span>Yours</span><i>✦</i></div>
          </div>
          <div className="privacy-copy" data-reveal>
            <p className="section-index">04 / The private bit</p>
            <p className="eyebrow eyebrow-light">Made for you. Kept private.</p>
            <h2>Your photo is here for one reason: your portraits.</h2>
            <p>
              Once your shoot is ready, we keep the portraits you save and clear your original
              photo and temporary previews within 24 hours.
            </p>
            <ul>
              <li><span>01</span> Only upload a photo of yourself</li>
              <li><span>02</span> Private processing from start to finish</li>
              <li><span>03</span> You decide which portraits stay</li>
            </ul>
          </div>
        </section>

        <section className="pricing section-shell" id="pricing">
          <div className="pricing-heading" data-reveal>
            <p className="section-index">05 / Make it yours</p>
            <p className="eyebrow">Start small. Shoot often.</p>
            <h2>Your first look is on us.</h2>
            <p>Try a complete guest shoot, see all three previews, and sign in only when you&apos;re ready to keep one.</p>
          </div>

          <div className="price-grid">
            <article className="price-card price-card-guest" data-reveal>
              <p className="price-label">Guest shoot</p>
              <p className="price-value">Free</p>
              <p>One complete three-photo shoot to discover your Studio14 look.</p>
              <ul>
                <li>Three watermarked previews</li>
                <li>No account needed to begin</li>
                <li>Sign in when you choose a favourite</li>
              </ul>
              <a className="button button-dark" href={studioCatalogueUrl}>Try your first shoot <ArrowIcon /></a>
            </article>

            <article className="price-card price-card-monthly" data-reveal>
              <div className="popular-label">For your many eras</div>
              <p className="price-label">Studio14 monthly</p>
              <p className="price-value"><sup>₦</sup>10,000 <small>/ month</small></p>
              <p>Ten studio-shoot credits every month. Each credit creates a complete three-portrait shoot.</p>
              <ul>
                <li>Save all three portraits from paid shoots</li>
                <li>Purchased credits never expire</li>
                <li>Cancel future renewals any time</li>
              </ul>
              <a className="button button-paper" href={studioCatalogueUrl}>Enter the studio <ArrowIcon /></a>
            </article>
          </div>
        </section>

        <section className="faq section-shell" id="faq">
          <div className="faq-heading" data-reveal>
            <p className="section-index">06 / Good to know</p>
            <p className="eyebrow">Before you step in</p>
            <h2>A few quick answers.</h2>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary><span>0{index + 1}</span>{item.question}<i aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-noise" aria-hidden="true" />
          <p className="eyebrow eyebrow-light" data-reveal>Lights on. Camera ready.</p>
          <h2 data-reveal>Your studio is ready.</h2>
          <a className="button button-flash" href={studioCatalogueUrl} data-reveal>
            Find your shoot <ArrowIcon />
          </a>
          <div className="final-stamp" aria-hidden="true">S14 <span>✦</span> 3 frames</div>
        </section>
      </main>

      <footer>
        <div>
          <a href="#top" aria-label="Studio14 home"><Wordmark footer /></a>
          <p>Portraits worth showing up for.</p>
        </div>
        <div className="footer-links">
          <a href="#shoots">Studio shoots</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">Good to know</a>
        </div>
        <div className="footer-meta">
          <p>Adults creating portraits of themselves.</p>
          <p>© 2026 Studio14</p>
        </div>
      </footer>
    </>
  );
}
