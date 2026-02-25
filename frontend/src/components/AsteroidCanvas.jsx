import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/* ─── Asteroid field + starfield canvas ─────────────────── */
export default function AsteroidCanvas() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const dark   = theme === 'dark';

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    // ── Stars ────────────────────────────────────────────
    const STAR_COUNT = dark ? 220 : 60;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.4 + 0.3,
      op:   Math.random() * 0.7 + 0.2,
      spd:  Math.random() * 0.015 + 0.004,
      dir:  Math.random() > 0.5 ? 1 : -1,
    }));

    // ── Shooting stars ───────────────────────────────────
    const shooters = [];
    const spawnShooter = () => ({
      x:     Math.random() * W,
      y:     Math.random() * H * 0.5,
      len:   Math.random() * 120 + 60,
      spd:   Math.random() * 8 + 4,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      life:  1,
    });

    // ── Asteroids ────────────────────────────────────────
    class Rock {
      constructor(init = false) { this.reset(init); }

      reset(init = false) {
        this.x    = init ? Math.random() * W : -120;
        this.y    = Math.random() * H;
        this.vx   = Math.random() * 0.6 + 0.15;
        this.vy   = (Math.random() - 0.5) * 0.35;
        this.sz   = Math.random() * 22 + 5;
        this.rot  = Math.random() * Math.PI * 2;
        this.rotV = (Math.random() - 0.5) * 0.018;
        this.sides = Math.floor(Math.random() * 3) + 5;
        this.off  = Array.from({ length: this.sides }, () => 0.65 + Math.random() * 0.7);
        this.op   = dark ? Math.random() * 0.35 + 0.08 : Math.random() * 0.12 + 0.04;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.beginPath();
        for (let i = 0; i < this.sides; i++) {
          const a  = (i / this.sides) * Math.PI * 2;
          const r  = this.sz * this.off[i];
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle   = dark
          ? `rgba(160, 160, 200, ${this.op})`
          : `rgba(80, 90, 140, ${this.op})`;
        ctx.strokeStyle = dark
          ? `rgba(200, 210, 255, ${this.op * 0.7})`
          : `rgba(60, 70, 120, ${this.op * 0.5})`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      update() {
        this.x   += this.vx;
        this.y   += this.vy;
        this.rot += this.rotV;
        if (this.x > W + 130) this.reset(false);
      }
    }

    const rocks = Array.from({ length: 18 }, () => new Rock(true));

    // Spawn shooting stars occasionally
    let shootTimer = 0;
    const SHOOT_INTERVAL = dark ? 160 : 999999;

    // ── Main loop ─────────────────────────────────────────
    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        s.op += s.spd * s.dir;
        if (s.op >= 0.95 || s.op <= 0.05) s.dir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(255,255,255,${s.op})`
          : `rgba(60,70,160,${s.op * 0.5})`;
        ctx.fill();
      });

      // Shooting stars
      shootTimer++;
      if (shootTimer >= SHOOT_INTERVAL) {
        shooters.push(spawnShooter());
        shootTimer = 0;
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x    += Math.cos(sh.angle) * sh.spd;
        sh.y    += Math.sin(sh.angle) * sh.spd;
        sh.life -= 0.025;
        const grad = ctx.createLinearGradient(
          sh.x, sh.y,
          sh.x - Math.cos(sh.angle) * sh.len,
          sh.y - Math.sin(sh.angle) * sh.len
        );
        grad.addColorStop(0, `rgba(255,255,255,${sh.life})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(
          sh.x - Math.cos(sh.angle) * sh.len,
          sh.y - Math.sin(sh.angle) * sh.len
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
        if (sh.life <= 0) shooters.splice(i, 1);
      }

      // Rocks
      rocks.forEach(r => { r.draw(); r.update(); });

      rafRef.current = requestAnimationFrame(loop);
    };

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100%',
        height:        '100%',
        zIndex:        0,
        pointerEvents: 'none',
      }}
    />
  );
}
