"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WeddingInvitation() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [decorations, setDecorations] = useState<
    Array<{ id: number; left: number; delay: number; emoji: string }>
  >([]);
  const [animatedCharacters, setAnimatedCharacters] = useState<
    Array<{ id: number; type: string; left: number; delay: number }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundParticles, setBackgroundParticles] = useState<
    Array<{ id: number; left: number; delay: number }>
  >([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Slider%20BODA-cVRnWRJUtvZyOB775ipDSfNsz9NCEi.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SLIDER%20BODA%202-BdZzqIysZWfGomQxogfXYFE3gnEapO.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Slider%20BODA%201%20-iAtMjQCU5g8U8I5xbWRivOajqWRSmT.jpeg",
  ];

  useEffect(() => {
    const emojis = ["🌸", "🌹", "💐", "🦋", "✨", "🌿", "💕", "🌺"];
    setDecorations(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      })),
    );

    const characters = [
      { type: "bride", emoji: "👰" },
      { type: "groom", emoji: "🤵" },
      { type: "cupid", emoji: "💘" },
      { type: "doves", emoji: "🕊️" },
    ];

    setAnimatedCharacters(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        type: characters[i % characters.length].type,
        left: Math.random() * 100,
        delay: Math.random() * 2,
      })),
    );

    setBackgroundParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
      })),
    );

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, []);

  const handleConfirm = () => {
    router.push("/confirmed");
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-background via-background to-secondary/20 overflow-hidden">
          {decorations.map((decoration, index) => (
            <div
              key={decoration.id}
              className="absolute pointer-events-none"
              style={{
                left: `${decoration.left}%`,
                top: "-20px",
                animation:
                  index % 3 === 0
                    ? `float-straight 8s infinite linear`
                    : index % 3 === 1
                      ? `float-wave 7s infinite ease-in-out`
                      : `float-spiral 9s infinite ease-in-out`,
                animationDelay: `${decoration.delay}s`,
              }}>
              <div className="text-4xl opacity-70 drop-shadow-lg">
                {decoration.emoji}
              </div>
            </div>
          ))}

          <div className="relative z-10 flex flex-col items-center justify-center gap-8">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-primary/30 rounded-full" />
                <div className="absolute w-20 h-20 border-4 border-transparent border-t-primary border-r-primary rounded-full animate-wedding-ring-spin" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">💍</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-serif text-primary font-bold">
                Te invitamos a celebrar
              </h2>
              <p className="text-lg text-foreground/70 font-light">
                Nuestro Matrimonio
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className={`transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <div className="relative min-h-screen overflow-hidden bg-white">
          <div className="absolute inset-0">
            {sliderImages.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: currentSlide === index ? 1 : 0,
                  backgroundImage: `url('${image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-pink-50/30 to-purple-50/30">
            {backgroundParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${particle.left}%`,
                  top: "-50px",
                  animation: `float-background 20s infinite linear`,
                  animationDelay: `${particle.delay}s`,
                }}>
                <div className="text-4xl sm:text-6xl opacity-5">✨</div>
              </div>
            ))}
          </div>

          {animatedCharacters.map((char) => {
            const emojis: Record<string, string> = {
              bride: "👰",
              groom: "🤵",
              cupid: "💘",
              doves: "🕊️",
            };

            return (
              <div
                key={char.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${char.left}%`,
                  top: "-40px",
                  animation: `wedding-characters-fall 8s infinite ease-in`,
                  animationDelay: `${char.delay}s`,
                }}>
                <div className="text-3xl sm:text-5xl drop-shadow-lg animate-pulse-gentle">
                  {emojis[char.type] || "🎉"}
                </div>
              </div>
            );
          })}

          {decorations.map((decoration, index) => (
            <div
              key={decoration.id}
              className="absolute pointer-events-none"
              style={{
                left: `${decoration.left}%`,
                top: "-20px",
                animation:
                  index % 3 === 0
                    ? `float-straight 8s infinite linear`
                    : index % 3 === 1
                      ? `float-wave 7s infinite ease-in-out`
                      : `float-spiral 9s infinite ease-in-out`,
                animationDelay: `${decoration.delay}s`,
              }}>
              <div className="text-2xl sm:text-3xl opacity-70 drop-shadow-lg">
                {decoration.emoji}
              </div>
            </div>
          ))}

          <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
            <div
              className={`w-full max-w-2xl transform transition-all duration-1000 ${
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}>
              <div className="rounded-3xl bg-white shadow-2xl overflow-hidden">
                <div className="relative h-24 sm:h-32 bg-gradient-to-r from-primary via-accent to-primary overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full opacity-10 animate-pulse" />
                    <div
                      className="absolute w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full opacity-20 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <div className="relative z-10 text-3xl sm:text-5xl">💍</div>
                  </div>
                </div>

                <div className="px-4 sm:px-8 py-6 sm:py-12 text-center space-y-4 sm:space-y-8">
                  <div
                    className="animate-fade-in space-y-2 sm:space-y-4"
                    style={{ animationDelay: "0.3s" }}>
                    <p className="text-lg sm:text-3xl text-primary font-light tracking-widest uppercase">
                      Nos alegra invitarte a celebrar
                    </p>
                    <h1 className="text-primary font-bold leading-7 font-serif text-4xl sm:text-5xl">
                      Nuestro Matrimonio
                    </h1>
                  </div>

                  <div
                    className="py-4 sm:py-8 animate-fade-in font-normal space-y-1 sm:space-y-2"
                    style={{ animationDelay: "0.6s" }}>
                    <div className="flex items-center justify-center gap-2 sm:gap-4">
                      <div className="h-px bg-gradient-to-r from-transparent to-primary w-6 sm:w-12" />
                      <p className="font-serif font-bold text-primary text-2xl sm:text-5xl">
                        Pascual Luque
                      </p>
                      <div className="h-px bg-gradient-to-l from-transparent to-primary w-6 sm:w-12" />
                    </div>
                    <div className="text-center text-foreground text-xl sm:text-3xl">
                      y
                    </div>
                    <div className="flex items-center justify-center gap-2 sm:gap-4">
                      <div className="h-px bg-gradient-to-r from-transparent to-primary w-6 sm:w-12" />
                      <p className="font-serif font-bold text-primary text-2xl sm:text-5xl">
                        Yolanda Pari
                      </p>
                      <div className="h-px bg-gradient-to-l from-transparent to-primary w-6 sm:w-12" />
                    </div>
                  </div>

                  <div
                    className="space-y-3 sm:space-y-4 py-4 sm:py-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl sm:rounded-2xl px-4 sm:px-6 animate-fade-in"
                    style={{ animationDelay: "0.75s" }}>
                    <p className="text-lg sm:text-2xl font-serif text-primary/90 leading-relaxed">
                      "{`Dos almas, un corazón, una promesa eterna.`}"
                    </p>
                    <p className="text-sm sm:text-lg text-foreground/80 leading-relaxed">
                      Con inmensa alegría y gratitud, les pedimos sean parte de
                      este momento tan especial, en el que sellaremos nuestro
                      compromiso de amor y fe en un futuro lleno de bendiciones
                      compartidas.
                    </p>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-center gap-2 text-foreground">
                      <span className="text-xl sm:text-3xl">📅</span>
                      <span className="text-sm sm:text-2xl">
                        Sábado, 22 de Enero del 2026
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-foreground">
                      <span className="text-xl sm:text-3xl">🕖</span>
                      <span className="text-sm sm:text-2xl">19:00 horas</span>
                    </div>
                  </div>

                  <p className="text-foreground/70 text-xs sm:text-lg font-light italic pt-2 sm:pt-4">
                    La presencia de ustedes será el mayor regalo para nosotros
                  </p>

                  <div
                    className="pt-4 sm:pt-6 animate-fade-in"
                    style={{ animationDelay: "1.2s" }}>
                    <button
                      onClick={handleConfirm}
                      className="px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold text-base sm:text-xl rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                      Confirmar Asistencia
                    </button>
                  </div>
                </div>

                <div className="px-4 sm:px-8 py-4 sm:py-6 bg-secondary/20 text-center text-sm sm:text-lg text-foreground/60">
                  <p>Con amor y alegría,</p>
                  <p className="font-serif text-primary font-semibold mt-2 text-base sm:text-xl">
                    Pascual &amp; Yolanda
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-background {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(50vh) translateX(100px) rotate(180deg);
            opacity: 0.2;
          }
          100% {
            transform: translateY(120vh) translateX(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float-wave {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.7;
          }
          25% {
            transform: translateY(30vh) translateX(40px) rotate(90deg);
          }
          50% {
            transform: translateY(60vh) translateX(-40px) rotate(180deg);
          }
          75% {
            transform: translateY(90vh) translateX(40px) rotate(270deg);
          }
          95% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(120vh) translateX(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float-spiral {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(60vh) rotate(180deg) scale(1.1);
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(120vh) rotate(720deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes wedding-ring-spin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        .animate-wedding-ring-spin {
          animation: wedding-ring-spin 2s ease-in-out infinite;
        }

        @keyframes wedding-characters-fall {
          0% {
            transform: translateY(-40px) translateX(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(80px) rotate(10deg)
              scale(1.1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) translateX(0) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes pulse-gentle {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes fade-slider {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
