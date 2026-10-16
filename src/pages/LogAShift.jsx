import * as React from 'react';
import './LogAShift.css';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { createShift, updateShift } from '@/api/ShiftAPI';
import Spacer from '../Components/Spacer';

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  ward_name: '5East',
  shift_type: '',
  planned_staff: '',
  actual_staff: '',
  RN_count: '',
  EN_count: '',
  AIN_count: '',
  permanent_count: '',
  casual_agency_count: '',
  IPS_planned: '', 
  IPS_actual: '', 
  TL: '',
  TL_pt_load: '',
  NUM_present: '',
  comments: '',
};

const numericFields = [
  'planned_staff',
  'actual_staff',
  'RN_count',
  'EN_count',
  'AIN_count',
  'permanent_count',
  'casual_agency_count',
  'IPS_planned', 
  'IPS_actual', 
];

const sanitiseNumber = (value) => {
  if (value === '') {
    return '';
  }

  const digitsOnly = value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
  return String(Math.min(Number(digitsOnly.slice(0, 2)), 99));
};

const toYesNo = (value) => {
  const normalized = String(value ?? '').toLowerCase();
  return normalized === 'yes' || normalized === '1' || normalized === 'true' ? 'Yes' : 'No';
};

const getDateInputValue = (value) => {
  if (!value) return initialForm.date;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
};

const getInitialForm = (initialData) => {
  if (!initialData) return initialForm;

  return {
    ...initialForm,
    date: getDateInputValue(initialData.shift_date ?? initialData.date),
    ward_name: initialData.ward_name || initialForm.ward_name,
    shift_type: initialData.shift_type || '',
    planned_staff: String(initialData.planned_staff ?? ''),
    actual_staff: String(initialData.actual_staff ?? ''),
    RN_count: String(initialData.RN_count ?? ''),
    EN_count: String(initialData.EN_count ?? ''),
    AIN_count: String(initialData.AIN_count ?? ''),
    permanent_count: String(initialData.permanent_count ?? ''),
    casual_agency_count: String(initialData.casual_agency_count ?? ''),
    IPS_planned: String(initialData.IPS_planned ?? ''),
    IPS_actual: String(initialData.IPS_actual ?? ''),
    TL: toYesNo(initialData.TL),
    TL_pt_load: toYesNo(initialData.TL_pt_load),
    NUM_present: toYesNo(initialData.NUM_present),
    comments: initialData.comments ?? '',
  };
};

export default function LogAShift({ open = true, onClose = () => {}, onSaved = () => {}, initialData = null }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [form, setForm] = React.useState(() => getInitialForm(initialData));
  const isEditing = Boolean(initialData);

  const handleFieldChange = (field) => (event) => {
    const value = event.target.value;

    if (numericFields.includes(field)) {
      setForm((prev) => ({ ...prev, [field]: sanitiseNumber(value) }));
      return;
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetAndClose = () => {
    setForm(initialForm);
    onClose();
  };

  const renderNumericField = ({ key, label }) => (
    <TextField
      key={key}
      label={label}
      type="number"
      value={form[key]}
      onChange={handleFieldChange(key)}
      className="log-shift-number-field"
      inputProps={{
        inputMode: 'numeric',
        autoComplete: 'off',
        min: 0,
        max: 99,
        step: 1,
      }}
      onKeyDown={(event) => {
        if (['e', 'E', '+', '-', '.', ' '].includes(event.key)) {
          event.preventDefault();
        }
      }}
    />
  );

  const renderYesNoGroup = (key, label) => (
    <FormControl key={key} className="log-shift-radio-group">
      <FormLabel id={`${key}-label`}>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={`${key}-label`}
        name={key}
        value={form[key]}
        onChange={handleFieldChange(key)}
      >
        <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
        <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
      </RadioGroup>
    </FormControl>
  );

  const unfilledPositions = form.planned_staff !== '' && form.actual_staff !== ''
    ? Math.max(Number(form.planned_staff) - Number(form.actual_staff), 0)
    : '';

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
      permanent_count: form.permanent_count,
      casual_agency_count: form.casual_agency_count,
      IPS_planned: form.IPS_planned, 
      IPS_actual: form.IPS_actual,
      TL: form.TL, 
      TL_pt_load: form.TL_pt_load,
      NUM_present: form.NUM_present,
      unfilled_pos: unfilledPositions,
      comments: form.comments,
    };

    const result = isEditing ? await updateShift(payload) : await createShift(payload);
    if (result) {
      onSaved();
      resetAndClose();
      return;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={resetAndClose}
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
      aria-labelledby="log-shift-dialog-title"
      className="log-shift-dialog"
      PaperProps={{ className: 'log-shift-paper' }}
    >
      <DialogTitle id="log-shift-dialog-title" className="log-shift-dialog-title">
        {isEditing ? 'Edit Shift' : 'Log a Shift'}
        <IconButton
          aria-label="close"
          onClick={resetAndClose}
          className="log-shift-close-button"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box className="log-shift-form">
          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={handleFieldChange('date')}
            InputLabelProps={{ shrink: true }}
            disabled={isEditing}
            fullWidth
          />

          <div className="log-shift-row log-shift-pair-50">
            <FormControl>
              <InputLabel id="ward-label">Ward</InputLabel>
              <Select
                labelId="ward-label"
                label="Ward"
                value={form.ward_name}
                onChange={handleFieldChange('ward_name')}
                disabled={isEditing}
              >
                <MenuItem value="5East">5East</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="shift-type-label">Shift Type</InputLabel>
              <Select
                labelId="shift-type-label"
                label="Shift Type"
                value={form.shift_type}
                onChange={handleFieldChange('shift_type')}
                disabled={isEditing}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
                <MenuItem value="ND">ND</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="log-shift-row log-shift-pair-50">
            {[
              { key: 'planned_staff', label: 'Planned Staff' },
              { key: 'actual_staff', label: 'Actual Staff' },
            ].map(renderNumericField)}
          </div>

          <div className="log-shift-row log-shift-triple">
            {[
              { key: 'RN_count', label: 'RN' },
              { key: 'EN_count', label: 'EN' },
              { key: 'AIN_count', label: 'AIN' },
            ].map(renderNumericField)}
          </div>

          <div className="log-shift-row log-shift-triple">
            {[
              { key: 'permanent_count', label: 'Permanent staff' },
              { key: 'casual_agency_count', label: 'Casual & Agency staff' },
            ].map(renderNumericField)}
          </div>

          <div className="log-shift-row log-shift-pair-50">
            {[
              { key: 'IPS_planned', label: 'IPS Planned' },
              { key: 'IPS_actual', label: 'IPS Actual' },
            ].map(renderNumericField)}
          </div>

          <div className="log-shift-row log-shift-radio-row">
            <Spacer size="40px" horizontal />
            {renderYesNoGroup('NUM_present', 'NUM Present')}
            {renderYesNoGroup('TL', 'T/L')}
            {renderYesNoGroup('TL_pt_load', 'T/L with patient load')}
          </div>

          <TextField
            label="Comments"
            value={form.comments}
            onChange={handleFieldChange('comments')}
            multiline
            minRows={2}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions className="log-shift-actions">
        <div className="unfilled-status-display">
        <div 
          className={`unfilled-status ${unfilledPositions === '' ? 'pending' : unfilledPositions > 0 ? 'unfilled' : 'filled'}`}
          aria-live="polite"
        >
          <span>Unfilled positions</span>
          <strong>{unfilledPositions === '' ? '--' : unfilledPositions}</strong>
        </div>
        </div>
        <div className="log-shift-action-buttons">
          <Button onClick={resetAndClose} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {isEditing ? 'Update Shift' : 'Save Shift'}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}