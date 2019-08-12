let handTotal = 0 //handTotal is a value while playerHand is the actual card
let dealerTotal = 0
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
    { name: 'Jack', value: 10 },
    { name: 'Queen', value: 10 },
    { name: 'King', value: 10 }
  ],

  //arrays
  deck: [],
  playerHand: [],
  dealerHand: []
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
  for (let i = 0; i < 2; i++) {
    //remove cards
    let dealtCard = state.deck.pop()
    console.log(dealtCard)
    //add to hand
    state.playerHand.push(dealtCard)
    const shuffleButton = document.createElement('li')
    shuffleButton.textContent = dealtCard.rank + ' of ' + dealtCard.suit
    document.querySelector('.deal-player-card').appendChild(shuffleButton)
  }
  console.log(state.playerHand)
  playerHandTotal()
}

//dealer's initial hand
const dealtHand = () => {
  for (let i = 0; i < 2; i++) {
    //remove cards
    dealCard = state.deck.pop()
    console.log(dealCard)
    //add cards to dealer's hand
    state.dealerHand.push(dealCard)
    const dealerBtn = document.createElement('li')
    dealerBtn.textContent = dealCard.rank + ' of ' + dealCard.suit
    document.querySelector('.give-dealer-cards').appendChild(dealerBtn)
  }
  // console.log(state.dealerCard)
  dealerHandTotal()
}

//total card count for player
const playerHandTotal = () => {
  for (let i = 0; i < state.playerHand.length; i++) {
    let card = state.playerHand[i]
    //add current card value to total
    if (handTotal) {
      handTotal += card.value
    } else {
      handTotal = card.value
    }
  }
  console.log(handTotal)
  const playerPoints = document.createElement('h3')
  playerPoints.textContent = handTotal
  document.querySelector('.player-points').appendChild(playerPoints)
}

//total card count for dealer
const dealerHandTotal = () => {
  for (let i = 0; i < state.dealerHand.length; i++) {
    let card = state.dealerHand[i]
    //add current card value to total
    if (dealerTotal) {
      dealerTotal += card.value
    } else {
      dealerTotal = card.value
    }
  }
  console.log(dealerTotal)
  if (dealerTotal > 21) {
    const winner = 'Dealer loses' //message about dealer
    document.querySelector('#player-winner').textContent = winner
    console.log('dealer went over 21: player wins')
  } else {
    const dealerPoints = document.createElement('h3')
    dealerPoints.textContent = dealerTotal
    document.querySelector('.dealer-points').appendChild(dealerPoints)
  }
  // console.log(state.dealerTotal)
}

//add one card to player's hand
const hitForCard = (total, hand) => {
  //remove one card from deck to player
  let hit = state.deck.pop()
  console.log(hit)
  //add one card from deck to player
  total += hit.value
  let hitCard = document.createElement('li')
  hitCard.textContent = hit.rank + ' of ' + hit.suit
  document.querySelector('.hit-card').appendChild(hitCard)
  console.log(total)

  if (total > 21) {
    const loser = 'Dealer wins!'
    document.querySelector('#player-loser').textContent = loser
    document.querySelector('.hit-button').disabled = true
    console.log('over 21: you lose')
  }
  document.querySelector('.player-points').textContent = total
}

const hitButton = () => {
  hitForCard(handTotal, state.playerHand)
}

const standCard = () => {
  let stand = state.deck.pop()
  dealerTotal += stand.value
  let standButton = document.createElement('li')
  standButton.textContent = stand.rank + ' of ' + stand.suit
  document.querySelector('.give-dealer-cards').appendChild(standButton)

  if (dealerTotal <= 16) {
    hitForCard(dealerTotal, state.dealerHand)
    if (dealerTotal > 21 || handTotal > dealerTotal) {
      const playerWinner = 'Player Wins!'
      document.querySelector('#player-winner').textContent = playerWinner
      console.log('dealer went over 21: player wins')
    }
  }
  document.querySelector('.dealer-points').textContent = dealerTotal
  document.querySelector('.stand-button').disabled = true
  // outputMessage.textContent = 'Player Wins!'
}

const playAgain = () => {
  const playAgainBtn = document.createElement('h3')
  playAgainBtn.textContent = 'Play Again'
  window.location.reload()
  document.querySelector('.player-hand').appendChild(playAgain)
  // document.querySelector('.dealer-hand').appendChild(playAgain)
}

const main = () => {
  createDeck()
  shuffle()
  dealPlayerHand()
  dealtHand()
}

document.querySelector('.hit-button').addEventListener('click', hitButton)
document.querySelector('.play-again').addEventListener('click', playAgain)
document.querySelector('.stand-button').addEventListener('click', standCard)
document.addEventListener('DOMContentLoaded', main)
