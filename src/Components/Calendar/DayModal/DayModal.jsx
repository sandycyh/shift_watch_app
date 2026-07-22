
import * as React from 'react';
import ShiftTabs from './ShiftTabs'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';




export default function DayModal({ open, onClose, day, month, year }) {

  const theme = useTheme();


  return (
    <React.Fragment>
      <Dialog
        maxWidth={'md'}
        open={open}
        onClose={onClose}
        aria-labelledby="shiftInfoDialog"
      >
        <DialogTitle id="shiftInfoTitle">
          {"Shift Status"}
        </DialogTitle>
        <Typography sx={{ fontSize: '1.2rem', textAlign: 'center' }}>
          {day} {month} {year}
        </Typography>

        <ShiftTabs />

        <DialogContent>
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
        </DialogContent>


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

