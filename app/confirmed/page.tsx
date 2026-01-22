'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ConfirmationPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedCharacters, setAnimatedCharacters] = useState<
    Array<{ id: number; type: string; left: number; delay: number }>
  >([])

  useEffect(() => {
    setIsVisible(true)
    
    const characters = [
      { type: 'bride', emoji: '👰' },
      { type: 'groom', emoji: '🤵' },
      { type: 'cupid', emoji: '💘' },
      { type: 'hearts', emoji: '💕' },
      { type: 'doves', emoji: '🕊️' },
      { type: 'flowers', emoji: '🌹' },
    ]
    
    setAnimatedCharacters(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        type: characters[i % characters.length].type,
        left: Math.random() * 100,
        delay: Math.random() * 2,
      }))
    )
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50 to-purple-50" />
      {animatedCharacters.map((char, index) => {
        const emojis: Record<string, string> = {
          bride: '👰',
          groom: '🤵',
          cupid: '💘',
          hearts: '💕',
          doves: '🕊️',
          flowers: '🌹',
        }
        
        return (
          <div
            key={char.id}
            className="absolute pointer-events-none"
            style={{
              left: `${char.left}%`,
              top: '-50px',
              animation: `celebrate-dance 6s infinite ease-in-out`,
              animationDelay: `${char.delay}s`,
            }}
          >
            <div className="text-5xl drop-shadow-lg">{emojis[char.type] || '🎉'}</div>
          </div>
        )
      })}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${210 + Math.random() * 30}, 70%, 60%)`,
              animation: `confetti-fall ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 1}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          className={`w-full max-w-3xl transform transition-all duration-1000 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="rounded-3xl bg-white shadow-2xl overflow-hidden">
            <div className="relative h-40 bg-gradient-to-r from-primary via-accent to-primary overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center gap-4">
                <span className="text-6xl animate-bounce" style={{ animationDelay: '0s' }}>
                  🎉
                </span>
                <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                  💍
                </span>
                <span className="text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>
                  🎉
                </span>
              </div>
            </div>

            <div className="px-8 py-12 text-center space-y-8">
              <div className="space-y-3 animate-fade-in">
                <h1 className="text-7xl font-serif text-primary font-bold">
                  ¡Confirmado!
                </h1>
                <p className="text-2xl text-foreground/70 font-light tracking-wide">
                  Tu asistencia ha sido registrada con éxito
                </p>
              </div>

              <div className="py-8 space-y-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl px-8 animate-fade-in border border-primary/10">
                <p className="text-4xl font-serif text-primary font-bold leading-relaxed">
                  Gracias por ser parte de nuestro día especial
                </p>
                <p className="text-2xl text-foreground/80 leading-relaxed font-light">
                  Querido invitado,
                </p>
                <p className="text-xl text-foreground/80 leading-relaxed">
                  Tu confirmación de asistencia nos llena el corazón de alegría y gratitud inmensurable. 
                  En este momento tan especial de nuestras vidas, saber que estarás junto a nosotros 
                  para celebrar nuestro amor y compromiso es el regalo más precioso que podríamos recibir.
                </p>
                <p className="text-xl text-foreground/80 leading-relaxed">
                  Tu presencia será el reflejo del amor, la amistad y los valores que compartimos, 
                  y sin duda alguna, hará de este día una ocasión inolvidable llena de momentos hermosos 
                  que atesoraremos para toda la vida.
                </p>
                <p className="text-xl text-foreground/80 leading-relaxed">
                  Esperamos verte el sábado, 22 de enero de 2026, para compartir esta jornada extraordinaria, 
                  donde sellaremos nuestro compromiso ante Dios y ante quienes más amamos.
                </p>
                <p className="text-2xl font-serif text-primary font-semibold pt-4">
                  Con todo nuestro amor,
                </p>
                <p className="text-2xl font-serif text-primary font-semibold">
                  Pascual & Yolanda
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-secondary/30">
                <div className="space-y-2">
                  <p className="text-lg text-foreground/60 uppercase tracking-wider font-light">
                    Te esperamos en
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-2 text-foreground font-semibold">
                      <span className="text-3xl">📅</span>
                      <span className="text-2xl">Sábado, 22 de Enero del 2026</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-foreground font-semibold">
                      <span className="text-3xl">🕖</span>
                      <span className="text-2xl">19:00 horas</span>
                    </div>
                  </div>
                </div>

                <p className="text-foreground/70 text-lg font-light italic pt-4">
                  "Dos almas, un corazón, una promesa eterna"
                </p>
              </div>

              <div className="pt-6 flex gap-4 justify-center">
                <Link
                  href="/"
                  className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold text-xl rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Volver a la Invitación
                </Link>
              </div>
            </div>

            <div className="px-8 py-6 bg-secondary/20 text-center text-lg text-foreground/60">
              <p>Nos vemos en la boda,</p>
              <p className="font-serif text-primary font-semibold mt-2 text-xl">
                Pascual &amp; Yolanda
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes celebrate-dance {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          25% {
            transform: translateY(25vh) translateX(60px) rotate(15deg);
          }
          50% {
            transform: translateY(50vh) translateX(-60px) rotate(-15deg);
          }
          75% {
            transform: translateY(75vh) translateX(60px) rotate(15deg);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
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

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
