// Willy Wonka Candies Mod (Sandboxels, "Willy" category)

var BirdAge = 0;

elements.ChocolateEgg = {
    color: "#8B4513",
    singleColor: true,
    category: "Willy",
    state: "solid",
    behavior: behaviors.SOLID,
    movable: true,
    tick: function(pixel) {
        if (pixel.BirdAge === undefined) { pixel.BirdAge = 0; }
        pixel.BirdAge++;
        // Try to hatch if touching life form
        const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
        for (let d of dirs) {
            let x2 = pixel.x + d[0];
            let y2 = pixel.y + d[1];
            let other = pixelMap[x2] && pixelMap[x2][y2];
            if (other && ["human","animal","bird"].includes(other.element)) {
                removePixel(pixel.x,pixel.y);
                spawnElement(pixel.x,pixel.y,"ChocolateBird");
                break;
            }
        }
        // Chance to auto-hatch after age
        if (pixel.BirdAge >= 500) {
            removePixel(pixel.x,pixel.y);
            spawnElement(pixel.x,pixel.y,"ChocolateBird");
        }
    },
    hoverStat: function(pixel){ return pixel.BirdAge; }
};

elements.ChocolateBird = {
    color: "#A0522D",
    singleColor: true,
    category: "Willy",
    state: "solid",
    behavior: behaviors.FALL,
    movable: true,
    tick: function(pixel) {
        if (pixel.vx === undefined) pixel.vx = 0;
        if (pixel.vy === undefined) pixel.vy = 0;
        // Flap randomly
        if (Math.random() < 0.15) {
            pixel.vx += (Math.random() - 0.5) * 0.4;
            pixel.vy += (Math.random() - 0.2) * -0.3;
        }
        pixel.vy += 0.1; // gravity
        tryMove(pixel,pixel.x+pixel.vx,pixel.y+pixel.vy);
    },
    edible: true
};

elements.BlueberryGum = {
    color: "#ADD8E6",
    singleColor: true,
    category: "Willy",
    state: "solid",
    behavior: behaviors.SOLID,
    movable: true,
    onTouch: function(pixel,otherPixel){
        if(!otherPixel) return;
        removePixel(otherPixel.x,otherPixel.y);
        for(let dx=0;dx<6;dx++){
            for(let dy=0;dy<4;dy++){
                createPixel("BlueberryGlob",pixel.x+dx,pixel.y+dy);
            }
        }
    }
};

elements.BlueberryGlob = {
    color: "#0000FF",
    singleColor: true,
    category: "Willy",
    state: "solid",
    behavior: behaviors.POWDER,
    movable: true,
    tick: function(pixel){
        if(pixel.age === undefined) pixel.age = 0;
        pixel.age++;
        if(pixel.age > 300) removePixel(pixel.x,pixel.y);
    }
};
