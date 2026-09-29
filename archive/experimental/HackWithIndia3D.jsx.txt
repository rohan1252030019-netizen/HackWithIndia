import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Sparkles, Box, Shield, Zap } from 'lucide-react';

export default function HackWithIndia3D() {
  const mountRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [colorTheme, setColorTheme] = useState('cyan'); // 'cyan', 'purple', 'gold', 'emerald'
  const [autoRotate, setAutoRotate] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  // References to update Three.js scene dynamically without full re-render
  const sceneElementsRef = useRef({
    materials: [],
    light1: null,
    light2: null,
    coreMesh: null,
    rings: [],
    group: null,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // ── SCENE & CAMERA ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ── LIGHTS ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x00f5a0, 90, 60);
    light1.position.set(12, 14, 12);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x7928ca, 75, 55);
    light2.position.set(-12, -10, 10);
    scene.add(light2);

    const mouseLight = new THREE.PointLight(0x00d4ff, 50, 35);
    mouseLight.position.set(0, 0, 12);
    scene.add(mouseLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(0, 20, 15);
    scene.add(dirLight);

    sceneElementsRef.current.light1 = light1;
    sceneElementsRef.current.light2 = light2;

    // ── MAIN 3D HACKWITHINDIA MODEL GROUP ──
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    sceneElementsRef.current.group = mainGroup;

    const allMaterials = [];

    // 1. Procedural 3D Chrome Monolith Base
    const baseGeo = new THREE.BoxGeometry(11, 2.8, 1.4);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x090d16,
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });
    allMaterials.push(baseMat);
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    mainGroup.add(baseMesh);

    // 2. Beveled Glowing Frame on Base
    const frameGeo = new THREE.BoxGeometry(11.2, 3.0, 0.4);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x005577,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
    });
    allMaterials.push(frameMat);
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = 0.6;
    mainGroup.add(frameMesh);

    // 3. Canvas Texture for Embossed "HACKWITHINDIA" + "2026"
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 2048;
    textCanvas.height = 512;
    const ctx = textCanvas.getContext('2d');

    // Background gradient for texture
    const grad = ctx.createLinearGradient(0, 0, 2048, 512);
    grad.addColorStop(0, '#050a14');
    grad.addColorStop(0.5, '#0b1329');
    grad.addColorStop(1, '#050a14');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2048, 512);

    // Subtle grid pattern on monolith face
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 2048; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y < 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    // High-resolution text rendering
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 130px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 30;
    ctx.fillText('HACK WITH INDIA', 1024, 210);

    // Subtitle & details
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#00d4ff';
    ctx.font = '700 48px "JetBrains Mono", monospace';
    ctx.fillText('⚡ 2026 EDITION · OCT 17-19 · NATIONAL FINALS ⚡', 1024, 330);

    // Border highlights on badge
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 1988, 452);

    const textTexture = new THREE.CanvasTexture(textCanvas);
    textTexture.needsUpdate = true;

    const plateGeo = new THREE.PlaneGeometry(10.8, 2.7);
    const plateMat = new THREE.MeshStandardMaterial({
      map: textTexture,
      roughness: 0.2,
      metalness: 0.5,
    });
    allMaterials.push(plateMat);
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.z = 0.72;
    mainGroup.add(plateMesh);

    // 4. Floating 3D Quantum Core at Center-Top
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x00d4ff,
      emissive: 0x002244,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      transmission: 0.4,
      ior: 1.5,
      thickness: 1.2,
    });
    allMaterials.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 3.2, 0);
    mainGroup.add(coreMesh);
    sceneElementsRef.current.coreMesh = coreMesh;

    // 5. Orbiting 3D Gyroscopic Rings
    const rings = [];
    const ringConfigs = [
      { r: 2.3, tube: 0.04, color: 0x00d4ff, rotX: 0.4, rotY: 0.6 },
      { r: 2.8, tube: 0.03, color: 0xec4899, rotX: -0.8, rotY: 0.2 },
      { r: 3.3, tube: 0.025, color: 0x8b5cf6, rotX: 0.2, rotY: -0.7 },
    ];

    ringConfigs.forEach((cfg) => {
      const ringGeo = new THREE.TorusGeometry(cfg.r, cfg.tube, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.7,
        metalness: 0.8,
        roughness: 0.2,
      });
      allMaterials.push(ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(0, 3.2, 0);
      ringMesh.rotation.set(cfg.rotX, cfg.rotY, 0);
      mainGroup.add(ringMesh);
      rings.push(ringMesh);
    });
    sceneElementsRef.current.rings = rings;

    // 6. Floating Cyber Nodes & Satellites
    const nodesGroup = new THREE.Group();
    const nodeGeo = new THREE.OctahedronGeometry(0.25, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00d4ff,
      emissiveIntensity: 1,
      metalness: 0.9,
    });
    allMaterials.push(nodeMat);

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 6.2;
      const nMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nMesh.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 2) * 1.5),
        Math.sin(angle) * (radius * 0.4)
      );
      nodesGroup.add(nMesh);
    }
    mainGroup.add(nodesGroup);

    // 7. Ambient 3D Particle Cloud
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    allMaterials.push(particleMat);
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    sceneElementsRef.current.materials = allMaterials;

    // ── MOUSE & DRAG INTERACTION ──
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotation = { x: 0.1, y: 0 };
    let currentRotation = { x: 0.1, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Move light with mouse
      mouseLight.position.x = normX * 12;
      mouseLight.position.y = normY * 8;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;

        targetRotation.y += deltaX * 0.008;
        targetRotation.x += deltaY * 0.008;

        prevMousePos = { x: e.clientX, y: e.clientY };
      } else {
        // Subtle tilt parallax
        targetRotation.x = 0.1 + normY * 0.2;
        targetRotation.y = normX * 0.35;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMousePos.x;
        const deltaY = e.touches[0].clientY - prevMousePos.y;

        targetRotation.y += deltaX * 0.01;
        targetRotation.x += deltaY * 0.01;

        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // ── RESIZE HANDLER ──
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 520;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // ── ANIMATION LOOP ──
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Smooth dampening towards target rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

      if (autoRotate && !isDragging) {
        targetRotation.y += 0.005;
      }

      mainGroup.rotation.x = currentRotation.x;
      mainGroup.rotation.y = currentRotation.y;

      // Floating gentle bobbing
      mainGroup.position.y = Math.sin(time * 1.5) * 0.25;

      // Core rotation & rings rotation
      if (coreMesh) {
        coreMesh.rotation.x = time * 0.8;
        coreMesh.rotation.y = time * 1.2;
      }

      rings.forEach((ring, idx) => {
        ring.rotation.z += (idx + 1) * 0.01;
        ring.rotation.x += 0.005 * (idx % 2 === 0 ? 1 : -1);
      });

      // Nodes orbiting
      nodesGroup.rotation.y = -time * 0.4;
      nodesGroup.rotation.z = Math.sin(time * 0.5) * 0.1;

      // Particle system gentle rotation
      particleSystem.rotation.y = time * 0.03;
      particleSystem.rotation.x = time * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      // Dispose Three.js objects
      allMaterials.forEach((m) => m.dispose());
      baseGeo.dispose();
      frameGeo.dispose();
      plateGeo.dispose();
      coreGeo.dispose();
      nodeGeo.dispose();
      particleGeo.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update wireframe mode
  useEffect(() => {
    sceneElementsRef.current.materials.forEach((mat) => {
      if (mat) mat.wireframe = wireframe;
    });
  }, [wireframe]);

  // Update color theme
  useEffect(() => {
    const colors = {
      cyan: { p1: 0x00d4ff, p2: 0xec4899, emissive: 0x005577 },
      purple: { p1: 0x8b5cf6, p2: 0x3b82f6, emissive: 0x4c1d95 },
      gold: { p1: 0xf59e0b, p2: 0xf43f5e, emissive: 0x78350f },
      emerald: { p1: 0x10b981, p2: 0x06b6d4, emissive: 0x064e3b },
    };

    const sel = colors[colorTheme] || colors.cyan;

    if (sceneElementsRef.current.light1) {
      sceneElementsRef.current.light1.color.setHex(sel.p1);
    }
    if (sceneElementsRef.current.light2) {
      sceneElementsRef.current.light2.color.setHex(sel.p2);
    }
    if (sceneElementsRef.current.coreMesh) {
      sceneElementsRef.current.coreMesh.material.color.setHex(sel.p1);
      sceneElementsRef.current.coreMesh.material.emissive.setHex(sel.emissive);
    }
    if (sceneElementsRef.current.rings) {
      sceneElementsRef.current.rings.forEach((r, i) => {
        const c = i === 0 ? sel.p1 : i === 1 ? sel.p2 : 0xffffff;
        r.material.color.setHex(c);
        r.material.emissive.setHex(c);
      });
    }
  }, [colorTheme]);

  return (
    <div className="relative w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Top Bar / Model Status */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/70 bg-zinc-900/30">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-medium text-zinc-300 tracking-wider uppercase">
            HACKWITHINDIA 3D Core Model
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
            Interactive · WebGL
          </span>
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center gap-2">
          {/* Color Switchers */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900 border border-zinc-800 mr-2">
            {[
              { id: 'cyan', bg: 'bg-cyan-400' },
              { id: 'purple', bg: 'bg-purple-400' },
              { id: 'gold', bg: 'bg-amber-400' },
              { id: 'emerald', bg: 'bg-emerald-400' },
            ].map((th) => (
              <button
                key={th.id}
                onClick={() => setColorTheme(th.id)}
                className={`w-4 h-4 rounded-full ${th.bg} transition-transform ${
                  colorTheme === th.id ? 'scale-125 ring-2 ring-white/50' : 'opacity-60 hover:opacity-100'
                }`}
                title={`${th.id} theme`}
              />
            ))}
          </div>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors ${
              wireframe
                ? 'bg-cyan-500 text-black font-semibold'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Box size={13} />
            <span className="hidden sm:inline">Wireframe</span>
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors ${
              autoRotate
                ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
            }`}
          >
            <RotateCw size={13} className={autoRotate ? 'animate-spin' : ''} style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">Orbit</span>
          </button>
        </div>
      </div>

      {/* Three.js 3D Viewport */}
      <div
        ref={mountRef}
        className="w-full h-[420px] sm:h-[500px] cursor-grab active:cursor-grabbing relative"
      >
        {/* Subtle HUD Overlay */}
        <div className="absolute top-4 left-6 pointer-events-none text-zinc-600 text-[11px] font-mono select-none">
          <div>MODEL: HWI_MONOLITH_v2026</div>
          <div>RENDERER: THREE.WebGLRenderer</div>
          <div>STATUS: {isInteracting ? 'USER_ENGAGED' : 'IDLE_ORBIT'}</div>
        </div>

        <div className="absolute bottom-4 right-6 pointer-events-none text-zinc-500 text-xs font-mono select-none flex items-center gap-2 bg-zinc-900/60 px-3 py-1.5 rounded-md border border-zinc-800/80 backdrop-blur-sm">
          <Sparkles size={13} className="text-cyan-400" />
          <span>Click & Drag to Rotate in 3D</span>
        </div>
      </div>
    </div>
  );
}
