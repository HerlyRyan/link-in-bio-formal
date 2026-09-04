import { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { IntroScreen } from "./components/feedback/IntroScreen";
import { BackgroundWrapper } from "./components/layout/BackgroundWrapper";
import { LinkBioContent } from "./components/layout/LinkBioContent";

import { VisionMissionModal } from "./components/modals/VisionMissionModal";
import { ExternalLinkModal } from "./components/modals/ExternalLinkModal";

import { mainLinks, socialLinks } from "./config/links";

import { useExternalLink } from "./hooks/useExternalLink";

export default function App() {
  const [isVisionOpen, setIsVisionOpen] = useState(false);

  const {
    externalLink,
    openExternalLink,
    closeExternalLink,
    confirmExternalLink,
  } = useExternalLink();

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.sessionStorage.getItem("dpm-intro-seen") !== "true";
  });

  useEffect(() => {
    if (!showIntro) return;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem("dpm-intro-seen", "true");
      setShowIntro(false);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [showIntro]);

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <IntroScreen key="intro" />
      ) : (
        <BackgroundWrapper key="content">
          <LinkBioContent
            links={mainLinks}
            socialLinks={socialLinks}
            onVisionClick={() => setIsVisionOpen(true)}
            onExternalClick={openExternalLink}
          />

          <VisionMissionModal
            isOpen={isVisionOpen}
            onClose={() => setIsVisionOpen(false)}
          />

          <ExternalLinkModal
            isOpen={externalLink.isOpen}
            onClose={closeExternalLink}
            onConfirm={confirmExternalLink}
            linkTitle={externalLink.title}
            linkUrl={externalLink.url}
            type={externalLink.type}
          />
        </BackgroundWrapper>
      )}
    </AnimatePresence>
  );
}
