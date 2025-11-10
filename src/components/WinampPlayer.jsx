import React, { useEffect, useRef } from "react";
import digitalAngel from "../assets/MyAudio.mp3";
import circuitry from "../assets/MyAudio2.mp3";
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
    metaData: { artist: "Rye", title: "Digital Angel" },
    url: digitalAngel,
  },
  {
    metaData: { artist: "Rye", title: "Oh the Circuitry" },
    url: circuitry,
  }
],

      // 👇 No skin key at all
    });

    webampInstance.renderWhenReady(containerRef.current).then(() => {
      webampInstance.onClose(() => {
        if (onClose) onClose();
        webampInstance = null; // allow reopening later
      });
    });

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
