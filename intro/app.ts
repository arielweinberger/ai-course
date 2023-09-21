import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI();

const functions: any = {
  add: (obj: { num1: number, num2: number }) => {
    const sum = obj.num1 + obj.num2;
    console.log("Sum is", sum);
  },
  subtract: (obj: { num1: number, num2: number }) => {
    const difference = obj.num1 - obj.num2;
    console.log("Difference is", difference);
  }
}

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  temperature: 0,
  messages: [
    {
      role: "system",
      content: "You are a smart calculator."
    },
    {
      role: "user",
      content: "How much is 10 minus 2?"
    }
  ],
  functions: [
    {
      name: "add",
      description: "Adds two numbers",
      parameters: {
        type: "object",
        properties:{
          num1: {
            type: "number",
          },
          num2: {
            type: "number",
          },
        }
      }
    },
    {
      name: "subtract",
      description: "Subtracts two numbers",
      parameters: {
        type: "object",
        properties:{
          num1: {
            type: "number",
          },
          num2: {
            type: "number",
          },
        }
      }
    }
  ]
});

console.log(response.choices[0]);
const function_call = response.choices[0].message.function_call;

if (function_call) {
  const name = function_call.name;
  const args = JSON.parse(function_call.arguments);
  const fn = functions[name];
  fn(args);
}
 