import { useEffect, useRef } from 'react';
import '@google/model-viewer';

export default function FridgeModel3D() {
  const modelViewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Model viewer is loaded via the import
  }, []);

  return (
    <div className="w-full h-[500px] lg:h-[600px] relative">
      <model-viewer
        ref={modelViewerRef}
        src="/src/assets/base_basic_pbr.glb"
        alt="Premium Smart Refrigerator 3D Model"
        auto-rotate
        camera-controls
        shadow-intensity="1"
        exposure="1"
        camera-orbit="10deg 85deg 5m"
        min-camera-orbit="auto auto 5m"
        max-camera-orbit="auto auto 7m"
        field-of-view="45deg"
        loading="eager"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      />
    </div>
  );
}

