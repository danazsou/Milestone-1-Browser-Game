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


        //will cosole log the data to see if api loops correctly
            fetch(`https://opentdb.com/api.php?amount=1&category=17&difficulty=${level}&type=multiple`)
            .then(response => response.json())
            .then(data => console.log(data))
    })


}

newCategory()
