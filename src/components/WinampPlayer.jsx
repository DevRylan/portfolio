import React, { useEffect, useRef } from "react";
import Webamp from "webamp";

let webampInstance = null; // Persist between re-renders

function WinampPlayer({ onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Don't reinitialize if already active
    if (webampInstance) return;

    webampInstance = new Webamp({
      initialTracks: [
        {
          metaData: { artist: "Rylan Weldon", title: "Digital Angel" },
          url: "/assets/DigitalAngel.mp3",
        },
      ],
      // 👇 No skin key at all
    });

    webampInstance.renderWhenReady(containerRef.current).then(() => {
      webampInstance.onClose(() => {
        if (onClose) onClose();
        webampInstance = null; // allow reopening later
      });
    });

    // ❌ don't close on cleanup; prevents closing on re-renders
  }, [onClose]);

  return (
    <div 
      ref={containerRef}
      style={{
        width: 300,
        height: 180,
        overflow: "hidden",
      }}
    />
  );
}

export default WinampPlayer;
