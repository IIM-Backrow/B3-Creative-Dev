import { useMemo } from "react";

interface DistortOverlayProps {
  width: number;
  height: number;
  distortRects: {
    x: number;
    y: number;
    width: number;
    height: number;
    displacementX: number;
    displacementY: number;
  }[];
  children: React.ReactNode;
}

export default function DistortOverlay({
  width,
  height,
  distortRects,
  children,
}: DistortOverlayProps) {
  const filterId = useMemo(
    () => `distort-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  // Calculate the maximum magnitude across all rects to use as the scale
  const maxMagnitude = useMemo(() => {
    return Math.max(
      0.0001, // Minimum scale to avoid division by zero
      ...distortRects.map((rect) =>
        Math.sqrt(rect.displacementX ** 2 + rect.displacementY ** 2)
      )
    );
  }, [distortRects]);

  // Create displacement map based on distortRects with normalized vectors
  const displacementMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return "";

    // Fill with neutral displacement (128, 128 in RGBA represents no displacement)
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, width, height);

    // Apply displacement for each rect
    distortRects.forEach((rect) => {
      // Calculate magnitude of displacement vector
      const magnitude = Math.sqrt(
        rect.displacementX ** 2 + rect.displacementY ** 2
      );

      if (magnitude === 0) return; // Skip if no displacement

      // Normalize the displacement vector
      const normalizedX = rect.displacementX / magnitude;
      const normalizedY = rect.displacementY / magnitude;

      // Scale normalized vector by the ratio of this magnitude to max magnitude
      const scaleFactor = magnitude / maxMagnitude;

      // Convert normalized displacement to 0-255 range where 128 is neutral
      // The displacement is now normalized and scaled appropriately
      const displaceR = Math.max(
        0,
        Math.min(255, normalizedX * scaleFactor * 255)
      );
      const displaceG = Math.max(
        0,
        Math.min(255, normalizedY * scaleFactor * 255)
      );

      ctx.fillStyle = `rgb(${displaceR}, ${displaceG}, 0)`;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    });

    return canvas.toDataURL();
  }, [width, height, distortRects, maxMagnitude]);

  return (
    <div className="relative overflow-visible" style={{ width, height }}>
      <svg
        className="absolute inset-0"
        style={{
          width: width + maxMagnitude,
          height: height + maxMagnitude,
          filter: `url(#${filterId})`,
          transform: `translate(-${maxMagnitude * 0.5}px, -${
            maxMagnitude * 0.5
          }px)`,
        }}
      >
        <defs>
          <filter
            id={filterId}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="userSpaceOnUse"
          >
            {/* Load the displacement map */}
            <feImage
              result="displacementMap"
              href={displacementMap}
              preserveAspectRatio="none"
              x="0"
              y="0"
              width="100%"
              height="100%"
            />

            {/* Apply displacement to the source graphic using the max magnitude as scale */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="displacementMap"
              scale={maxMagnitude}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>

        {/* Render children as foreign object to apply filter */}
        <foreignObject width={width} height={height}>
          <div
            style={{
              width: width,
              height: height,
            }}
          >
            {children}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
