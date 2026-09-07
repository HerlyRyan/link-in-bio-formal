import { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { PageWrapper } from "./components/layout/PageWrapper";
import { MainContent } from "./components/layout/MainContent";

import { IntroScreen } from "./components/feedback/IntroScreen";
import { ExternalLinkModal } from "./components/modals/ExternalLinkModal";

import { useExternalLink } from "./hooks/useExternalLink";

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.sessionStorage.getItem("dpm-intro-seen") !== "true";
  });

  const {
    externalLink,
    openExternalLink,
    closeExternalLink,
    confirmExternalLink,
  } = useExternalLink();

  /**
   * Intro lifecycle
   */
  useEffect(() => {
    if (!showIntro) return;

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("dpm-intro-seen", "true");

      setShowIntro(false);
    }, 900);

    return () => {
      window.clearTimeout(timer);
    };
  }, [showIntro]);

  /**
   * Prevent background scrolling
   * while intro is visible.
   */
  useEffect(() => {
    if (!showIntro) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  return (
    <>
      <AnimatePresence>{showIntro && <IntroScreen />}</AnimatePresence>

      <PageWrapper>
        <MainContent onExternalLink={openExternalLink} />
      </PageWrapper>

      <ExternalLinkModal
        isOpen={externalLink.isOpen}
        linkTitle={externalLink.title}
        linkUrl={externalLink.url}
        type={externalLink.type}
        onClose={closeExternalLink}
        onConfirm={confirmExternalLink}
      />
    </>
  );
}
