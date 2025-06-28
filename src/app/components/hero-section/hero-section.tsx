"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ShoppingBag, Zap, Shield, Truck } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const cta = ctaRef.current

    if (!hero || !title || !subtitle || !cta) return

    // Split title text into words
    const titleText = title.textContent || ""
    title.innerHTML = ""

    titleText.split(" ").forEach((word, index) => {
      const span = document.createElement("span")
      span.textContent = word + " "
      span.style.display = "inline-block"
      span.style.opacity = "0"
      span.style.transform = "translateY(100px) rotateX(-90deg)"
      title.appendChild(span)
    })

    const titleWords = title.querySelectorAll("span")

    // Animation timeline
    const tl = gsap.timeline({ delay: 0.5 })

    tl.to(titleWords, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
    })
      .from(
        subtitle,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        cta,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      )

    // Floating animation for icons
    gsap.to(".floating-icon", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2,
    })
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ebfb29]/10 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ebfb29]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ebfb29]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-[clamp(3rem,8vw,7rem)] font-bold text-white leading-none mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Modern E-Commerce Experience
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Discover premium products with lightning-fast performance and seamless shopping experience
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group relative px-8 py-4 bg-[#ebfb29] text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingBag size={20} />
                Shop Now
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            <button className="px-8 py-4 border-2 border-[#ebfb29] text-[#ebfb29] font-semibold rounded-lg hover:bg-[#ebfb29] hover:text-black transition-all duration-300">
              View Products
            </button>
          </div>

          {/* Features Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="floating-icon flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-[#ebfb29]/10 rounded-full flex items-center justify-center">
                <Zap className="text-[#ebfb29]" size={24} />
              </div>
              <span className="text-white/60 text-sm">Fast Delivery</span>
            </div>

            <div className="floating-icon flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-[#ebfb29]/10 rounded-full flex items-center justify-center">
                <Shield className="text-[#ebfb29]" size={24} />
              </div>
              <span className="text-white/60 text-sm">Secure Payment</span>
            </div>

            <div className="floating-icon flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-[#ebfb29]/10 rounded-full flex items-center justify-center">
                <Truck className="text-[#ebfb29]" size={24} />
              </div>
              <span className="text-white/60 text-sm">Free Shipping</span>
            </div>

            <div className="floating-icon flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-[#ebfb29]/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="text-[#ebfb29]" size={24} />
              </div>
              <span className="text-white/60 text-sm">Quality Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2 tracking-wider">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#ebfb29] to-transparent animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
