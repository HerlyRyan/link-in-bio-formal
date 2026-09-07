import { profileConfig } from "../../config/profile";

export const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        border-t
        border-brand-dark/10
        pt-8
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-xl
          flex-col
          items-center
        "
      >
        <img
          src={profileConfig.logo.src}
          alt=""
          aria-hidden="true"
          className="
            h-10
            w-10
            object-contain
            opacity-80

            rounded-full

            border
          border-brand-dark/15
          bg-white/70

            p-1
          "
        />

        <p
          className="
            mt-4
            text-sm
            font-bold
            text-brand-text
          "
        >
          {profileConfig.name}
        </p>

        <p
          className="
            mt-2
            text-xs
            font-medium
            leading-5
            text-brand-muted
          "
        >
          Dewan Perwakilan Mahasiswa
          <br />
          Fakultas Kedokteran Universitas Tarumanagara
        </p>

        <p
          className="
            mt-6
            text-xs
            font-medium
            text-brand-muted/80
          "
        >
          © {currentYear} {profileConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
