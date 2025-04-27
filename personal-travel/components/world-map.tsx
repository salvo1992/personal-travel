"use client"

import { useEffect, useRef } from "react"

export function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Load world map image
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = "/placeholder.svg?height=600&width=1200"

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Draw flight routes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"
      ctx.lineWidth = 1.5

      // Draw some example flight routes
      drawCurvedLine(ctx, 300, 200, 600, 250, 50, canvas.width, canvas.height)
      drawCurvedLine(ctx, 400, 300, 700, 200, 40, canvas.width, canvas.height)
      drawCurvedLine(ctx, 200, 250, 500, 350, 60, canvas.width, canvas.height)
      drawCurvedLine(ctx, 350, 150, 650, 300, 70, canvas.width, canvas.height)
      drawCurvedLine(ctx, 250, 350, 550, 200, 45, canvas.width, canvas.height)
    }

    // Function to draw curved lines representing flight routes
    function drawCurvedLine(
      ctx: CanvasRenderingContext2D,
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      curveHeight: number,
      canvasWidth: number,
      canvasHeight: number,
    ) {
      // Scale coordinates based on canvas size
      startX = (startX / 1200) * canvasWidth
      startY = (startY / 600) * canvasHeight
      endX = (endX / 1200) * canvasWidth
      endY = (endY / 600) * canvasHeight
      curveHeight = (curveHeight / 600) * canvasHeight

      const midX = (startX + endX) / 2
      const midY = (startY + endY) / 2 - curveHeight

      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.quadraticCurveTo(midX, midY, endX, endY)
      ctx.stroke()

      // Draw a small plane icon at the middle of the curve
      const t = 0.5 // Parameter for point along the curve
      const planeX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * endX
      const planeY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * endY

      ctx.fillStyle = "white"
      ctx.beginPath()
      ctx.arc(planeX, planeY, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        if (img.complete) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
      <canvas ref={canvasRef} className="w-full h-full bg-ocean-800" />
    </div>
  )
}
