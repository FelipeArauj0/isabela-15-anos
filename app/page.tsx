"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { SHOW_PHOTO_SHARING } from "./invitation-config";

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


function ShareInvitation() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/convite-isabella.jpg", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Imagem indisponível");
        return response.blob();
      })
      .then((blob) => {
        setFile(new File([blob], "convite-isabella.jpg", { type: "image/jpeg" }));
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setStatus("Use Baixar convite para salvar a imagem e enviar pelo WhatsApp.");
        }
      });
    return () => controller.abort();
  }, []);

  async function shareInvitation() {
    if (sharing) return;
    if (!file || !navigator.share || !navigator.canShare?.({ files: [file] })) {
      setStatus("Baixe a imagem abaixo e envie pelo WhatsApp.");
      return;
    }
    setSharing(true);
    setStatus("");
    try {
      await navigator.share({
        files: [file],
        title: "Isabella — 15 Anos",
        text: "Você é meu convidado! Crie lembranças comigo neste momento especial.",
      });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setStatus("Não foi possível compartilhar. Baixe a imagem e envie pelo WhatsApp.");
      }
    } finally {
      setSharing(false);
    }
  }

  return (
    <div className="shareInvitation">
      <button
        type="button"
        className="confirmButton shareButton"
        onClick={shareInvitation}
        disabled={sharing}
      >
        <span>{sharing ? "Abrindo..." : "Compartilhar convite"}</span>
        <b aria-hidden="true">↗</b>
      </button>
      <a className="downloadInvitation" href="/convite-isabella.jpg" download="convite-isabella.jpg">
        Baixar convite
      </a>
      <p className="shareStatus" role="status">{status}</p>
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
    "Olá! Confirmo minha presença nos 15 anos de Isabella, no dia 15 de novembro às 15h. ✨",
  );

  const confirmationUrl = `https://wa.me/5571988745614?text=${confirmationMessage}`;

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
          <h1>Isabella</h1>
          <p className="subtitle">celebra seus 15 anos</p>
          <p className="invitationText">
            Uma tarde especial está prestes a florescer — e sua presença tornará
            cada instante ainda mais bonito.
          </p>
          <div className="heroConfirmation">
            <a
              className="confirmButton"
              href={confirmationUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Confirmar presença pelo WhatsApp"
            >
              <span>Confirmar presença</span>
              <b aria-hidden="true">↗</b>
            </a>
            {SHOW_PHOTO_SHARING && <ShareInvitation />}
          </div>
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
            href={confirmationUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Confirmar presença pelo WhatsApp"
          >
            <span>Confirmar presença</span>
            <b aria-hidden="true">↗</b>
          </a>
          <small>Você será direcionado(a) ao WhatsApp</small>
          {SHOW_PHOTO_SHARING && <ShareInvitation />}
        </section>

        <footer className="footer">
          <span className="footerLine" />
          <p>Isabella <b>·</b> 15 Anos</p>
          <span className="footerLine" />
        </footer>
      </article>
    </main>
  );
}
