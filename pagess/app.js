const openai = require("openai");

// Set your OpenAI API key

openai.apiKey = "";

// Set the prompt for Chat GPT

const prompt = "What  s your favorite color?";

// Set the model to use (in this case, Chat GPT)

const model = "chatbot";

// Generate a response from Chat GPT

openai.completions.create({

  engine: model,

  prompt: prompt,

  max_tokens: 1048,

  n: 1,

  stop: ".",

  temperature: 0.9, 

}, (error, response) => {

  console.log(response.choices.text);

});
