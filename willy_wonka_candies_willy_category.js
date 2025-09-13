
// Willy Wonka Candies Mod for Sandboxels - Willy Category

elements.chocolateEgg = {
  color: "#8B4513",
  behavior: behaviors.SOLID,
  category: "Willy",
  tick: function(pixel) {
    const dirs = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
    for (let d of dirs) {
      let x2 = pixel.x + d[0];
      let y2 = pixel.y + d[1];
      let other = pixelMap[x2] && pixelMap[x2][y2];
      if (other && isLifeForm(other.element)) {
        removePixel(pixel.x, pixel.y);
        spawnElement(x2, y2, "chocolateBird");
        break;
      }
    }
  }
};

elements.chocolateBird = {
  color: "#A0522D",
  behavior: behaviors.FALL,
  category: "Willy",
  edible: true,
  tick: function(pixel) {
    if (Math.random() < 0.1) {
      pixel.vx = (Math.random()-0.5)*0.5;
      pixel.vy = (Math.random()-0.2)*(-0.5);
    }
  }
};

elements.blueberryGum = {
  color: "#ADD8E6",
  behavior: behaviors.SOLID,
  category: "Willy",
  onTouch: function(pixel, otherPixel) {
    if (!otherPixel) return;
    let gx = pixel.x;
    let gy = pixel.y;
    removePixel(otherPixel.x, otherPixel.y);
    for (let dx = 0; dx < 6; dx++) {
      for (let dy = 0; dy < 4; dy++) {
        spawnElement(gx + dx, gy + dy, "blueberryGlobBlue");
      }
    }
  }
};

elements.blueberryGlobBlue = {
  color: "#0000FF",
  behavior: behaviors.LIQUID,
  category: "Willy",
  tick: function(pixel) {
    if (pixel.age && pixel.age > 200) {
      removePixel(pixel.x, pixel.y);
    }
  }
};

function isLifeForm(elemName) {
  const lifeList = ["human","bird","animal1","animal2","plant"];
  return lifeList.includes(elemName);
}
