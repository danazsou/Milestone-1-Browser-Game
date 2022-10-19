const game = document.getElementById('game')

const scoreBoard = document.getElementById('score')

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
},


]


const levels = ['easy', 'medium', 'hard']


function newCategory(category) {

    const column = document.createElement('div')
    column.classList.add('category-column')
    column.innerHTML = category.name
    game.append(column)

    //use api for ease or factor out questions manually for practice? both?hm
    //use below api to loop through levels array using .forEach 
    levels.forEach(level => {
        
        //locally scoped below so okay to use const vs let 
       const card = document.createElement('div')
       card.classList.add('card')
       column.append(card)

       //if statements for point system
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
        //will go with chaining method so i don't have to keep going back to HTML
        //google searched " trvia game api" opentdb was first option
            fetch(`https://opentdb.com/api.php?amount=1&category=${category.id}&difficulty=${level}&type=multiple`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                card.setAttribute('question', data.results[0].question)
                card.setAttribute('answer', data.results[0].correct_answer)
                //added point value below and checked console. it worked. point value shows up in div class
                card.setAttribute('points', card.getInnerHTML())
               
        })

        //set event listener for button event type 'click'
        card.addEventListener('click', flipCard)


    })


}

//create loop for array objects(categories) to pass through newCategory function
category.forEach(category => newCategory(category))

function flipCard() {
    console.log('clicked')


    const textDisplay = document.createElement('div')
    const buttonA = document.createElement('button')
    const buttonB = document.createElement('button')
    const buttonC = document.createElement('button')

    buttonA.innerHTML = 'A'
    buttonB.innerHTML = 'B'
    buttonC.innerHTML = 'C'

    buttonA.addEventListener('click', revealAnswer)
    buttonB.addEventListener('click', revealAnswer)
    buttonC.addEventListener('click', revealAnswer)

    //using js "getAttribute" method to insert question on card
    textDisplay.innerHTML = this.getAttribute('question')

    this.append(textDisplay, buttonA, buttonB, buttonC)

//disable eventlistener bc display repeats after each click
/* followed following example from stack overflow:
 https://stackoverflow.com/questions/4402287/javascript-remove-event-listener :

function myClick(event) {
    click_count++;
    if(click_count == 50) {
       // to remove
       canvas.removeEventListener('click', myClick); 
    }
}

// to add
canvas.addEventListener('click', myClick);
*/
const triviaCards = Array.from(document.querySelectorAll('.card'))
triviaCards.forEach(card => card.removeEventListener('click', flipCard))


}
 //creating function for clicking and showing right or wrong answer
function revealAnswer() {
    const triviaCardButton = this.parentElement
    if((triviaCardButton.getAttribute('answer') === this.innerHTML) {
        console.log('You are right!')
    }
}

    
