require("dotenv").config()
const express = require("express")
const cors = require("cors")
const multer = require("multer")
const fs = require("fs")
const pdfParse = require("pdf-parse")
const OpenAI = require("openai")

const app = express()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",

    defaultHeaders: {
        "HTTP-Referer": "https://ai-resume-analyzer-one-pi.vercel.app",
        "X-Title": "AI Resume Analyzer"

    }
})

app.use(cors())
app.use(express.json())

const upload = multer({
     storage: multer.memoryStorage()
})

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.post("/upload", upload.single("resume"), async (req, res) => {

    console.log(req.file)

    if (!req.file) {
        return res.status(400).json({
            message: "File not received"
        })
    }

    const dataBuffer = req.file.buffer

    const pdfData = await pdfParse(dataBuffer)

    console.log(pdfData.text)

    const response = await client.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
        {
            role: "user",
            content: `
    Analyze this resume and provide:

    1. Strengths
    2. Weaknesses
    3. Missing Skills
    4. Improvement Suggestions

    Resume:
    ${pdfData.text}
`
        }
    ]
})

    res.json({
        analysis: response.choices[0].message.content
    })
})



module.exports = app