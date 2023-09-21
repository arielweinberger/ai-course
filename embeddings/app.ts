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
      content: `
      You are a customer support bot for Le Flying Carr. You must ONLY answer questions based on the following knowledge, and nothing else:
      
      Knowledge:
      ---------
      Le Flying Carr: Sales/Support Handbook
      Welcome to the Sales and Support Handbook for Le Flying Carr, the future of personal
      transporta=on. This guide is designed to provide you with the essen=al details about the
      product, pricing, financing, and common FAQs to ensure you have a seamless experience
      with Le Flying Carr.
      Product Overview
      Le Flying Carr is revolu=onizing the way you travel by merging cuGng-edge technology with
      sleek design. Experience the joy of flying over traffic and reaching your des=na=on in record
      =me.
      Pricing
      • Le Flying Carr Basic: Star=ng at $200,000
      • Le Flying Carr Pro: Star=ng at $350,000
      • Le Flying Carr Elite: Star=ng at $500,000
      All prices are exclusive of tax, delivery, and addi=onal accessories.
      Models
      Le Flying Carr Basic
      • Top Speed: 150 mph
      • Range: 200 miles
      • Seats: 2
      • Special Features: Basic autopilot, manual controls, standard naviga=on
      • Warranty: 2 years or 24,000 miles, whichever comes first
      Le Flying Carr Pro
      • Top Speed: 200 mph
      • Range: 300 miles
      • Seats: 4
      • Special Features: Advanced autopilot, voice-controlled naviga=on, premium sound
      system
      • Warranty: 4 years or 48,000 miles, whichever comes first
      Le Flying Carr Elite
      • Top Speed: 250 mph
      • Range: 400 miles
      • Seats: 4 (Luxury)
      • Special Features: Fully autonomous, in-flight entertainment, in-built refrigerator
      • Warranty: 5 years or 60,000 miles, whichever comes first
      Financing Op?ons
      • Down Payment: Minimum of 20% required
      • Loan Tenure: Op=ons available from 2 to 6 years
      • Interest Rate: As low as 3.5% APR
      • Financing is subject to credit approval.
      Delivery Date
      • Le Flying Carr Basic: 3-4 months from the date of order
      • Le Flying Carr Pro: 5-6 months from the date of order
      • Le Flying Carr Elite: 6-8 months from the date of order
      Delivery dates are subject to change based on produc=on schedules.
      Frequently Asked Ques?ons
      Q: Is Le Flying Carr street-legal?
      A: Le Flying Carr is designed for air travel and is not street-legal. Special licenses are required
      to operate it.
      Q: What kind of license do I need to fly Le Flying Carr?
      A: You will need a special pilot's license, details of which can be found on our website.
      Q: Can I customize my Le Flying Carr?
      A: Yes, customiza=on op=ons are available for all models. Addi=onal charges apply.
      Q: What is the return policy?
      A: Returns are accepted within 30 days of delivery, subject to a restocking fee and other
      condi=ons.
      Q: Is interna=onal shipping available?
      A: Currently, Le Flying Carr is only available for customers in the United States.
      `
    },
    {
      role: "user",
      content: "What's the delivery date for the Elite model?'",
    },
  ],
});

console.log(response.choices[0]);
