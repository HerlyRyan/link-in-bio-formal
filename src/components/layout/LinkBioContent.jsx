import { motion } from "framer-motion";

import { ProfileHeader } from "../profile/ProfileHeader";
import { LinkItem } from "../links/LinkItem";
import { FooterComponent } from "./Footer";
import { BentoGallery } from "../gallery/BentoGallery";
import { galleryItems } from "../../config/gallery";

import {
  containerVariants,
  footerVariants,
  itemVariants,
} from "../../animations/variants";

export const LinkBioContent = ({
  links,
  socialLinks,
  onVisionClick,
  onExternalClick,
}) => {
  const handleLinkClick = (link) => {
    switch (link.type) {
      case "internal":
        if (link.action === "vision") {
          onVisionClick();
        }
        break;

      case "email":
        onExternalClick(link.title, link.url, "email");
        break;

      case "external":
        onExternalClick(link.title, link.url, "external");
        break;

      default:
        console.warn(`Unknown link type: ${link.type}`);
    }
  };

  return (
    <main className="w-full">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          grid
          w-full
          grid-cols-2
          gap-3

          md:grid-cols-6
          md:gap-4
        "
      >
        {/* Profile */}
        <div
          className="
            col-span-2

            md:col-span-6
          "
        >
          <ProfileHeader />
        </div>

        <motion.div
          variants={itemVariants}
          className="col-span-2 md:col-span-6"
        >
          <BentoGallery items={galleryItems} />
        </motion.div>

        {/* Main Links */}
        {links.map((link, index) => {
          const Icon = link.icon;

          const isVision = link.action === "vision";
          const isAspiration = link.id === "aspirasi-fkuntar";

          return (
            <motion.div
              key={link.id}
              variants={itemVariants}
              className={`
                min-w-0

                ${
                  isVision
                    ? `
                      col-span-2
                      md:col-span-4
                    `
                    : isAspiration
                      ? `
                        col-span-2
                        md:col-span-2
                      `
                      : `
                        col-span-2
                        md:col-span-2
                      `
                }
              `}
            >
              <LinkItem
                title={link.title}
                icon={<Icon size={20} aria-hidden="true" />}
                index={index}
                type={link.type}
                isSpecial={link.featured}
                variant={isAspiration ? "secondary" : "default"}
                onClick={() => handleLinkClick(link)}
              />
            </motion.div>
          );
        })}

        {/* Social Links */}
        {socialLinks.map((social, index) => {
          const Icon = social.icon;

          return (
            <motion.div
              key={social.id}
              variants={itemVariants}
              className="
                col-span-2
                min-w-0

                md:col-span-2
              "
            >
              <LinkItem
                title={social.label}
                icon={<Icon size={20} aria-hidden="true" />}
                index={links.length + index}
                type="external"
                variant="social"
                onClick={() => onExternalClick(social.label, social.url)}
              />
            </motion.div>
          );
        })}
      </motion.section>

      <motion.div
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        className="mt-6"
      >
        <FooterComponent />
      </motion.div>
    </main>
  );
};
