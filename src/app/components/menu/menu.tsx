"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

import "../menu/menu.css"

import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export default function Menu() {
  const menuLinks = [
    { path: "/", label: "HOME" },
    { path: "/contact", label: "CONTACT" },
    { path: "/review", label: "REVIEW" },
    { path: "/product", label: "PRODUCT" },
  ]

  const container = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const tl = useRef<gsap.core.Timeline | null>(null)

  const toggleMenu = () => {
    if (isMenuOpen) {
      tl.current?.reverse()
      setTimeout(() => {
        setIsMenuOpen(false)
      }, 1500) 
    } else {
      setIsMenuOpen(true)
      tl.current?.play()
    }
  }

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 })
      tl.current = gsap
        .timeline({
          paused: true,
        })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power4.inOut",
          delay: -0.75,
        })
    },
    { scope: container },
  )

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play()
    } else {
      tl.current?.reverse()
    }
  }, [isMenuOpen])

  return (
    <>
      <div className="menu-container" ref={container}>
        <div className="menu-bar">
          <div className="menu-logo">
            <Link href={"/"}>Rahman</Link>
          </div>
          <div className="menu-open" onClick={toggleMenu}>
            <p>MENU</p>
          </div>
        </div>
        <div className="menu-overlay">
          <div className="menu-overlay-bar">
            <div className="menu-close-icon" onClick={toggleMenu}>
              <p>&#x2715;</p>
            </div>
          </div>
          <div className="menu-copy">
            <div className="menu-links">
              {menuLinks.map((link, index) => (
                <div className="menu-link-item" key={index}>
                  <div className="menu-link-item-holder">
                    <Link
                      href={link.path}
                      className="menu-link"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleMenu()
                        setTimeout(() => {
                          window.location.href = link.path
                        }, 1000) // Adjust timing to start navigation after animation starts
                      }}
                    >
                      {link.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="menu-info">
              <div className="menu-info-col">
                <a href="#">Twitter &#8599;</a>
                <a href="#">Instagram &#8599;</a>
                <a href="#">Tiktok &#8599;</a>
                <a href="#">Linkedin &#8599;</a>
              </div>
              <div className="menu-info-col">
                <p>412abdurrahman@gmail.com</p>
                <p>085881316945</p>
              </div>
            </div>
          </div>
          <div className="menu-preview">
            <p>Abdurrahman</p>
          </div>
        </div>
      </div>
    </>
  )
}
