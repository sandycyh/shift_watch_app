
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


export default function DayModal({ open, onClose, day, month, year }) {

  const theme = useTheme();

  /*
                  testing rendering from DB
                  <div style={{ padding: 16 }}>
                      <h1> Shift Record </h1>
                      <ShiftList data={sampleData} />
  
  */

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
        <Typography>
          {day} {month} {year}
        </Typography>

        <DialogContent>
          <DialogContentText> AM </DialogContentText>
          <DialogContentText> PM </DialogContentText>
          <DialogContentText> ND </DialogContentText>
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

