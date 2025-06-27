import { useEffect, useState } from "react";
import GlitchText from "./glitch-text";

interface GlitchFadeInProps {
  children: string;
}

export default function GlitchFadeIn({ children }: GlitchFadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [distortion, setDistortion] = useState(200);

  useEffect(() => {
    let nextTimeout: ReturnType<typeof setTimeout>;
    let repeatLeft = 5;

    const toggle = () => {
      setDistortion((prev) => prev / 2 + 5);
      setIsVisible(true);
      nextTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 100 + Math.random() * 200);

      nextTimeout = setTimeout(() => {
        repeatLeft--;
        toggle();
      }, 300 + Math.random() * (repeatLeft > 0 ? 1000 : 10000));
    };

    toggle();
    return () => {
      clearTimeout(nextTimeout);
    };
  }, []);

  return (
    <GlitchText speed={0.15} distortion={distortion} enabled={isVisible}>
      {children}
    </GlitchText>
  );
}
