/* eslint-disable react-hooks/set-state-in-effect */
// src/components/aspiration/hooks/useAspirationLinks.js

import { useEffect, useMemo, useState } from "react";

const DEFAULT_ITEMS_PER_PAGE = 5;

export const useAspirationLinks = ({
  links = [],
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  isOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const filteredLinks = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    if (!keyword) {
      return links;
    }

    return links.filter((link) => {
      const title = link.title?.toLowerCase() ?? "";

      const description = link.description?.toLowerCase() ?? "";

      return title.includes(keyword) || description.includes(keyword);
    });
  }, [links, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLinks.length / itemsPerPage),
  );

  const paginatedLinks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    return filteredLinks.slice(startIndex, endIndex);
  }, [filteredLinks, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setCurrentPage(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  return {
    searchQuery,
    setSearchQuery,

    currentPage,
    totalPages,

    filteredLinks,
    paginatedLinks,

    goToPreviousPage,
    goToNextPage,
  };
};
