import { useEffect, useRef, useState } from 'react'

// ROMANTIC SONG 🎵
// TO ADD YOUR SONG:
//   1. Drop an mp3 into /public and name it  romantic-song.mp3
//      (or change SONG_SRC below to your file / a URL)
//   2. That's it — the player will pick it up automatically.
//
// Until then, this plays a soft, generated romantic melody using the
// Web Audio API so there's love in the air from the very first click. 💕
const SONG_SRC = '/romantic-song.mp3'
const SONG_TITLE = 'Our Song 🎶'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const ctxRef = useRef(null)
  const stopMelodyRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)

  const startFallbackMelody = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = ctxRef.current || new AudioCtx()
    ctxRef.current = ctx
    setUsingFallback(true)

    // A gentle, looping romantic phrase (Canon-ish, in C).
    const notes = [523.25, 493.88, 440.0, 392.0, 349.23, 329.63, 349.23, 392.0]
    const gain = ctx.createGain()
    gain.gain.value = 0.0001
    gain.connect(ctx.destination)
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1)

    let i = 0
    let stopped = false
    const beat = 0.55
    const scheduleNote = () => {
      if (stopped) return
      const osc = ctx.createOscillator()
      const noteGain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = notes[i % notes.length]
      noteGain.gain.setValueAtTime(0.0001, ctx.currentTime)
      noteGain.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 0.05)
      noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + beat)
      osc.connect(noteGain)
      noteGain.connect(gain)
      osc.start()
      osc.stop(ctx.currentTime + beat)
      i++
    }
    scheduleNote()
    const interval = setInterval(scheduleNote, beat * 1000)
    stopMelodyRef.current = () => {
      stopped = true
      clearInterval(interval)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4)
    }
  }

  const stopFallbackMelody = () => {
    if (stopMelodyRef.current) stopMelodyRef.current()
    stopMelodyRef.current = null
  }

  const toggle = async () => {
    if (playing) {
      audioRef.current?.pause()
      stopFallbackMelody()
      setPlaying(false)
      return
    }
    // Try the real song first; fall back to the generated melody.
    try {
      await audioRef.current.play()
      setUsingFallback(false)
      setPlaying(true)
    } catch {
      startFallbackMelody()
      setPlaying(true)
    }
  }

  useEffect(() => () => stopFallbackMelody(), [])

  return (
    <div className={`music ${playing ? 'on' : ''}`}>
      <audio ref={audioRef} src={SONG_SRC} loop preload="none" />
      <button className="music-btn" onClick={toggle} aria-label="Play romantic song">
        <span className="music-note">{playing ? '🎶' : '🎵'}</span>
      </button>
      <span className="music-label">
        {playing ? (usingFallback ? 'Playing a little love tune…' : SONG_TITLE) : 'Play our song'}
      </span>
    </div>
  )
}
