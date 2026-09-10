const API = import.meta.env.VITE_API_URL;


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