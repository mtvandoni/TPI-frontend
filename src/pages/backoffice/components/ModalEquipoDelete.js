import React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Dialog,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import session from '../../../services/session';
const apiURL = 'https://localhost:44311';

const ModalEquipoDelete = ({ equipo, handleEliminarEquipo}) => {
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

  const submit = (e) => {
    e.preventDefault();
    return e;
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="secondary">
        <DeleteForeverRoundedIcon color="error"/>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="deleteModal"
      >
        <form
          onSubmit={handleEliminarEquipo(submit)}
          name="equipo"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Eliminar - {equipo.nombreEquipo}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <p>¿Está seguro de eliminar este equipo?</p>
            <input name="id" defaultValue={equipo.id} hidden />
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="outlined">
              Cancelar
            </Button>
            <Button type="submit" autoFocus variant="contained">
              Confirmar
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  )
};

export default ModalEquipoDelete;
