const game = document.getElementById('game')

const scoreBoard = document.getElementById('score')


const scienceNature = 11
const levels = ['easy', 'medium', 'hard']


function newCategory() {

    const column = document.createElement('div')
    column.classList.add('genre-column')
    column.innerHTML = 'new category'
    game.append(column)

    //use api for ease or factor out questions manually for practice? both?hm
    //use below api to loop through levels array using .forEach 
    levels.forEach(level => {
        
        //locally scoped below so okay to use const
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

      



        //will cosole log the data to see if api loops correctly
        //will go with chaining method so i don't have to keep going back to HTML
            fetch(`https://opentdb.com/api.php?amount=1&category=17&difficulty=${level}&type=multiple`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                card.setAttribute('data-question', data.results[0].question)
                card.setAttribute('data-answer', data.results[0].correct_answer)
                //added point value below and checked console. it worked. point value shows up in div class
                card.setAttribute('data-value', card.getInnerHTML())
            
                
             
        })
    })


}

newCategory()
