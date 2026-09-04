import { AiFillTikTok } from "react-icons/ai";
import { FiInstagram, FiMail, FiInfo, FiMessageSquare } from "react-icons/fi";

export const mainLinks = [
  {
    id: "vision",
    title: "Visi, Misi, & Fungsi DPM",
    icon: FiInfo,
    type: "internal",
    action: "vision",
    featured: true,
  },
  {
    id: "aspirasi-fkuntar",
    title: "Aspirasi FK UNTAR",
    icon: FiMessageSquare,
    type: "external",
    url: "https://bit.ly/Aspirasi-blok",
  },
  {
    id: "email",
    title: "Email",
    icon: FiMail,
    type: "email",
    url: "mailto:dpmfkuntar@gmail.com",
  },
];

export const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    icon: FiInstagram,
    url: "https://www.instagram.com/dpmfkuntar/",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: AiFillTikTok,
    url: "https://www.tiktok.com/@dpmfkuntar",
  },
];
