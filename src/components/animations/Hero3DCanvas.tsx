"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05050a, 0.045);

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Group for mouse rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Load Logo Texture for the center 3D badge
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/logo.png", () => {
      setIsLoaded(true);
    });
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    // 1. Central 3D Floating Insignia Plaque
    const plaqueGeometry = new THREE.BoxGeometry(2.4, 2.4, 0.35);
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x11111c,
      metalness: 0.92,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });

    const logoMaterial = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      metalness: 0.85,
      roughness: 0.2,
      emissive: new THREE.Color(0x35197f),
      emissiveIntensity: 0.35,
    });

    // Multi-material box: front & back face logo, sides chrome
    const materials = [
      chromeMaterial, // right
      chromeMaterial, // left
      chromeMaterial, // top
      chromeMaterial, // bottom
      logoMaterial,   // front
      logoMaterial,   // back
    ];

    const plaqueMesh = new THREE.Mesh(plaqueGeometry, materials);
    mainGroup.add(plaqueMesh);

    // 2. Beveled Glowing Violet Outer Frame
    const frameGeometry = new THREE.BoxGeometry(2.52, 2.52, 0.28);
    const frameEdges = new THREE.EdgesGeometry(frameGeometry);
    const frameLineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b6cff,
      linewidth: 2,
    });
    const frameWireframe = new THREE.LineSegments(frameEdges, frameLineMaterial);
    mainGroup.add(frameWireframe);

    // 3. Gyroscopic 3D Orbital Rings (Electric Violet & Chrome)
    const ring1Geometry = new THREE.TorusGeometry(2.1, 0.025, 16, 100);
    const ring1Material = new THREE.MeshStandardMaterial({
      color: 0x6c4cf5,
      emissive: 0x6c4cf5,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geometry = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ring2Material = new THREE.MeshStandardMaterial({
      color: 0xd8d8e8,
      emissive: 0x8b6cff,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.95,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 4. Floating 3D Micro-Crystals (Diamonds & Polyhedrons)
    const crystalGroup = new THREE.Group();
    const crystalGeo = new THREE.OctahedronGeometry(0.2, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x8b6cff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x4b2de8,
      emissiveIntensity: 0.5,
    });

    const crystals: { mesh: THREE.Mesh; rotSpeed: number; floatSpeed: number; initY: number }[] = [];
    const crystalCoords = [
      { x: -2.2, y: 1.5, z: 0.8 },
      { x: 2.3, y: 1.2, z: -0.6 },
      { x: -1.8, y: -1.7, z: -0.5 },
      { x: 2.1, y: -1.5, z: 0.7 },
      { x: 0, y: 2.4, z: -0.8 },
      { x: -2.5, y: -0.2, z: 1.2 },
    ];

    crystalCoords.forEach((coord, i) => {
      const cMesh = new THREE.Mesh(crystalGeo, crystalMat);
      cMesh.position.set(coord.x, coord.y, coord.z);
      const scale = 0.6 + Math.random() * 0.5;
      cMesh.scale.set(scale, scale, scale);
      crystalGroup.add(cMesh);
      crystals.push({
        mesh: cMesh,
        rotSpeed: 0.015 + Math.random() * 0.02,
        floatSpeed: 0.002 + Math.random() * 0.002,
        initY: coord.y,
      });
    });
    mainGroup.add(crystalGroup);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Electric violet key point light
    const violetLight = new THREE.PointLight(0x8b6cff, 8, 20);
    violetLight.position.set(3, 4, 4);
    scene.add(violetLight);

    // Deep purple rim light
    const rimLight = new THREE.PointLight(0x6c4cf5, 6, 20);
    rimLight.position.set(-4, -3, 3);
    scene.add(rimLight);

    // Metallic silver white specular highlight
    const silverLight = new THREE.DirectionalLight(0xffffff, 2.5);
    silverLight.position.set(0, 5, 5);
    scene.add(silverLight);

    // Mouse Interaction Target
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 0.6;
      targetRotationX = -y * 0.45;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleWindowMouseMove);

    // Touch support for mobile 3D interaction
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = x * 0.7;
        targetRotationX = -y * 0.5;
      }
    };
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 450;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped smooth rotation towards target
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.06;

      // Gentle continuous 3D idle floating
      plaqueMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      frameWireframe.position.y = plaqueMesh.position.y;

      // Rotate orbital rings
      ring1.rotation.z += 0.008;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.8) * 0.15;

      ring2.rotation.z -= 0.006;
      ring2.rotation.y = Math.PI / 4 + Math.cos(elapsedTime * 0.7) * 0.15;

      // Animate floating micro-crystals
      crystals.forEach((c, idx) => {
        c.mesh.rotation.x += c.rotSpeed;
        c.mesh.rotation.y += c.rotSpeed * 1.2;
        c.mesh.position.y = c.initY + Math.sin(elapsedTime * 2 + idx) * 0.12;
      });

      // Subtle dynamic point light motion
      violetLight.position.x = Math.sin(elapsedTime) * 3 + 2;
      violetLight.position.y = Math.cos(elapsedTime * 0.8) * 2 + 3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full aspect-[4/4.8] max-w-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full relative z-10" />

      {/* 3D Interactive Badge Overlay */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-violet-600/30 text-[#8B6CFF] border border-violet-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(108,76,245,0.4)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          INTERACTIVE 3D WEBGL
        </span>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <span className="text-[11px] font-mono text-zinc-400 bg-black/60 px-3.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
          Drag / Move mouse to rotate in 3D
        </span>
      </div>
    </div>
  );
}
