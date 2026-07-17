
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function DayModal({ open, onClose, day }) {

  const theme = useTheme();

  console.log(day)
  return (
    <React.Fragment>
      <Dialog
        maxWidth={'sm'}
        open={open}
        onClose={onClose}
        aria-labelledby="shiftInfoDialog"
      >
        <DialogTitle id="shiftInfoTitle">
          {"Shift Status"}
        </DialogTitle>
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

