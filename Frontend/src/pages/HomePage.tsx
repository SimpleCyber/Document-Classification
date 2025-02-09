import { lazy, Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorFallback } from "../components/ErrorFallback"

const Hero = lazy(() => import("../components/Hero"))
const Features = lazy(() => import("../components/Features"))
const Process = lazy(() => import("../components/Process"))
const Footer = lazy(() => import("../components/Footer"))

function HomePage() {
  return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-navy-800 to-navy-800 text-white">      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <Features />
          <Process />
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default HomePage

