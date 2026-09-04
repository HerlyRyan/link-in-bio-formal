import { useState } from "react";

const initialState = {
  isOpen: false,
  title: "",
  url: "",
  type: "external",
};

export const useExternalLink = () => {
  const [externalLink, setExternalLink] = useState(initialState);

  const openExternalLink = (title, url, type = "external") => {
    setExternalLink({
      isOpen: true,
      title,
      url,
      type,
    });
  };

  const closeExternalLink = () => {
    setExternalLink(initialState);
  };

  const confirmExternalLink = () => {
    if (!externalLink.url) return;

    if (externalLink.type === "email") {
      window.location.href = externalLink.url;
    } else {
      window.open(externalLink.url, "_blank", "noopener,noreferrer");
    }

    closeExternalLink();
  };

  return {
    externalLink,
    openExternalLink,
    closeExternalLink,
    confirmExternalLink,
  };
};
