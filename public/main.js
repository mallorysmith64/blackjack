et deck = []

//make deck
const makeCards = () => {
  let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
  let ranks = [
    'Ace',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King'
  ]

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push(ranks[j] + ' of ' + suits[i])
    }
  }
  console.log(deck)
  shuffle()
}

//fisher-yates shuffle
const shuffle = () => {
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * i)
    const cardNow = deck[i]
    //swap
    deck[i] = deck[j]
    deck[j] = cardNow
  }
}

//to do
// const displayCards = () => {
//   let img = document.querySelector('#show')
//   let show = deck.pop()
//   let findCard = './image/' + show + '.png'
//   img.setAttribute('src', findCard)

//only receive one card
const getCard = () => {
  if (deck.length > 0) {
    const yourCard = deck.pop()
    console.log(yourCard)
    const shuffleButton = document.createElement('ul')
    shuffleButton.textContent = yourCard

    document.querySelector('.randomize').appendChild(shuffleButton)
  }
}

document.querySelector('.shuffle-deck').addEventListener('click', getCard)
document.addEventListener('DOMContentLoaded', makeCards)
