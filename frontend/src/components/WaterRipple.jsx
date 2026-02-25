import { useEffect, useRef } from 'react';

/* ─── Mouse-tracking water ripple overlay ───────────────── */
export default function WaterRipple() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const MAX_RADIUS = 90;
    const SPEED      = 2.2;
    const FADE_RATE  = 0.018;

    const addRipple = (x, y) => {
      ripplesRef.current.push({ x, y, r: 2, op: 0.55 });
    };

    // Throttle mousemove → ripple every 60ms
    let lastMove = 0;
    const onMove = (e) => {
      const now = Date.now();
      if (now - lastMove < 60) return;
      lastMove = now;
      addRipple(e.clientX, e.clientY);
    };

    // Touch support
    const onTouch = (e) => {
      const t = e.touches[0];
      addRipple(t.clientX, t.clientY);
    };

    // Click → bigger ripple burst
    const onClick = (e) => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => addRipple(e.clientX, e.clientY), i * 80);
      }
    };

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('click',     onClick);
    window.addEventListener('resize',    onResize);

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      const alive = [];
      ripplesRef.current.forEach(rip => {
        rip.r  += SPEED;
        rip.op -= FADE_RATE;

        if (rip.op <= 0 || rip.r >= MAX_RADIUS) return;
        alive.push(rip);

        // Outer ring
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 136, ${rip.op * 0.9})`;
        ctx.lineWidth   = 1.5;
        ctx.stroke();

        // Inner ring (slightly delayed)
        if (rip.r > 15) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 212, 255, ${rip.op * 0.5})`;
          ctx.lineWidth   = 1;
          ctx.stroke();
        }

        // Glow fill
        const grad = ctx.createRadialGradient(rip.x, rip.y, 0, rip.x, rip.y, rip.r);
        grad.addColorStop(0,   `rgba(0,255,136,${rip.op * 0.06})`);
        grad.addColorStop(0.5, `rgba(0,212,255,${rip.op * 0.03})`);
        grad.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      ripplesRef.current = alive;
      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('click',     onClick);
      window.removeEventListener('resize',    onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100%',
        height:        '100%',
        zIndex:        2,
        pointerEvents: 'none',
      }}
    />
  );
}
