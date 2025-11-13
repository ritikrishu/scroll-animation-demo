"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScrolling from "@/components/SmoothScrolling";

gsap.registerPlugin(ScrollTrigger);

export default function AirpodsLikePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroSphereRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const codeBlocksRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero sphere rotation
      gsap.to(heroSphereRef.current, {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        rotationY: 360,
        rotationX: 180,
        scale: 1.5,
        ease: "none",
      });

      // Global talent - rotating globe
      gsap.to(globeRef.current, {
        scrollTrigger: {
          trigger: ".global-section",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        rotationY: 720,
        scale: 1.2,
        ease: "none",
      });

      // Quality - code blocks assembling
      gsap.from(".code-block", {
        scrollTrigger: {
          trigger: ".quality-section",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        x: (i) => (i % 2 === 0 ? -200 : 200),
        opacity: 0,
        stagger: 0.1,
      });

      // Speed - timeline filling
      gsap.to(timelineRef.current, {
        scrollTrigger: {
          trigger: ".speed-section",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        scaleX: 1,
        ease: "power2.out",
      });

      // Cost - number counter
      gsap.to(numberRef.current, {
        scrollTrigger: {
          trigger: ".cost-section",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        rotationX: 360,
        scale: 1.3,
        ease: "none",
      });

      // Teams - 3D photo grid
      gsap.from(".team-photo", {
        scrollTrigger: {
          trigger: ".teams-section",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        z: -500,
        rotationY: 90,
        opacity: 0,
        stagger: 0.05,
      });

      // Coverage - clock rotation
      gsap.to(clockRef.current, {
        scrollTrigger: {
          trigger: ".coverage-section",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        rotation: 360,
        scale: 1.2,
        ease: "none",
      });

      // Enterprise - badge reveal
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: ".enterprise-section",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        scale: 0,
        rotation: -180,
        opacity: 0,
      });

      // Text reveals for all sections
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
          y: 100,
          opacity: 0,
        });
      });

      gsap.utils.toArray<HTMLElement>(".section-description").forEach((desc) => {
        gsap.from(desc, {
          scrollTrigger: {
            trigger: desc,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
          },
          y: 50,
          opacity: 0,
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScrolling>
      <div ref={mainRef} className="bg-black text-white overflow-hidden">
        {/* Hero Section */}
        <section className="hero-section h-screen flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
          <div className="text-center z-10 px-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              RemoteState
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Turn your world-class ideas into world-class software
            </p>
            <div
              ref={heroSphereRef}
              className="w-64 h-64 md:w-96 md:h-96 mx-auto mt-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 0 100px rgba(59, 130, 246, 0.5)",
              }}
            />
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-8 h-8 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* Global Talent Pool */}
        <section className="global-section min-h-screen flex items-center justify-center py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/10 to-black"></div>
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="section-title text-5xl md:text-7xl font-bold mb-8">
              Global Talent Pool
            </h2>
            <p className="section-description text-xl md:text-2xl text-gray-400 mb-16">
              Access to the top 1% of developers worldwide
            </p>
            <div className="relative flex items-center justify-center">
              <div
                ref={globeRef}
                className="w-80 h-80 md:w-96 md:h-96 relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 opacity-20"></div>
                <div className="absolute inset-8 rounded-full border-2 border-blue-400/30"></div>
                <div className="absolute inset-16 rounded-full border-2 border-blue-400/20"></div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400/30"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-blue-400/30"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality */}
        <section className="quality-section min-h-screen flex items-center justify-center py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="section-title text-5xl md:text-7xl font-bold mb-8">
              Rigorous Quality
            </h2>
            <p className="section-description text-xl md:text-2xl text-gray-400 mb-16">
              Technical and cultural assessments ensure excellence
            </p>
            <div ref={codeBlocksRef} className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="code-block bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-6 rounded-lg backdrop-blur-sm border border-purple-500/20">
                <pre className="text-left text-sm text-purple-300">
                  <code>{`const quality = {\n  assessment: true,\n  experience: "5+ years"\n}`}</code>
                </pre>
              </div>
              <div className="code-block bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-6 rounded-lg backdrop-blur-sm border border-blue-500/20">
                <pre className="text-left text-sm text-blue-300">
                  <code>{`function validate() {\n  return talent.top1%\n}`}</code>
                </pre>
              </div>
              <div className="code-block bg-gradient-to-br from-cyan-600/20 to-teal-600/20 p-6 rounded-lg backdrop-blur-sm border border-cyan-500/20">
                <pre className="text-left text-sm text-cyan-300">
                  <code>{`test("excellence", () => {\n  expect(dev).toBest()\n})`}</code>
                </pre>
              </div>
              <div className="code-block bg-gradient-to-br from-teal-600/20 to-green-600/20 p-6 rounded-lg backdrop-blur-sm border border-teal-500/20">
                <pre className="text-left text-sm text-teal-300">
                  <code>{`import { Skills } from\n  "@remotestate/elite"`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Speed */}
        <section className="speed-section min-h-screen flex items-center justify-center py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-green-900/10 to-black"></div>
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="section-title text-5xl md:text-7xl font-bold mb-8">
              Fast Hiring
            </h2>
            <p className="section-description text-xl md:text-2xl text-gray-400 mb-16">
              From search to start in record time
            </p>
            <div className="relative h-24 bg-gray-800/30 rounded-full overflow-hidden backdrop-blur-sm border border-green-500/20">
              <div
                ref={timelineRef}
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-400 origin-left"
                style={{ transform: "scaleX(0)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                Quick Onboarding
              </div>
            </div>
          </div>
        </section>

        {/* Cost */}
        <section className="cost-section min-h-screen flex items-center justify-center py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/10 to-black"></div>
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="section-title text-5xl md:text-7xl font-bold mb-8">
              Cost Efficient
            </h2>
            <p className="section-description text-xl md:text-2xl text-gray-400 mb-16">
              Competitive pricing without compromising quality
            </p>
            <div
              ref={numberRef}
              className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"
              style={{ transformStyle: "preserve-3d" }}
            >
              40%
            </div>
            <p className="text-xl text-gray-400 mt-6">Cost Savings</p>
          </div>
        </section>

        {/* Teams */}
        <section className="teams-section min-h-screen flex items-center justify-center py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-900/10 to-black"></div>
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="section-title text-5xl md:text-7xl font-bold mb-8">
              Dedicated Teams
            </h2>
            <p className="section-description text-xl md:text-2xl text-gray-400 mb-16">
              Committed long-term partnerships
            </p>
            <div
              ref={photosRef}
              className="grid grid-cols-3 gap-4"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="team-photo aspect-square bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-lg backdrop-blur-sm border border-indigo-500/20 flex items-center justify-center"
                >
                  <svg
                    className="w-16 h-16 text-indigo-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className="coverage-section min-h-screen flex items-center justify-center py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-900/10 to-black"></div>
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="section-title text-5xl md:text-7xl font-bold mb-8">
              24/7 Coverage
            </h2>
            <p className="section-description text-xl md:text-2xl text-gray-400 mb-16">
              Time zone advantages for continuous development
            </p>
            <div
              ref={clockRef}
              className="w-80 h-80 md:w-96 md:h-96 mx-auto relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-600/20 to-rose-600/20 backdrop-blur-sm border-4 border-pink-500/30"></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-32 bg-pink-400 origin-bottom -translate-x-1/2 -translate-y-full"></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-24 bg-rose-400 origin-bottom -translate-x-1/2 -translate-y-full rotate-90"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-pink-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </section>

        {/* Enterprise */}
        <section className="enterprise-section min-h-screen flex items-center justify-center py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/10 to-black"></div>
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="section-title text-5xl md:text-7xl font-bold mb-8">
              Enterprise Quality
            </h2>
            <p className="section-description text-xl md:text-2xl text-gray-400 mb-16">
              Proven track record with 120+ startups
            </p>
            <div
              ref={badgeRef}
              className="w-64 h-64 md:w-80 md:h-80 mx-auto relative flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
              <div className="absolute inset-4 bg-black rounded-full"></div>
              <div className="absolute inset-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="min-h-screen flex items-center justify-center py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-black"></div>
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Build?
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12">
              Join 120+ startups who trust RemoteState
            </p>
            <button className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xl font-bold hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-blue-500/50">
              Get Started Today
            </button>
          </div>
        </section>
      </div>
    </SmoothScrolling>
  );
}
