// script.js

// Set to store generated numbers
let generatedNumbers = new Set(JSON.parse(localStorage.getItem('generatedNumbers')) || []);

// Admin password (in a real-world scenario, this should be handled more securely)
const adminPassword = 'admin123';

// Function to generate a random number
function generateRandomNumber() {
    // Check if a number is already stored in localStorage for this user
    let storedNumber = localStorage.getItem('userRandomNumber');
    if (storedNumber) {
        document.getElementById('random-number').textContent = storedNumber;
    } else {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 100) + 1; // Adjust the range as needed
        } while (generatedNumbers.has(randomNumber));

        generatedNumbers.add(randomNumber);
        localStorage.setItem('generatedNumbers', JSON.stringify([...generatedNumbers]));
        localStorage.setItem('userRandomNumber', randomNumber);
        document.getElementById('random-number').textContent = randomNumber;
    }
}

// Function to reset the generator with admin authentication
function resetGenerator() {
    const enteredPassword = prompt('Enter admin password:');
    if (enteredPassword === adminPassword) {
        generatedNumbers.clear();
        localStorage.removeItem('generatedNumbers');
        localStorage.removeItem('userRandomNumber');
        document.getElementById('random-number').textContent = '';
        alert('Random number generator has been reset!');
    } else {
        alert('Unauthorized access. Incorrect password.');
    }
}

// Generate a random number when the page loads
window.onload = generateRandomNumber;
