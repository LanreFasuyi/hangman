window.onload = function () {
  const wordList = [
    "Programming",
    "Computer",
    "Table",
    "Chair",
    "Window",
    "Car",
    "Asphalt",
    "Building",
    "Bus",
    "Phone",
    "Time",
    "Frame",
    "Travel",
    "School",
    "Bag",
    "Airplane",
    "Fork",
    "Knife",
    "Roof",
    "Floor",
    "Wheel",
    "Tire",
    "Game",
    "Developer",
    "Message",
    "Hangman",
    "Flag",
    "Language",
    "Tree",
    "Leaf",
    "Summer",
    "Winter",
    "Fall",
    "spring",
  ];

  let selectedWord = null;

  const alphabet_buttons = document.getElementById("alphabet_buttons");

  const startButton = document.getElementById("start-btn");
  const resetButton = document.getElementById("reset-btn");
  resetButton.disabled = true;
  const counterDisplay = document.getElementById("counter-display");

  const wordDisplay = document.getElementById("wordDisplay");

  wordDisplay.style.display = "none";

  let maxCount = 6;
  let mistakes = 0;

  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const alphabets = letters.map((l) => {
    const letter = document.createElement("button");
    letter.classList.add("btn", "btn-info", "btn-lg", "px-2", "m-2");
    letter.innerText = l;
    letter.setAttribute("data-value", l);

    letter.addEventListener("click", function (e) {
      handleClick(e);
    });
    return letter;
  });

  alphabet_buttons.style.display = "none";

  const feedback = document.getElementById("feedback");
  const handleClick = (event) => {
    const dataValue = event.target.getAttribute("data-value").toLowerCase();

    checkMatch(dataValue);
    // console.log("Data Value:", dataValue);
  };

  const handleStart = (event) => {
    // when game starts

    alphabet_buttons.style.display = "block";

    removeAllChildren(wordDisplay);
    toggleStartReset();
    renderCounterDisplay(maxCount);
    initGame();
  };

  function removeAllChildren(node) {
    // Get parent element
    const parentElement = node;

    // Remove all child nodes
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  }

  function toggleStartReset() {
    startButton.disabled = !startButton.disabled;
    resetButton.disabled = !resetButton.disabled;
  }
  function renderCounterDisplay(count) {
    counterDisplay.style.display = "block";
    wordDisplay.style.display = "block";

    const p = document.createElement("p");

    p.classList.add("lead");
    p.innerText = `Game Started! \n`;
    const s = document.createElement("small");
    s.classList.add("text-right");
    s.innerText = `You have only ${count} attempts`;
    p.append(s);
    const firstChild = counterDisplay.firstChild;

    counterDisplay.removeChild(firstChild);
    counterDisplay.append(p);
  }
  const initGame = () => {
    // generate a random word from list
    selectedWord = Math.floor(Math.random() * wordList.length);

    console.log(wordList[selectedWord]);

    selectedWord = wordList[selectedWord];
    selectedWord = selectedWord.toLowerCase().split("");
    renderWordCrypt(selectedWord);
  };

  const renderWordCrypt = (word, valueIndex = null) => {
    console.log({ word, valueIndex });
    const output = [];
    if (valueIndex === null) {
      for (let i = 0; i < word.length; i++) {
        const span = document.createElement("span");
        span.classList.add("letter-item", "password-like", "fake-bullet");

        span.innerText = word[i];
        output.push(span);
      }
      output.forEach((l) => {
        wordDisplay.appendChild(l);
      });
    } else {
      const spans = wordDisplay.querySelectorAll("span");

      spans.forEach(function (element, index) {
        if (valueIndex === index) {
          element.classList.remove("password-like", "fake-bullet");
        }
      });
    }
  };

  const handleReset = (event) => {
    const dataValue = event.target.getAttribute("data-value");
    mistakes = 0;

    updateHangmanPicture(mistakes);

    toggleStartReset();
  };

  const checkMatch = (letter) => {
    console.log(letter);
    letter = letter.toLowerCase();
    console.log({ selectedWord });
    // check if letter exists in the matched word
    if (selectedWord.includes(letter)) {
      selectedWord.map((item, index) => {
        if (item === letter) {
          console.log("FOUND");
          renderWordCrypt(selectedWord, index);
        }
      });
    } else {
      maxCount--;
      mistakes++;
      renderCounterDisplay(maxCount);
      updateHangmanPicture(mistakes);
    }
  };

  // Loop through the array and append each button
  alphabets.forEach((button) => {
    alphabet_buttons.appendChild(button);
  });

  function updateHangmanPicture(mistakes) {
    if (mistakes < 6) {
      document.getElementById("hangmanPic").src =
        "./images/" + mistakes + ".jpg";
    } else {
      alphabet_buttons.style.display = "none";

      const text = "You Lost!";

      renderText(text, feedback);
    }
  }

  function renderText(text, node) {
    const h = document.createElement("h2");
    h.classList.add("text-danger", "text-center");
    h.innerText = text;

    node.append(h);
  }
  function checkIfGameWon() {
    // game is won is all
    if (wordStatus === answer) {
      document.getElementById("keyboard").innerHTML = "You Won!!!";
    }
  }

  startButton.addEventListener("click", handleStart);
  resetButton.addEventListener("click", handleReset);
};
