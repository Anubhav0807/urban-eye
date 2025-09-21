import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";

// Import all four frames
const frames = [
  require("../assets/eye-logo-1.png"),
  require("../assets/eye-logo-2.png"),
  require("../assets/eye-logo-3.png"),
  require("../assets/eye-logo-4.png"),
];

// Blink sequence: ping-pong
const sequence = [0, 1, 2, 3, 2, 1];

function BlinkingEye({ style }) {
  const [seqIndex, setSeqIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeqIndex((prev) => (prev + 1) % sequence.length);
    }, seqIndex === 0 ? 2000 : 80); // long pause on frame 1, faster for others

    return () => clearInterval(interval);
  }, [seqIndex]);

  return <Image source={frames[sequence[seqIndex]]} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
  image: {
    height: 94,
    width: 200,
  },
});

export default BlinkingEye;
