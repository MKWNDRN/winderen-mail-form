const form = document.getElementById('mailForm');
const draftContent = document.getElementById('draftContent');

// 🔒 Twój N8N Webhook z tokenem
const WEBHOOK_URL = 'https://twoj-n8n-url/webhook/history?token=XYZ4321';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const note = document.getElementById('note').value;

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                note: note
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        draftContent.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        draftContent.textContent = `Błąd: ${error.message}`;
    }
});
