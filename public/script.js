// Function to generate a random position
function getRandomPosition() {
    var screenWidth = window.innerWidth - 50; // Adjust for the element's width
    var screenHeight = window.innerHeight - 50; // Adjust for the element's height

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
document.getElementById('sendEmailButton').addEventListener('click', function() {
    // Perform an AJAX request to the server to trigger email sending
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
    .then(response => response.json())
    .then(data => {
        // Optionally, provide user feedback that the email has been sent
    })
    .catch(error => {
        // Optionally, provide user feedback about the error
    });
});