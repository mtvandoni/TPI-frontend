import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Dialog,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  IconButton} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const ModalEquipoEdit = ({ equipo }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  const submitEdit = () => {

  };
  
  return (
    <div>
      <Button onClick={handleClickOpen} color="secondary">
        Editar
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        stile={{ width: '80em'}}
      >
        <form
          onSubmit={submitEdit}
          name="equipo"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Editar - {equipo.marca}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <TextField
              label="Nombre Equipo"
              required
              name="nombreEquipo"
              value={equipo.nombreEquipo ? equipo.nombreEquipo : ''}
            />
            <TextField
              label="Marca"
              required
              name="nombreEquipo"
              value={equipo.nombreEquipo ? equipo.nombreEquipo : ''}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  )
}

export default ModalEquipoEdit;
