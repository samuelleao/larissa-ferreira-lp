export type WindowWithReveal = Window & { __landingRevealObserver?: IntersectionObserver }

const observerOptions: IntersectionObserverInit = {
  root: null,
  threshold: 0.2,
  rootMargin: "0px 0px -12% 0px",
}

export function ensureLandingRevealObserver(): IntersectionObserver {
  const globalWindow = window as WindowWithReveal
  if (globalWindow.__landingRevealObserver) return globalWindow.__landingRevealObserver

  globalWindow.__landingRevealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add("is-visible")
      observer.unobserve(entry.target)
    }
  }, observerOptions)

  return globalWindow.__landingRevealObserver
}

export function observeRevealsIn(rootSelector: string): void {
  const root = document.querySelector(rootSelector)
  if (!root) return

  const targets = root.querySelectorAll("[data-reveal], [data-reveal-media]")
  if (!targets.length) return

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((node) => node.classList.add("is-visible"))
    return
  }

  const observer = ensureLandingRevealObserver()
  targets.forEach((node) => observer.observe(node))
}

export function initIconDrawIn(rootSelector: string): void {
  document.querySelectorAll(`${rootSelector} .icon-draw`).forEach((icon) => {
    let hasMeasuredShape = false
    icon
      .querySelectorAll<SVGGeometryElement>("path, line, polyline, polygon, circle, rect, ellipse")
      .forEach((shape) => {
        try {
          const length = shape.getTotalLength()
          shape.style.setProperty("--stroke-length", `${Math.max(length, 1)}`)
          hasMeasuredShape = true
        } catch {
          /* ignore non-measurable shapes */
        }
      })

    if (hasMeasuredShape) {
      icon.classList.add("is-draw-ready")
    }
  })
}
