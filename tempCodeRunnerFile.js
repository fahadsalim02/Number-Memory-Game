// Add event listener to Start Game button
document.getElementById("startBtn").addEventListener("click", startGame);

var correctMoves = 0; // Track the number of correct moves
var numDigits = 2; // Initial number of digits
var delayTime = 1000; // 1 second
var resultTimeout = 2000; // 2 seconds

function startGame() {
  var gameArea = document.getElementById("gameArea");
  var userInput = document.getElementById("userInput");
  var result = document.getElementById("result");
  var numbers = generateRandomNumbers(numDigits);

  // Set grid template columns based on the number of digits
  gameArea.style.gridTemplateColumns = "repeat(" + numDigits + ", 80px)";

  // Display random numbers initially
  gameArea.innerHTML = numbers
    .map(function (number) {
      return '<div class="tile">' + number + "</div>";
    })
    .join("");

  // Hide numbers after 1 second and display dashes
  setTimeout(function () {
    gameArea.innerHTML = numbers
      .map(function () {
        return '<div class="tile">-</div>';
      })
      .join("");
    userInput.focus();
  }, delayTime);

  // Listen for user input
  userInput.addEventListener("input", function () {
    var inputText = userInput.value.trim();

    if (inputText.length === numDigits) {
      if (inputText === numbers.join("")) {
        result.textContent = "Correct!";
        userInput.value = ""; // Clear input field
        correctMoves++;
        if (correctMoves % 3 === 0) {
          numDigits++; // Increase number of digits every 3 correct moves
          gameArea.style.gridTemplateColumns =
            "repeat(" + numDigits + ", 80px)";
        }
        setTimeout(function () {
          result.textContent = "";
          startGame(); // Start new game
        }, resultTimeout);
      } else {
        result.textContent = "Wrong! Try Again";
        userInput.value = ""; // Clear input field
        setTimeout(function () {
          result.textContent = "";
        }, resultTimeout);
      }
    }
  });
}

// Function to generate random numbers
function generateRandomNumbers(numDigits) {
  var numbers = [];
  for (var i = 0; i < numDigits; i++) {
    numbers.push(Math.floor(Math.random() * 10));
  }
  return numbers;
}
