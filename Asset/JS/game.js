window.onload = function () {
    const hardBoxesContainer = document.getElementById("hard-boxes");
    const eazyBoxesContainer = document.getElementById("eazy-boxes");
    const welcomeContainer = document.getElementById("welcome");
    const timerContainer = document.getElementById("timer");
    const livesContainer = document.getElementById("lives");
    const scoreContainer = document.getElementById("scores");
    const highScoreContainer = document.getElementById("highscore");
    const gameOverContainer = document.getElementById("game-over");
    const startBtn = document.getElementById("btn-start");
    const hardBox = document.querySelectorAll(".boxH");
    const eazyBox = document.querySelectorAll(".boxE");
    const eazyBtn = document.getElementById("btn-eazy");
    const hardBtn = document.getElementById("btn-hard");
  
    const arrayWord = ["green", "red", "yellow", "blue", "grey", "pink"];
  
    let timer = 31;
    let lives = 3;    // this is for the lives function
    let score = 0;    // this is for the score function
    let highScore = 0; // this is to update the highscore in the score function
    let highScoreBrowser = localStorage.getItem("highScore");
    if (highScoreBrowser != undefined){
        // this code will prevent high score from displaying a null value
        highScore = highScoreBrowser;
    }
    highScoreContainer.innerText = `High Score : ${highScore}`;
    let correctColor; // this is the color from the randomColor function
    let difficulty;

    // eazy button
    eazyBtn.addEventListener("click", (event) => {
      event.preventDefault();
      // disable eazy button
      startBtn.disabled = false;
      eazyBtn.disabled = true;
      hardBtn.disabled = false;
      difficulty = "eazy";
      console.log(difficulty);
      // hides the welcome screen using the hidecontainer function
      hideContainer(welcomeContainer);
      hideContainer(hardBoxesContainer);
      // shows the 3 panels using the showcontainer function
      showContainer(eazyBoxesContainer);
    });
    // hard button
    hardBtn.addEventListener("click", (event) => {
      event.preventDefault();
      // disable eazy button
      startBtn.disabled = false;
      hardBtn.disabled = true;
      eazyBtn.disabled = false;
      difficulty = "hard";
      console.log(difficulty);
      // hides the welcome screen using the hidecontainer function
      hideContainer(welcomeContainer);
      hideContainer(eazyBoxesContainer);
      // shows the 6 panels using the showcontainer function
      showContainer(hardBoxesContainer);
    });
    // start button
    startBtn.addEventListener("click", (event) => {
      event.preventDefault();
      // disables the start button
      startBtn.disabled = true;
      startGame();
    });
  

    function startGame() {
      randomGenerator();
      randomColor();
      checkCorrectAnswer();
      // disables all the buttons  
      startBtn.disabled = true;
      eazyBtn.disabled = true;
      hardBtn.disabled = true;
      // this code will start a timer countdown  
      timerContainer.hidden = false;
      let timerInterval = setInterval(function () {
        timer -= 1;
        if (timer == 0) {  
          clearInterval(timerInterval);
          // hide the hard or eazy panels
          hideContainer(timerContainer);
          hideContainer(hardBoxesContainer);
          hideContainer(eazyBoxesContainer);
          // display the gameover screen
          showContainer(gameOverContainer);
        }
        timerContainer.innerHTML = "time left : " + timer;
      }, 1000);
    }
  
    function randomGenerator() {
      randomPanel();
      randomColor();

      let randomWord;
      if (difficulty == "eazy") {
        // if difficulty is set to eazy, then randomly 
        // choose a value from the first 3 element from the array arrayWord
        randomWord = Math.floor(Math.random() * (arrayWord.length - 3));
      } else {
        // if difficulty is set to hard, then randomly 
        // choose a value from the first 6 element from the array arrayWord
        randomWord = Math.floor(Math.random() * arrayWord.length);
      }
      console.log(arrayWord[randomWord]);
      // change the innerHTML to a random word for array arrayWord
      let color = document.getElementsByClassName("color");
      color[0].innerText = arrayWord[randomWord];
  
      // set the color style to the correct color from the randomColor function
      color[0].style.color = correctColor;
      console.log(correctColor);
    }
  
    function randomPanel() {
      // this code will shuffle the array from arrayWord  
      arrayWord.sort((a, b) => 0.5 - Math.random());
      if (difficulty == "hard") {
        // if difficulty is set to hard
        hardBox.forEach((panel, index) => {
          // add id attribute to every button in hardBox
          // asign the id name based on the arrayWord value  
          // this value will always be random because we shuffle the position of the array
          panel.id = arrayWord[index];
          // set the hardBox color to the arrayWord value
          panel.style.backgroundColor = arrayWord[index];
        });
      } else {
          // if difficulty is set to eazy
        eazyBox.forEach((panel, index) => {
          // add id attribute to every button in eazyBox
          // asign the id name based on the arrayWord value  
          panel.id = arrayWord[index];
          // asign the id name based on the arrayWord value
          panel.style.backgroundColor = arrayWord[index];
        });
      }
    }
  
    function checkCorrectAnswer() {
      if (difficulty == "hard") {
          // if difficulty is set to hard
        hardBox.forEach((panel) => {
          // add eventListener to every boxH panel
          panel.addEventListener("click", (event) => { 
            if (event.target.id == correctColor) {
              // if the boxH panels id name matches the correctColor  
              // then execute the updateScore function
              // this will increment the score by 1
              updateScore();
            } else {
              // if the boxH panels id name does not matches the correctColor  
              console.log("Wrong color");
              if (lives == 0) {
                // if lives is 0
                console.log("lives = 0");
                // use the hideContainer function to hide the hardBox panels and the timer
                hideContainer(hardBoxesContainer);
                hideContainer(timerContainer);
                // use the showContainer function to show the gameover screen
                showContainer(gameOverContainer);
              } else {
                // this function will decrement the lives by 1  
                updateLives();
              }
            }
          });
        });
        // select a new batch of colors and word
        randomGenerator();
      } else {
          // if difficulty is set to hard
        eazyBox.forEach((panel) => {
            // add eventListener to every boxE panel
          panel.addEventListener("click", (event) => {
            if (event.target.id == correctColor) {
              // if the boxE panels id name matches the correctColor  
              // then execute the updateScore function
              // this will increment the score by 1
              updateScore();
            } else {
              // if the boxE panels id name does not matches the correctColor  
              console.log("Wrong color");
              if (lives == 0) {
              // if lives is 0
                console.log("lives = 0");
              // use the hideContainer function to hide the eazyBox panels and the timer
                hideContainer(eazyBoxesContainer);
                hideContainer(timerContainer);
              // use the showContainer function to show the gameover screen
                showContainer(gameOverContainer);
              } else {
              // this function will decrement the lives by 1  
                updateLives();
              }
            }
          });
        });
        // select a new batch op colors and word
        randomGenerator();
      }
    }
  
    function randomColor() {
      if (difficulty == "eazy") {
        // if difficulty is set to eazy
        // then set the correctColor to a random value from the array arrayWord
        // this also reduces the array to only the 3 first values  
        correctColor = arrayWord[Math.floor(Math.random() * (arrayWord.length - 3))];
      } else {
        // if difficulty is set to hard
        // then set the correctColor to a random value from the array arrayWord
        correctColor = arrayWord[Math.floor(Math.random() * arrayWord.length)];
      }
    }
  
    function updateScore() {
      // when choosing the correctColor
      // increment score by one
      // also change the innerHTML to the score variable 
      score++;
      scoreContainer.innerText = `Current Score : ${score}`;
      if(score > highScore){
          // if score is biger then highscore
          // the change the highscore variable to score
          highScore = score;
          // using local storage to save the highscore value
          localStorage.setItem("highScore", highScore);
          highScoreContainer.innerText = `High Score : ${highScore}`;
    }
      // select a new batch op colors and word
      randomGenerator();
    }
  
    function updateLives() {
      // when choosing the  wrong Color
      // decrement lives by one
      // also change the innerHTML to the lives variable 
      console.log("Minus 1 live");
      lives--;
      livesContainer.innerText = `Lives : ${lives}`;
      // select a new batch op colors and word
      randomGenerator();
    }
  
    function showContainer(container) {
      // this function will change the display to block  
      container.style.display = "block";
    }
  
    function hideContainer(container) {
      // this function will change the display to none 
      container.style.display = "none";
    }
  };
  