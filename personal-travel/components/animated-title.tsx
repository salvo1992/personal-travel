"use client"

import { useEffect, useRef } from "react"

interface AnimatedTitleProps {
  title: string
}

export function AnimatedTitle({ title }: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const titleElement = titleRef.current
    if (!titleElement) return

    // Aggiungi l'animazione
    titleElement.classList.add("animate-title")

    // Animazione di fade-in e slide-up
    titleElement.style.opacity = "0"
    titleElement.style.transform = "translateY(20px)"

    setTimeout(() => {
      titleElement.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
      titleElement.style.opacity = "1"
      titleElement.style.transform = "translateY(0)"
    }, 100)

    // Aggiungi l'effetto di hover
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = titleElement.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      titleElement.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`
    }

    const handleMouseLeave = () => {
      titleElement.style.transition = "transform 0.5s ease-out"
      titleElement.style.transform = "perspective(1000px) rotateY(0) rotateX(0)"
    }

    titleElement.addEventListener("mousemove", handleMouseMove)
    titleElement.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      titleElement.removeEventListener("mousemove", handleMouseMove)
      titleElement.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <h1
      ref={titleRef}
      className="text-4xl font-bold text-white z-10 cursor-default select-none"
      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
    >
      {title}
    </h1>
  )
}
