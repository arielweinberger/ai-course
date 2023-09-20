import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  temperature: 0,
  messages: [
    {
      role: "system",
      content: "You're the BestShoes chat bot. Make sure to introduce yourself as BestShoes Bot on your first interaction with the user."
    },
    {
      role: "user",
      content: "Hey, my name is Ariel, greet me.",
    }
  ]
});

console.log(response.choices);