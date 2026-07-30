import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { List, ListItem, ListItemText } from '@mui/material';
import { Grid, Typography } from '@mui/material';

import CircleIcon from '@mui/icons-material/Circle';

import getShift from '@/api/shiftAPI';

export default function ShiftTabs({ selectedDate }) {

    const [tab, setTab] = React.useState('AM');
    const [shiftData, setShiftData] = React.useState(null);
    const selectedShift = 'AM';
    const date = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;



    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    const greenIcon = () => {
        return (
            <CircleIcon sx={{ color: "#2e7d32", fontSize: '0.8rem', marginRight: '5px' }} />
        )
    }

    const redIcon = () => {
        return (
            <CircleIcon sx={{ color: "#ef1010", fontSize: '0.8rem', marginRight: '5px' }} />
        )
    }

    const orangeIcon = () => {
        return (
            <CircleIcon sx={{ color: "#ff8800", fontSize: '0.8rem', marginRight: '5px' }} />
        )
    }

    const AMTab = () => {
        return (
            <DialogContent>
                <DialogContentText sx={{ fontSize: '1.2rem' }}>
                    {orangeIcon()}
                    AM
                </DialogContentText>
            </DialogContent>
        )
    }

    const PMTab = () => {
        return (
            <DialogContent>
                <DialogContentText sx={{ fontSize: '1.2rem' }}>
                    {redIcon()}
                    PM
                </DialogContentText>
            </DialogContent>
        )
    }

    const NDTab = () => {
        return (
            <DialogContent>
                <DialogContentText sx={{ fontSize: '1.2rem' }}>
                    {greenIcon()}
                    ND
                </DialogContentText>
            </DialogContent>
        )
    }

    React.useEffect(() => {
        async function loadShift() {
            console.log(`date: ${date} / shift: ${selectedShift}`)

            const data = await getShift(date, selectedShift)
            console.log("ShiftTabs received:", data);
            setShiftData(data)
        }
        loadShift();
    }, [date, selectedShift]);



    const shiftContent = () => {
        if (!shiftData) {
            return 'No data logged';
        }

        return (
            <Grid container spacing={0.4}>
                {Object.entries(shiftData).map(([key, value]) => (
                    <Grid size={6} key={key}>
                        <Typography variant="body2">
                            <strong>{key}</strong>
                        </Typography>

                        <Typography>
                            {String(value)}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        )

        // return (
        //     <List>
        //         {Object.entries(shiftData).map(([key, value]) => (
        //             <ListItem key={key}>
        //                 <ListItemText
        //                     primary={key}
        //                     secondary={String(value)}
        //                 />
        //             </ListItem>
        //         ))}
        //     </List>
        // )
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label='shift tabs'>
                        <Tab label={AMTab()} value='AM' />
                        <Tab label={PMTab()} value='PM' />
                        <Tab label={NDTab()} value='ND' />
                    </TabList>
                </Box>
                <TabPanel value='AM'>{shiftContent()}</TabPanel>
                {/* <TabPanel value='PM'>{getShift(selectedDate, value)}</TabPanel> */}
                {/* <TabPanel value='ND'>{getShift(selectedDate, value)}</TabPanel> */}
            </TabContext>
        </Box>
    )
}