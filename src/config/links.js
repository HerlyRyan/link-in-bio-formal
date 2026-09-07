// src/config/links.js

import { AiFillTikTok } from "react-icons/ai";

import { FiFolder, FiInstagram, FiMail, FiMessageSquare } from "react-icons/fi";

export const mainLinks = [
  {
    id: "aspirasi-fkuntar",
    title: "Aspirasi FK UNTAR",
    description: "Sampaikan aspirasi, masukan, maupun permasalahan mahasiswa.",
    icon: FiMessageSquare,
    type: "external",
    url: "https://bit.ly/Aspirasi-blok",
  },

  {
    id: "email",
    title: "Email",
    description: "Hubungi DPM FK UNTAR melalui email resmi.",
    icon: FiMail,
    type: "email",
    url: "mailto:dpmfkuntar@gmail.com",
  },

  {
    id: "google-drive-1",
    title: "Angket Sarana dan Prasaran FK UNTAR 2026",
    description: "Akses dokumen DPM FK UNTAR melalui Google Drive.",
    icon: FiFolder,
    type: "external",
    url: "https://drive.google.com/drive/folders/1cjfbC4V_1U4zOp6NuPTuVUF0FJogBPXL",
  },

  {
    id: "google-drive-2",
    title: "Angket Blok 2026",
    description: "Akses dokumen DPM FK UNTAR melalui Google Drive.",
    icon: FiFolder,
    type: "external",
    url: "https://drive.google.com/drive/folders/1FHrCPWScpfAcsZp8yC68OILTWAYK8mOa",
  },

  {
    id: "google-drive-3",
    title: "Angket Blok 2025",
    description: "Akses dokumen DPM FK UNTAR melalui Google Drive.",
    icon: FiFolder,
    type: "external",
    url: "https://drive.google.com/drive/folders/1nZclPvQ3Z6r2QwlJQYarY_fGU9ZYZo2i",
  },

  {
    id: "google-drive-4",
    title: "Angket Blok 2024",
    description: "Akses dokumen DPM FK UNTAR melalui Google Drive.",
    icon: FiFolder,
    type: "external",
    url: "https://drive.google.com/drive/folders/1_a4f1Llu_2wodE4YJhaYZQYcf28uCG0G",
  },

  {
    id: "google-drive-5",
    title: "Angket Blok 2023",
    description: "Akses dokumen DPM FK UNTAR melalui Google Drive.",
    icon: FiFolder,
    type: "external",
    url: "https://drive.google.com/drive/folders/1IRqzK1pfSFDESQc4R6R9JBPOkZSa6Yrt",
  },

  {
    id: "google-drive-6",
    title: "KOAS",
    description: "Akses dokumen DPM FK UNTAR melalui Google Drive.",
    icon: FiFolder,
    type: "external",
    url: "https://drive.google.com/drive/folders/1QSM77IoFphLDx3aKv5TYN0VQwj2vI2pY",
  },
];

export const socialLinks = [
  {
    id: "instagram",
    title: "Instagram",
    description: "Ikuti informasi dan kegiatan terbaru DPM FK UNTAR.",
    icon: FiInstagram,
    type: "external",
    url: "https://www.instagram.com/dpmfkuntar",
    variant: "instagram",
  },

  {
    id: "tiktok",
    title: "TikTok",
    description: "Temukan konten dan aktivitas DPM FK UNTAR.",
    icon: AiFillTikTok,
    type: "external",
    url: "https://www.tiktok.com/@dpmfkuntar",
    variant: "tiktok",
  },
];
