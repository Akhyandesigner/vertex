import type { ReactNode } from "react";

type IconName =
  | "bell"
  | "search"
  | "play"
  | "file"
  | "bookmark"
  | "chart"
  | "clock"
  | "user"
  | "chevron"
  | "external"
  | "eye"
  | "grid"
  | "target"
  | "accessibility"
  | "lock";

function Icon({
  name,
  filled = false,
  className = "",
}: {
  name: IconName;
  filled?: boolean;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </>
    ),
    play: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m10 8 6 4-6 4z" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l5 5v13H6z" />
        <path d="M14 3v6h5M9 13h7M9 17h7" />
      </>
    ),
    bookmark: <path d="M6 4h12v17l-6-4-6 4z" />,
    chart: (
      <>
        <path d="M5 20v-6h4v6M10 20V9h4v11M15 20V4h4v16" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4 21v-1a8 8 0 0 1 16 0v1z" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v6H5V6h6" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
        <path d="m15 9 6-6" />
      </>
    ),
    accessibility: (
      <>
        <circle cx="12" cy="4" r="2" />
        <path d="M4 8h16M12 8v13m0-8-5 7m5-7 5 7" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={`icon ${filled ? "icon-filled" : ""} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <h2>{title}</h2>
    </div>
  );
}

const primaryColors = [
  ["Primary 500", "#F97316", "primary-500"],
  ["Primary 400", "#FB923C", "primary-400"],
  ["Primary 300", "#FDBA74", "primary-300"],
  ["Primary 200", "#FED7AA", "primary-200"],
  ["Primary 100", "#FFEEE5", "primary-100"],
];

const neutralColors = [
  ["Neutral 900", "#0F172A", "neutral-900"],
  ["Neutral 700", "#334155", "neutral-700"],
  ["Neutral 500", "#64748B", "neutral-500"],
  ["Neutral 300", "#CBD5E1", "neutral-300"],
  ["Neutral 200", "#E2E8F0", "neutral-200"],
  ["Neutral 100", "#F1F5F9", "neutral-100"],
  ["Neutral 50", "#FAFAFC", "neutral-50"],
  ["White", "#FFFFFF", "white"],
];

const typeScale = [
  ["Display 1", "Playfair Display", "48 / 56", "Bold", "Page titles", "display"],
  ["Display 2", "Playfair Display", "36 / 44", "Bold", "Section titles", "display-sm"],
  ["Heading 1", "Inter", "28 / 36", "Semi Bold", "Card titles", "h1"],
  ["Heading 2", "Inter", "22 / 30", "Semi Bold", "Sub section", "h2"],
  ["Heading 3", "Inter", "18 / 26", "Medium", "Small titles", "h3"],
  ["Body Large", "Inter", "16 / 24", "Regular", "Body copy", "body-lg"],
  ["Body", "Inter", "14 / 20", "Regular", "Supporting text", "body"],
  ["Small", "Inter", "12 / 16", "Regular", "Captions, meta", "small"],
];

const spacings = [4, 8, 12, 16, 24, 32, 40, 48, 64];
const radii = [
  ["4px", "(xs)", "4px"],
  ["8px", "(sm)", "8px"],
  ["12px", "(md)", "12px"],
  ["16px", "(lg)", "16px"],
  ["24px", "(xl)", "24px"],
  ["Full", "(circle)", "50%"],
];

const buttons = [
  {
    label: "Primary",
    className: "button-primary",
    text: "Get Started",
    hoverText: "Get Started",
  },
  {
    label: "Secondary",
    className: "button-secondary",
    text: "Explore Courses",
    hoverText: "Explore Courses",
  },
  {
    label: "Tertiary",
    className: "button-tertiary",
    text: "View Lesson",
    hoverText: "View Lesson",
  },
  {
    label: "Text",
    className: "button-text",
    text: "Watch Video",
    hoverText: "Watch Video",
  },
];

const iconNames: IconName[] = [
  "bell",
  "search",
  "play",
  "file",
  "bookmark",
  "chart",
  "clock",
  "user",
  "chevron",
];

function BrandMark() {
  return (
    <svg aria-hidden="true" className="brand-mark" viewBox="0 0 32 32">
      <path d="M2 4h28L16 29 2 4Zm8 5 6 11 6-11H10Z" fill="currentColor" />
    </svg>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="design-page">
      <div className="design-board">
        <section className="panel intro-panel" aria-labelledby="design-title">
          <div className="intro-copy">
            <a className="brand" href="#navigation" aria-label="Vertex home">
              <BrandMark />
              <span>Vertex</span>
            </a>
            <h1 id="design-title">Design System</h1>
            <p className="intro-description">
              A unified design language for Vertex learning platform. Clean,
              modern and focused on clarity, consistency and intuitive learning
              experiences.
            </p>
            <p className="version">VERSION 1.0 <span>·</span> MAY 2025</p>
          </div>

          <section className="color-panel" aria-labelledby="colors-title">
            <SectionHeading number="01" title="Colors" />
            <h3 className="color-label">Primary</h3>
            <div className="color-row primary-row">
              {primaryColors.map(([name, hex, token]) => (
                <div className="color-swatch" key={token}>
                  <span className={`swatch ${token}`} />
                  <span>{name}</span>
                  <code>{hex}</code>
                </div>
              ))}
            </div>
            <h3 className="color-label neutral-label">Neutral</h3>
            <div className="color-row neutral-row">
              {neutralColors.map(([name, hex, token]) => (
                <div className="color-swatch" key={token}>
                  <span className={`swatch ${token}`} />
                  <span>{name}</span>
                  <code>{hex}</code>
                </div>
              ))}
            </div>
          </section>
        </section>

        <div className="two-column">
          <section className="panel typography-panel">
            <SectionHeading number="02" title="Typography" />
            <div className="type-sample">
              <span className="sample-glyph display-font">Ag</span>
              <div>
                <p className="playfair-sample">Playfair Display</p>
                <p className="sample-caption">Elegant <i /> Readable <i /> Timeless</p>
              </div>
            </div>
            <div className="type-sample">
              <span className="sample-glyph inter-sample">Ag</span>
              <div>
                <p className="inter-name">Inter</p>
                <p className="sample-caption">Clean <i /> Modern <i /> Highly legible</p>
              </div>
            </div>
          </section>

          <section className="panel type-scale-panel">
            <SectionHeading number="03" title="Type Scale" />
            <div className="type-table" role="table" aria-label="Type scale">
              <div className="type-table-row type-table-head" role="row">
                <span role="columnheader">Style</span>
                <span role="columnheader">Font</span>
                <span role="columnheader">Size / Line Height</span>
                <span role="columnheader">Weight</span>
                <span role="columnheader">Use</span>
              </div>
              {typeScale.map(([style, font, size, weight, use, token]) => (
                <div className="type-table-row" role="row" key={style}>
                  <span className={`scale-style ${token}`} role="cell">{style}</span>
                  <span role="cell">{font}</span>
                  <span role="cell">{size}</span>
                  <span role="cell">{weight}</span>
                  <span role="cell">{use}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="two-column spacing-radius">
          <section className="panel spacing-panel">
            <SectionHeading number="04" title="Spacing System" />
            <p className="panel-subtitle">Base unit: 4px</p>
            <div className="spacing-list">
              {spacings.map((spacing) => (
                <div className="spacing-token" key={spacing}>
                  <span className="spacing-block" style={{ width: spacing, height: spacing }} />
                  <strong>{spacing}</strong>
                  <span>({spacing / 16}rem)</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel radius-panel">
            <SectionHeading number="05" title="Radius & Shadows" />
            <p className="panel-subtitle">Radius</p>
            <div className="radius-list">
              {radii.map(([size, name, radius]) => (
                <div className="radius-token" key={name}>
                  <span className="radius-sample" style={{ borderRadius: radius }} />
                  <strong>{size}</strong>
                  <span>{name}</span>
                </div>
              ))}
            </div>
            <p className="panel-subtitle shadow-label">Shadows</p>
            <div className="shadow-list">
              {[
                ["Sm", "0 1px 2px 0", "rgba(15, 23, 42, 0.05)"],
                ["Md", "0 4px 12px -2px", "rgba(15, 23, 42, 0.08)"],
                ["Lg", "0 12px 24px -4px", "rgba(15, 23, 42, 0.10)"],
                ["Xl", "0 20px 40px -8px", "rgba(15, 23, 42, 0.12)"],
              ].map(([name, shadow, color]) => (
                <div className="shadow-token" key={name}>
                  <strong>{name}</strong>
                  <span>{shadow}</span>
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="three-column component-row">
          <section className="panel icons-panel">
            <SectionHeading number="06" title="Icons" />
            <p className="panel-subtitle">Outline Style</p>
            <div className="icon-gallery">
              {iconNames.map((name) => <Icon key={`outline-${name}`} name={name} />)}
            </div>
            <p className="panel-subtitle filled-label">Filled Style</p>
            <div className="icon-gallery">
              {iconNames.map((name) => <Icon key={`filled-${name}`} name={name} filled />)}
            </div>
            <p className="panel-subtitle icon-spec-label">Icon Specs</p>
            <ul className="spec-list">
              <li>24×24px grid</li>
              <li>2px stroke width (outline)</li>
              <li>Rounded line caps</li>
              <li>Consistent optical balance</li>
            </ul>
          </section>

          <section className="panel buttons-panel">
            <SectionHeading number="07" title="Buttons" />
            <div className="button-matrix">
              <span />
              {buttons.map((button) => <span className="button-column-label" key={button.label}>{button.label}</span>)}
              <span className="state-label">Default</span>
              {buttons.map((button) => (
                <button className={`demo-button ${button.className}`} type="button" key={`default-${button.label}`}>
                  {button.text}
                  {button.label === "Tertiary" && <Icon name="external" />}
                  {button.label === "Text" && <Icon name="play" />}
                </button>
              ))}
              <span className="state-label">Hover</span>
              {buttons.map((button) => (
                <button className={`demo-button ${button.className} demo-hover`} type="button" key={`hover-${button.label}`}>
                  {button.hoverText}
                  {button.label === "Tertiary" && <Icon name="external" />}
                  {button.label === "Text" && <Icon name="play" />}
                </button>
              ))}
              <span className="state-label">Disabled</span>
              {buttons.map((button) => (
                <button className={`demo-button ${button.className}`} type="button" disabled key={`disabled-${button.label}`}>
                  {button.text}
                  {button.label === "Tertiary" && <Icon name="external" />}
                  {button.label === "Text" && <Icon name="play" />}
                </button>
              ))}
            </div>
            <p className="panel-subtitle button-spec-label">Button Specs</p>
            <ul className="spec-list">
              <li>Height: 44px (default)</li>
              <li>Padding: 0 16px (lg), 0 12px (md)</li>
              <li>Radius: 12px</li>
              <li>Font: Inter Medium (14–16px)</li>
            </ul>
          </section>

          <section className="panel inputs-panel">
            <SectionHeading number="08" title="Inputs" />
            <label className="field-label" htmlFor="demo-search">Search / Text Input</label>
            <div className="search-field">
              <Icon name="search" />
              <input id="demo-search" type="search" placeholder="Search anything..." />
              <kbd>⌘ K</kbd>
            </div>
            <label className="field-label select-label" htmlFor="demo-sort">Select</label>
            <select id="demo-sort" defaultValue="relevant">
              <option value="relevant">Most Relevant</option>
              <option value="recent">Recently Added</option>
              <option value="popular">Most Popular</option>
            </select>
            <p className="panel-subtitle input-spec-label">Field Specs</p>
            <ul className="spec-list">
              <li>Height: 44px</li>
              <li>Radius: 12px</li>
              <li>Border: 1px solid #E2E8F0</li>
              <li>Padding: 0 16px</li>
              <li>Focus: Border color #F97316</li>
            </ul>
          </section>
        </div>

        <div className="three-column status-row">
          <section className="panel badges-panel">
            <SectionHeading number="09" title="Badges / Tags" />
            <div className="badge-samples">
              <div><span>Video</span><strong className="badge badge-video">VIDEO</strong></div>
              <div><span>Lesson</span><strong className="badge badge-lesson">LESSON</strong></div>
              <div><span>Popular</span><strong className="badge badge-popular">POPULAR</strong></div>
            </div>
          </section>

          <section className="panel status-panel">
            <SectionHeading number="10" title="Status / Indicators" />
            <div className="status-items">
              <span><i className="status-ring" /> In Progress</span>
              <span><i className="status-check">✓</i> Completed</span>
              <span><i className="status-play"><Icon name="play" /></i> Now Playing</span>
              <span><Icon name="lock" /> Locked</span>
            </div>
          </section>

          <section className="panel progress-panel">
            <SectionHeading number="11" title="Progress Bar" />
            <div className="progress-content">
              <div className="progress-track" role="progressbar" aria-label="Course progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={35}>
                <span />
              </div>
              <span><strong>35%</strong> complete</span>
            </div>
          </section>
        </div>

        <section className="panel cards-panel" id="courses">
          <SectionHeading number="12" title="Cards" />
          <div className="card-grid">
            <div className="card-example">
              <span className="card-caption">Course Card</span>
              <article className="learning-card course-card">
                <div className="course-card-top">
                  <span className="nextjs-mark">N</span>
                  <div><h3>Next.js for Production</h3><p>Build scalable, high-performance web applications with Next.js.</p></div>
                </div>
                <div className="card-meta">
                  <span><Icon name="chart" /> Intermediate</span>
                  <span><Icon name="clock" /> 18h 24m</span>
                  <span><Icon name="file" /> 12 modules</span>
                </div>
              </article>
            </div>
            <div className="card-example">
              <span className="card-caption">Lesson Card (Video)</span>
              <article className="learning-card lesson-card">
                <strong className="badge badge-video">VIDEO</strong>
                <h3>Data Fetching in Server Components</h3>
                <p>Learn how to fetch data on the server using async/await and Next.js best practices.</p>
                <div className="lesson-card-footer"><span>Lesson 5.1 <i /> 12:45</span><a href="#navigation"><Icon name="play" /> Watch from 12:45</a></div>
              </article>
            </div>
            <div className="card-example">
              <span className="card-caption">Lesson Card (Lesson)</span>
              <article className="learning-card lesson-card">
                <strong className="badge badge-lesson">LESSON</strong>
                <h3>Data Fetching &amp; Caching</h3>
                <p>Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance.</p>
                <div className="lesson-card-footer"><span>Module 5</span><a href="#navigation">View lesson <Icon name="external" /></a></div>
              </article>
            </div>
            <div className="card-example">
              <span className="card-caption">Resource Card</span>
              <article className="learning-card resource-card">
                <Icon name="file" className="resource-icon" />
                <div><h3>Caching and Revalidation Guide</h3><p>Deep dive into Next.js caching strategies.</p></div>
                <div className="resource-card-footer"><span>PDF <i /> 1.2 MB</span><Icon name="external" /></div>
              </article>
            </div>
          </div>
        </section>

        <section className="panel navigation-panel" id="navigation">
          <SectionHeading number="13" title="Navigation" />
          <div className="navigation-content">
            <nav className="main-nav" aria-label="Main navigation">
              <a className="brand nav-brand" href="#design-title"><BrandMark /><span>Vertex</span></a>
              <a className="nav-current" href="#courses">Courses</a>
              <a href="#courses">My Learning</a>
            </nav>
            <div className="breadcrumbs">
              <span>Breadcrumbs</span>
              <div>
                <a href="#courses">All Courses</a><Icon name="chevron" />
                <a href="#courses">Next.js for Production</a><Icon name="chevron" />
                <span>Data Fetching &amp; Caching</span>
              </div>
            </div>
            <nav className="pagination" aria-label="Pagination">
              <span>Pagination</span>
              <div>
                <button type="button" aria-label="Previous page"><Icon name="chevron" className="chevron-back" /></button>
                <button type="button" className="page-current" aria-current="page">1</button>
                <button type="button">2</button>
                <button type="button">3</button>
                <span>...</span>
                <button type="button">8</button>
                <button type="button" aria-label="Next page"><Icon name="chevron" /></button>
              </div>
            </nav>
          </div>
        </section>

        <section className="panel principles-panel" aria-label="Design principles">
          <SectionHeading number="14" title="Principles" />
          <div className="principle-list">
            <article><Icon name="eye" /><div><h3>Clarity First</h3><p>Every element should communicate clearly.</p></div></article>
            <article><Icon name="grid" /><div><h3>Consistency</h3><p>Use components and patterns consistently across the platform.</p></div></article>
            <article><Icon name="target" /><div><h3>Focus &amp; Calm</h3><p>Remove noise and help learners focus on what matters.</p></div></article>
            <article><Icon name="accessibility" /><div><h3>Accessible</h3><p>Design with accessibility and inclusivity in mind.</p></div></article>
          </div>
        </section>
      </div>
    </main>
  );
}
