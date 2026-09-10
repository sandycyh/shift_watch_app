import * as React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { createShift } from '@/api/ShiftAPI';

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  ward_name: '5East',
  shift_type: 'AM',
  planned_staff: '',
  actual_staff: '',
  RN_count: '',
  EN_count: '',
  AIN_count: '',
  casual_count: '',
  agency_count: '',
  NUM_present: '',
  unfilled_pos: '',
};

const numericFields = [
  'planned_staff',
  'actual_staff',
  'RN_count',
  'EN_count',
  'AIN_count',
  'casual_count',
  'agency_count',
  'unfilled_pos',
];

const sanitizeNumber = (value) => {
  const digitsOnly = value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
  return digitsOnly.slice(0, 2);
};

export default function LogAShift({ open = true, onClose = () => {} }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [form, setForm] = React.useState(initialForm);

  const handleFieldChange = (field) => (event) => {
    const value = event.target.value;

    if (numericFields.includes(field)) {
      setForm((prev) => ({ ...prev, [field]: sanitizeNumber(value) }));
      return;
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetAndClose = () => {
    setForm(initialForm);
    onClose();
  };

  const handleSubmit = async () => {
    const payload = {
      date: form.date,
      ward_name: form.ward_name,
      shift_type: form.shift_type,
      planned_staff: form.planned_staff,
      actual_staff: form.actual_staff,
      RN_count: form.RN_count,
      EN_count: form.EN_count,
      AIN_count: form.AIN_count,
      casual_count: form.casual_count,
      agency_count: form.agency_count,
      NUM_present: form.NUM_present,
      unfilled_pos: form.unfilled_pos,
    };

    await createShift(payload);
    resetAndClose();
  };

  return (
    <Dialog
      open={open}
      onClose={resetAndClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      aria-labelledby="log-shift-dialog-title"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle id="log-shift-dialog-title" sx={{ textAlign: 'center', pb: 1, pr: 6 }}>
        Log a Shift
        <IconButton
          aria-label="close"
          onClick={resetAndClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={handleFieldChange('date')}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Ward"
            value={form.ward_name}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <FormControl fullWidth>
            <InputLabel id="shift-type-label">Shift Type</InputLabel>
            <Select
              labelId="shift-type-label"
              label="Shift Type"
              value={form.shift_type}
              onChange={handleFieldChange('shift_type')}
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
              <MenuItem value="ND">ND</MenuItem>
            </Select>
          </FormControl>

          {[
            { key: 'planned_staff', label: 'Planned Staff' },
            { key: 'actual_staff', label: 'Actual Staff' },
            { key: 'RN_count', label: 'RN' },
            { key: 'EN_count', label: 'EN' },
            { key: 'AIN_count', label: 'AIN' },
            { key: 'casual_count', label: 'Casual Pool' },
            { key: 'agency_count', label: 'Agency' },
            { key: 'unfilled_pos', label: 'Unfilled Position' },
          ].map(({ key, label }) => (
            <TextField
              key={key}
              label={label}
              type="text"
              value={form[key]}
              onChange={handleFieldChange(key)}
              fullWidth
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                autoComplete: 'off',
                maxLength: 2,
              }}
              onKeyDown={(event) => {
                if (['e', 'E', '+', '-', '.', ' ', 'Enter'].includes(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          ))}

          <FormControl fullWidth>
            <InputLabel id="num-present-label">NUM Present</InputLabel>
            <Select
              labelId="num-present-label"
              label="NUM Present"
              value={form.NUM_present}
              onChange={handleFieldChange('NUM_present')}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <Button onClick={resetAndClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Shift
        </Button>
      </DialogActions>
    </Dialog>
  );
}