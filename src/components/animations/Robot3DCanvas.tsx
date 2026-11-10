"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sounds } from "@/utils/soundEffects";
import { Sparkles } from "lucide-react";

interface RobotPhrase {
  displayText: string;
  glow: number;
  light: number;
}

const PHRASES: RobotPhrase[] = [
  {
    displayText: "⚡ 60 FPS Web & Mobile Engineering",
    glow: 0x00f5ff,
    light: 0x00f5ff,
  },
  {
    displayText: "🚀 Shipped: ChaloJi & MITS Sadhana",
    glow: 0x10b981,
    light: 0x10b981,
  },
  {
    displayText: "✨ Next.js 14 • 99+ Core Web Vitals",
    glow: 0x8b6cff,
    light: 0x8b6cff,
  },
];

export default function Robot3DCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [speechText, setSpeechText] = useState("Hello, welcome to Techlifa.");
  const [isActive, setIsActive] = useState(false);

  const headGroupRef = useRef<THREE.Group | null>(null);
  const eyeGlowRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const eyeLightRef = useRef<THREE.PointLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);

  const playGreetingRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 380;
    const isMobile = window.innerWidth < 640;

    // Camera perspective
    const cameraZ = isMobile ? 6.8 : 6.1;
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.3, cameraZ);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Root Group
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);
    robotRoot.position.set(0, -0.05, 0);

    // --- MATERIALS ---
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0e0e18,
      metalness: 0.65,
      roughness: 0.32,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
      reflectivity: 0.8,
    });

    const visorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x020205,
      metalness: 0.3,
      roughness: 0.08,
      clearcoat: 0.9,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
    });

    const pedestalMaterial = new THREE.MeshStandardMaterial({
      color: 0x080811,
      metalness: 0.8,
      roughness: 0.25,
    });

    // Eye materials with depthTest: false and toneMapped: false so eyes are always 100% visible
    const eyeCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      depthTest: false,
      toneMapped: false,
    });

    const eyeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xc4b5fd,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      toneMapped: false,
    });
    eyeGlowRef.current = eyeGlowMaterial;

    // --- 2. PEDESTAL BOX ---
    const pedestal = new THREE.Mesh(
      new THREE.BoxGeometry(1.22, 1.22, 1.22),
      pedestalMaterial
    );
    pedestal.position.y = -1.5;
    robotRoot.add(pedestal);

    // --- 3. ROBOT LEGS ---
    const legGeo = new THREE.CylinderGeometry(0.065, 0.05, 0.38, 24);
    const footGeo = new THREE.SphereGeometry(0.075, 16, 16);

    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.16, -0.72, 0);
    const leftLegMesh = new THREE.Mesh(legGeo, bodyMaterial);
    const leftFootMesh = new THREE.Mesh(footGeo, bodyMaterial);
    leftFootMesh.position.y = -0.19;
    leftLegGroup.add(leftLegMesh);
    leftLegGroup.add(leftFootMesh);
    robotRoot.add(leftLegGroup);

    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.16, -0.72, 0);
    const rightLegMesh = new THREE.Mesh(legGeo, bodyMaterial);
    const rightFootMesh = new THREE.Mesh(footGeo, bodyMaterial);
    rightFootMesh.position.y = -0.19;
    rightLegGroup.add(rightLegMesh);
    rightLegGroup.add(rightFootMesh);
    robotRoot.add(rightLegGroup);

    // --- 4. ROBOT TORSO ---
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.32, 0);
    robotRoot.add(torsoGroup);

    const torsoMain = new THREE.Mesh(
      new THREE.CylinderGeometry(0.19, 0.42, 0.58, 32),
      bodyMaterial
    );
    torsoGroup.add(torsoMain);

    const torsoBottom = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
      bodyMaterial
    );
    torsoBottom.position.y = -0.29;
    torsoGroup.add(torsoBottom);

    const neckRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.17, 0.12, 24),
      bodyMaterial
    );
    neckRing.position.y = 0.33;
    torsoGroup.add(neckRing);

    // --- 5. ROBOT HEAD ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.46, 0);
    robotRoot.add(headGroup);
    headGroupRef.current = headGroup;

    const headShape = new THREE.Shape();
    const hw = 1.82;
    const hh = 1.15;
    const hr = 0.32;

    headShape.moveTo(-hw / 2 + hr, -hh / 2);
    headShape.lineTo(hw / 2 - hr, -hh / 2);
    headShape.quadraticCurveTo(hw / 2, -hh / 2, hw / 2, -hh / 2 + hr);
    headShape.lineTo(hw / 2, hh / 2 - hr);
    headShape.quadraticCurveTo(hw / 2, hh / 2, hw / 2 - hr, hh / 2);
    headShape.lineTo(-hw / 2 + hr, hh / 2);
    headShape.quadraticCurveTo(-hw / 2, hh / 2, -hw / 2, hh / 2 - hr);
    headShape.lineTo(-hw / 2, -hh / 2 + hr);
    headShape.quadraticCurveTo(-hw / 2, -hh / 2, -hw / 2 + hr, -hh / 2);

    const headExtrudeSettings = {
      depth: 1.25,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.14,
      bevelThickness: 0.14,
    };
    const headGeo = new THREE.ExtrudeGeometry(headShape, headExtrudeSettings);
    headGeo.center();
    const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
    headGroup.add(headMesh);

    // Visor Screen
    const visorShape = new THREE.Shape();
    const vw = 1.55;
    const vh = 0.88;
    const vr = 0.22;

    visorShape.moveTo(-vw / 2 + vr, -vh / 2);
    visorShape.lineTo(vw / 2 - vr, -vh / 2);
    visorShape.quadraticCurveTo(vw / 2, -vh / 2, vw / 2, -vh / 2 + vr);
    visorShape.lineTo(vw / 2, vh / 2 - vr);
    visorShape.quadraticCurveTo(vw / 2, vh / 2, vw / 2 - vr, vh / 2);
    visorShape.lineTo(-vw / 2 + vr, vh / 2);
    visorShape.quadraticCurveTo(-vw / 2, vh / 2, -vw / 2, vh / 2 - vr);
    visorShape.lineTo(-vw / 2, -vh / 2 + vr);
    visorShape.quadraticCurveTo(-vw / 2, -vh / 2, -vw / 2 + vr, -vh / 2);

    const visorExtrude = new THREE.ExtrudeGeometry(visorShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    visorExtrude.center();
    const visorMesh = new THREE.Mesh(visorExtrude, visorMaterial);
    visorMesh.position.z = 0.72;
    headGroup.add(visorMesh);

    // Antennas
    const antBaseGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.1, 16);
    const antRodGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 12);
    const antTipGeo = new THREE.SphereGeometry(0.06, 16, 16);

    const createAntenna = (isLeft: boolean) => {
      const g = new THREE.Group();
      const x = isLeft ? -0.98 : 0.98;
      const rotZ = isLeft ? 0.35 : -0.35;
      g.position.set(x, 0.28, 0.05);
      g.rotation.z = rotZ;

      const base = new THREE.Mesh(antBaseGeo, bodyMaterial);
      base.rotation.z = Math.PI / 2;
      const rod = new THREE.Mesh(antRodGeo, bodyMaterial);
      rod.position.x = isLeft ? -0.22 : 0.22;
      rod.rotation.z = Math.PI / 2;
      const tip = new THREE.Mesh(antTipGeo, eyeCoreMaterial);
      tip.position.x = isLeft ? -0.42 : 0.42;

      g.add(base);
      g.add(rod);
      g.add(tip);
      return g;
    };

    headGroup.add(createAntenna(true));
    headGroup.add(createAntenna(false));

    // LED Glowing Eyes Container (firmly positioned in front of visor at z = 0.84)
    const eyesContainer = new THREE.Group();
    eyesContainer.position.set(0, 0.02, 0.84);
    eyesContainer.renderOrder = 20;
    headGroup.add(eyesContainer);

    const eyeShape = new THREE.Shape();
    const ew = 0.28;
    const eh = 0.30;
    const er = 0.14;
    eyeShape.moveTo(-ew / 2 + er, -eh / 2);
    eyeShape.lineTo(ew / 2 - er, -eh / 2);
    eyeShape.quadraticCurveTo(ew / 2, -eh / 2, ew / 2, -eh / 2 + er);
    eyeShape.lineTo(ew / 2, eh / 2 - er);
    eyeShape.quadraticCurveTo(ew / 2, eh / 2, ew / 2 - er, eh / 2);
    eyeShape.lineTo(-ew / 2 + er, eh / 2);
    eyeShape.quadraticCurveTo(-ew / 2, eh / 2, -ew / 2, eh / 2 - er);
    eyeShape.lineTo(-ew / 2, -eh / 2 + er);
    eyeShape.quadraticCurveTo(-ew / 2, -eh / 2, -ew / 2 + er, -eh / 2);

    const eyeGeo = new THREE.ShapeGeometry(eyeShape);
    eyeGeo.center();
    const glowGeo = new THREE.PlaneGeometry(0.55, 0.55);

    const leftEye = new THREE.Mesh(eyeGeo, eyeCoreMaterial);
    leftEye.position.set(-0.38, 0, 0.02);
    leftEye.renderOrder = 22;

    const leftGlow = new THREE.Mesh(glowGeo, eyeGlowMaterial);
    leftGlow.position.set(-0.38, 0, 0.01);
    leftGlow.renderOrder = 21;

    const rightEye = new THREE.Mesh(eyeGeo, eyeCoreMaterial);
    rightEye.position.set(0.38, 0, 0.02);
    rightEye.renderOrder = 22;

    const rightGlow = new THREE.Mesh(glowGeo, eyeGlowMaterial);
    rightGlow.position.set(0.38, 0, 0.01);
    rightGlow.renderOrder = 21;

    eyesContainer.add(leftEye);
    eyesContainer.add(leftGlow);
    eyesContainer.add(rightEye);
    eyesContainer.add(rightGlow);

    // Eye spotlight
    const eyeLight = new THREE.PointLight(0xc4b5fd, 2.2, 3.5);
    eyeLight.position.set(0, 0.46, 1.2);
    scene.add(eyeLight);
    eyeLightRef.current = eyeLight;

    // --- 6. LIGHTING ---
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8b6cff, 1.8);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x0e0e1a, 1.6);
    scene.add(ambientLight);

    // --- 7. INTERACTION LOGIC (LOOK AT CURSOR) ---
    const targetRotation = { x: 0, y: 0 };
    const eyeTarget = { x: 0, y: 0 };

    const updateGaze = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const nx = (clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const ny = (clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);

      const clampedX = Math.max(-1, Math.min(1, nx));
      const clampedY = Math.max(-1, Math.min(1, ny));

      targetRotation.y = clampedX * 0.45;
      targetRotation.x = clampedY * 0.28;

      eyeTarget.x = clampedX * 0.12;
      eyeTarget.y = -clampedY * 0.08;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateGaze(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateGaze(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // --- 8. BLINK SYSTEM ---
    let isBlinkingState = false;
    const triggerSlowBlink = (durationMs = 280) => {
      if (isBlinkingState) return;
      isBlinkingState = true;
      const startTime = performance.now();

      const animateBlink = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        const scaleY = progress < 0.5 ? 1 - progress * 2 : (progress - 0.5) * 2;
        const currentScale = Math.max(scaleY, 0.1);

        leftEye.scale.y = currentScale;
        rightEye.scale.y = currentScale;
        leftGlow.scale.y = currentScale;
        rightGlow.scale.y = currentScale;

        if (progress < 1) {
          requestAnimationFrame(animateBlink);
        } else {
          leftEye.scale.set(1, 1, 1);
          rightEye.scale.set(1, 1, 1);
          leftGlow.scale.set(1, 1, 1);
          rightGlow.scale.set(1, 1, 1);
          isBlinkingState = false;
        }
      };
      requestAnimationFrame(animateBlink);

      // Fail-safe timeout so eyes never stay closed
      setTimeout(() => {
        leftEye.scale.set(1, 1, 1);
        rightEye.scale.set(1, 1, 1);
        leftGlow.scale.set(1, 1, 1);
        rightGlow.scale.set(1, 1, 1);
        isBlinkingState = false;
      }, durationMs + 100);
    };

    // --- 9. ROBOT WELCOME GREETING: "Hello, welcome to Techlifa." ---
    const playGreeting = () => {
      setIsActive(true);
      setSpeechText("👋 Hello, welcome to Techlifa.");

      // Eye color sync to brilliant electric cyan
      if (eyeGlowRef.current) eyeGlowRef.current.color.setHex(0x00f5ff);
      if (eyeLightRef.current) eyeLightRef.current.color.setHex(0x00f5ff);
      if (fillLightRef.current) fillLightRef.current.color.setHex(0x00f5ff);

      triggerSlowBlink(300);

      // Graceful robotic nod
      if (headGroupRef.current) {
        headGroupRef.current.rotation.x += 0.25;
        headGroupRef.current.position.y += 0.07;
        setTimeout(() => {
          if (headGroupRef.current) headGroupRef.current.rotation.x -= 0.12;
        }, 320);
      }

      // Speak the single requested line
      sounds.speak("Hello, welcome to Techlifa.", () => {
        setIsActive(false);
      });

      setTimeout(() => {
        setIsActive(false);
      }, 2600);
    };

    playGreetingRef.current = playGreeting;

    const handleClick = () => {
      playGreeting();
    };

    const handleMouseEnter = () => {
      sounds.playHover();
    };

    const handleTechlifaEnter = () => {
      setTimeout(() => {
        playGreeting();
      }, 450);
    };

    window.addEventListener("techlifa-enter", handleTechlifaEnter);
    container.addEventListener("click", handleClick);
    container.addEventListener("mouseenter", handleMouseEnter);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 380;
      const mob = window.innerWidth < 640;
      camera.aspect = w / h;
      camera.position.z = mob ? 6.8 : 6.1;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // --- 10. ANIMATION LOOP ---
    let animationId: number;
    let clock = new THREE.Clock();
    let blinkTimer = 0;
    let nextBlinkInterval = 6.5;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      headGroup.rotation.y += (targetRotation.y - headGroup.rotation.y) * 0.09;
      headGroup.rotation.x += (targetRotation.x - headGroup.rotation.x) * 0.09;

      headGroup.rotation.z = -headGroup.rotation.y * 0.12;
      torsoGroup.rotation.y = headGroup.rotation.y * 0.28;
      torsoGroup.rotation.x = headGroup.rotation.x * 0.18;

      eyesContainer.position.x += (eyeTarget.x - eyesContainer.position.x) * 0.12;
      eyesContainer.position.y += (eyeTarget.y - eyesContainer.position.y) * 0.12;
      eyesContainer.position.z = 0.84; // Keep eye Z securely in front of visor

      eyeLight.position.x = headGroup.position.x + eyesContainer.position.x;
      eyeLight.position.y = headGroup.position.y + eyesContainer.position.y + 0.1;

      const breathing = Math.sin(elapsedTime * 2.2) * 0.035;
      headGroup.position.y = 0.46 + breathing;
      torsoGroup.position.y = -0.32 + breathing * 0.4;

      blinkTimer += delta;
      if (blinkTimer > nextBlinkInterval && !isBlinkingState) {
        blinkTimer = 0;
        nextBlinkInterval = 6.0 + Math.random() * 2.5;
        triggerSlowBlink(340);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("techlifa-enter", handleTechlifaEnter);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("mouseenter", handleMouseEnter);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleGreetingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playGreetingRef.current) {
      playGreetingRef.current();
    }
  };

  return (
    <div className="relative w-full aspect-[4/4.2] max-w-[280px] sm:max-w-[400px] flex items-center justify-center select-none cursor-pointer group mx-auto my-1 sm:my-0">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full relative z-10" />

      {/* Floating Interactive Speech Bubble above Robot */}
      <div
        onClick={handleGreetingClick}
        className="absolute -top-1 sm:top-1 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 transform group-hover:scale-105 w-[92%] max-w-[280px] text-center cursor-pointer"
        title="Tap to Hear: Hello, welcome to Techlifa"
      >
        <div className="relative px-3.5 py-2 rounded-2xl bg-[#0B0B18]/95 border border-violet-500/40 hover:border-violet-400 shadow-[0_0_25px_rgba(108,76,245,0.45)] backdrop-blur-md flex items-center justify-center gap-2 transition-all">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono font-medium text-white truncate">
            {speechText}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#00F5FF] shrink-0" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0B0B18] border-r border-b border-violet-500/40 transform rotate-45" />
        </div>
      </div>

      {/* Interactive Helper Pill below Robot */}
      <div className="absolute bottom-0 sm:bottom-2 left-1/2 -translate-x-1/2 z-20 text-center w-full px-2">
        <button
          type="button"
          onClick={handleGreetingClick}
          className="text-[9px] sm:text-[10px] font-mono text-zinc-300 hover:text-white bg-black/85 hover:bg-violet-950/60 px-3.5 py-1.5 rounded-full border border-violet-500/30 hover:border-violet-400 backdrop-blur-md shadow-[0_0_15px_rgba(108,76,245,0.2)] inline-flex items-center gap-1.5 cursor-pointer transition-all duration-300"
        >
          <span>👋</span>
          <span>Tap Robot</span>
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          <span className="text-[#00F5FF] font-semibold">&ldquo;Hello, welcome to Techlifa&rdquo;</span>
        </button>
      </div>
    </div>
  );
}
