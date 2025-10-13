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

export const shake = {
  rotate: [0, -10, 8, -5, 3, -2, 1, 0],
  transformOrigin: "bottom center",
  transition: {
    duration: 0.8,
    ease: [0.36, 0.07, 0.19, 0.97],
    repeat: Infinity,
    repeatDelay: 1.8,
  },
};
