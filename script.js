// --- Global Init ---
document.addEventListener('DOMContentLoaded', () => {
    // Icons initialisieren
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // API Key wiederherstellen
    const savedKey = localStorage.getItem('manul_api_key');
    const keyInput = document.getElementById('apiKeyInput');
    if (savedKey && keyInput) keyInput.value = savedKey;
});

// --- Navigation Logic ---

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
}

// Navbar Shadow on Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 10) {
            nav.classList.add('shadow-md', 'py-2');
            nav.classList.remove('py-4');
        } else {
            nav.classList.remove('shadow-md', 'py-2');
            nav.classList.add('py-4');
        }
    }
});


// --- Kontakt Formular Logic ---

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Button Loading State
        const btn = this.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sende...';
        btn.disabled = true;

        setTimeout(() => {
            // UI simulieren
            this.style.display = 'none';
            document.getElementById('successMessage').classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons(); // Icons im Success Message neu laden
        }, 1500);
    });
}


// --- Manul KI Logic ---

const apiKeyInput = document.getElementById('apiKeyInput');
if (apiKeyInput) {
    apiKeyInput.addEventListener('change', (e) => {
        localStorage.setItem('manul_api_key', e.target.value);
    });
}

window.generateAI = async function() {
    const key = document.getElementById('apiKeyInput').value;
    const prompt = document.getElementById('promptInput').value;
    const btn = document.getElementById('generateBtn');
    const resultArea = document.getElementById('resultArea');
    const resultText = document.getElementById('resultText');

    if (!key) { 
        alert("Bitte gib oben rechts deinen Google API Key ein."); 
        return; 
    }
    if (!prompt) return;

    // Button Status ändern
    btn.disabled = true;
    const originalContent = btn.innerHTML;
    btn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Denke nach...`;
    resultArea.classList.add('hidden');

    try {
        // Direkter API Aufruf ohne Server (Client-Side)
        // Nutzung von gemini-1.5-flash da sehr stabil
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                contents: [{ parts: [{ text: "Du bist ein professioneller Privatkoch aus Graz namens Manul. Antworte auf Deutsch, höflich, knapp und kompetent. Formatierte den Text gut lesbar. Anfrage: " + prompt }] }] 
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Ich konnte leider keine Antwort generieren.";
        
        resultText.innerText = text;
        resultArea.classList.remove('hidden');
    } catch (e) {
        alert("Fehler: " + e.message);
    }

    // Reset Button
    btn.disabled = false;
    btn.innerHTML = originalContent;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}