import React from 'react';
import './home.css';

import CardCustom from '../../components/card/Card';

import Container from '@mui/material/Container';
import { Typography, Paper, Box, ButtonGroup, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import FoodBankRoundedIcon from '@mui/icons-material/FoodBankRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import * as XLSX from 'xlsx';

import logo from '../../../src/luthorLogo.svg';

const Home = () => {
  const [filterCategory, setFilterCategory] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleClickCategory = (title) => {
    setFilterCategory(title);
  };

  const testConvert = (event) => {
    console.log(event);
    const target = event.target;

    let hojas = [];
    let reader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          hojas.push({
            data: XL_row_object,
            sheetName
          })
          console.log(hojas);
        })
      }
  }

  return(
    <Container maxWidth="xl"
      style={{
        padding: '4em',
      }}
    >
      <input
          type="file"
          value={selectedFile}
          onChange={testConvert}
        />
      <Typography variant="h5" color="text.primary">
        <LocalFireDepartmentOutlinedIcon style={{marginRight: '0.5em'}} />
        Los mas votados
      </Typography>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '4em',
      }}>
        <CardCustom title='EducApp' body='La app EducApp loremp impsum' category='Educacion' img="https://thumbs.dreamstime.com/b/aprendizaje-electr%C3%B3nico-app-del-vector-49960281.jpg" />
        <CardCustom title='MercadoPago' body='La app MercadoPago lorem impsum' category='Fintech' img="https://future.inese.es/wp-content/uploads/2020/02/fintechfuture.jpg" />
        <CardCustom title='OsdeApp' body='La app OsdeApp lorem impsmum' category='Salud' img="https://www.nalgeneiberia.com/wp-content/uploads/2016/02/1602_Nalgene_blog_5appssalud_01-770x452.jpg" />
      </div>
      <Typography variant="h5" color="text.primary">
        <CategoryOutlinedIcon style={{marginRight: '0.5em'}} />
        Categorías
      </Typography>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '4em',
        marginTop: '1em'
      }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 127,
              height: 102,
              borderRadius: '15px'
            },
          }}
        >
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Educación')}>
            <SchoolRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Educación
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Salud')}>
            <LocalHospitalRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Salud
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Fintech')}>
            <AttachMoneyRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Fintech
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Alimentación')}>
            <FoodBankRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Alimentación
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Ecommerce')}>
            <StoreRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Ecommerce
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Eco Circular')}>
            <RepeatRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Eco Circular
            </Typography>
          </Paper>
        </Box>
      </div>
      <div
        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
      >
        <Typography variant="h5" color="text.primary">
          {filterCategory}
        </Typography>
        <div style={{width: '38%'}}>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button variant="contained" style={{height: '4em', width: '8em'}}>WEB</Button>
            <Button style={{height: '4em', width: '8em'}}>MOBILE</Button>
          </ButtonGroup>
          <FormControl style={{width: '50%', marginLeft: '1em'}} >
            <InputLabel id="demo-simple-select-label">LENGUAJE</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="LENGUAJE"
              // onChange={handleChange}
            >
              <MenuItem value={10}>PHP</MenuItem>
              <MenuItem value={20}>JAVA</MenuItem>
              <MenuItem value={30}>REACT</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '4em',
      }}>
        <CardCustom title='FintechApp1' body='lalalalaa FINTECHAPP1 alalala' category='Fintech' img="https://future.inese.es/wp-content/uploads/2020/02/fintechfuture.jpg" />
        <CardCustom title='FintechApp2' body='lalalalaa FINTECHAPP2 alalala' category='Fintech' img="https://future.inese.es/wp-content/uploads/2020/02/fintechfuture.jpg" />
        <CardCustom title='FintechApp3' body='lalalalaa FINTECHAPP3 alalala' category='Fintech' img="https://future.inese.es/wp-content/uploads/2020/02/fintechfuture.jpg" />
      </div>
    </Container>
  )
};

export default Home;