const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let score = 0


//creating  an object array to create different categories/columns using category id number in API

/* refferred tp stackoverflow for making array for category:
https://stackoverflow.com/questions/62781078/create-api-for-multidimensonal-array-using-category-subcategory-and-further-sub

*/
const category = [
    {
        name: 'Science and Nature',
     id: 17
    },
    {
        name: 'Video Games',
        id: 15
    },
    {
        name: 'Geography',
    id: 22
    },
    {
      name:'Computer Science',
    id: 18
    }
]

const levels = ['easy', 'medium', 'hard']

function newCategory(category) {
    //refferred to mdn for js methods 
    const column = document.createElement('div')
    column.classList.add('category-column')
    //add columns with .append to create columns for different game category
    column.innerHTML = category.name
    game.append(column)

     //use api for ease or factor out questions manually for practice? both?hm
    //use below api to loop through levels array using .forEach 
    levels.forEach(level => {

        //locally scoped below so okay to use const vs let 
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (level === 'easy') {
            card.innerHTML = 100
        }
        if (level === 'medium') {
            card.innerHTML = 200
        }
        if (level === 'hard') {
            card.innerHTML = 300
        }


         //will console log the data to see if api loops correctly
        //will go with chaining methods so i don't have to keep going back to HTML
        // reffered to mdn for chaining methods and syntax : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
      // reffered to youtube tutorial for setAttribute : https://www.youtube.com/watch?v=V0S0LXvnW-o
  
        fetch(`https://opentdb.com/api.php?amount=1&category=${category.id}&difficulty=${level}&type=boolean`)
            .then(response => response.json())
            .then(data => {
           
                console.log(data)
                card.setAttribute('data-question', data.results[0].question)
                card.setAttribute('data-answer', data.results[0].correct_answer)

                 //added points value below and checked console. it worked. point value shows up in div class
                card.setAttribute('points-value', card.getInnerHTML())
            })
            .then(done => card.addEventListener('click', showCardInfo))

    })
}
category.forEach(category => newCategory(category))


function showCardInfo() {
    this.innerHTML = ''
    this.style.fontSize = '15px'
    const textDisplay = document.createElement('div')
    const trueButton = document.createElement('button')
    const falseButton = document.createElement('button')

    trueButton.innerHTML = 'True'
    falseButton.innerHTML = 'False'

    trueButton.classList.add('true-button')
    falseButton.classList.add('false-button')

    trueButton.addEventListener('click', getResult)
    falseButton.addEventListener('click', getResult)
    
    textDisplay.innerHTML = this.getAttribute('data-question')
    this.append(textDisplay, trueButton, falseButton)

     //below code will stop repetitive display of card text display when clicking
    const triviaCards = Array.from(document.querySelectorAll('.card'))
    //console.log(triviacards)  -- make sure it was catching all div cards
    triviaCards.forEach(card => card.removeEventListener('click', showCardInfo))
}

function getResult() {
    const triviaCards = Array.from(document.querySelectorAll('.card'))
    triviaCards.forEach(card => card.addEventListener('click', showCardInfo))

 //refferal for using parent child elements in Js that I used :
    //https://www.youtube.com/watch?v=7kW6DByQPkw & https://stackoverflow.com/questions/16302045/finding-child-element-of-parent-with-javascript

    const triviaCardButton = this.parentElement
    if (triviaCardButton.getAttribute('data-answer') === this.innerHTML) {
        score = score + parseInt(triviaCardButton.getAttribute('points-value'))
        scoreDisplay.innerHTML = score
        triviaCardButton.classList.add('correct-answer')
        setTimeout(() => {
            while (triviaCardButton.firstChild) {
                triviaCardButton.removeChild(triviaCardButton.lastChild)
            }
            triviaCardButton.innerHTML = triviaCardButton.getAttribute('points-value')
        }, 100)
    } else {
        triviaCardButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (triviaCardButton.firstChild) {
                triviaCardButton.removeChild(triviaCardButton.lastChild)
            }
            triviaCardButton.innerHTML = 0
        }, 100)
    }
    triviaCardButton.removeEventListener('click',showCardInfo)
}