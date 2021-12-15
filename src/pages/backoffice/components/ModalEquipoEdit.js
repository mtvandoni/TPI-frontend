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

import session from '../../../services/session';
const apiURL = 'http://webtpi-001-site1.dtempurl.com';

const ModalEquipoEdit = ({ equipo, disabled, handleEdicionEquipo }) => {
  const [open, setOpen] = React.useState(false);
  const [tipoProyectoValue, setTipoProyectoValue] = React.useState('');
  const [tipoProyecto, setTipoProyecto] = React.useState([]);
  const [categoria, setCategoria] = React.useState([]);

  const headers = { 
    'Authorization': session().token,
    'Content-type': 'application/json; charset=iso-8859-1',
  };

  React.useEffect(() => {
    axios.get(apiURL + '/api/tipoProyecto', {headers}).then((response) => {
      if (response) {
        setTipoProyecto(response.data.$values);
      }
    });

    axios.get(apiURL + '/api/categoria', {headers}).then((response) => {
      if (response) {
        setCategoria(response.data.$values);
      }
    })
  }, []);

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

  const submitEdit = (e) => {
    e.preventDefault();
    return e;
  };
  
  return (
    <div>
      <Button onClick={handleClickOpen} color="secondary" >
        {disabled ? 'Editar equipo' : 'Agregar Marca'}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="editModal"
      >
        <form
          onSubmit={handleEdicionEquipo(submitEdit)}
          name="equipo"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Editar - {equipo.nombreEquipo}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div
              style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <input name="idEquipo" defaultValue={equipo.id} hidden/>
              <input name="type" defaultValue={disabled ? 'Edit' : 'Add'} hidden/>
              <input name="idProyecto" defaultValue={equipo.idProyecto ? equipo.idProyecto : null} hidden/>
              <TextField
                label="Nombre Equipo"
                required
                name="nombreEquipo"
                defaultValue={equipo.nombreEquipo ? equipo.nombreEquipo : ''}
                style= {{ marginRight: '1em' }}
              />
              <TextField
                label="Marca"
                required
                name="nombre"
                defaultValue={equipo.marca ? equipo.marca : null}
                style= {{ marginRight: '1em' }}
              />
              <TextField
                label="Concepto"
                required
                name="descripcion"
                defaultValue={equipo.concepto ? equipo.concepto : null}
                style= {{ marginRight: '1em', width: '50%' }}
              />
                <TextField
                label="Propuesta de valor"
                required
                name="propuestaValor"
                defaultValue={equipo.valor ? equipo.valor : null}
                style= {{ marginRight: '1em', width: '32em', marginTop: '1em' }}
              />
              <FormControl
                style= {{ width: '13em', marginTop: '1em', marginRight: '1em'}}
              >
                <InputLabel id="demo-simple-select-label">Tipo Proyecto</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Tipo Proyecto"
                  name="tipoProyecto"
                  defaultValue={equipo.idTipoProyecto ? equipo.idTipoProyecto : ''}
                >
                  {
                    tipoProyecto && tipoProyecto.map((tipo) => (
                      <MenuItem
                        key={tipo.idTipoProyecto}
                        value={tipo.idTipoProyecto}
                      >
                        {tipo.descripcion}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl
                style= {{ width: '13em', marginTop: '1em'}}
              >
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label-cat"
                  label="categoria"
                  name="categoria"
                  defaultValue={equipo.idCategoria ? equipo.idCategoria : null}
                >
                  {
                    categoria && categoria.map((cat) => (
                      <MenuItem
                        key={cat.idCategoria}
                        value={cat.idCategoria}
                      >
                        {cat.descripcion}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{marginBottom: '1em'}}
                  >Seleccione la imagen principal para el proyecto</Typography>
                  <Button
                    variant="raised"
                    component="label"
                  >
                    <input
                      type="file"
                      name="foto"
                     // hidden
                    />
                  </Button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="submit" autoFocus variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  )
}

export default ModalEquipoEdit;
