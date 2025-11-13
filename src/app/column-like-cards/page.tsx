"use client";

import { motion } from "framer-motion";

interface CardData {
  id: number;
  title: string;
  description: string;
  gradient: string;
}

const cards: CardData[] = [
  {
    id: 1,
    title: "Elegant Design",
    description: "Experience the subtle beauty of scroll-driven animations that enhance user engagement without overwhelming the senses.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Smooth Performance",
    description: "Built with performance in mind, utilizing GPU-accelerated animations for silky smooth 60fps scrolling experiences.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Modern Technology",
    description: "Powered by Framer Motion and Next.js 16, delivering cutting-edge animation capabilities with minimal bundle impact.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    title: "Responsive Design",
    description: "Fully responsive animations that adapt seamlessly to any screen size, from mobile devices to desktop displays.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Developer Friendly",
    description: "Clean, maintainable code with TypeScript support and intuitive API makes implementation straightforward and enjoyable.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: 6,
    title: "Production Ready",
    description: "Battle-tested patterns and best practices ensure your animations work reliably across all modern browsers.",
    gradient: "from-rose-500 to-pink-500",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 75,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

export default function ColumnLikeCards() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Column-Inspired
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Scroll Animations
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              Scroll down to experience elegant, scroll-triggered card animations
              inspired by world-class design.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative"
            >
              {/* Gradient Background Glow */}
              <div
                className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${card.gradient} opacity-0 blur transition duration-500 group-hover:opacity-30`}
              />

              {/* Card Content */}
              <div className="relative h-full rounded-2xl bg-zinc-800/50 p-8 backdrop-blur-sm ring-1 ring-white/10 transition duration-300 hover:bg-zinc-800/80">
                {/* Icon/Number */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-xl font-bold text-white ring-1 ring-white/20">
                  {card.id}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-2xl font-semibold text-white">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-base leading-relaxed text-zinc-400">
                  {card.description}
                </p>

                {/* Bottom Accent */}
                <div
                  className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r ${card.gradient} opacity-75`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg
            className="h-6 w-6"
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
        </motion.div>
      </motion.div>

      {/* Footer Spacer */}
      <div className="h-32" />
    </div>
  );
}
