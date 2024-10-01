// /public/js/app.js
document.getElementById('translateBtn').addEventListener('click', async () => {
    const englishText = document.getElementById('englishInput').value; // Get the input text
    await translateText(englishText); // Call the translation function
});

// Function to translate text
const translateText = async (textToTranslate) => {
    try {
        const response = await fetch(`/translate?text=${encodeURIComponent(textToTranslate)}`);
        
        // Check if response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json(); // Parse JSON response
        // Update the output box with translated text
        document.getElementById('output').textContent = data.translatedText; // Display translated text
    } catch (error) {
        console.error('Translation API error:', error);
        document.getElementById('output').textContent = 'Translation error'; // Display error message
    }
};

// /public/js/app.js
document.getElementById('translateBtn').addEventListener('click', async () => {
    const englishText = document.getElementById('englishInput').value; // Get the input text
    await translateText(englishText); // Call the translation function
});


// Microphone functionality
const microphoneBtn = document.getElementById('microphoneBtn');
let recognizing = false;
let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Stop after the user stops talking
    recognition.interimResults = true; // Show interim results

    recognition.onstart = () => {
        recognizing = true;
        microphoneBtn.classList.add('active'); // Optional: Add a class for active state
    };

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        document.getElementById('englishInput').value = transcript; // Update input box with spoken text
    };

    recognition.onend = () => {
        recognizing = false;
        microphoneBtn.classList.remove('active'); // Optional: Remove the active class
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

    microphoneBtn.addEventListener('click', () => {
        if (recognizing) {
            recognition.stop(); // Stop recognition if already recognizing
        } else {
            recognition.start(); // Start recognition
        }
    });
} else {
    console.warn('Speech recognition not supported in this browser.');
}
