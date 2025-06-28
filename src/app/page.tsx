"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "./components/hero-section/hero-section"
import ProductsSection from "./components/products-section/products-section"
import FeaturesSection from "./components/features-section/features-section"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
    </>
  )
}
