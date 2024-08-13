import React, { useEffect, useState } from 'react';

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const generateCards = () => {
  const contents = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cards: Card[] = [];

  contents.forEach((content, index) => {
    cards.push({ id: index * 2, content, isFlipped: false, isMatched: false });
    cards.push({ id: index * 2 + 1, content, isFlipped: false, isMatched: false });
  });

  return cards.sort(() => Math.random() - 0.5); // Shuffle the cards
};

const ConcentrationGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  const handleCardClick = (clickedCard: Card) => {
    if (flippedCards.length === 2 || clickedCard.isFlipped || clickedCard.isMatched) return;

    const newFlippedCards = [...flippedCards, { ...clickedCard, isFlipped: true }];
    setFlippedCards(newFlippedCards);
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === clickedCard.id ? { ...card, isFlipped: true } : card)),
    );

    if (newFlippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);

      if (newFlippedCards[0].content === newFlippedCards[1].content) {
        setMatches((prevMatches) => prevMatches + 1);
        setCards((prevCards) =>
          prevCards.map((card) => (card.content === newFlippedCards[0].content ? { ...card, isMatched: true } : card)),
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setCards((prevCards) => prevCards.map((card) => (card.isMatched ? card : { ...card, isFlipped: false })));
        }, 1000);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Concentration Game</h1>
      <h2>Moves: {moves}</h2>
      <h2>Matches: {matches}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '400px', margin: '0 auto' }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            style={{
              width: '60px',
              height: '60px',
              margin: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              cursor: 'pointer',
              backgroundColor: card.isFlipped || card.isMatched ? 'lightblue' : 'gray',
              color: card.isFlipped || card.isMatched ? 'black' : 'gray',
            }}
          >
            {card.isFlipped || card.isMatched ? card.content : ''}
          </div>
        ))}
      </div>
      {matches === cards.length / 2 && <h2>Congratulations! You've matched all pairs!</h2>}
    </div>
  );
};

export default ConcentrationGame;
