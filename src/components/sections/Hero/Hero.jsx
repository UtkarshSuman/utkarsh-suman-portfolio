import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Float,
  Sparkles
} from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

/* ================= ROBOT COMPONENT ================= */

function Robot({ mouse }) {
  const { scene, animations } = useGLTF("/models/robot.glb");
  const robotRef = useRef();

  useFrame((state) => {
    if (!robotRef.current) return;

    // Mouse follow rotation
    robotRef.current.rotation.y = mouse.current.x * 0.5;
    robotRef.current.rotation.x = mouse.current.y * 0.2;

    // Smooth floating rotation
    robotRef.current.rotation.y += 0.002;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <primitive
        ref={robotRef}
        object={scene}
        scale={2.8}
        position={[0.4, -0.3, 0]}
      />
    </Float>
  );
}

/* ================= HERO SECTION ================= */

function Hero() {

  const fullText = "Hi, I'm Utkarsh";
const [displayedText, setDisplayedText] = useState("");

useEffect(() => {
  let index = 0;

  const interval = setInterval(() => {
    setDisplayedText(fullText.slice(0, index + 1));
    index++;

    if (index === fullText.length) {
      clearInterval(interval);
    }
  }, 80); // typing speed (lower = faster)

  return () => clearInterval(interval);
}, []);

  const isMobile = window.innerWidth < 768;

  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
  id="hero"
  onMouseMove={handleMouseMove}
  style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" ,
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "120px 5% 40px" : "0 5%",
    background:
      "radial-gradient(circle at top, #15103d, #302b63, #24243e)",
    overflow: "hidden",
    position: "relative",
  }}
>

      {/* ================= LEFT TEXT ================= */}
      <motion.div
        style={{
          color: "white",
          zIndex: 2,
          y: yText
        }}
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 style={{ fontSize: "3.9rem" }}>
  {displayedText.includes("Utkarsh") ? (
    <>
      Hi, I'm{" "}
      <span
        style={{
          background: "linear-gradient(90deg,#00f5ff,#ff00ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Utkarsh
      </span>
    </>
  ) : (
    displayedText
  )}
  <span style={{ 
  opacity: 0.7,
  animation: "blink 1s infinite"
}}>
  |
</span>

</h1>


        <p style={{ marginTop: "20px", opacity: 0.8,fontSize: "21.7px"
 }}>
          Building Memorable  Experiences for People
        </p>
      </motion.div>

      {/* ================= 3D SCENE ================= */}
      <div
  style={{
    width: isMobile ? "100%" : "55%",
    height: isMobile ? "350px" : "500px",
    marginTop: isMobile ? "40px" : "0"
  }}
>

        <Canvas
          camera={{ position: [0, 1.5, 6], fov: 50 }}
          dpr={[1, 1.5]} // Performance optimization
          gl={{ antialias: true }}
        >
          {/* Lights */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 5, 2]} intensity={2} />
          <pointLight position={[-2, 2, 2]} color="#ff00ff" intensity={3} />
          <pointLight position={[2, 2, 2]} color="#00f5ff" intensity={3} />

          {/* Cyberpunk Particles */}
          <Sparkles
            count={150}
            scale={10}
            size={2}
            speed={0.4}
            color="#00f5ff"
          />

          <Suspense fallback={null}>
            <Robot mouse={mouse} />
            <Environment preset="city" />
          </Suspense>

          {/* Auto cinematic camera movement */}
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </div>
    </section>
  );
}

export default Hero;
