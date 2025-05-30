const form = document.getElementById('mailForm');
const draftContent = document.getElementById('draftContent');

// 🔒 Twój webhook URL — używaj *Production URL* z n8n
const WEBHOOK_URL = 'https://mk-wd-n8n.app.n8n.cloud/webhook-test/history';

// 🔑 Twoje dane do Basic Auth
const USERNAME = 'token';        // stały, nie zmieniamy
const PASSWORD = 'XYZ4321';    // Twój sekretny token

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const note = document.getElementById('note').value;

    const basicAuth = btoa(`${USERNAME}:${PASSWORD}`);

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${basicAuth}`
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
