// src/components/layout/MainContent.jsx

import { ProfileHeader } from "../profile/ProfileHeader";
import { OrganizationPhotoSection } from "../profile/OrganizationPhotoSection";
import { AspirationSection } from "../aspiration/AspirationSection";
import { VisionMissionCarousel } from "../vision/VisionMissionCarousel";
import { ProgramSection } from "../program/ProgramSection";
import { LinkSection } from "../links/LinkSection";
import { FooterComponent } from "./Footer";

export const MainContent = ({ onExternalLink }) => {
  const handleExternalLink = (link) => {
    if (!link?.url) return;

    onExternalLink?.(link.title, link.url, link.type);
  };

  return (
    <main
      className="
        w-full
        min-w-0
        max-w-full

        overflow-hidden

        rounded-[2rem]

        border
        border-brand-dark/10

        bg-brand-card

        shadow-[0_20px_60px_rgba(32,40,8,0.07)]
      "
    >
      {/* Profile */}
      <section
        className="
          w-full
          min-w-0
          max-w-full

          px-5
          pt-5

          sm:px-8
          sm:pt-8

          lg:px-10
          lg:pt-10
        "
      >
        <ProfileHeader />
      </section>

      {/* Organization Photo */}
      <section
        className="
          w-full
          min-w-0
          max-w-full

          px-5
          pt-6

          sm:px-8
          sm:pt-8

          lg:px-10
        "
      >
        <OrganizationPhotoSection
        />
      </section>

      {/* Vision, Mission & Function */}
      <section
        className="
          w-full
          min-w-0
          max-w-full

          px-5
          pt-10

          sm:px-8
          sm:pt-12

          lg:px-10
        "
      >
        <VisionMissionCarousel />
      </section>

      {/* Program Kerja */}
      <section
        className="
          w-full
          min-w-0
          max-w-full

          overflow-hidden

          px-5
          pt-10

          sm:px-8
          sm:pt-12

          lg:px-10
        "
      >
        <ProgramSection />
      </section>

      {/* Aspiration */}
      <section
        className="
          w-full
          min-w-0
          max-w-full

          px-5
          pt-8

          sm:px-8
          sm:pt-10

          lg:px-10
        "
      >
        <AspirationSection onClick={handleExternalLink} />
      </section>

      {/* Links */}
      <section
        className="
          w-full
          min-w-0
          max-w-full

          px-5
          pt-10

          sm:px-8
          sm:pt-12

          lg:px-10
        "
      >
        <LinkSection onLinkClick={handleExternalLink} />
      </section>

      {/* Footer */}
      <div
        className="
          mt-10

          w-full
          min-w-0
          max-w-full

          border-t
          border-brand-dark/10

          px-5

          sm:mt-12
          sm:px-8

          lg:px-10
        "
      >
        <FooterComponent />
      </div>
    </main>
  );
};
