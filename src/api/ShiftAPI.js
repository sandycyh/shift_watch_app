const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error('Failed to create shift:', err);
        return null;
    }
}

export default async function getShift(date, shift) {
    try {
        const url = `${API}/shift/${date}/${shift}`;

        console.log(url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        return data;

    } catch (err) {
        console.error(err);
        return null;
    }
}