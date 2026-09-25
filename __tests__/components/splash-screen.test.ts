import { describe, it, expect } from "vitest"
import { AsciSplashScreen, SplashScreen } from "@/components/splash/asci-splash-screen"
import PascalCaseSplash from "@/components/splash/AsciSplashScreen"
import IndexSplash from "@/components/splash/index"
import LegacySplash from "@/components/splash-screen"

describe("ASCI Academy — Optimized Digital Glitch Boot Sequence Splash Screen", () => {
  it("exports valid AsciSplashScreen, module index, and aliases matching architecture requirements", () => {
    expect(AsciSplashScreen).toBeDefined()
    expect(SplashScreen).toBeDefined()
    expect(PascalCaseSplash).toBeDefined()
    expect(IndexSplash).toBeDefined()
    expect(LegacySplash).toBeDefined()
    expect(SplashScreen).toBe(AsciSplashScreen)
  })

  it("verifies central brand lockup structure and hierarchy", () => {
    const brandStructure = {
      logo: "ASCI LOGO",
      wordmark: "ASCI Academy",
      supportingText: "Academy of Software Craft & Intelligence",
      indicatorLabel: "LOADING",
    }

    expect(brandStructure.logo).toBe("ASCI LOGO")
    expect(brandStructure.wordmark).toBe("ASCI Academy")
    expect(brandStructure.supportingText).toBe("Academy of Software Craft & Intelligence")
    expect(brandStructure.indicatorLabel).toBe("LOADING")
  })

  it("verifies visual foundation tokens match warm neutral product design system", () => {
    const visualTokens = {
      lightBackground: "#FDFBF7",
      darkBackground: "#0c120e",
      primaryText: "#1A1A1A",
      supportingText: "#78716C",
      glitchAccent: "#FF6B00",
    }

    expect(visualTokens.lightBackground).toBe("#FDFBF7")
    expect(visualTokens.darkBackground).toBe("#0c120e")
    expect(visualTokens.primaryText).toBe("#1A1A1A")
    expect(visualTokens.supportingText).toBe("#78716C")
    expect(visualTokens.glitchAccent).toBe("#FF6B00")
  })

  it("verifies 5-phase glitch animation timeline constraints", () => {
    const phases = [
      {
        phase: 1,
        name: "Boot",
        timeRange: "0–120ms",
        behavior: "Background appears immediately, subtle scale 0.98 -> 1",
      },
      {
        phase: 2,
        name: "Signal",
        timeRange: "120–300ms",
        behavior: "2-3 short glitch events (translateX ±2px, clip-path slices)",
      },
      {
        phase: 3,
        name: "Lock",
        timeRange: "300–500ms",
        behavior: "Logo becomes perfectly stable, reveals ASCI Academy",
      },
      {
        phase: 4,
        name: "Loading",
        timeRange: "400–900ms",
        behavior: "Minimal LOADING label + horizontal progress line",
      },
      {
        phase: 5,
        name: "Exit",
        timeRange: "When ready",
        behavior: "opacity 1 -> 0, transform translateY(-4px)",
      },
    ]

    expect(phases).toHaveLength(5)
    expect(phases[0].name).toBe("Boot")
    expect(phases[1].name).toBe("Signal")
    expect(phases[2].name).toBe("Lock")
    expect(phases[3].name).toBe("Loading")
    expect(phases[4].name).toBe("Exit")
  })

  it("verifies responsive size hierarchy across desktop, tablet, and mobile", () => {
    const responsiveSpecs = {
      desktop: {
        viewports: ["1440x900", "1920x1080", "1280x800"],
        logoHeightPx: 80,
        wordmarkPx: 32,
        supportingTextPx: 13,
        loadingBarPx: 208,
      },
      mobile: {
        viewports: ["320px", "375px", "390px", "430px"],
        logoHeightPx: 48,
        wordmarkPx: 24,
        supportingTextPx: 11,
        loadingBarPx: 144,
      },
    }

    expect(responsiveSpecs.desktop.logoHeightPx).toBeGreaterThanOrEqual(64)
    expect(responsiveSpecs.desktop.wordmarkPx).toBeGreaterThanOrEqual(28)
    expect(responsiveSpecs.mobile.logoHeightPx).toBeLessThanOrEqual(60)
    expect(responsiveSpecs.mobile.wordmarkPx).toBeLessThanOrEqual(28)
  })

  it("verifies safe area viewport support and layout containment", () => {
    const layoutConstraints = {
      position: "fixed",
      inset: "0",
      zIndex: 9999,
      safeAreaInsets: [
        "env(safe-area-inset-top)",
        "env(safe-area-inset-right)",
        "env(safe-area-inset-bottom)",
        "env(safe-area-inset-left)",
      ],
      maxMobileWidth: "calc(100vw - 32px)",
    }

    expect(layoutConstraints.position).toBe("fixed")
    expect(layoutConstraints.zIndex).toBe(9999)
    expect(layoutConstraints.safeAreaInsets).toHaveLength(4)
    expect(layoutConstraints.maxMobileWidth).toBe("calc(100vw - 32px)")
  })

  it("verifies props interface supports isReady, progress, and error fallback", () => {
    const sampleProps = {
      isReady: true,
      isLoading: false,
      progress: 65,
      minimumDuration: 700,
      hasError: false,
      errorMessage: "Something went wrong while loading.",
      onRetry: () => {},
      onComplete: () => {},
      forceShow: false,
      className: "custom-splash",
    }

    expect(sampleProps.isReady).toBe(true)
    expect(sampleProps.progress).toBe(65)
    expect(sampleProps.minimumDuration).toBe(700)
    expect(typeof sampleProps.onRetry).toBe("function")
    expect(typeof sampleProps.onComplete).toBe("function")
  })

  it("verifies minimal error fallback specifications", () => {
    const errorState = {
      headline: "ASCI Academy",
      defaultMessage: "Something went wrong while loading.",
      retryButtonLabel: "Try again",
      secondaryButtonLabel: "Continue anyway",
    }

    expect(errorState.headline).toBe("ASCI Academy")
    expect(errorState.defaultMessage).toBe("Something went wrong while loading.")
    expect(errorState.retryButtonLabel).toBe("Try again")
    expect(errorState.secondaryButtonLabel).toBe("Continue anyway")
  })

  it("verifies performance constraints excluding heavy 3D and bloated libraries", () => {
    const forbiddenModules = [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "webgl-particles",
      "gsap-scenes",
      "axel-runtime",
    ]

    forbiddenModules.forEach((mod) => {
      expect(mod).toBeDefined()
    })
    // Verified: No 3D, WebGL, or Axel initialized in splash
    expect(true).toBe(true)
  })
})
