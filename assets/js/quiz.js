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
  document.getElementById('startQuiz').remove()
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
    } else {
      time -= 10
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

document.getElementById('submitScore').addEventListener('click', event => {
  event.preventDefault()
  let initials = document.getElementById('initials').value
  let scores = JSON.parse(localStorage.getItem('scores')) || []
  scores.push({ initials, score })
  localStorage.setItem('scores', JSON.stringify(scores))

  scores.sort((a, b) => b.score - a.score)

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
  let tableBody = document.createElement('tbody')

  for (let i = 0; i < scores.length; i++) {
    tableBody.innerHTML += `
          <tr>
            <td>${scores[i].initials}</td>
            <td>${scores[i].score}</td>
          </tr>
        `
  }

  tableElem.append(tableBody)
  document.getElementById('question').append(tableElem)
})