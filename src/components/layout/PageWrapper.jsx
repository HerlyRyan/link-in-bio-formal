// src/components/layout/PageWrapper.jsx

export const PageWrapper = ({ children }) => {
  return (
    <div
      className="
        min-h-dvh
        w-full

        bg-brand-bg

        px-3
        py-4

        sm:px-5
        sm:py-6

        lg:px-8
        lg:py-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-4xl
        "
      >
        {children}
      </div>
    </div>
  );
};
