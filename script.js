// Initialize variables
var correctMoves = 0; // Track the number of correct moves
var numDigits = 2; // Initial number of digits
var delayTime = 500; // 0.5 second
var resultTimeout = 1000; // 1 second
var numbers = []; // Array to store random numbers

// Function to generate and display random numbers
function generateAndDisplayNumbers() {
  var gameArea = document.getElementById("gameArea");
  var userInput = document.getElementById("userInput");

  // Generate random numbers
  numbers = generateRandomNumbers(numDigits);

  // Set grid template columns based on the number of digits
  gameArea.style.gridTemplateColumns = "repeat(" + numDigits + ", 80px)";

  // Display random numbers initially
  gameArea.innerHTML = numbers
    .map(function (number) {
      return '<div class="tile">' + number + "</div>";
    })
    .join("");

  // Hide numbers after a delay and display dashes
  setTimeout(function () {
    gameArea.innerHTML = numbers
      .map(function () {
        return '<div class="tile">-</div>';
      })
      .join("");
    userInput.focus();
  }, delayTime);
}

// Function to start the game
function startGame() {
  generateAndDisplayNumbers();

  // Listen for user input
  document.getElementById("userInput").addEventListener("input", checkInput);

  // Reset correctMoves counter
  correctMoves = 0;
}

// Function to reset the game
function resetGame() {
  // Clear game area
  document.getElementById("gameArea").innerHTML = "";
  // Reset input field
  document.getElementById("userInput").value = "";
  // Reset result message
  document.getElementById("result").textContent = "";
  // Reset number of digits
}

// Function to check user input
// Function to check user input
function checkInput() {
    var userInput = document.getElementById("userInput").value.trim();
    var result = document.getElementById("result");
  
    if (userInput.length === numDigits) {
      if (userInput === numbers.join("")) {
        result.textContent = "Correct!";
        correctMoves++;
        console.log("Correct moves:", correctMoves); // Log the number of correct moves
  
        if (correctMoves % 5 === 0) {
          numDigits++; // Increase number of digits every 5 correct moves
          console.log("New number of digits:", numDigits); // Log the new number of digits
          resetGame(); // Reset game with increased difficulty
          startGame(); // Start new game
        } else {
          setTimeout(function () {
            result.textContent = "";
            generateAndDisplayNumbers(); // Display new numbers
          }, resultTimeout);
        }
      } else {
        result.textContent = "Wrong! Try Again";
        setTimeout(function () {
          result.textContent = "";
          resetGame(); // Reset game immediately after wrong move
          startGame(); // Start new game at last difficulty level
        }, resultTimeout);
      }
      // Clear input field after checking
      document.getElementById("userInput").value = "";
    }
  }
  

// Function to generate random numbers
function generateRandomNumbers(numDigits) {
  var numbers = [];
  for (var i = 0; i < numDigits; i++) {
    numbers.push(Math.floor(Math.random() * 10));
  }
  return numbers;
}

// Add event listener to Start Game button
document.getElementById("startBtn").addEventListener("click", startGame);

// Add event listener to Reset Game button
document.getElementById("resetBtn").addEventListener("click", resetGame);
