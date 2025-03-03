import { useState } from 'react';
import { useBalance } from './context/BalanceContext';
import axios from 'axios';
import './App.css';

function App() {
  const { balance, setBalance } = useBalance();
  const [bet, setBet] = useState('');
  const [roll, setRoll] = useState(null);
  const [result, setResult] = useState('');

  const rollDice = async () => {
    if (bet <= 0 || bet > balance) {
      alert('Invalid Bet Amount');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/roll-dice', { betAmount: parseInt(bet) });
      console.log(response);
      setRoll(response.data.roll);
      setBalance(response.data.balance);
      setResult(response.data.message);
      localStorage.setItem('playerBalance', response.data.balance); // Store in localStorage
    } catch (error) {
      console.error('Error rolling dice:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="game-container">
      <h1>🎲 Provably Fair Dice Game 🎲</h1>
      <p>Balance: <span className="text-yellow">${balance}</span></p>

      <input
        type="number"
        placeholder="Enter Bet Amount"
        value={bet}
        onChange={(e) => setBet(e.target.value)}
      />
      <button onClick={rollDice}>Roll Dice</button>

      {roll !== null && (
        <div className="dice-result">
          <p>Dice Roll: <span className="text-yellow">{roll}</span></p>
          <p className={result === 'You Win!' ? 'winning-text' : 'losing-text'}>
            {result}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
