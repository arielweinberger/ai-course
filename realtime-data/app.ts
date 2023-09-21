import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import { getProductId } from "./lib/get-product-id";

const openai = new OpenAI();

const functions: any = {
  async recommendProduct(obj: { description: string }) {
    console.log("Recommend product function called by OpenAI", obj.description);
    const productId = await getProductId(obj.description);

    return {
      url: `https://example.com/products/${productId}`
    }
  }
};

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
      content: "I'm a skater. I'm looking for skateboarding shoes.",
    }
  ],
  functions: [
    {
      name: "recommendProduct",
      description: "Takes a short description and returns a recommended product",
      parameters: {
        type: "object",
        properties: {
          description: {
            type: "string",
            description: "A short description of the product the user is looking for, ideally a copy paste from the user's mesage"
          }
        }
      }
    }
  ]
});

console.log(response.choices[0]);

const function_call = response.choices[0].message.function_call;

if (function_call) {
  const fn = functions[function_call.name];
  const args = JSON.parse(function_call.arguments);
  const result = await fn(args);
  console.log("result", result);
}