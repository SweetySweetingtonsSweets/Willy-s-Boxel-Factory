elements.liquefier = {
    color: "#33ccff",
    behavior: behaviors.LIQUID,
    category: "special",
    state: "liquid",
    density: 1000,
    viscosity: 5,
    tick: function(pixel) {
        const dirs = [
            [0,1], [0,-1], [1,0], [-1,0], // cardinal
            [1,1], [-1,1], [1,-1], [-1,-1] // diagonals
        ];
        for (const [dx,dy] of dirs) {
            const x = pixel.x+dx;
            const y = pixel.y+dy;
            if (outOfBounds(x,y)) continue;

            const target = pixelMap[x][y];
            if (!target) continue;
            if (target.element === "liquefier") continue;

            // create new element name like "stone_liquid"
            const liquidName = target.element + "_liquid";

            // if not defined yet, define it dynamically
            if (!elements[liquidName]) {
                let baseColor = elements[target.element]?.color || "#654321";
                if (Array.isArray(baseColor)) baseColor = baseColor[0];

                elements[liquidName] = {
                    color: [baseColor, "#3399ff"], // original + bluish tint
                    behavior: behaviors.LIQUID,
                    category: "liquids",
                    state: "liquid",
                    density: 1050,
                    viscosity: 8,
                    isFood: elements[target.element]?.isFood || false,
                };
            }

            // turn the neighbor into its liquid version
            changePixel(target, liquidName);
        }
    },
};

