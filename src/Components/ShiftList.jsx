export default function ShiftList({ data = [] }) {
    if (!data || data === 0)
        return (
            <div> No Shifts recorded </div>
        )

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={th}>Shift ID</th>
                    <th style={th}>Date</th>
                    <th style={th}>Shift</th>
                    <th style={th}>Planned staff</th>
                    <th style={th}>Actual staff</th>
                </tr>
            </thead>
            <tbody>
                {data.map((s) => (
                    <tr key={s.shiftID} style={row}>
                        <td style={cell}>{s.shiftID}</td>
                        <td style={cell}>{new Date(s.date).toLocaleDateString()}</td>
                        <td style={cell}>{s.shiftType}</td>
                        <td style={cell}>{s.planned}</td>
                        <td style={cell}>{s.actual}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const th = { textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' };
const cell = { textAlign: 'left', padding: '8px', borderBottom: '1px solid #f0f0f0' };
const row = { background: '#fff' };