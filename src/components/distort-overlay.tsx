import { useId } from "react";

interface DistortOverlayProps {
  width: number;
  height: number;
  scale?: number;
  distortionFilter: React.ReactNode;
  xChannel?: "R" | "G" | "B" | "A";
  yChannel?: "R" | "G" | "B" | "A";
  className?: string;
  children?: React.ReactNode;
}

export default function DistortOverlay({
  width,
  height,
  scale = 20,
  distortionFilter,
  xChannel = "R",
  yChannel = "G",
  className,
  children,
}: DistortOverlayProps) {
  const filterId = useId();

  return (
    <div style={{ position: "relative", width, height }}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id={filterId} x="0" y="0" width="100%" height="100%">
            {distortionFilter}
            <feDisplacementMap
              in="SourceGraphic"
              in2="distortion"
              scale={scale}
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
            />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          width,
          height,
          filter: `url(#${filterId})`,
          position: "relative",
        }}
        className={className}
      >
        {children}
      </div>
    </div>
  );
}
