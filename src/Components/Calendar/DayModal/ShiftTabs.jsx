import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

import getShift from '@/api/shiftAPI';

const shiftTypes = ['AM', 'PM', 'ND'];
const staffingFields = [
  { key: 'planned_staff', label: 'Planned Staff' },
  { key: 'actual_staff', label: 'Actual Staff' },
  { key: 'permanent_count', label: 'Permanent Staff' },
  { key: 'casual_agency_count', label: 'Casual & Agency Staff' },
  { key: 'RN_count', label: 'RN' },
  { key: 'EN_count', label: 'EN' },
  { key: 'AIN_count', label: 'AIN' },
  { key: 'IPS_planned', label: 'IPS Planned' },
  { key: 'IPS_actual', label: 'IPS Actual' },
  { key: 'NUM_present', label: 'NUM Present' },
  { key: 'TL', label: 'T/L' },
  { key: 'TL_pt_load', label: 'T/L with patient load' },
  { key: 'comments', label: 'Comments' },
  { key: 'unfilled_pos', label: 'Unfilled Position' },
];
const shiftDetailFields = [
  { key: 'admission', label: 'Admissions' },
  { key: 'discharge', label: 'Discharges' },
  { key: 'high_acuity', label: 'High Acuity Patients' },
  { key: 'high_dependency', label: 'High Dependency Patients' },
  { key: 'specials_1to1', label: 'IPS Patients' },
  { key: 'falls_risk', label: 'High Falls Risk Patients' },
  { key: 'behavioural_patients', label: 'Patients with Behavioural Issues' },
];

const displayValue = (key, value) => {
  if (value === null || value === undefined || value === '') return '--';
  if (key === 'TL' || key === 'TL_pt_load') {
    return ['yes', '1', 'true'].includes(String(value).toLowerCase()) ? 'Yes' : 'No';
  }
  if (key === 'NUM_present') return String(value).toUpperCase() === 'YES' ? 'Yes' : 'No';
  return String(value);
};

export default function ShiftTabs({ selectedDate, onActiveShiftChange = () => {}, refreshKey = 0 }) {
  const [tab, setTab] = React.useState('AM');
  const [shiftDataMap, setShiftDataMap] = React.useState({});

  const date = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1,
  ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  const greenIcon = () => (
    <CircleIcon sx={{ color: '#2e7d32', fontSize: '0.8rem', marginRight: '5px' }} />
  );
  const redIcon = () => (
    <CircleIcon sx={{ color: '#ef1010', fontSize: '0.8rem', marginRight: '5px' }} />
  );
  const orangeIcon = () => (
    <CircleIcon sx={{ color: '#ff8800', fontSize: '0.8rem', marginRight: '5px' }} />
  );

  const iconFor = (shiftType) => {
    const data = shiftDataMap[shiftType];
    if (!data) return orangeIcon();

    const planned = Number(data.planned_staff);
    const actual = Number(data.actual_staff);
    if (!Number.isFinite(planned) || !Number.isFinite(actual)) return orangeIcon();

    if (actual < planned) return redIcon();
    if (actual === planned) return greenIcon();
    return orangeIcon();
  };

  React.useEffect(() => {
    // fetch all shift types for the date so each tab can show its own status
    async function loadAllShifts() {
      const results = await Promise.all(shiftTypes.map((s) => getShift(date, s)));
      const map = {};
      shiftTypes.forEach((s, i) => {
        map[s] = results[i] || null;
      });
      setShiftDataMap(map);
    }
    loadAllShifts();
  }, [date, refreshKey]);

  React.useEffect(() => {
    onActiveShiftChange(shiftDataMap[tab] ?? null, tab);
  }, [onActiveShiftChange, shiftDataMap, tab]);

  const shiftContent = () => {
    const shiftData = shiftDataMap[tab];
    if (!shiftData) return 'No data logged';

    const renderFields = (fields) => fields.map((field) => (
      <Grid
        key={field.key}
        container
        sx={{ py: 0.9, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Grid size={{ xs: 7 }}>
          <Typography variant="body2" color="text.secondary">
            {field.label}
          </Typography>
        </Grid>
        <Grid size={{ xs: 5 }}>
          <Typography
            variant="body2"
            sx={{ whiteSpace: field.key === 'comments' ? 'pre-wrap' : 'normal', overflowWrap: 'anywhere' }}
          >
            {displayValue(field.key, shiftData[field.key])}
          </Typography>
        </Grid>
      </Grid>
    ));

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.2fr) minmax(0, 0.8fr)' },
          gap: { xs: 2, md: 2 },
          px: { xs: 1, sm: 3 },
          py: 1,
        }}
      >
        <Box component="section" aria-labelledby={`${tab}-staffing-heading`}>
          <Typography id={`${tab}-staffing-heading`} variant="h6" sx={{ mb: 1 }}>
            Staffing
          </Typography>
          {renderFields(staffingFields)}
        </Box>

        <Box component="section" aria-labelledby={`${tab}-details-heading`}>
          <Typography id={`${tab}-details-heading`} variant="h6" sx={{ mb: 1 }}>
            Shift Details
          </Typography>
          {renderFields(shiftDetailFields)}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="shift tabs" variant="fullWidth">
            {shiftTypes.map((shiftType) => (
              <Tab
                key={shiftType}
                value={shiftType}
                label={(
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {iconFor(shiftType)}
                    <span>{shiftType}</span>
                  </Box>
                )}
              />
            ))}
          </TabList>
        </Box>

        {shiftTypes.map((st) => (
          <TabPanel key={st} value={st}>
            {shiftContent()}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
