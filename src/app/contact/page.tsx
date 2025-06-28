"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import emailjs from "@emailjs/browser"
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const formRef = useRef<HTMLFormElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY") // Replace with your EmailJS public key

    // Animate elements on mount
    const title = titleRef.current
    const cards = cardsRef.current

    if (title) {
      gsap.fromTo(title, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
    }

    if (cards) {
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, delay: 0.5 },
      )
    }

    gsap.fromTo(".form-field", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, delay: 0.8 })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Replace these with your EmailJS service ID, template ID, and public key
      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your service ID
        "YOUR_TEMPLATE_ID", // Replace with your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "412abdurrahman@gmail.com",
        },
        "YOUR_PUBLIC_KEY", // Replace with your public key
      )

      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Email send error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/abdurrahman778",
      color: "hover:text-gray-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/abdurrahman778",
      color: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/abdurrahman778",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/abdurrahman778",
      color: "hover:text-pink-400",
    },
  ]

  return (
    <main className="bg-black min-h-screen pt-20">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Get In Touch</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div ref={cardsRef} className="space-y-8">
            <div className="contact-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#ebfb29]/10 rounded-full flex items-center justify-center">
                  <Mail className="text-[#ebfb29]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Email</h3>
                  <p className="text-white/60">412abdurrahman@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="contact-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#ebfb29]/10 rounded-full flex items-center justify-center">
                  <Phone className="text-[#ebfb29]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Phone</h3>
                  <p className="text-white/60">085881316945</p>
                </div>
              </div>
            </div>

            <div className="contact-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#ebfb29]/10 rounded-full flex items-center justify-center">
                  <MapPin className="text-[#ebfb29]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Location</h3>
                  <p className="text-white/60">Indonesia</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-card bg-white/5 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 ${social.color}`}
                    >
                      <IconComponent size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-8">Send Message</h2>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-field">
                <label htmlFor="name" className="block text-white/80 mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#ebfb29] transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="block text-white/80 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#ebfb29] transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-field">
                <label htmlFor="subject" className="block text-white/80 mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#ebfb29] transition-colors duration-300"
                  placeholder="Project inquiry"
                />
              </div>

              <div className="form-field">
                <label htmlFor="message" className="block text-white/80 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#ebfb29] transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ebfb29] text-black font-semibold py-4 rounded-lg hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="text-green-400 text-center font-medium">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="text-red-400 text-center font-medium">Failed to send message. Please try again.</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
