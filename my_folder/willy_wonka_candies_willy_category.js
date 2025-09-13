// gum.js
addElements({
  gum: {
    color: "#ff66ff",
    type: TYPES.POWDER,
    gravity: true,
    edible: true,
    update(x, y) {
      // gum behaves like a powder
      swap(x, y, x, y + 1) || swap(x, y, x + (Math.random() < 0.5 ? -1 : 1), y + 1);

      // turn any neighbor blue
      forN(x, y, (nx, ny, id, e) => {
        if (!id || !e) return;
        set(nx, ny, id); // keep the same element
        const meta = meta(id);
        if (meta) {
          meta.color = "#0000ff"; // force its color to blue
        }
      });
    },
  },
});
