"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { RadioBulletin } from "@/lib/content/types";
import styles from "./radio.module.css";

function formatSeconds(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function AudioPlayer({
  bulletin,
  dict,
}: {
  bulletin: RadioBulletin;
  dict?: {
    nowPlaying?: string;
    play?: string;
    pause?: string;
    speed?: string;
    presenter?: string;
  };
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={styles.playerCard}>
      <audio
        ref={audioRef}
        src={bulletin.audioUrl}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className={styles.playerTrackInfo}>
        <div className={styles.trackIcon}>
          <Headphones size={24} />
        </div>
        <div className={styles.trackMeta}>
          <h3>{bulletin.title}</h3>
          <p>
            {dict?.presenter || "Presenter"}: {bulletin.presenter || "GlobHub Radio"}
          </p>
        </div>
      </div>

      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.playButton}
          onClick={togglePlay}
          aria-label={isPlaying ? dict?.pause || "Pause" : dict?.play || "Play"}
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 3 }} />}
        </button>

        <div className={styles.scrubberWrapper}>
          <span className={styles.timeText}>{formatSeconds(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={onSeek}
            className={styles.scrubber}
            aria-label="Seek time"
          />
          <span className={styles.timeText}>
            {duration ? formatSeconds(duration) : bulletin.duration}
          </span>
        </div>

        <div className={styles.extraControls}>
          <button
            type="button"
            className={styles.speedButton}
            onClick={cycleSpeed}
            title="Playback Speed"
          >
            {playbackSpeed}x
          </button>
          <button
            type="button"
            className={styles.speedButton}
            onClick={toggleMute}
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
