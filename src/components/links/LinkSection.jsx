// src/components/links/LinkSection.jsx

import { FiArrowUpRight } from "react-icons/fi";

import { mainLinks, socialLinks } from "../../config/links";

export const LinkSection = ({ onLinkClick }) => {
  /*
   * Aspirasi sudah memiliki primary CTA
   * sendiri pada AspirationSection.
   *
   * Google Drive tidak ditampilkan di LinkSection
   * karena akan diakses melalui modal pada AspirationSection.
   */
  const contactLinks = mainLinks.filter(
    (link) =>
      link.id !== "aspirasi-fkuntar" && !link.id.startsWith("google-drive-"),
  );

  const informationLinks = [...contactLinks, ...socialLinks];

  if (informationLinks.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="link-section-title" className="w-full">
      {/* Section header */}
      <div className="text-center">
        <p
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.18em]

            text-brand-primary

            sm:text-xs
          "
        >
          Informasi Kontak
        </p>

        <h2
          id="link-section-title"
          className="
            mt-3

            text-2xl
            font-bold
            tracking-[-0.025em]

            text-brand-text

            sm:text-3xl
          "
        >
          Tetap Terhubung
        </h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-xl

            text-sm
            font-medium
            leading-7

            text-brand-muted

            sm:text-base
          "
        >
          Hubungi dan ikuti kanal resmi DPM FK UNTAR melalui informasi berikut.
        </p>
      </div>

      <div
        className="
          mt-8

          flex
          flex-col
          gap-3
        "
      >
        {informationLinks.map((link) => (
          <ContactLinkItem key={link.id} link={link} onClick={onLinkClick} />
        ))}
      </div>
    </section>
  );
};

const ContactLinkItem = ({ link, onClick }) => {
  const Icon = link.icon;

  const isInstagram = link.variant === "instagram";

  const isTikTok = link.variant === "tiktok";

  let iconStyles = `
    bg-brand-secondary/55
    text-brand-primary

    group-hover:bg-brand-secondary
  `;

  let hoverBorderStyles = "hover:border-brand-primary/30";

  let arrowStyles = `
    text-brand-muted

    group-hover:text-brand-primary
  `;

  if (isInstagram) {
    iconStyles = `
      bg-brand-accent/20
      text-brand-accent

      group-hover:bg-brand-accent/30
    `;

    hoverBorderStyles = "hover:border-brand-accent/40";

    arrowStyles = `
      text-brand-accent/70

      group-hover:text-brand-accent
    `;
  }

  if (isTikTok) {
    iconStyles = `
      bg-brand-dark/10
      text-brand-dark

      group-hover:bg-brand-dark/15
    `;

    hoverBorderStyles = "hover:border-brand-dark/30";

    arrowStyles = `
      text-brand-muted

      group-hover:text-brand-dark
    `;
  }

  return (
    <button
      type="button"
      onClick={() => onClick?.(link)}
      className={`
        group

        flex
        min-h-20
        w-full
        items-center
        gap-4

        rounded-2xl

        border
        border-brand-dark/10

        bg-brand-card

        px-4
        py-4

        text-left

        transition
        duration-200

        hover:bg-white/70

        ${hoverBorderStyles}

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-primary
        focus-visible:ring-offset-2
        focus-visible:ring-offset-brand-bg

        sm:px-5
      `}
    >
      <LinkIcon icon={Icon} className={iconStyles} />

      <LinkContent link={link} />

      <FiArrowUpRight
        size={18}
        aria-hidden="true"
        className={`
          shrink-0

          transition
          duration-200

          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5

          ${arrowStyles}
        `}
      />
    </button>
  );
};

const LinkIcon = ({ icon: Icon, className = "" }) => {
  return (
    <span
      aria-hidden="true"
      className={`
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center

        rounded-xl

        transition-colors
        duration-200

        ${className}
      `}
    >
      {Icon && <Icon size={20} />}
    </span>
  );
};

const LinkContent = ({ link }) => {
  return (
    <span
      className="
        min-w-0
        flex-1
      "
    >
      <span
        className="
          block

          text-sm
          font-bold

          text-brand-text

          sm:text-[15px]
        "
      >
        {link.title}
      </span>

      {link.description && (
        <span
          className="
            mt-1
            block

            text-xs
            font-medium
            leading-5

            text-brand-muted

            sm:text-sm
          "
        >
          {link.description}
        </span>
      )}
    </span>
  );
};
