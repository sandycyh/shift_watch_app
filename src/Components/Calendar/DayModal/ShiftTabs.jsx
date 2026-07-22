import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


import CircleIcon from '@mui/icons-material/Circle';

export default function ShiftTabs() {

    const [tab, setTab] = React.useState(0);

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

    const AMContent = () => {
        return (
            <DialogContent>
                <DialogContentText sx={{ fontSize: '1.2rem' }}>
                    {orangeIcon()}
                    AM
                </DialogContentText>
            </DialogContent>
        )
    }

    const PMContent = () => {
        return (
            <DialogContent>
                <DialogContentText sx={{ fontSize: '1.2rem' }}>
                    {redIcon()}
                    PM
                </DialogContentText>
            </DialogContent>
        )
    }
    const NDContent = () => {
        return (
            <DialogContent>
                <DialogContentText sx={{ fontSize: '1.2rem' }}>
                    {greenIcon()}
                    ND
                </DialogContentText>
            </DialogContent>
        )
    }


    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label='shift tabs'>
                        <Tab label={AMContent()} value='AM' />
                        <Tab label={PMContent()} value='PM' />
                        <Tab label={NDContent()} value='ND' />
                    </TabList>
                </Box>
                <TabPanel value='AM'>9 staff</TabPanel>
                <TabPanel value='PM'>8 staff</TabPanel>
                <TabPanel value='ND'>5 staff</TabPanel>
            </TabContext>
        </Box>
    )
}