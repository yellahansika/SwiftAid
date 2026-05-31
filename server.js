const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Main Emergency SOS Endpoint
app.post('/api/sos', (req, res) => {
    console.log("EMERGENCY SOS TRIGGERED:", req.body);
    // In a real app, this would trigger SMS, calls, and hospital dispatch APIs
    res.json({ success: true, message: "Emergency services and contacts have been notified." });
});

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
    console.log("Contact form received:", req.body);
    res.json({ success: true, message: "Your message has been received." });
});

// AI Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in the backend.' });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        // Format previous messages for Gemini
        // Gemini expects role to be 'user' or 'model'. Our frontend sends 'user' and 'bot'.
        const formattedHistory = messages.slice(0, -1).map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));
        
        const latestMessage = messages[messages.length - 1].content;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: "You are the SwiftAid Medical AI Assistant. You provide helpful, reliable, and concise first aid and emergency response advice. Always advise users to contact emergency services for severe situations." }]
                },
                {
                    role: 'model',
                    parts: [{ text: "Understood." }]
                },
                ...formattedHistory,
                {
                    role: 'user',
                    parts: [{ text: latestMessage }]
                }
            ]
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("Gemini AI Error:", error);
        res.status(500).json({ error: 'An error occurred while communicating with the AI.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SwiftAid Backend running on port ${PORT}`));
