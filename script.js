const gamebox = document.querySelector('.main-game');
const lives = document.querySelector('.playerLivesCount');
let playerLives = 6;

lives.textContent = playerLives;

let deck = [
    {
    name:'dog',
    url:'https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg.webp'
    },
    {
        name:'cat',
        url:'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg?resize=2048,1339'
    },
    {
        name:'monkey',
        url:'https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s800-c85.webp'
    },
    {
        name:'mouse',
        url:'https://www.woodlandtrust.org.uk/media/50820/house-mouse-wtml-1062551-amy-lewis.jpg?anchor=center&mode=crop&heightratio=0.5622047244094488188976377953&width=647&rnd=132908835420000000'
    },
    {
        name:'pig',
        url:"https://ichef.bbci.co.uk/news/976/cpsprodpb/16858/production/_126184229_gettyimages-649146787.jpg"
    },
    {
        name:'elephant',
        url:'https://files.worldwildlife.org/wwfcmsprod/images/African_Elephant_Kenya_112367/hero_full/6tzzuw246j_WW187785.jpg'
    }
]

let deck2 = deck

//shuffling decks
let newDeck = deck.concat(deck2)
//card generator
newDeck = newDeck.sort(() => Math.random() - 0.5)

const cardGenerator = () =>
{

    newDeck.forEach((item)=>
        {
            
            const card = document.createElement('div');
            const face = document.createElement('img');
            const back = document.createElement('div');
        
            card.classList = 'card';
            face.classList = 'face';
            back.classList = 'back';

            //attach info about the element
            face.src = item.url
            card.setAttribute('name',item.name)
            
            //attach card div
            gamebox.appendChild(card); 
            card.appendChild(face);
            card.appendChild(back);
            

            card.addEventListener('click', (e)=>
            {
                card.classList.toggle('toggleCard')
                checkCards(e);
            })
        })

        //check Cards

        const checkCards = (e) =>
        {
            const clickedCard = e.target
            console.log(clickedCard);

            clickedCard.classList.add('flipped')

            const flippedCards = document.querySelectorAll('.flipped')
            const toggleCard = document.querySelectorAll('.toggleCard')
            //logic
            if(flippedCards.length === 2){
                if(
                    flippedCards[0].getAttribute('name') === 
                    flippedCards[1].getAttribute('name')){
                    console.log('match');
                    flippedCards.forEach(card=>
                        {
                            card.classList.remove('flipped')
                            card.style.pointerEvents = 'none'
                        })
                }
                else{
                    console.log('wrong');
                    flippedCards.forEach(card=>
                        {
                            card.classList.remove('flipped');
                            setTimeout(()=> card.classList.remove('toggleCard'),1000)
                        })
                        playerLives--;
                        lives.textContent =playerLives;
                        if(playerLives === 0){
                            restart('try again')
                        }
                }
            }
            //Run check to see if we won the game
            if(toggleCard.length === 12){
                restart('we won')
            }
        }

}

const restart = (text) =>
{
    let cardData = newDeck.sort(() => Math.random() - 0.5)
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    gamebox.style.pointerEvents='none'
    cardData.forEach((item,index)=>
    {
        cards[index].classList.remove('toggleCard');

        setTimeout(()=>
        {
            cards[index].style.pointerEvents='all';
            faces[index].src = item.url;
            cards[index].setAttribute('name',item.name);
            gamebox.style.pointerEvents='all'
        },1000)
     

    })
    playerLives=6
    lives.textContent = playerLives;
    setTimeout(()=>{
        window.alert(text)
    },500)
}

cardGenerator();
