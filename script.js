"use strict";

"use strict";

document.querySelector("input").addEventListener("input", getHEXColor);

function getHEXColor() {
  console.log("getColor");
  let hexColor = this.value;
  showColor(hexColor);
}

function showColor(hexColor) {
  console.log("showColor");
  let rgb = hexToRGB(hexColor);
  let hsl = rgbToHsl(rgb);
  let rgbCss = rgbToCss(rgb);

  showHEXValues(hexColor);
  showRGBValues(rgb, rgbCss);
  showHSLValues(hsl);
}

function hexToRGB(hexColor) {
  console.log("hexToRGB");
  let r = Number.parseInt(hexColor.substring(1, 3), 16);
  let g = Number.parseInt(hexColor.substring(3, 5), 16);
  let b = Number.parseInt(hexColor.substring(5, 7), 16);

  return { r, g, b };
}

function rgbToHsl(rgb) {
  console.log("rgbToHsl");

  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = h.toFixed();
  s = s.toFixed(0);
  l = l.toFixed(0);

  return { h, s, l };
}

function rgbToCss(rgb) {
  console.log("rgbToCss");
  const css = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  return css;
}

function showHEXValues(hexColor) {
  console.log("showHexValues");
  document.querySelector("#hex").textContent = `HEX: ${hexColor}`;
  document.querySelector(".color_box").style.backgroundColor = hexColor;
}

function showRGBValues(rgb) {
  console.log("showRGBValues");
  document.querySelector(
    "#rgb"
  ).textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function showHSLValues(hsl) {
  console.log("showHSLValues");
  document.querySelector(
    "#hsl"
  ).textContent = `HSL: ${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}
