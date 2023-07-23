//imports
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

const app = express()

//config
dotenv.config({ path: "./config.env" })

app.use(express.json())
app.use(cors())

//POST
app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
      max_tokens: 100,
    }),
  }
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options,
    )
    const data = await response.json()
    res.send(data)
  } catch (e) {
    console.error(e)
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
