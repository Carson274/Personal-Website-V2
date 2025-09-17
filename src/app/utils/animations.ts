export const infiniteHop = {
  y: [0, -20, 0, -12, 0, -3, 0],
  scaleX: [1, 0.97, 1.08, 0.99, 1.03, 1],
  scaleY: [1, 1.05, 0.92, 1.02, 0.97, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
    repeatDelay: 2
  }
}

export const singleHop = {
  y: [0, -20, 0, -12, 0, -3, 0],
  scaleX: [1, 0.97, 1.08, 0.99, 1.03, 1],
  scaleY: [1, 1.05, 0.92, 1.02, 0.97, 1],
  transition: {
    duration: 1.5,
    ease: "easeInOut"
  }
}