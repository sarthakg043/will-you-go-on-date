// Function to generate a random position
function getRandomPosition() {
    var screenWidth = window.innerWidth - 200; // Adjust for the element's width
    var screenHeight = window.innerHeight - 120; // Adjust for the element's height

    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    return { x: randomX, y: randomY };
}

// Create a new element and set its position randomly
var randomElement = document.querySelector(".random-element")

// Function to set random position
function setRandomPosition() {
    var position = getRandomPosition();
    randomElement.style.left = position.x + 'px';
    randomElement.style.top = position.y + 'px';
}

// Call the function on hover
randomElement.addEventListener('mouseover', setRandomPosition);

// Email sending Client-side code
document.getElementById('dateForm').addEventListener('submit', sendToServer);

function sendToServer(event) {
    event.preventDefault();
    // Check if the browser supports the Fullscreen API
    if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
        // Function to enter full screen
        function enterFullscreen(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) { /* Safari */
                element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) { /* Firefox */
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) { /* IE/Edge */
                element.msRequestFullscreen();
            }
        }

        // Call the function to enter full screen
        const element = document.body; // Full screen for the entire document
        enterFullscreen(element);
    } else {
        console.error('Fullscreen mode is not supported in this browser.');
    }
    // Perform an AJAX request to the server to trigger email sending

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data)

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            
        }
        return response.json();
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Optionally, provide user feedback that the email has been sent
        console.log(data)
    })
    .catch(error => {
        // Optionally, provide user feedback about the error
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Button initial positioning code

// Get the width of the container
const buttonContainer = document.querySelector('.button-container');
const containerWidth = buttonContainer.offsetWidth;

// Set the translate-x value for children
const children = document.querySelectorAll('.button');
children.forEach(child => {
  child.style.setProperty('--translate-x', `${containerWidth / 2}px`);
});

// Howler.js starts here
// Howler Js starts here
var bgmusic = new Howl({
    src: ["music.mp3"],
    // The above audio is taken from https://www.youtube.com/watch?v=kBsUwIfL8kU
    preload: true,
    onload: function(){
        console.log("Music has loaded");
    },
    onloaderror: function(){
        console.log("Music can't be loaded");
    },
    onplay: function(){
        console.log("Music has started");
    },
    onplayerror: function(){
        console.log("Music can't be played");
    },
    autoplay: true,
    volume: 1,
    loop: true,
    onend: function(){
        console.log("Music ended");
    }	
  });

// Emoji Background
window.onload = function() {
    let emojiElements = []; // Array to store references to the appended emojis
    function getR() {
        var W = window.innerWidth;
        var H = window.innerHeight;
        var randomTop = Math.floor(Math.random() * (H-80) ); 
        var randomLeft = Math.floor(Math.random() * (W-80) );
        var listEmojis = ["💋","💋","💋","💋","😘","😍","♥️","❤️","💕","💖","⭐️","💏","🎁"];
        var nbrRandom = Math.floor(Math.random() * listEmojis.length );
        var newSpan = document.createElement("span");
        newSpan.textContent = listEmojis[nbrRandom] ;
        newSpan.className = "floating-icons title-icon";
        newSpan.style.top = randomTop + "px";
        newSpan.style.left = randomLeft + "px";
        document.body.appendChild(newSpan);

        emojiElements.push(newSpan); // Add the new emoji element to the array
        // Check if the number of appended emojis exceeds the limit (30)
        if (emojiElements.length > 100) {
            // Remove the oldest emoji from the DOM and the array
            const oldestEmoji = emojiElements.shift();
            oldestEmoji.remove();
        } 
      }	
      window.setInterval(getR, 100);
     
}