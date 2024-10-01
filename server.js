// /server/server.js
const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "/public")));

// Translation function
const translateText = async (text) => {
    try {
        const response = await axios.get('https://api.mymemory.translated.net/get', {
            params: {
                q: text,
                langpair: 'en|ig'  // English to Igbo
            }
        });

        return response.data.responseData.translatedText;
    } catch (error) {
        console.error('Translation API error:', error);
        return 'Translation error';
    }
};

// Translation endpoint
app.get('/translate', async (req, res) => {
    const textToTranslate = req.query.text;
    
    const translatedText = await translateText(textToTranslate);
    res.json({ translatedText }); // Send the translated text as JSON response
});

// Serve the HTML pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
