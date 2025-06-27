import { type FC, type CSSProperties } from "react";
import "./glitch-text.css";

interface GlitchTextProps {
  children: string;
  speed?: number;
  distortion?: number;
  enableShadows?: boolean;
  className?: string;
  enabled?: boolean;
}

interface CustomCSSProperties extends CSSProperties {
  "--after-duration": string;
  "--before-duration": string;
  "--after-shadow": string;
  "--before-shadow": string;
  "--distortion": string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  distortion = 5,
  enableShadows = true,
  enabled = true,
  className = "",
}) => {
  const inlineStyles: CustomCSSProperties = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    "--after-shadow": enableShadows ? `-${distortion}px 0 #e35ae7` : "none",
    "--before-shadow": enableShadows ? `${distortion}px 0 #7ff39b` : "none",
    "--distortion": `${distortion}px`,
  };

  return (
    <h1
      className={`glitch ${className} ${enabled && "enabled"}`}
      style={inlineStyles}
      data-text={children}
    >
      {children}
    </h1>
  );
};

export default GlitchText;
