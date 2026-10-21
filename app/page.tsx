import { Suspense, type ReactNode } from "react";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

type IconName = "arrow" | "bell" | "search" | "chart" | "clock" | "book";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M4 12h15" /><path d="m13 5 7 7-7 7" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
    chart: <path d="M5 20v-6h4v6M10 20V9h4v11M15 20V4h4v16" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    book: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M9 13h7M9 17h7" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      className={`home-icon home-icon-${name}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

function VertexMark() {
  return (
    <svg aria-hidden="true" className="home-brand-mark" viewBox="0 0 32 32">
      <path d="M2 4h28L16 29 2 4Zm8 5 6 11 6-11H10Z" fill="currentColor" />
    </svg>
  );
}

const courses = [
  {
    title: "Next.js for Production",
    description: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modules: "12 modules",
    logo: "next",
  },
  {
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modules: "8 modules",
    logo: "docker",
  },
  {
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modules: "10 modules",
    logo: "typescript",
  },
];

function CourseLogo({ kind }: { kind: string }) {
  if (kind === "docker") {
    return (
      <svg aria-label="Docker" className="course-logo docker-logo" role="img" viewBox="0 0 72 56">
        <g fill="#2496ed" stroke="#111827" strokeLinejoin="round" strokeWidth="1.5">
          <path d="M10 27h38v12c-2 10-10 15-21 15C15 54 7 47 5 39h-3v-6h8z" />
          <path d="M16 19h7v7h-7zm9 0h7v7h-7zm9 0h7v7h-7zm-9-9h7v7h-7zm9 0h7v7h-7zm9 9h7v7h-7z" />
          <path d="M49 30c5-7 12-8 18-4-2 6-7 9-15 8" />
        </g>
        <path d="M17 34h2m7 0h2m7 0h2m-15 7h2m7 0h2" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (kind === "typescript") {
    return <span className="course-logo typescript-logo" aria-label="TypeScript">TS</span>;
  }

  return <span className="course-logo next-logo" aria-label="Next.js">N</span>;
}

export default function Home() {
  return (
    <div className="home-canvas" id="top">
      <main className="home-page">
        <header className="home-header">
          <a className="home-brand" href="#top" aria-label="Vertex home">
            <VertexMark />
            <span>Vertex</span>
          </a>
          <nav className="home-nav" aria-label="Main navigation">
            <a href="#courses">Courses</a>
            <span aria-disabled="true">My Learning</span>
          </nav>
          <div className="home-header-actions">
            <span className="notification-icon" aria-label="Notifications">
              <Icon name="bell" />
            </span>
            <Suspense fallback={<span className="auth-loading" aria-hidden="true" />}>
              <Show when="signed-out">
                <div className="auth-actions">
                  <SignInButton mode="redirect">
                    <button className="auth-link" type="button">Sign in</button>
                  </SignInButton>
                  <SignUpButton mode="redirect">
                    <button className="auth-signup" type="button">Sign up</button>
                  </SignUpButton>
                </div>
              </Show>
              <Show when="signed-in">
                <UserButton
                  appearance={{ elements: { avatarBox: "profile-avatar" } }}
                />
              </Show>
            </Suspense>
          </div>
        </header>

        <section className="home-hero" aria-labelledby="hero-title">
          <span className="hero-eyebrow">Intelligent Learning</span>
          <h1 id="hero-title">Search your learning<br className="desktop-break" /> in plain English.</h1>
          <p className="hero-description">
            Vertex understands what you want to learn and
            <br className="desktop-break" /> finds the exact lessons across all your courses.
          </p>
          <a className="explore-button" href="#courses">
            Explore Courses <Icon name="arrow" />
          </a>
          <label className="home-search" htmlFor="learning-search">
            <Icon name="search" />
            <input id="learning-search" type="search" placeholder="Ask anything about your learning..." />
            <kbd aria-hidden="true"><span>⌘</span> K</kbd>
          </label>
        </section>

        <section className="courses-section" id="courses" aria-labelledby="courses-title">
          <div className="courses-heading">
            <h2 id="courses-title">All Courses</h2>
            <a href="#courses">View all courses <Icon name="arrow" /></a>
          </div>
          <div className="course-grid">
            {courses.map((course) => (
              <article className="home-course-card" key={course.title}>
                <CourseLogo kind={course.logo} />
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-card-meta">
                  <span><Icon name="chart" />{course.level}</span>
                  <span><Icon name="clock" />{course.duration}</span>
                  <span><Icon name="book" />{course.modules}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="weekly-note">
            <span className="note-rule" />
            <svg aria-hidden="true" className="note-star" viewBox="0 0 24 24">
              <path d="m12 2 2.5 7.2L22 12l-7.5 2.8L12 22l-2.5-7.2L2 12l7.5-2.8L12 2Z" />
            </svg>
            <p>New courses and lessons added every week.</p>
            <span className="note-rule" />
          </div>
          <div className="course-wave" aria-hidden="true">
            {[42, 57, 70, 84, 62, 44, 36, 48, 62, 78, 89, 51, 66, 76, 84].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
