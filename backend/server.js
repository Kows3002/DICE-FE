import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

let balance = 1000; // Initial Balance

// Function to generate provably fair roll
function getProvablyFairRoll(seed) {
  const hash = crypto.createHash("sha256").update(seed).digest("hex");
  const roll = parseInt(hash.substring(0, 2), 16) % 6 + 1; // Dice between 1-6
  return { roll, hash };
}

app.post("/roll-dice", (req, res) => {
  const { betAmount } = req.body;
  
  // const betAmount = parseInt(bet);

  if (!betAmount || betAmount <= 0 || betAmount > balance) {
    console.log(betAmount, balance);
    return res.status(400).json({ error: "Invalid Bet Amount" });
  }

  const clientSeed = crypto.randomBytes(16).toString("hex");
  const { roll, hash } = getProvablyFairRoll(clientSeed);

  let message = "";
  if (roll >= 4) {
    balance += parseInt(betAmount); // Add Winnings
    message = "🎯 You Win!";
  } else {
    balance -= parseInt(betAmount); // Deduct Bet
    message = "😢 You Lose!";
  }

  console.log(`Roll: ${roll}, Hash: ${hash}, Balance: ${balance}`);

  res.json({ roll, message, balance, hash });
});

app.listen(5000, () => {
  console.log("🎯 Server running on http://localhost:5000");
});
