/* eslint-disable no-undef */
import { motion, useReducedMotion } from "framer-motion";

export const IntroScreen = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      key="intro-screen"
      initial={false}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.45,
        ease: "easeInOut",
      }}
      className="
        fixed
        inset-0
        z-99999

        flex
        min-h-dvh
        w-full
        items-center
        justify-center

        overflow-hidden

        bg-brand-bg

        px-6
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Base */}
        <div
          className="
            absolute
            inset-0

            bg-brand-bg
          "
        />

        {/* Top-left soft green atmosphere */}
        <div
          className="
            absolute

            -left-48
            -top-48

            h-[32rem]
            w-[32rem]

            rounded-full

            bg-brand-primary/15

            blur-[140px]
          "
        />

        {/* Bottom-right warm atmosphere */}
        <div
          className="
            absolute

            -bottom-52
            -right-48

            h-[34rem]
            w-[34rem]

            rounded-full

            bg-brand-accent/15

            blur-[150px]
          "
        />

        {/* Center light */}
        <div
          className="
            absolute

            left-1/2
            top-1/2

            h-[28rem]
            w-[28rem]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-brand-card/55

            blur-[130px]
          "
        />

        {/* Subtle upper line */}
        <div
          className="
            absolute

            left-1/2
            top-[18%]

            h-px
            w-24

            -translate-x-1/2

            bg-brand-dark/10
          "
        />

        {/* Subtle lower line */}
        <div
          className="
            absolute

            bottom-[18%]
            left-1/2

            h-px
            w-24

            -translate-x-1/2

            bg-brand-dark/10
          "
        />
      </div>

      {/* Content */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: 18,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: shouldReduceMotion ? 0.15 : 0.65,
          delay: shouldReduceMotion ? 0 : 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10

          flex
          w-full
          max-w-lg
          flex-col
          items-center

          text-center
        "
      >
        {/* Logo */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.9,
                  y: 8,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.55,
            delay: shouldReduceMotion ? 0 : 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            h-24
            w-24
            items-center
            justify-center

            overflow-hidden

            rounded-full

            border
            border-brand-dark/10

            bg-white/70

            p-1

            shadow-[0_8px_24px_rgba(32,40,8,0.07)]

            sm:h-28
            sm:w-28
          "
        >
          <img
            src="/icons/fkuntar.webp"
            alt="Logo DPM FK UNTAR"
            draggable={false}
            decoding="async"
            className="
              h-full
              w-full

              rounded-full
              select-none
              object-contain
            "
          />
        </motion.div>

        {/* Identity */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-6

            flex
            flex-col
            items-center
          "
        >
          <span
            className="
              inline-flex
              min-h-8
              items-center
              justify-center

              rounded-full

              border
              border-brand-primary/35

              bg-brand-secondary/45

              px-4
              py-1.5

              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.18em]

              text-brand-dark

              sm:text-[11px]
            "
          >
            Dewan Perwakilan Mahasiswa
          </span>

          <h1
            className="
              mt-5

              text-2xl
              font-extrabold
              tracking-[-0.035em]

              text-brand-text

              sm:text-3xl
            "
          >
            DPM FK UNTAR
          </h1>

          <p
            className="
              mt-2

              max-w-sm

              text-xs
              font-medium
              leading-6

              text-brand-muted

              sm:text-sm
            "
          >
            Fakultas Kedokteran Universitas Tarumanagara
          </p>

          <div
            aria-hidden="true"
            className="
              mt-6

              h-px
              w-14

              bg-brand-dark/20
            "
          />
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.3,
            delay: shouldReduceMotion ? 0 : 0.15,
          }}
          className="
            mt-6

            flex
            items-center
            justify-center
            gap-1.5
          "
          aria-hidden="true"
        >
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [0.3, 1, 0.3],
                    }
              }
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: item * 0.18,
                ease: "easeInOut",
              }}
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-brand-primary
              "
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
