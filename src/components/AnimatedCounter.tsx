'use client'

import { useState, useEffect, useRef } from 'react'

interface CounterProps {
  target: string
  duration?: number
}

export function AnimatedCounter({ target, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  const numericPart = parseInt(target.replace(/\D/g, ''), 10)
  const suffix = target.replace(/[0-9]/g, '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = numericPart / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numericPart) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current) + suffix)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, numericPart, target, suffix, duration])

  return <span ref={ref}>{count}</span>
}
