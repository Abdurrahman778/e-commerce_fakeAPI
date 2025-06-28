"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Zap, Shield, Truck, Headphones, RefreshCw, Award } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Animate feature cards
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
        },
      },
    )

    // Animate section title
    gsap.fromTo(
      ".features-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      },
    )
  }, [])

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing fast loading times and seamless performance across all devices.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your transactions are protected with bank-level security and encryption.",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders over $50 with fast delivery options.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to help you.",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Hassle-free returns within 30 days. No questions asked policy.",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "All products come with our quality guarantee and warranty protection.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="features-title text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Why Choose Us</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            We provide exceptional service and quality that sets us apart from the competition
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="feature-card group p-8 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-[#ebfb29]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#ebfb29]/20 transition-colors duration-300">
                  <IconComponent className="text-[#ebfb29]" size={32} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#ebfb29] transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
