import { useEffect } from "react";
import "./background.css";

const Background = () => {
  useEffect(() => {
    const svg = document.getElementById("svg");
    if (!svg) return;

    console.log(1);

    const squareSize = 16;
    const colors = [
      "#ffd100",
      "#34657f",
      "#7ba7bc",
      "#ff6a13",
      "#a7a8aa",
      "#101820",
    ];

    const setup = () => {
      let squareSmash;
      window.clearInterval(squareSmash);
      svg.innerHTML = "";
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const squaresInX = Math.floor(windowWidth / squareSize + 1);
      const squaresInY = Math.floor(windowHeight / squareSize + 1);
      svg.setAttribute("viewBox", `0 0 ${windowWidth} ${windowHeight}`);

      const createRandomSquare = () => {
        const fillStyle = colors[Math.floor(Math.random() * colors.length)];
        const svgns = "http://www.w3.org/2000/svg";
        const parentSVG = document.createElementNS(svgns, "svg");
        const rect = document.createElementNS(svgns, "rect");
        const randomCol = Math.floor(Math.random() * squaresInX);
        const randomRow = Math.floor(Math.random() * squaresInY);
        const sizeRoll = Math.floor(Math.random() * 100);
        let sizeMultiplier = 1;
        if (sizeRoll > 89) sizeMultiplier = 2;
        if (sizeRoll > 96) sizeMultiplier = 3;
        rect.setAttribute("height", squareSize * sizeMultiplier);
        rect.setAttribute("width", squareSize * sizeMultiplier);
        rect.setAttribute("x", "100%");
        rect.setAttribute("y", "100%");
        rect.setAttribute("fill", fillStyle);
        parentSVG.setAttribute("height", squareSize * sizeMultiplier);
        parentSVG.setAttribute("width", squareSize * sizeMultiplier);
        parentSVG.setAttribute(
          "viewBox",
          `0 0 ${squareSize * sizeMultiplier} ${squareSize * sizeMultiplier}`
        );
        parentSVG.setAttribute("x", randomCol * squareSize);
        parentSVG.setAttribute("y", randomRow * squareSize);
        rect.style.animationName = `fade_in_out`;
        rect.style.animationDuration = `${
          Math.floor(Math.random() * 10000) + 5000
        }ms`;
        rect.style.animationDelay = `${
          Math.floor(Math.random() * 10000) - 5000
        }ms`;
        parentSVG.appendChild(rect);
        svg.appendChild(parentSVG);
      };

      for (let i = 0; i < (squaresInY * squaresInX) / 7; i++) {
        createRandomSquare();
      }
    };

    setup();
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("resize", setup);
    };
  }, []);

  return <svg id="svg"></svg>;
};

export default Background;
