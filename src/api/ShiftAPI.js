const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function createShift(payload) {
    try {
        const response = await fetch(`${API}/shift`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`HTTP ${response.status}${text ? `: ${text}` : ''}`);
        }

        const text = await response.text();
        return text ? JSON.parse(text) : null;
    } catch (err) {
        console.error('Failed to create shift:', err);
        return null;
    }
}

export async function getWeeklyReportData(weekValue) {
    const response = await fetch(`${API}/shift/reports/${encodeURIComponent(weekValue)}`);

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status}${text ? `: ${text}` : ''}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Weekly report API returned an invalid response.');
    }

    return data;
}

export default async function getShift(date, shift) {
    try {
        const url = `${API}/shift/${date}/${shift}`;

        const response = await fetch(url);

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`HTTP ${response.status}${text ? `: ${text}` : ''}`);
        }

        const text = await response.text();
        if (!text) {
            return null;
        }

        try {
            const data = JSON.parse(text);
            return data;
        } catch (parseError) {
            console.error('Invalid JSON from shift API:', parseError, url, text);
            return null;
        }

    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function updateShift(payload) {
    try {
        const response = await fetch(
            `${API}/shift/${encodeURIComponent(payload.date)}/${encodeURIComponent(payload.shift_type)}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
        );

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`HTTP ${response.status}${text ? `: ${text}` : ''}`);
        }

        const text = await response.text();
        return text ? JSON.parse(text) : null;
    } catch (err) {
        console.error('Failed to update shift:', err);
        return null;
    }
}