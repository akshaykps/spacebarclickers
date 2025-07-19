'use client'

import { useState, useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
}

const App = () => {
  const [floatingPoints, setFloatingPoints] = useState<Point[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      createFloatingPoint()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const createFloatingPoint = () => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    const containerHeight = containerRef.current.offsetHeight

    const newPoint: Point = {
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
    }

    setFloatingPoints((prev) => [...prev, newPoint])
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #3498db, #2980b9)',
      }}
    >
      {floatingPoints.map((point, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: point.x,
            top: point.y,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'white',
            opacity: 0.7,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  )
}

export default App
