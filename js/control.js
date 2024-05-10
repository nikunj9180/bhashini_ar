import { scrollToNext,scrollToPrevious } from "./snap-scroll.js";
import { fetchProductData } from "./product_data.js";

const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

fetchProductData(0);

var currentIndex=0;
nextButton.addEventListener("click", async () => {
    currentIndex = await scrollToNext() - 2;
    fetchProductData(currentIndex);
});

prevButton.addEventListener("click", async () => {
    currentIndex = await scrollToPrevious() - 2;
    fetchProductData(currentIndex);
});