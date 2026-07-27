import React, { useEffect, useRef, useState } from 'react';

const INITIAL_MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,0,1,1,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,0,0,0,1,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,0,2,2,2,2,2,1,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const CELL_SIZE = 24;
const ROWS = INITIAL_MAP.length;
const COLS = INITIAL_MAP[0].length;
const WIDTH = COLS * CELL_SIZE;
const HEIGHT = ROWS * CELL_SIZE;

const DIRS = {
  UP: { dx: 0, dy: -1 },
  DOWN: { dx: 0, dy: 1 },
  LEFT: { dx: -1, dy: 0 },
  RIGHT: { dx: 1, dy: 0 }
};

export function PacmanGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'won'>('start');
  const [score, setScore] = useState(0);

  const gameRef = useRef({
    map: JSON.parse(JSON.stringify(INITIAL_MAP)),
    pacman: { x: 9, y: 15, dir: DIRS.LEFT, nextDir: DIRS.LEFT },
    ghosts: [
      { x: 9, y: 9, dir: DIRS.UP, color: '#ff3d81' },
      { x: 8, y: 9, dir: DIRS.UP, color: '#2de2ff' },
      { x: 10, y: 9, dir: DIRS.UP, color: '#b388ff' }
    ],
    score: 0,
    dotsLeft: 0,
    mouthOpen: 0
  });

  const resetGame = () => {
    const map = JSON.parse(JSON.stringify(INITIAL_MAP));
    let dots = 0;
    map.forEach((row: number[]) => row.forEach((cell: number) => {
      if (cell === 2 || cell === 3) dots++;
    }));
    gameRef.current = {
      map,
      pacman: { x: 9, y: 15, dir: DIRS.LEFT, nextDir: DIRS.LEFT },
      ghosts: [
        { x: 9, y: 9, dir: DIRS.UP, color: '#ff3d81' },
        { x: 8, y: 9, dir: DIRS.UP, color: '#2de2ff' },
        { x: 10, y: 9, dir: DIRS.UP, color: '#b388ff' }
      ],
      score: 0,
      dotsLeft: dots,
      mouthOpen: 0
    };
    setScore(0);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'start') {
      let dots = 0;
      INITIAL_MAP.forEach((row: number[]) => row.forEach((cell: number) => {
        if (cell === 2 || cell === 3) dots++;
      }));
      gameRef.current.dotsLeft = dots;
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      
      const { pacman } = gameRef.current;
      if (e.key === 'ArrowUp') pacman.nextDir = DIRS.UP;
      if (e.key === 'ArrowDown') pacman.nextDir = DIRS.DOWN;
      if (e.key === 'ArrowLeft') pacman.nextDir = DIRS.LEFT;
      if (e.key === 'ArrowRight') pacman.nextDir = DIRS.RIGHT;
      if (e.key === ' ' && gameState !== 'playing') {
        resetGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastMoveTime = 0;
    const MOVE_INTERVAL = 150;

    const render = (time: number) => {
      const g = gameRef.current;

      if (gameState === 'playing' && time - lastMoveTime > MOVE_INTERVAL) {
        lastMoveTime = time;

        let nextX = g.pacman.x + g.pacman.nextDir.dx;
        let nextY = g.pacman.y + g.pacman.nextDir.dy;
        
        if (nextX < 0) nextX = COLS - 1;
        if (nextX >= COLS) nextX = 0;

        if (g.map[nextY] && g.map[nextY][nextX] !== 1) {
          g.pacman.dir = g.pacman.nextDir;
          g.pacman.x = nextX;
          g.pacman.y = nextY;
        } else {
          nextX = g.pacman.x + g.pacman.dir.dx;
          nextY = g.pacman.y + g.pacman.dir.dy;
          if (nextX < 0) nextX = COLS - 1;
          if (nextX >= COLS) nextX = 0;
          if (g.map[nextY] && g.map[nextY][nextX] !== 1) {
            g.pacman.x = nextX;
            g.pacman.y = nextY;
          }
        }

        if (g.map[g.pacman.y][g.pacman.x] === 2) {
          g.map[g.pacman.y][g.pacman.x] = 0;
          g.score += 10;
          g.dotsLeft--;
          setScore(g.score);
        } else if (g.map[g.pacman.y][g.pacman.x] === 3) {
          g.map[g.pacman.y][g.pacman.x] = 0;
          g.score += 50;
          g.dotsLeft--;
          setScore(g.score);
        }

        if (g.dotsLeft === 0) {
          setGameState('won');
        }

        g.ghosts.forEach(ghost => {
          const possibleMoves = [DIRS.UP, DIRS.DOWN, DIRS.LEFT, DIRS.RIGHT].filter(d => {
            if (d.dx === -ghost.dir.dx && d.dy === -ghost.dir.dy) return false;
            let nx = ghost.x + d.dx;
            let ny = ghost.y + d.dy;
            if (nx < 0) nx = COLS - 1;
            if (nx >= COLS) nx = 0;
            return g.map[ny] && g.map[ny][nx] !== 1;
          });

          if (possibleMoves.length === 0) {
            ghost.dir = { dx: -ghost.dir.dx, dy: -ghost.dir.dy };
          } else {
            ghost.dir = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
          }

          ghost.x += ghost.dir.dx;
          ghost.y += ghost.dir.dy;
          if (ghost.x < 0) ghost.x = COLS - 1;
          if (ghost.x >= COLS) ghost.x = 0;

          if (ghost.x === g.pacman.x && ghost.y === g.pacman.y) {
            setGameState('gameover');
          }
        });

        g.mouthOpen = (g.mouthOpen + 1) % 2;
      }

      ctx.fillStyle = '#0a0a12';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = g.map[r][c];
          const cx = c * CELL_SIZE + CELL_SIZE / 2;
          const cy = r * CELL_SIZE + CELL_SIZE / 2;

          if (cell === 1) {
            ctx.fillStyle = '#23233a';
            ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            ctx.strokeStyle = '#2de2ff';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(c * CELL_SIZE + 2, r * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
          } else if (cell === 2) {
            ctx.fillStyle = '#f9e94e';
            ctx.beginPath();
            ctx.arc(cx, cy, 3, 0, Math.PI * 2);
            ctx.fill();
          } else if (cell === 3) {
            ctx.fillStyle = '#f9e94e';
            ctx.beginPath();
            ctx.arc(cx, cy, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      const px = g.pacman.x * CELL_SIZE + CELL_SIZE / 2;
      const py = g.pacman.y * CELL_SIZE + CELL_SIZE / 2;
      let angle = 0;
      if (g.pacman.dir === DIRS.RIGHT) angle = 0;
      else if (g.pacman.dir === DIRS.DOWN) angle = Math.PI / 2;
      else if (g.pacman.dir === DIRS.LEFT) angle = Math.PI;
      else if (g.pacman.dir === DIRS.UP) angle = -Math.PI / 2;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);
      ctx.fillStyle = '#f9e94e';
      ctx.beginPath();
      
      const mouthSize = gameState === 'playing' ? (g.mouthOpen === 0 ? 0.2 : 0) : 0;
      
      ctx.arc(0, 0, CELL_SIZE / 2 - 2, mouthSize * Math.PI, (2 - mouthSize) * Math.PI);
      ctx.lineTo(0, 0);
      ctx.fill();
      ctx.restore();

      g.ghosts.forEach(ghost => {
        const gx = ghost.x * CELL_SIZE;
        const gy = ghost.y * CELL_SIZE;
        const s = CELL_SIZE;
        
        ctx.fillStyle = ghost.color;
        ctx.beginPath();
        ctx.arc(gx + s/2, gy + s/2, s/2 - 2, Math.PI, 0);
        ctx.lineTo(gx + s - 2, gy + s - 2);
        
        ctx.lineTo(gx + s * 0.8, gy + s - 5);
        ctx.lineTo(gx + s * 0.5, gy + s - 2);
        ctx.lineTo(gx + s * 0.2, gy + s - 5);
        ctx.lineTo(gx + 2, gy + s - 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(gx + s/2 - 3, gy + s/2 - 2, 2.5, 0, Math.PI*2);
        ctx.arc(gx + s/2 + 3, gy + s/2 - 2, 2.5, 0, Math.PI*2);
        ctx.fill();
        
        ctx.fillStyle = '#00f';
        ctx.beginPath();
        ctx.arc(gx + s/2 - 3 + ghost.dir.dx, gy + s/2 - 2 + ghost.dir.dy, 1, 0, Math.PI*2);
        ctx.arc(gx + s/2 + 3 + ghost.dir.dx, gy + s/2 - 2 + ghost.dir.dy, 1, 0, Math.PI*2);
        ctx.fill();
      });

      if (gameState === 'start') {
        ctx.fillStyle = 'rgba(10, 10, 18, 0.7)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = '#2de2ff';
        ctx.font = '20px "Orbitron", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('PRESS SPACE TO PLAY', WIDTH / 2, HEIGHT / 2);
      } else if (gameState === 'gameover') {
        ctx.fillStyle = 'rgba(10, 10, 18, 0.7)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = '#ff3d81';
        ctx.font = '24px "Orbitron", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', WIDTH / 2, HEIGHT / 2 - 15);
        ctx.fillStyle = '#fff';
        ctx.font = '16px "Orbitron", sans-serif';
        ctx.fillText('PRESS SPACE TO RESTART', WIDTH / 2, HEIGHT / 2 + 15);
      } else if (gameState === 'won') {
        ctx.fillStyle = 'rgba(10, 10, 18, 0.7)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = '#3dff88';
        ctx.font = '24px "Orbitron", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('YOU WIN!', WIDTH / 2, HEIGHT / 2 - 15);
        ctx.fillStyle = '#fff';
        ctx.font = '16px "Orbitron", sans-serif';
        ctx.fillText('PRESS SPACE TO REPLAY', WIDTH / 2, HEIGHT / 2 + 15);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: 'var(--panel, #12121f)',
      borderRadius: '8px',
      border: '2px solid var(--grid-line, #23233a)',
      boxShadow: '0 0 20px rgba(0,0,0,0.5)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '10px',
        fontFamily: '"Orbitron", sans-serif',
        color: '#f9e94e',
        fontSize: '1.2rem',
        textShadow: '0 0 5px #f9e94e'
      }}>
        <span>SCORE: {score}</span>
        <span>HIGH SCORE: {Math.max(score, 1500)}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{
          border: '2px solid #2de2ff',
          boxShadow: '0 0 10px rgba(45, 226, 255, 0.3)',
          borderRadius: '4px'
        }}
      />
      <div style={{
        marginTop: '15px',
        color: 'var(--text-dim, #8a8aa8)',
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.85rem'
      }}>
        Use ARROW KEYS to move. Click here to focus if it doesn't work.
      </div>
    </div>
  );
}
