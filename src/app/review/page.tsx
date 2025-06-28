"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Star, Quote } from "lucide-react"

export default function Review() {
  const titleRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const reviews = reviewsRef.current

    if (title) {
      gsap.fromTo(title, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
    }

    if (reviews) {
      gsap.fromTo(
        ".review-card",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, delay: 0.5 },
      )
    }
  }, [])

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      rating: 5,
      comment:
        "Exceptional quality and fast delivery. The products exceeded my expectations and the customer service was outstanding.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Designer",
      rating: 5,
      comment:
        "Amazing shopping experience! The website is intuitive and the product quality is top-notch. Highly recommended.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Davis",
      role: "Developer",
      rating: 4,
      comment:
        "Great selection of products and competitive prices. The checkout process was smooth and delivery was prompt.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "David Wilson",
      role: "Entrepreneur",
      rating: 5,
      comment:
        "Outstanding service from start to finish. The team went above and beyond to ensure I was satisfied with my purchase.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lisa Thompson",
      role: "Marketing Director",
      rating: 5,
      comment: "Incredible attention to detail and quality. This has become my go-to store for all my shopping needs.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "James Rodriguez",
      role: "Consultant",
      rating: 4,
      comment: "Reliable service and excellent product range. The user experience is seamless and professional.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <main className="bg-black min-h-screen pt-20">
      <div className="container mx-auto px-4 py-20">
        <div ref={titleRef} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Customer Reviews</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            See what our customers are saying about their experience with us
          </p>
        </div>

        <div ref={reviewsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="review-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-white font-semibold">{review.name}</h3>
                  <p className="text-white/60 text-sm">{review.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "text-[#ebfb29] fill-current" : "text-gray-600"}
                  />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 text-[#ebfb29]/20" size={24} />
                <p className="text-white/80 leading-relaxed pl-4">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
