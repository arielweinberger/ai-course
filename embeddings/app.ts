import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import fs from "fs";
import pdf from "@cyber2024/pdf-parse-fixed";
import { Document, VectorStoreIndex, serviceContextFromDefaults, storageContextFromDefaults } from "llamaindex";

const buffer = fs.readFileSync("./thesis.pdf");
const parsedPdf = await pdf(buffer);

const serviceContext = serviceContextFromDefaults();
const storageContext = await storageContextFromDefaults({
  persistDir: "./storage"
});

const document = new Document({ text: parsedPdf.text });

console.log("Creating index");
const index = await VectorStoreIndex.fromDocuments([document], {
  serviceContext,
  storageContext,
});
console.log("Index created", index);

// const openai = new OpenAI();
// const response = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   temperature: 0,
//   messages: [
//   ],
// });

// console.log(response.choices[0]);
