
import * as React from 'react';
import ShiftTabs from './ShiftTabs'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';




export default function DayModal({ open, onClose, selectedDate }) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const fullDate = selectedDate.toLocaleString('default', { dateStyle: 'full' })

  return (
    <React.Fragment>
      <Dialog
        maxWidth="md"
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="shiftInfoDialog"
        paperProps={{ sx: { maxHeight: 'calc(100vh - 96px)' } }}
        scroll="paper"
      >
        <DialogTitle id="shiftInfoTitle">
          {"Shift Status"}
        </DialogTitle>
        <Typography sx={{ fontSize: '1.2rem', textAlign: 'center' }}>
          {fullDate}
        </Typography>

        <ShiftTabs selectedDate={selectedDate} />

        <DialogContent sx={{ overflow: 'auto' }} />

        <Box sx={{ px: 5, py: 0 }}>
          <DialogContentText>
            <CircleIcon sx={{ color: "#ef1010", fontSize: '0.8rem', marginRight: '5px' }} />
            Staffing Ratio Not Met
          </DialogContentText>
          <DialogContentText>
            <CircleIcon sx={{ color: "#2e7d32", fontSize: '0.8rem', marginRight: '5px' }} />
            Fully Staffed
          </DialogContentText>
          <DialogContentText>
            <CircleIcon sx={{ color: "#ff8800", fontSize: '0.8rem', marginRight: '5px' }} />
            Shift Not Recorded
          </DialogContentText>
        </Box>

        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Edit
          </Button>
          <Button onClick={onClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

