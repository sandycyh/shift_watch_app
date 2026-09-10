import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

import staffingFields from '@/config/StaffFields';
import getShift from '@/api/shiftAPI';

export default function ShiftTabs({ selectedDate }) {
  const [tab, setTab] = React.useState('AM');
  const [shiftDataMap, setShiftDataMap] = React.useState({});

  const date = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1,
  ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const shiftTypes = ['AM', 'PM', 'ND'];

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
  }, [date]);

  const shiftContent = () => {
    const shiftData = shiftDataMap[tab];
    if (!shiftData) return 'No data logged';

    return (
      <Grid container spacing={0.4}>
        {staffingFields.map((field) => (
          <React.Fragment key={field.key}>
            <Grid size={4} sx={{ marginLeft: 2 }}>
              <Typography>{field.label}</Typography>
            </Grid>

            <Grid size={4}>
              <Typography align="left">{shiftData[field.key]}</Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
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
