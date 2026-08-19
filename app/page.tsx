"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

const EVENT_DATE = new Date("2026-11-15T15:00:00-03:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, EVENT_DATE - Date.now());

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    [timeLeft?.days, "dias"],
    [timeLeft?.hours, "horas"],
    [timeLeft?.minutes, "min"],
    [timeLeft?.seconds, "seg"],
  ] as const;

  return (
    <div className="countdown" aria-live="polite" aria-label="Contagem regressiva para a festa">
      {units.map(([value, label]) => (
        <div className="countdownUnit" key={label}>
          <span className="countdownNumber">
            {value === undefined ? "--" : String(value).padStart(2, "0")}
          </span>
          <span className="countdownLabel">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        style: {
          left: `${(index * 19 + 7) % 100}%`,
          animationDelay: `-${(index * 1.35) % 13}s`,
          animationDuration: `${10 + (index % 6) * 1.8}s`,
          opacity: 0.35 + (index % 4) * 0.12,
          transform: `scale(${0.55 + (index % 5) * 0.13})`,
        } as CSSProperties,
      })),
    [],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        style: {
          left: `${(index * 29 + 3) % 97}%`,
          top: `${(index * 37 + 5) % 94}%`,
          animationDelay: `-${(index * 0.8) % 7}s`,
          animationDuration: `${4 + (index % 5) * 1.1}s`,
        } as CSSProperties,
      })),
    [],
  );

  const confirmationMessage = encodeURIComponent(
    "Olá! Confirmo minha presença nos 15 anos de Isabela, no dia 15 de novembro às 15h. ✨",
  );

  return (
    <main className="invitationShell">
      <div className="nightBackdrop" aria-hidden="true" />
      <div className="moonGlow" aria-hidden="true" />
      <div className="curtain curtainLeft" aria-hidden="true" />
      <div className="curtain curtainRight" aria-hidden="true" />

      <div className="sparkleField" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <span className="sparkle" key={sparkle.id} style={sparkle.style} />
        ))}
      </div>

      <div className="petalField" aria-hidden="true">
        {petals.map((petal) => (
          <span className="petal" key={petal.id} style={petal.style} />
        ))}
      </div>

      <div className="ornamentalFrame" aria-hidden="true">
        <span className="corner cornerTopLeft" />
        <span className="corner cornerTopRight" />
        <span className="corner cornerBottomLeft" />
        <span className="corner cornerBottomRight" />
      </div>

      <article className="invitationCard">
        <header className="hero reveal revealOne">
          <p className="eyebrow">Você está convidado(a)</p>
          <div className="tinyOrnament" aria-hidden="true">
            <span />
            <b>✦</b>
            <span />
          </div>
          <h1>Isabela</h1>
          <p className="subtitle">celebra seus 15 anos</p>
          <p className="invitationText">
            Uma tarde especial está prestes a florescer — e sua presença tornará
            cada instante ainda mais bonito.
          </p>
        </header>

        <div className="envelopeScene reveal revealTwo" aria-hidden="true">
          <div className="envelopeGlow" />
          <div className="envelope">
            <div className="envelopeBack" />
            <div className="envelopeLetter">
              <span>XV</span>
            </div>
            <div className="envelopeFlap" />
            <div className="envelopeFront" />
            <i className="seal">I</i>
          </div>
        </div>

        <section className="details reveal revealThree" aria-labelledby="event-details-title">
          <p className="sectionKicker" id="event-details-title">
            Guarde esta data
          </p>
          <div className="detailList">
            <div className="detailItem">
              <span className="detailLabel">Data</span>
              <strong>15 de Novembro</strong>
              <small>Domingo</small>
            </div>
            <span className="detailDiamond" aria-hidden="true">◇</span>
            <div className="detailItem">
              <span className="detailLabel">Horário</span>
              <strong>15h</strong>
              <small>Uma tarde inesquecível</small>
            </div>
            <span className="detailDiamond" aria-hidden="true">◇</span>
            <div className="detailItem">
              <span className="detailLabel">Local</span>
              <strong>A confirmar</strong>
              <small>Em breve, mais detalhes</small>
            </div>
          </div>
        </section>

        <section className="countdownSection reveal revealFour" aria-labelledby="countdown-title">
          <p className="sectionKicker" id="countdown-title">Faltam</p>
          <Countdown />
        </section>

        <section className="confirmation reveal revealFive">
          <p>Compartilhe conosco a alegria de viver este momento.</p>
          <a
            className="confirmButton"
            href={`https://wa.me/?text=${confirmationMessage}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Confirmar presença pelo WhatsApp"
          >
            <span>Confirmar presença</span>
            <b aria-hidden="true">↗</b>
          </a>
          <small>Você será direcionado(a) ao WhatsApp</small>
        </section>

        <footer className="footer">
          <span className="footerLine" />
          <p>Isabela <b>·</b> 15 Anos</p>
          <span className="footerLine" />
        </footer>
      </article>
    </main>
  );
}
