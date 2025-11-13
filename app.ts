// const canvas = document.getElementById("sim") as HTMLCanvasElement;
 const canvas = document.getElementById("simulation") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const G = 0.5; // gravitational constant (tweakable)

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  color: string;

  constructor(x: number, y: number, mass: number, color: string) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.mass = mass;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.sqrt(this.mass), 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const p1 = new Particle(300, 300, 1000, "orange");
const p2 = new Particle(500, 300, 500, "cyan");
p2.vy = 2; // initial velocity for orbit-like motion

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Compute force between particles
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const distSq = dx * dx + dy * dy;
  const dist = Math.sqrt(distSq);
  const force = (G * p1.mass * p2.mass) / distSq;

  const fx = (force * dx) / dist;
  const fy = (force * dy) / dist;

  // Update velocities (F = ma)
  p1.vx += fx / p1.mass;
  p1.vy += fy / p1.mass;
  p2.vx -= fx / p2.mass;
  p2.vy -= fy / p2.mass;

  // Update positions
  p1.x += p1.vx;
  p1.y += p1.vy;
  p2.x += p2.vx;
  p2.y += p2.vy;

  p1.draw();
  p2.draw();

  requestAnimationFrame(update);
}

update();
