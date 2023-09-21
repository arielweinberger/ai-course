import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import fs from "fs";
import pdf from "@cyber2024/pdf-parse-fixed";
import { Document, TextNode, VectorStoreIndex, serviceContextFromDefaults, storageContextFromDefaults } from "llamaindex";

const buffer = fs.readFileSync("./thesis.pdf");
const parsedPdf = await pdf(buffer);

const serviceContext = serviceContextFromDefaults({
  chunkSize: 4000,
  chunkOverlap: 500,
});

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

const query = "Which technologies can be used to solve congestion at airports?";

const retriever = index.asRetriever();

const matchingNodes = await retriever.retrieve(query);

const knowledge = matchingNodes.map(node => {
  const textNode = node.node as TextNode;
  return textNode.text;
}).join("\n\n");

// Querying OpenAI

const openai = new OpenAI();
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  temperature: 0,
  messages: [
    {
      role: "system",
      content: `You are an aviation expert. Here is your knowledge to answer the user's question: ${knowledge}`
    },
    {
      role: "user",
      content: query
    }
  ],
});

console.log(response.choices[0]);
