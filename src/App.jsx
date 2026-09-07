import { useEffect, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { PageWrapper } from "./components/layout/PageWrapper";
import { MainContent } from "./components/layout/MainContent";

import { IntroScreen } from "./components/feedback/IntroScreen";
import { ExternalLinkModal } from "./components/modals/ExternalLinkModal";

import { useExternalLink } from "./hooks/useExternalLink";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const shouldReduceMotion = useReducedMotion();

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
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /**
   * Prevent page scrolling
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
      <AnimatePresence mode="wait" initial={false}>
        {showIntro ? (
          <IntroScreen key="intro" />
        ) : (
          <motion.div
            key="main-content"
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <PageWrapper>
              <MainContent onExternalLink={openExternalLink} />
            </PageWrapper>
          </motion.div>
        )}
      </AnimatePresence>

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
