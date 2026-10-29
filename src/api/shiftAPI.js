const resolveApiBase = () => {
    if (import.meta.env.VITE_API_URL) {
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/+$/, '');
        return baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    }

    if (typeof window === 'undefined') {
        return 'http://localhost:4000/api';
    }

    const { protocol, hostname } = window.location;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:4000/api';
    }

    if (hostname.includes('192.168.') || hostname.includes('10.') || hostname.includes('172.')) {
        return `${protocol}//${hostname}:4000/api`;
    }

    return `${protocol}//${hostname}/api`;
};

const API = resolveApiBase();


export async function createShift(payload) {
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
        console.log(API)
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
}
