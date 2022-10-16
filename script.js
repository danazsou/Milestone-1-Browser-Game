const game = document.getElementById('game')

const scoreBoard = document.getElementById('score')


const scienceNature = 10
const levels = ['easy', 'medium', 'hard']


function addGenre() {

    const column = document.createElement('div')
    column.classList.add('genre-column')
    column.innerHTML = 'this is a genre'
    game.append(column)

    //use api for ease or factor out questions manually for practice? both?hm
    //use below api to loop through levels
    levels.forEach(level => {
            fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty={level}&type=multiple`)

    })

}

addGenre()
