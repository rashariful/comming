import { Button } from "antd"
import { useState, useEffect } from "react"

export default function Home() {
  // Countdown states
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  // Email form states
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null) // { type: 'success' | 'error', message: string }

  useEffect(() => {
    // const targetDate = new Date("2024-12-31T23:59:59")
    const targetDate = new Date("2024-09-26T23:59:59")


    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate - now

      if (difference <= 0) {
        // Countdown has ended
        clearInterval(interval)
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        return
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(s)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      setFeedback({ type: "error", message: "Please enter a valid email address." })
      return
    }

    setIsSubmitting(true)
    setFeedback(null)

    try {
      // Replace the URL below with your actual subscription endpoint
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setFeedback({ type: "success", message: "Thank you for subscribing!" })
        setEmail("")
      } else {
        const data = await response.json()
        setFeedback({ type: "error", message: data.message || "Something went wrong. Please try again." })
      }
    } catch (error) {
      console.error("Subscription error:", error)
      setFeedback({ type: "error", message: "An unexpected error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-4 bg-gradient-to-br from-indigo-600 to-purple-700"
    >
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-center">Icchaporon</h1>
      <p className="text-2xl sm:text-3xl mb-8 text-center">Welcome to Client Panel</p>
      <p className="text-2xl sm:text-3xl mb-8 text-center">New Recipes Coming Soon!
      </p>

      {/* Countdown Timer */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {/* Days */}
        <div className="flex flex-col items-center bg-indigo-800 bg-opacity-50 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <span className="text-4xl sm:text-5xl font-bold">{days}</span>
          <span className="mt-2 text-lg sm:text-xl">Days</span>
        </div>
        {/* Hours */}
        <div className="flex flex-col items-center bg-indigo-800 bg-opacity-50 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <span className="text-4xl sm:text-5xl font-bold">{hours}</span>
          <span className="mt-2 text-lg sm:text-xl">Hours</span>
        </div>
        {/* Minutes */}
        <div className="flex flex-col items-center bg-indigo-800 bg-opacity-50 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <span className="text-4xl sm:text-5xl font-bold">{minutes}</span>
          <span className="mt-2 text-lg sm:text-xl">Minutes</span>
        </div>
        {/* Seconds */}
        <div className="flex flex-col items-center bg-indigo-800 bg-opacity-50 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <span className="text-4xl sm:text-5xl font-bold">{seconds}</span>
          <span className="mt-2 text-lg sm:text-xl">Seconds</span>
        </div>
      </div>

      {/* Subscription Form */}
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            aria-label="Email address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <Button
            type="primary"
      
       
          >
            {isSubmitting ? "Submitting..." : "Notify Me"}
          </Button>
        </form>

        {/* Feedback Message */}
        {feedback && (
          <p
            className={`mt-4 text-center text-sm sm:text-base ${
              feedback.type === "success" ? "text-green-400" : "text-red-400"
            }`}
            role="alert"
          >
            {feedback.message}
          </p>
        )}
      </div>

      {/* Footer (Optional) */}
      <footer className="mt-12 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Icchaporon. All rights reserved.
      </footer>
    </div>
  )
}
