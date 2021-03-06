let score = 0
let current = 0
let time = 75
let timer
let questions = [
  {
    question: 'Commonly used data types DO NOT include:',
    choices: ['Strings', 'Booleans', 'Alerts', 'Numbers'],
    answer: 'Alerts'
  },
  {
    question: 'The condition in an if / else statement is enclosed within ______.',
    choices: ['Quotes', 'Curly brackets', 'Parentheses', 'Square brackets'],
    answer: 'Parentheses'
  },
  {
    question: 'Arrays in Javascript can be used to store _____.',
    choices: ['Numbers & Strings', 'Other Arrays', 'Booleans', 'All of the Above'],
    answer: 'All of the Above'
  },
  {
    question: 'String values must be enclosed within _____ when being assigned to variables.',
    choices: ['Commas', 'Curly brackets', 'Quotes', 'Parentheses'],
    answer: 'Quotes'
  },
]

const endGame = () => {
  document.getElementById('question').innerHTML = ''
  document.getElementById('result').textContent = `Score: ${score}`
  document.getElementById('scoreForm').className = ''
  document.getElementById('quizHead').innerHTML = `
    <h1>All done!</h1>

  `
}

const renderQuestion = () => {
  document.getElementById('question').innerHTML = ''
  let qElem = document.createElement('div')
  qElem.innerHTML = `
          <h3>Question: ${questions[current].question}</h3>
          <ol class="list-group">
            <li 
            class="list-group-item choice purple darken-4 text-white"
            data-value="${questions[current].choices[0]}">
              ${questions[current].choices[0]}
            </li>
            <li 
            class="list-group-item choice purple darken-4 text-white"
            data-value="${questions[current].choices[1]}">
              ${questions[current].choices[1]}
            </li>
            <li 
            class="list-group-item choice purple darken-4 text-white"
            data-value="${questions[current].choices[2]}">
              ${questions[current].choices[2]}
            </li>
            <li
            class="list-group-item choice purple darken-4 text-white"
            data-value="${questions[current].choices[3]}">
              ${questions[current].choices[3]}
            </li>
          </ul>
        `
  document.getElementById('question').append(qElem)
}
document.getElementById('startQuiz').addEventListener('click', () => {
  document.getElementById('quizHead').innerHTML = ''
  document.getElementById('startQuiz').classList.add("hidden")
  timer = setInterval(() => {
    document.getElementById('time').textContent = `Time Left: ${time} sec`
    time--
    if (time < 0) {
      endGame()
      clearInterval(timer)
    }
  }, 1000)
  renderQuestion()
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('choice')) {
    if (event.target.dataset.value === questions[current].answer) {
      score++
      document.getElementById('rightWrong').innerHTML = 'Right!'
      setTimeout(function () {
        document.getElementById('rightWrong').innerHTML = ''
      }, 1500)
    } else {
      time -= 10
      document.getElementById('rightWrong').innerHTML = 'Wrong!'
      setTimeout(function () {
        document.getElementById('rightWrong').innerHTML = ''
      }, 1500)
    }
    current++

    if (current >= questions.length) {
      endGame()
      clearInterval(timer)
    } else {
      renderQuestion()
    }
  }
})

let scores = JSON.parse(localStorage.getItem('scores')) || []

function highScore() {
  document.getElementById('question').innerHTML = ''
  let tableElem = document.createElement('table')
  tableElem.className = 'table'
  tableElem.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Initials</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      `

  for (let i = 0; i < scores.length; i++) {
    let tableBody = document.createElement('tbody')
    tableBody.innerHTML += `
    <tr>
    <td>${scores[i].initials}</td>
    <td>${scores[i].score}</td>
    </tr>
    `
    tableElem.append(tableBody)
  }
  document.getElementById('question').append(tableElem)
}

document.getElementById('submitScore').addEventListener('click', event => {
  event.preventDefault()
  document.getElementById('quizHead').innerHTML = `
    <h1>High Scores</h1>
  `
  document.getElementById('scoreForm').className = 'hidden'
  let initials = document.getElementById('initials').value
  scores.push({ initials, score })
  localStorage.setItem('scores', JSON.stringify(scores))

  scores.sort((a, b) => b.score - a.score)
  highScore()

  // Clear Button
  function clear() {
    document.getElementById('question').innerHTML += `<button id="clear">Clear Scores</button>`
    document.getElementById('clear').addEventListener('click', event => {
      localStorage.clear();
    })
  }
  clear()


  // Restart Button
  document.getElementById('question').innerHTML += `<button id="replay">Replay</button>`

  document.getElementById('replay').addEventListener('click', event => {
    document.getElementById('quizHead').innerHTML = `
    <h1 class="display-4 my-4">Coding Quiz Challenge</h1>
      <p class="lead">Try to answer the following code-related questions within the time limit.<br />Keep in mind that the incorrect answers will penalize your score/time by 10 seconds!</p>
      <p>You have 75 seconds to start.</p>`
    document.getElementById('startQuiz').classList.remove("hidden")
    document.getElementById('question').innerHTML = ''
  })

})

document.getElementById('viewScores').addEventListener('click', event => {
  event.preventDefault()
  document.getElementById('quizHead').innerHTML = `
    <h1>High Scores</h1>
  `
  highScore()
})