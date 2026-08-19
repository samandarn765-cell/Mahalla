import React, { useEffect, useRef } from 'react';

export const BioluminescentBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for biological network
    const particleCount = 45;
    const particles = [];
    const colors = ['#00D2B4', '#0EA5E9', '#D4AF37', '#10B981', '#38BDF8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections (biological synapses)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.alpha + Math.sin(time + p.pulseOffset) * 0.2;
        const boundedAlpha = Math.max(0.1, Math.min(0.8, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = boundedAlpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Living Bioluminescent Ambient Glow Orbs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full filter blur-[140px] opacity-25 animate-bio1"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 70%)'
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full filter blur-[150px] opacity-25 animate-bio2"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 70%)'
        }}
      />
      <div
        className="absolute top-[40%] right-[15%] w-[40vw] h-[40vw] rounded-full filter blur-[130px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(14, 165, 233, 0.1) 60%, transparent 80%)'
        }}
      />

      {/* Cyber Mesh Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 80px 80px, 80px 80px'
        }}
      />

      {/* Canvas for Particle Synapses */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
