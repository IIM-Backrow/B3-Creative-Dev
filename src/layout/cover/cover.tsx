import { useState, useEffect, useRef } from "react";
import DistortOverlay from "../../components/distort-overlay";
import poster from "./poster.png";

interface DistortRect {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  displacementX: number;
  displacementY: number;
  velocity: number; // positive/negative determines direction
  isMovingVertical: boolean; // true = up/down, false = left/right
  sizeVelocity: number;
  isGrowingWidth: boolean; // true for width, false for height
  displacementVelocity: number; // positive/negative determines direction
  isDisplacementVertical: boolean; // true for Y displacement, false for X displacement
  lifespan: number;
  age: number;
}

export default function Cover() {
  const [distortRects, setDistortRects] = useState<DistortRect[]>([
    {
      id: 1,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      displacementX: 100,
      displacementY: 0,
      velocity: 2,
      isMovingVertical: false,
      sizeVelocity: 0.5,
      isGrowingWidth: true,
      displacementVelocity: 0.3,
      isDisplacementVertical: true,
      lifespan: 0.2,
      age: 0,
    },
    {
      id: 2,
      x: 200,
      y: 450,
      width: 250,
      height: 50,
      displacementX: 100,
      displacementY: 20,
      velocity: -1.8,
      isMovingVertical: true,
      sizeVelocity: 0.3,
      isGrowingWidth: false,
      displacementVelocity: -0.4,
      isDisplacementVertical: false,
      lifespan: 0.3,
      age: 50,
    },
  ]);
  const [nextId, setNextId] = useState(3);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = currentTime;

      setDistortRects((currentRects) => {
        // Update existing rects
        let updatedRects = currentRects.map((rect) => {
          // Calculate movement based on direction and velocity sign
          let newX = rect.x;
          let newY = rect.y;
          let newVelocity = rect.velocity;

          if (rect.isMovingVertical) {
            newY += rect.velocity * deltaTime * 60; // Scale by 60 to maintain similar speed
            // Bounce off top/bottom walls
            if (newY <= 0) {
              newY = 0;
              newVelocity = Math.abs(rect.velocity); // move down
            } else if (newY + rect.height >= 576) {
              newY = 576 - rect.height;
              newVelocity = -Math.abs(rect.velocity); // move up
            }
          } else {
            newX += rect.velocity * deltaTime * 60; // Scale by 60 to maintain similar speed
            // Bounce off left/right walls
            if (newX <= 0) {
              newX = 0;
              newVelocity = Math.abs(rect.velocity); // move right
            } else if (newX + rect.width >= 576) {
              newX = 576 - rect.width;
              newVelocity = -Math.abs(rect.velocity); // move left
            }
          }

          // Update size (either width or height, not both)
          let newWidth = rect.width;
          let newHeight = rect.height;

          if (rect.isGrowingWidth) {
            newWidth = Math.max(
              20,
              Math.min(200, rect.width + rect.sizeVelocity * deltaTime * 60)
            );
          } else {
            newHeight = Math.max(
              20,
              Math.min(200, rect.height + rect.sizeVelocity * deltaTime * 60)
            );
          }

          // Update displacement (only one direction)
          let newDisplacementX = rect.displacementX;
          let newDisplacementY = rect.displacementY;

          if (rect.isDisplacementVertical) {
            newDisplacementY = Math.max(
              -100,
              Math.min(
                100,
                rect.displacementY + rect.displacementVelocity * deltaTime * 60
              )
            );
          } else {
            newDisplacementX = Math.max(
              -100,
              Math.min(
                100,
                rect.displacementX + rect.displacementVelocity * deltaTime * 60
              )
            );
          }

          return {
            ...rect,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
            displacementX: newDisplacementX,
            displacementY: newDisplacementY,
            velocity: newVelocity,
            age: rect.age + deltaTime, // Add time in seconds
          };
        });

        // Remove old rects
        updatedRects = updatedRects.filter((rect) => rect.age < rect.lifespan);

        // Maybe add new rect (5% chance per frame)
        if (Math.random() < 0.5 && updatedRects.length < 12) {
          const newRect: DistortRect = {
            id: nextId,
            x: Math.random() * 400,
            y: Math.random() * 400,
            width: 20 + Math.random() * 100,
            height: 20 + Math.random() * 100,
            displacementX: -50 + Math.random() * 100,
            displacementY: -50 + Math.random() * 100,
            velocity: -3 + Math.random() * 6, // can be positive or negative
            isMovingVertical: Math.random() < 0.5,
            sizeVelocity: 0.2 + Math.random() * 0.6,
            isGrowingWidth: Math.random() < 0.5,
            displacementVelocity: -1 + Math.random() * 2, // can be positive or negative
            isDisplacementVertical: Math.random() < 0.5,
            lifespan: 0.1 + Math.random() * 0.7,
            age: 0,
          };
          updatedRects.push(newRect);
          setNextId((prev) => prev + 1);
        }

        return updatedRects;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [nextId]);

  return (
    <div className="aspect-square w-full max-w-xl bg-[#E35AE7] relative">
      <DistortOverlay
        width={576}
        height={576}
        distortRects={distortRects.map((rect) => ({
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          displacementX: rect.displacementX,
          displacementY: rect.displacementY,
        }))}
      >
        <img
          src={poster}
          alt="Les rêves d'hier"
          className="w-full h-full outline-2 outline-[#e35ae7]/50 -outline-offset-8"
        />
      </DistortOverlay>
    </div>
  );
}
