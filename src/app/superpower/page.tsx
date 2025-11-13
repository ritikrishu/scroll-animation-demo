"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScrolling from "@/components/SmoothScrolling";

gsap.registerPlugin(ScrollTrigger);

export default function SuperpowerPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text fade in with scale - using cubicOut like superpower.com
      gsap.from(heroTextRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 100,
        duration: 1.5,
        ease: "cubic.out",
      });

      // Parallax video effect - scale transform like superpower.com (1.2)
      gsap.to(".hero-video", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        scale: 1.2,
        y: 100,
        ease: "none",
      });

      // Feature cards stagger animation - earlier trigger
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "cubic.out",
      });

      // Stats counter animation - FIXED: earlier trigger so fully visible in viewport
      gsap.to(counterRef.current, {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 85%",
          end: "top 35%",
          onEnter: () => {
            let count = 0;
            const interval = setInterval(() => {
              count += 1;
              setCounter(count);
              if (count >= 63) clearInterval(interval);
            }, 30);
          },
        },
      });

      // Masked video reveal
      gsap.from(".masked-video-container", {
        scrollTrigger: {
          trigger: ".video-section",
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
        scale: 0.5,
        opacity: 0,
        rotationY: -30,
        ease: "cubic.out",
      });

      // Text reveal animations with earlier triggers
      gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((text) => {
        gsap.from(text, {
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
          y: 60,
          opacity: 0,
          ease: "cubic.out",
        });
      });

      // Floating elements
      gsap.to(".float-element", {
        y: -30,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.3,
      });

      // ULTRA-ENHANCED: Pricing cards CONVERGENCE animation - magnetic scroll-controlled
      const premiumCards = gsap.utils.toArray<HTMLElement>(".premium-card");

      // Layer 1: Enhanced Core Convergence with Magnetic Effect
      gsap.from(premiumCards, {
        scrollTrigger: {
          trigger: ".premium-section",
          start: "top 90%",    // Extended range for more scroll control
          end: "top 10%",      // User gets 80% viewport height to control
          scrub: 0.5,          // Tighter scroll coupling (was 1)
          pin: true,           // Pin section during convergence
          anticipatePin: 1,    // Smooth pin transition
        },
        x: (i) => {
          // Magnetic convergence from farther distances
          if (i === 0) return -800; // Left card from far left (was -600)
          if (i === 2) return 800;  // Right card from far right (was 600)
          return 0; // Center card drops from above
        },
        y: (i) => (i === 1 ? -600 : 0), // Center drops from higher (was -400)
        opacity: 0.2,        // Visible ghost images (was 0)
        rotationY: (i) => {
          // More dramatic 3D rotation
          if (i === 0) return -120; // Left card rotates in (was -90)
          if (i === 2) return 120;  // Right card rotates in (was 90)
          return 0;
        },
        scale: 0.3,          // Smaller initial state (was 0.5)
        stagger: {
          amount: 0.3,
          from: "edges",     // Stagger from edges toward center
        },
        ease: "expo.inOut",  // Magnetic acceleration effect (was cubic.out)
      });

      // Layer 2: Blur effect - clears as cards converge (disabled on mobile)
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      if (!isMobile) {
        gsap.from(premiumCards, {
          scrollTrigger: {
            trigger: ".premium-section",
            start: "top 90%",
            end: "top 10%",
            scrub: 0.5,
          },
          filter: "blur(30px)",
          ease: "expo.inOut",
        });
      }

      // Layer 3: Glow effect - peaks at convergence midpoint
      premiumCards.forEach((card) => {
        const glowTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".premium-section",
            start: "top 90%",
            end: "top 10%",
            scrub: 0.5,
          },
        });

        glowTimeline
          .fromTo(
            card,
            {
              boxShadow: "0 0 0px rgba(249, 115, 22, 0)",
            },
            {
              boxShadow: "0 0 60px rgba(249, 115, 22, 0.6)",
              duration: 0.5,
              ease: "power2.in",
            }
          )
          .to(card, {
            boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)",
            duration: 0.5,
            ease: "power2.out",
          });
      });

      // Layer 4: Settle pop - satisfying snap at end
      gsap.from(premiumCards, {
        scrollTrigger: {
          trigger: ".premium-section",
          start: "top 15%",  // Near end of convergence
          end: "top 10%",
          scrub: 0.3,
        },
        scale: 1.02,
        ease: "back.out(1.2)",
      });

      // Background gradient shift
      gsap.to(".gradient-bg", {
        scrollTrigger: {
          trigger: ".gradient-section",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        backgroundPosition: "100% 100%",
      });

      // 3D card flip effect
      gsap.from(".flip-card", {
        scrollTrigger: {
          trigger: ".showcase-section",
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
        rotationY: 180,
        opacity: 0,
        stagger: 0.1,
        ease: "cubic.out",
      });

      // Scale up sections with earlier timing
      gsap.utils.toArray<HTMLElement>(".scale-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 45%",
            scrub: 1,
          },
          scale: 0.95,
          opacity: 0.7,
          ease: "cubic.out",
        });
      });

      // Horizontal scroll element
      const horizontalSection = document.querySelector(".horizontal-scroll");
      if (horizontalSection) {
        gsap.to(".horizontal-scroll-content", {
          scrollTrigger: {
            trigger: ".horizontal-scroll",
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
          },
          x: -1500,
          ease: "none",
        });
      }

      // NEW: Video background section with multi-layer parallax text
      gsap.from(".video-bg-text-layer-1", {
        scrollTrigger: {
          trigger: ".video-bg-section",
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        y: 150,
        opacity: 0,
        scale: 0.8,
        ease: "cubic.out",
      });

      gsap.from(".video-bg-text-layer-2", {
        scrollTrigger: {
          trigger: ".video-bg-section",
          start: "top 75%",
          end: "top 25%",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        ease: "cubic.out",
      });

      gsap.from(".video-bg-cta", {
        scrollTrigger: {
          trigger: ".video-bg-section",
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        scale: 0.9,
        ease: "cubic.out",
      });

      // Parallax movement on video background
      gsap.to(".parallax-video", {
        scrollTrigger: {
          trigger: ".video-bg-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        scale: 1.15,
        y: -80,
        ease: "none",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScrolling>
      <div ref={mainRef} className="bg-black text-white overflow-hidden">
        {/* Hero Section with Video Background */}
        <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video */}
          <video
            ref={videoRef}
            className="hero-video absolute inset-0 w-full h-full object-cover opacity-40"
            autoPlay
            loop
            muted
            playsInline
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23000' width='1920' height='1080'/%3E%3C/svg%3E"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>

          {/* Hero Content */}
          <div ref={heroTextRef} className="relative z-10 text-center px-6 max-w-6xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              Superpower
            </h1>
            <p className="text-2xl md:text-4xl text-gray-300 mb-12 font-light">
              Transform your health with AI-powered insights
            </p>
            <button className="px-10 py-5 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50">
              Get Started Free
            </button>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 float-element">
            <div className="w-20 h-20 bg-orange-500/20 rounded-full blur-xl"></div>
          </div>
          <div className="absolute bottom-20 right-10 float-element">
            <div className="w-32 h-32 bg-red-500/20 rounded-full blur-xl"></div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-8 h-8 text-orange-500"
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

        {/* Stats Section with Counter - SPACING FIXED */}
        <section className="stats-section scale-section py-20 md:py-32 flex items-center justify-center px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/10 to-black"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="reveal-text text-5xl md:text-7xl font-bold mb-8">
              Proven Results
            </h2>
            <p className="reveal-text text-xl md:text-2xl text-gray-400 mb-16">
              Real data from real members
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card p-8 bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-2xl border border-orange-500/20 backdrop-blur-lg">
                <div
                  ref={counterRef}
                  className="text-6xl font-bold text-orange-500 mb-4"
                >
                  {counter}%
                </div>
                <p className="text-gray-300">
                  of members find early risk factors for diabetes
                </p>
              </div>
              <div className="feature-card p-8 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-2xl border border-red-500/20 backdrop-blur-lg">
                <div className="text-6xl font-bold text-red-500 mb-4">2.5M+</div>
                <p className="text-gray-300">active members worldwide</p>
              </div>
              <div className="feature-card p-8 bg-gradient-to-br from-pink-600/10 to-purple-600/10 rounded-2xl border border-pink-500/20 backdrop-blur-lg">
                <div className="text-6xl font-bold text-pink-500 mb-4">24/7</div>
                <p className="text-gray-300">AI-powered health monitoring</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - SPACING FIXED */}
        <section className="features-section scale-section py-20 md:py-32 flex items-center justify-center px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/10 to-black"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="reveal-text text-5xl md:text-7xl font-bold mb-16 text-center">
              AI-Powered Health Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="feature-card p-10 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-3xl border border-orange-500/30 backdrop-blur-lg hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl mb-6 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">Smart Analytics</h3>
                <p className="text-gray-300 text-lg">
                  Track your health metrics with precision AI that learns your patterns
                  and provides personalized insights.
                </p>
              </div>
              <div className="feature-card p-10 bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-3xl border border-red-500/30 backdrop-blur-lg hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-red-500 rounded-2xl mb-6 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">Real-Time Monitoring</h3>
                <p className="text-gray-300 text-lg">
                  Get instant alerts and recommendations based on your continuous health
                  data streams.
                </p>
              </div>
              <div className="feature-card p-10 bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-3xl border border-pink-500/30 backdrop-blur-lg hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-pink-500 rounded-2xl mb-6 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">Predictive Care</h3>
                <p className="text-gray-300 text-lg">
                  Advanced algorithms detect health risks before they become problems,
                  keeping you ahead.
                </p>
              </div>
              <div className="feature-card p-10 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl border border-purple-500/30 backdrop-blur-lg hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl mb-6 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">Expert Network</h3>
                <p className="text-gray-300 text-lg">
                  Connect with healthcare professionals who understand your unique health
                  profile.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Video Background Section with Animated Text Overlay */}
        <section className="video-bg-section relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
          {/* Video Background with Parallax */}
          <video
            className="parallax-video absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
              type="video/mp4"
            />
          </video>

          {/* Dark Tint Overlay - 70% opacity for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-orange-900/60"></div>

          {/* Animated Text Content */}
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            {/* Layer 1 - Main Heading */}
            <h2 className="video-bg-text-layer-1 text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Your Health, Visualized
            </h2>

            {/* Layer 2 - Subtitle */}
            <p className="video-bg-text-layer-2 text-2xl md:text-3xl text-white mb-12 font-light max-w-3xl mx-auto drop-shadow-2xl">
              Experience comprehensive health tracking with stunning visual insights that make complex data simple
            </p>

            {/* Layer 3 - CTA */}
            <button className="video-bg-cta px-12 py-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-xl md:text-2xl font-bold hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50">
              See It In Action
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>
        </section>

        {/* Video Section with Masking - SPACING FIXED */}
        <section className="video-section scale-section py-20 md:py-32 flex items-center justify-center px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h2 className="reveal-text text-5xl md:text-7xl font-bold mb-16">
              Experience the Future
            </h2>
            <div
              className="masked-video-container relative overflow-hidden rounded-3xl"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <video
                className="w-full h-auto rounded-3xl shadow-2xl"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 border-4 border-orange-500/30 rounded-3xl pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* Horizontal Scroll Section */}
        <section className="horizontal-scroll min-h-screen relative">
          <div className="horizontal-scroll-content flex items-center gap-8 px-6">
            <div className="min-w-screen flex items-center justify-center">
              <h2 className="text-5xl md:text-7xl font-bold">
                Comprehensive Health Suite
              </h2>
            </div>
            {[
              "Blood Testing",
              "Sleep Analysis",
              "Nutrition Tracking",
              "Fitness Monitoring",
              "Mental Wellness",
            ].map((item, i) => (
              <div
                key={i}
                className="min-w-[400px] h-[500px] bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-3xl border border-orange-500/30 backdrop-blur-lg p-10 flex items-center justify-center"
              >
                <h3 className="text-4xl font-bold text-center">{item}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Cards Section - SPACING FIXED + CONVERGENCE ANIMATION */}
        <section className="premium-section scale-section py-20 md:py-32 flex items-center justify-center px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/10 to-black"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="reveal-text text-5xl md:text-7xl font-bold mb-16 text-center">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ transformStyle: "preserve-3d" }}>
              <div className="premium-card p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-600/30 backdrop-blur-lg" style={{ willChange: "transform, opacity, filter" }}>
                <h3 className="text-3xl font-bold mb-4">Essential</h3>
                <p className="text-5xl font-bold mb-6 text-orange-500">$29/mo</p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Basic health tracking
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Monthly reports
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Email support
                  </li>
                </ul>
              </div>
              <div className="premium-card p-8 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-3xl border-2 border-orange-500 backdrop-blur-lg transform scale-105 shadow-2xl shadow-orange-500/20" style={{ willChange: "transform, opacity, filter" }}>
                <div className="bg-orange-500 text-black text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
                <h3 className="text-3xl font-bold mb-4">Pro</h3>
                <p className="text-5xl font-bold mb-6 text-orange-500">$79/mo</p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Advanced AI analytics
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Real-time monitoring
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Expert consultations
                  </li>
                </ul>
              </div>
              <div className="premium-card p-8 bg-gradient-to-br from-purple-800/50 to-blue-900/50 rounded-3xl border border-purple-600/30 backdrop-blur-lg" style={{ willChange: "transform, opacity, filter" }}>
                <h3 className="text-3xl font-bold mb-4">Enterprise</h3>
                <p className="text-5xl font-bold mb-6 text-purple-500">Custom</p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited users
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Dedicated account manager
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    White-label options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section with Flip Cards - SPACING FIXED */}
        <section className="showcase-section gradient-section scale-section py-20 md:py-32 flex items-center justify-center px-6 relative">
          <div
            className="gradient-bg absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/20 to-purple-900/20"
            style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }}
          ></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="reveal-text text-5xl md:text-7xl font-bold mb-16 text-center">
              Trusted by Thousands
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flip-card aspect-square bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl border border-orange-500/30 backdrop-blur-lg flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="text-6xl">⭐</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="min-h-screen flex items-center justify-center py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-red-900/20 to-black"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Your Health Superpower Awaits
            </h2>
            <p className="text-2xl md:text-3xl text-gray-300 mb-12">
              Join millions taking control of their health journey
            </p>
            <button className="px-14 py-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-2xl font-bold hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50">
              Start Your Free Trial
            </button>
            <p className="text-gray-500 mt-6">No credit card required</p>
          </div>
        </section>
      </div>
    </SmoothScrolling>
  );
}
