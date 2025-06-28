"use client"

import { useEffect, useRef, useState } from "react"

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  originalX: number
  originalY: number
}

export default function DotsAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      setDimensions({ width: rect.width, height: rect.height })
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Initialize dots
    const initDots = () => {
      const dots: Dot[] = []
      const spacing = 40
      const cols = Math.floor(dimensions.width / spacing)
      const rows = Math.floor(dimensions.height / spacing)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2
          const y = j * spacing + spacing / 2

          dots.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            originalX: x,
            originalY: y,
          })
        }
      }

      dotsRef.current = dots
    }

    if (dimensions.width > 0 && dimensions.height > 0) {
      initDots()
    }

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.isHovering = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      const dots = dotsRef.current
      const mouse = mouseRef.current

      dots.forEach((dot, i) => {
        // Mouse interaction
        if (mouse.isHovering) {
          const dx = mouse.x - dot.x
          const dy = mouse.y - dot.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 100

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            const angle = Math.atan2(dy, dx)
            dot.vx -= Math.cos(angle) * force * 0.3
            dot.vy -= Math.sin(angle) * force * 0.3
          }
        }

        // Return to original position
        const returnForce = 0.02
        dot.vx += (dot.originalX - dot.x) * returnForce
        dot.vy += (dot.originalY - dot.y) * returnForce

        // Apply friction
        dot.vx *= 0.95
        dot.vy *= 0.95

        // Update position
        dot.x += dot.vx
        dot.y += dot.vy

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(235, 251, 41, 0.6)"
        ctx.fill()

        // Draw connections
        dots.forEach((otherDot, j) => {
          if (i !== j) {
            const dx = dot.x - otherDot.x
            const dy = dot.y - otherDot.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              const opacity = ((80 - distance) / 80) * 0.3
              ctx.beginPath()
              ctx.moveTo(dot.x, dot.y)
              ctx.lineTo(otherDot.x, otherDot.y)
              ctx.strokeStyle = `rgba(235, 251, 41, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    if (dimensions.width > 0) {
      animate()
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions.width, dimensions.height])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ width: "100%", height: "100%" }} />
}
