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
      content: "You are a helpful assistant that recommends products to users.",
    },
    {
      role: "user",
      content: "I'm looking for a pair of running shoes.",
    }
  ],
});

console.log(response.choices[0]);
