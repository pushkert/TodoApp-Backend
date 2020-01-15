import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ColorContext } from "./contextFile/ColorContext";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function App() {
  const colors = useContext(ColorContext);
  const classes = useStyles();
  const [card, setCard] = useState('');
  const [cvv, setCvv] = useState('');
  const [date, setDate] = useState('');
  function handleForm() {
    const reCvv = /^[0-9]{3,4}$/;
    const ccNum = card;
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    let isValid = false;

    if (visaRegEx.test(ccNum)) {
      isValid = true;
    } else if (mastercardRegEx.test(ccNum)) {
      isValid = true;
    } else if (amexpRegEx.test(ccNum)) {
      isValid = true;
    } else if (discovRegEx.test(ccNum)) {
      isValid = true;
    }
    if (!reCvv.test(cvv)) {
      alert("Please provide a cvv number!");
    } else {
      alert('valid cvv')
    }
  }
  function handleCard(e) {
    const re = /^[0-9\b]+$/;
    const length = 16;
    if (e.target.value === '' || (re.test(e.target.value) && e.target.value.length <= length)) {
      setCard(e.target.value);
    }
  }
  function handleCvv(e) {
    e.preventDefault();
    const re = /^[0-9\b]+$/;
    const length = 4;
    if (e.target.value === '' || (re.test(e.target.value) && e.target.value.length <= length)) {
      setCvv(e.target.value);
    }
  }
  function handleCardDate(e) {
    let result;
    const re = /^[0-9\b/]+$/;
    if (e.target.value === '' || (re.test(e.target.value) && e.target.value.length <= 5)) {
      if (e.target.value.length === 2) {
        result = e.target.value + '/';
      } else if (e.target.value.length === 3) {
        if (e.target.value.includes('/')) {
          result = e.target.value.slice(0, -1);
        }
      }
      else {
        result = e.target.value;
      }
      setDate(result);
    }
  }
  return (
    <>
      <ColorContext.Provider value={{
        blue: "#03619c",
        yellow: "#8c8f03",
        red: "#9c0312"
      }}>
        <div style={{ backgroundColor: colors.blue }}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Standard" onChange={handleCard} value={card} maxLength={16} type={'text'} />
          <TextField id="filled-basic" label="Cvv" type='text' value={cvv} onChange={handleCvv} />
          <TextField label="date" type='text' value={date} onChange={handleCardDate} />
          <Button variant="contained" color="primary" onClick={handleForm}>
            Submit card
        </Button>
        </form>
        </div>
      </ColorContext.Provider>
    </>
  );
}

export default App;
