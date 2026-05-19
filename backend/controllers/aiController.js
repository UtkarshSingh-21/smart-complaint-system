const axios = require("axios");

exports.analyzeComplaint = async (req, res) => {

  try {

    const { description, category } = req.body;

    const prompt = `
Analyze this complaint and return ONLY valid JSON.

Complaint:
${description}

Category:
${category}

Return in this format:

{
  "priority":"",
  "department":"",
  "summary":"",
  "aiResponse":""
}
`;

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },

      {
        headers: {
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type": "application/json",
        },
      }
    );

    const result =
      response.data.choices[0].message.content;

    const parsedResult = JSON.parse(result);

    res.json(parsedResult);

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "AI Analysis Failed",
    });
  }
};