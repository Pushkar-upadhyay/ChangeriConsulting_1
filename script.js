// Custom Search Script
function searchFunction(event) {
    event.preventDefault(); // Prevent form from submitting
    const searchQuery = document.getElementById("searchInput").value.toLowerCase().trim(); // Trim whitespace

    // Redirects based on search query
    if (!searchQuery) {
        displayMessage("Please enter a search term."); // Display a message for empty input
        return;
    }

    switch (true) {
        case searchQuery.includes("services"):
            window.location.href = "#servicesDropdown"; // Adjust to the correct ID or URL
            break;
        case searchQuery.includes("industries"):
            window.location.href = "#industriesDropdown"; // Adjust to the correct ID or URL
            break;
        case searchQuery.includes("careers"):
            window.location.href = "#careersDropdown"; // Adjust to the correct ID or URL
            break;
        case searchQuery.includes("contact"):
            window.location.href = "MainFolder/contactfolder/index.html"; // Adjust to the correct path
            break;
        default:
            displayMessage("No match found. Please try again."); // Display a message for no match
            break;
    }
}

// Function to display messages to the user
function displayMessage(message) {
    const messageBox = document.getElementById("messageBox");
    if (!messageBox) return; // Ensure the message box exists
    messageBox.textContent = message; // Set the message text
    messageBox.style.display = "block"; // Show the message box
    setTimeout(() => {
        messageBox.style.display = "none"; // Hide the message after 3 seconds
    }, 3000);
}

// Select the element where the background animation will be placed
const bgAnimation = document.getElementById("bgAnimation");
if (bgAnimation) {
    // Define the number of color boxes to create
    const numberOfColorBoxes = 400;

    // Loop to create and append color boxes
    for (let i = 0; i < numberOfColorBoxes; i++) {
        const colorBox = document.createElement("div");
        colorBox.classList.add("colorBox"); // Add the class 'colorBox'
        bgAnimation.append(colorBox); // Append the color box
    }
}

// Observer for 'Change Changeri' section
const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 } // When 20% of the section is visible
);

// Start observing the Change Changeri section
const changeSection = document.querySelector(".change-chang");
if (changeSection) {
    observer.observe(changeSection);
}

// JavaScript to add the 'scroll-animation' class dynamically
document.addEventListener("DOMContentLoaded", () => {
    // Select all elements for the scroll animation
    const elements = document.querySelectorAll("body *");

    elements.forEach((el) => {
        // Add the 'scroll-animation' class except for ignored elements
        if (!el.classList.contains("navbar") && !el.closest("footer")) {
            el.classList.add("scroll-animation");
        }
    });

    // Observer to add 'visible' class when elements come into view
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });

    // Observe all elements with the 'scroll-animation' class
    document.querySelectorAll(".scroll-animation").forEach((el) => scrollObserver.observe(el));
});

let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// Config params
let countItem = items.length;
let itemActive = 0;

// Event next click (manual navigation)
next.onclick = function() {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
}

// Event prev click (manual navigation)
prev.onclick = function() {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
}

// Auto-run slider (auto-play feature)
let refreshInterval = setInterval(() => {
    next.click(); // Trigger next slide automatically every 5 seconds
}, 5000);

// Function to show slider and update active state
function showSlider() {
    // Remove active class from the old item
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // Activate new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // Clear auto-play timer and reset it
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click(); // Auto move to the next slide every 5 seconds
    }, 5000);
}

// Adjust thumbnail position based on visibility
function setPositionThumbnail() {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();

    // Ensure the active thumbnail is always visible
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// Click on thumbnail to navigate to the corresponding slider item
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});

// Initial call to set the first slider item as active
showSlider();


