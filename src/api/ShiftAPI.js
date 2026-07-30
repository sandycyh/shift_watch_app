//const API = 'http://localhost:4000/api';

const API = import.meta.env.VITE_API_URL;

//export default async function getShift(date, shift) {
//     try {
//         console.log(`URL: ${API}/shift/${date}/${shift}`)
        
//         const reqShift = await fetch(`${API}/shift/${date}/${shift}`);
//         const data = await reqShift.json()

//         //debug
//         console.log('status:', reqShift.status);
//         console.log('API data:', data)

//         if (!reqShift.ok) {
//             const text = await reqShift.text();
//             console.error('Backend error:', text);
//             return null;
//         }


//     } catch (err) {
//         console.log('FETCH ERROR:', err)
//         return null;
//     }
// }


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