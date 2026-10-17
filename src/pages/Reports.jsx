import React from 'react';
import './Reports.css';
import Spacer from '../Components/Spacer';
import { getWeeklyReportData } from '../api/ShiftAPI';

const shiftOrder = ['AM', 'PM', 'ND'];

const getCurrentIsoWeek = () => {
  const today = new Date();
  const date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const year = date.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);

  return `${year}-W${String(week).padStart(2, '0')}`;
};

const shiftIsoWeek = (weekValue, offset) => {
  const [yearText, weekText] = weekValue.split('-W');
  const year = Number(yearText);
  const week = Number(weekText);
  if (!year || !week) return weekValue;

  const date = new Date(Date.UTC(year, 0, 4));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() - day + 1 + (week - 1 + offset) * 7);
  date.setUTCDate(date.getUTCDate() + 3);

  const isoYear = date.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const isoWeek = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${isoYear}-W${String(isoWeek).padStart(2, '0')}`;
};

const getWeekDateRange = (weekValue) => {
  if (!weekValue) {
    return 'No week selected';
  }

  const [yearText, weekText] = weekValue.split('-W');
  const year = Number(yearText);
  const week = Number(weekText);

  if (!year || !week) {
    return weekValue;
  }

  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7;
  const firstMondayOfYear = new Date(Date.UTC(year, 0, 4 - jan4Day + 1));

  const start = new Date(firstMondayOfYear);
  start.setUTCDate(start.getUTCDate() + (week - 1) * 7);

  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);

  const formatDate = (date) =>
    new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(date);

  return `${formatDate(start)} - ${formatDate(end)}`;
};

export default function Reports() {
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedWeek, setSelectedWeek] = React.useState(getCurrentIsoWeek);
  const [reportRows, setReportRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const weekRangeLabel = React.useMemo(() => getWeekDateRange(selectedWeek), [selectedWeek]);

  React.useEffect(() => {
    let active = true;

    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getWeeklyReportData(selectedWeek);
        if (!active) return;

        setReportRows(data);
        const firstRow = [...data].sort((a, b) => new Date(a.shift_date) - new Date(b.shift_date))[0];
        setSelectedDate(firstRow ? String(firstRow.shift_date).slice(0, 10) : '');
      } catch (loadError) {
        if (!active) return;

        setReportRows([]);
        setSelectedDate('');
        setError(loadError instanceof Error ? loadError.message : 'Failed to load report data.');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [selectedWeek]);

  const dayMap = React.useMemo(() => {
    const map = new Map();

    reportRows.forEach((row) => {
      const date = row.shift_date.slice(0, 10);
      if (!map.has(date)) {
        map.set(date, { date, rows: [] });
      }

      map.get(date).rows.push(row);
    });

    return map;
  }, [reportRows]);

  const weekDays = React.useMemo(() => {
    const range = getWeekDateRange(selectedWeek);
    if (!range || range === 'No week selected') {
      return [];
    }

    const [yearText, weekText] = selectedWeek.split('-W');
    const year = Number(yearText);
    const week = Number(weekText);
    if (!year || !week) {
      return [];
    }

    const jan4 = new Date(Date.UTC(year, 0, 4));
    const jan4day = jan4.getUTCDay() || 7;
    const firstMonday = new Date(Date.UTC(year, 0, 4 - jan4day + 1));

    const dates = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(firstMonday);
      date.setUTCDate(date.getUTCDate() + (week - 1) * 7 + index);
      return date.toISOString().slice(0, 10);
    });

    return dates.map((date) => {
      const dayRows = dayMap.get(date) ?? { rows: [] };
      const dailyTotal = dayRows.rows.reduce((sum, row) => sum + Number(row.actual_staff || 0), 0);
      const dailyPlanned = dayRows.rows.reduce((sum, row) => sum + Number(row.planned_staff || 0), 0);
      const fill = dailyPlanned ? Math.round((dailyTotal / dailyPlanned) * 100) : 0;

      return {
        date,
        label: new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(new Date(`${date}T00:00:00`)),
        planned: dailyPlanned,
        actual: dailyTotal,
        fill,
      };
    });
  }, [dayMap, selectedWeek]);

  const selectedDayRows = React.useMemo(() => {
    const rows = dayMap.get(selectedDate)?.rows ?? [];
    return shiftOrder.map((shift) => {
      const shiftRows = rows.filter((row) => row.shift_type === shift);
      const planned = shiftRows.reduce((sum, row) => sum + Number(row.planned_staff || 0), 0);
      const actual = shiftRows.reduce((sum, row) => sum + Number(row.actual_staff || 0), 0);
      const fill = planned ? Math.round((actual / planned) * 100) : 0;
      const ratio = shiftRows.length === 0 ? 'No data logged' : fill >= 90 ? 'On target' : 'Under target';

      return {
        shift,
        planned,
        actual,
        fill,
        ratio,
      };
    });
  }, [dayMap, selectedDate]);

  const weeklyTotal = weekDays.reduce((sum, day) => sum + day.actual, 0);
  const weeklyPlanned = weekDays.reduce((sum, day) => sum + day.planned, 0);
  const weeklyFill = weeklyPlanned ? Math.round((weeklyTotal / weeklyPlanned) * 100) : 0;

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleWeekChange = (offset) => {
    setSelectedWeek((week) => shiftIsoWeek(week, offset));
  };

  return (
    <div className="reports-page">
      <Spacer size="10px" />

      <div className="reports-header">
        <div className="reports-date-group">
          <div className="selected-date-block">
            <span className="selected-label">Selected date</span>
            <strong>{selectedDate || 'No date selected'}</strong>
          </div>
          <p className="reports-reminder">Select a date from the weekly overview. Review its daily report here.</p>
        </div>

        <h2 className="reports-title">Reports</h2>

        <div className="selected-week-block">
          <label htmlFor="report-week">Week</label>
          <input
            id="report-week"
            type="week"
            value={selectedWeek}
            onChange={(event) => setSelectedWeek(event.target.value)}
          />
        </div>
      </div>

      {error && <div className="report-message report-error" role="alert">Unable to load report data: {error}</div>}
      {!loading && !error && reportRows.length === 0 && (
        <div className="report-message" role="status">No shift records found for this week.</div>
      )}

      <div className="reports-grid">
        {selectedDayRows.map((item) => (
          <div key={item.shift} className="report-card">
            <div className="report-card-header">
              <h3>{item.shift}</h3>
              <span className={`status-pill ${item.ratio === 'On target' ? 'success' : item.ratio === 'No data logged' ? 'no-data' : 'danger'}`}>
                {item.ratio}
              </span>
            </div>

            <div className="report-row">
              <span>Planned</span>
              <strong>{item.planned}</strong>
            </div>
            <div className="report-row">
              <span>Actual</span>
              <strong>{item.actual}</strong>
            </div>
            <div className="report-row">
              <span>Fill rate</span>
              <strong>{item.fill}%</strong>
            </div>

            <div className="progress-bar">
              <div
                className={item.ratio === 'On target' ? 'progress-fill success' : 'progress-fill danger'}
                style={{ width: `${item.fill}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="weekly-panel">
        <div className="weekly-header-row">
          <h3>Weekly overview</h3>
          <div className="weekly-navigation" aria-label="Week navigation">
            <button
              type="button"
              className="week-nav-button"
              aria-label="Previous week"
              title="Previous week"
              onClick={() => handleWeekChange(-1)}
            >
              <span aria-hidden="true">&#8249;</span>
            </button>
            <h3 aria-live="polite">{weekRangeLabel}</h3>
            <button
              type="button"
              className="week-nav-button"
              aria-label="Next week"
              title="Next week"
              onClick={() => handleWeekChange(1)}
            >
              <span aria-hidden="true">&#8250;</span>
            </button>
          </div>
          <div className="weekly-total">
            <span>Total fill rate</span>
            <strong>{weeklyFill}%</strong>
          </div>
        </div>

        <div className="weekly-grid">
          {weekDays.map((day) => (
            <button
              key={day.date}
              type="button"
              className="weekly-card"
              onClick={() => handleDayClick(day.date)}
            >
              <div className="weekly-date">{day.date.slice(-2)}</div>
              <div className="weekly-day-name">{day.label}</div>
              <div className="weekly-stats">
                <span>Planned: {day.planned}</span>
                <span>Actual: {day.actual}</span>
              </div>
              <div className="weekly-percent">{day.fill}%</div>
              <div className="progress-bar small">
                <div
                  className={day.fill >= 90 ? 'progress-fill success' : 'progress-fill danger'}
                  style={{ width: `${day.fill}%` }}
                />
              </div>
            </button>
          ))}
        </div>

        <div className="weekly-summary-row">
          <span>Week total</span>
          <strong>{weeklyTotal} / {weeklyPlanned}</strong>
          <span className="summary-percent">{weeklyFill}%</span>
        </div>
      </div>

      {loading && <div className="report-loading">Loading report data...</div>}
    </div>
  );
}
