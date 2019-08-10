//make deck, this is an object
const state = {
  suits: ['clubs', 'diamonds', 'hearts', 'spades'],
  ranks: [
    { name: 'ace', value: 11 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: '10', value: 10 },
    { name: '11', value: 10 },
    { name: 'Queen', value: 10 },
    { name: 'King', value: 10 }
  ],

  deck: [],
  playerHand: []
}

// create deck, this is a function
const createDeck = () => {
  for (let i = 0; i < state.suits.length; i++) {
    const suit = state.suits[i]
    for (let j = 0; j < state.ranks.length; j++) {
      const rank = state.ranks[j]
      state.deck.push({
        rank: rank.name,
        value: rank.value,
        suit: suit
      })
    }
  }
  console.log(state.deck)
}

//fisher-yates shuffle
const shuffle = () => {
  for (let i = state.deck.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * i)
    //swap
    const temp = state.deck[random]
    state.deck[random] = state.deck[i]
    state.deck[i] = temp
  }
  console.log(state.deck)
}

// const displayCards = () => {
//   let img = document.querySelector('#show')
//   let show = deck.pop()
//   let findCard = './image/' + show + '.png'
//   img.setAttribute('src', findCard)

const dealPlayerHand = () => {
  let dealtCard = {}
  for (let i = 0; i < 2; i++) {
    //remove one card
    dealtCard = state.deck.pop()
    console.log(dealtCard)
    //add to hand
    state.playerHand.push(dealtCard)
    const shuffleButton = document.createElement('ul')
    shuffleButton.textContent = dealtCard.rank + ' of ' + dealtCard.suit
    document.querySelector('.randomize').appendChild(shuffleButton)
  }
  console.log(state.playerHand)
}

const playerHandTotal = () => {
  let handTotal
  for (let i = 0; i < state.playerHand.length; i++) {
    const card = state.playerHand[i]
    //add current card value to total
    if (handTotal) {
      handTotal += card.value
    } else {
      handTotal = card.value
    }
  }
  console.log(handTotal)
}

const main = () => {
  createDeck()
  shuffle()
  dealPlayerHand()
  playerHandTotal()
}

document.querySelector('.player-hand').addEventListener('click', dealPlayerHand)
document.addEventListener('DOMContentLoaded', main)

// const getCard = () => {
//   if (deck.length > 0) {
//     const yourCard = deck.pop()
//     console.log(yourCard)
//     const shuffleButton = document.createElement('ul')
//     shuffleButton.textContent = yourCard
