document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");
    const container = document.querySelector(".cards-selection");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    
    container.addEventListener("scroll", function(event) {
        event.preventDefault();
        return false;
    });

    function scrollToNext() {
        let nextCardIndex = getCurrentIndex() + 1;
        if (nextCardIndex >= cards.length) {
            nextCardIndex = cards.length - 1;
        }
        const scrollLeft = cards[nextCardIndex].offsetLeft - (container.offsetWidth - cards[nextCardIndex].offsetWidth) / 2;
        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth"
        });
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(getCurrentIndex());
            }, 500); // Adjust the timeout as needed to ensure scrolling completes before getting the index
        });
    }

    function scrollToPrevious() {
        let prevCardIndex = getCurrentIndex() - 1;
        if (prevCardIndex < 0) {
            prevCardIndex = 0;
        }
        const scrollLeft = cards[prevCardIndex].offsetLeft - (container.offsetWidth - cards[prevCardIndex].offsetWidth) / 2;
        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth"
        });
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(getCurrentIndex());
            }, 500); // Adjust the timeout as needed to ensure scrolling completes before getting the index
        });
    }

    function getCurrentIndex() {
        const centerScroll = container.scrollLeft + container.offsetWidth / 2;
        let currentIndex = 0;
        cards.forEach((card, index) => {
            if (card.offsetLeft <= centerScroll && card.offsetLeft + card.offsetWidth >= centerScroll) {
                currentIndex = index;
                return;
            }
        });
        return currentIndex;
    }

    nextButton.addEventListener("click", async () => {
        const currentIndex = await scrollToNext() - 2;
        console.log("Next - Current index:", currentIndex);
    });

    prevButton.addEventListener("click", async () => {
        const currentIndex = await scrollToPrevious() - 2;
        console.log("Previous - Current index:", currentIndex);
    });
});
