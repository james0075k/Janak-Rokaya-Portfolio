import { useEffect, useRef } from 'react';

/*
  Oneko — classic pixel-art cat that chases the mouse cursor
  Sprite sheet: https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif
  Based on the original oneko.js by adryd325 (MIT License)
  Constrained to the About section only.
*/

const SPRITE_URL =
  'https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif';

const SPRITE_SETS = {
  idle:          [[-3, -3]],
  alert:         [[-7, -3]],
  scratchSelf:   [[-5,  0], [-6,  0], [-7,  0]],
  scratchWallN:  [[ 0,  0], [ 0, -1]],
  scratchWallS:  [[-7, -1], [-6, -2]],
  scratchWallE:  [[-2, -2], [-2, -3]],
  scratchWallW:  [[-4,  0], [-4, -1]],
  tired:         [[-3, -2]],
  sleeping:      [[-2,  0], [-2, -1]],
  N:             [[-1, -2], [-1, -3]],
  NE:            [[ 0, -2], [ 0, -3]],
  E:             [[-3,  0], [-3, -1]],
  SE:            [[-5, -1], [-5, -2]],
  S:             [[-6, -3], [-7, -2]],
  SW:            [[-5, -3], [-6, -1]],
  W:             [[-4, -2], [-4, -3]],
  NW:            [[-1,  0], [-1, -1]],
};

const NEKOSIZE   = 32;
const SPEED      = 10;
const IDLE_TIME  = 50;  // frames before idle animation
const INTERVAL   = 100; // ms per frame

export default function CatFollower({ sectionRef }) {
  const catRef = useRef(null);

  useEffect(() => {
    const cat     = catRef.current;
    const section = sectionRef?.current;
    if (!cat || !section) return;

    /* cat position (absolute within section) */
    const rect = section.getBoundingClientRect();
    let catX = rect.width  / 2;
    let catY = rect.height / 2;

    /* mouse position (relative to section) */
    let mouseX = catX;
    let mouseY = catY;

    let frameCount = 0;
    let idleTime   = 0;
    let idleAnim   = null;
    let idleFrame  = 0;
    let lastTs     = 0;
    let rafId;

    /* apply sprite frame */
    const setSprite = (state, f) => {
      const frames = SPRITE_SETS[state];
      const [sx, sy] = frames[f % frames.length];
      cat.style.backgroundPosition =
        `${sx * NEKOSIZE}px ${sy * NEKOSIZE}px`;
    };

    /* direction from cat → mouse */
    const getDir = (dx, dy) => {
      const adx = Math.abs(dx), ady = Math.abs(dy);
      if (adx > ady) {
        const base = dx > 0 ? 'W' : 'E';
        if (ady > adx * 0.5) return (dy > 0 ? 'S' : 'N') + base;
        return base;
      } else {
        const base = dy > 0 ? 'S' : 'N';
        if (adx > ady * 0.5) return base + (dx > 0 ? 'W' : 'E');
        return base;
      }
    };

    /* track mouse relative to section */
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const loop = (ts) => {
      if (ts - lastTs < INTERVAL) { rafId = requestAnimationFrame(loop); return; }
      lastTs = ts;

      const dx   = catX - mouseX;
      const dy   = catY - mouseY;
      const dist = Math.hypot(dx, dy);

      if (dist < NEKOSIZE / 2 + 2) {
        /* near cursor → idle / sleeping */
        idleTime++;

        if (idleTime > IDLE_TIME) {
          if (!idleAnim) idleAnim = 'sleeping';
          setSprite(idleAnim, Math.floor(idleFrame / 8));
          idleFrame++;
          if (idleFrame >= SPRITE_SETS[idleAnim].length * 8) idleFrame = 0;
        } else {
          setSprite('idle', 0);
        }
      } else {
        /* chasing cursor */
        idleTime = 0;
        idleAnim = null;
        idleFrame = 0;

        const step = Math.min(SPEED, dist);
        catX -= (dx / dist) * step;
        catY -= (dy / dist) * step;

        /* clamp within section */
        catX = Math.max(0, Math.min(section.offsetWidth  - NEKOSIZE, catX));
        catY = Math.max(0, Math.min(section.offsetHeight - NEKOSIZE, catY));

        cat.style.left = `${catX}px`;
        cat.style.top  = `${catY}px`;

        frameCount++;
        setSprite(getDir(dx, dy), Math.floor(frameCount / 2) % 2);
      }

      rafId = requestAnimationFrame(loop);
    };

    /* start at center of section */
    cat.style.left = `${catX}px`;
    cat.style.top  = `${catY}px`;
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
    };
  }, [sectionRef]);

  return (
    <div
      ref={catRef}
      style={{
        position:         'absolute',
        width:            `${NEKOSIZE}px`,
        height:           `${NEKOSIZE}px`,
        backgroundImage:  `url(${SPRITE_URL})`,
        backgroundRepeat: 'no-repeat',
        imageRendering:   'pixelated',
        zIndex:           20,
        pointerEvents:    'none',
        transform:        'scale(2)',
        transformOrigin:  'top left',
      }}
    />
  );
}
