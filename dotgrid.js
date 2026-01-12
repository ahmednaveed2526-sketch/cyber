<script>
const canvas = document.getElementById("dotGrid");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const spacing = 40; // distance between dots
const radius = 3;   // dot size
const dots = [];

// Initialize dots in a grid
for (let x = 0; x < width; x += spacing) {
  for (let y = 0; y < height; y += spacing) {
    dots.push({ x, y, originalX: x, originalY: y, hover: 0 });
  }
}

// Track mouse
const mouse = { x: -1000, y: -1000 };

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

canvas.addEventListener("mouseleave", () => {
  mouse.x = -1000;
  mouse.y = -1000;
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);

  dots.forEach(dot => {
    const dx = mouse.x - dot.x;
    const dy = mouse.y - dot.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    // if mouse is close, dot moves away
    if (dist < 100) {
      const angle = Math.atan2(dy, dx);
      const force = (100 - dist) / 8;
      dot.x = dot.originalX - Math.cos(angle) * force;
      dot.y = dot.originalY - Math.sin(angle) * force;
    } else {
      // return to original position
      dot.x += (dot.originalX - dot.x) * 0.05;
      dot.y += (dot.originalY - dot.y) * 0.05;
    }

    // draw the dot
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, radius, 0, Math.PI*2);
    ctx.fillStyle = "#39d353";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  dots.length = 0;
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      dots.push({ x, y, originalX: x, originalY: y, hover: 0 });
    }
  }
});
</script>
