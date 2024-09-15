import {
  Button,
  Typography,
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";


const Signup = () => {

  const signupForm = {
    fullname: "",
    mobile: "",
    email: "",
    password: ""

  }

  const signupFormValidation = {
    fullname: {
      state: false,
      message: ""
    },
    mobile: {
      state: false,
      message: ""
    },
    email: {
      state: false,
      message: ""
    },
    password: {
      state: false,
      message: ""
    },

  }
  // onblur vfunction
  const requiredValidation = (e) => {
    const input = e.target;
    let key = input.name;
    const isRequired = required(input)
    return setError((oldData) => {
      return {
        ...oldData,
        [key]: isRequired
      }
    })

  }
  // email validation
  const emailValidation = (e) => {
    const input = e.target;
    let key = input.name;
    const isRequired = required(input);
    const isEmail = emailSyntax(input)
    return setError((oldData) => {
      return {
        ...oldData,
        [key]:  isRequired.state && isRequired || isEmail
      }
    })

  }
  // password validation
  const passwordValidation = (e) => {
    const input = e.target;
    let key = input.name;
    const isRequired = required(input);
    const isMinLength = minLength(input , 8)
    const isMaxLength = maxLength(input , 15)
  const isStrong = strongPassword(input)
    return setError((oldData) => {
      return {
        ...oldData,
        [key]:  isRequired.state && isRequired ||
        isStrong.state && isStrong ||
        isMinLength.state && isMinLength || isMaxLength
      }
    })

  }
  //  mobile validation
  const mobileValidation = (e) => {
    const input = e.target;
    let key = input.name;
    const isRequired = required(input);
    const isMinLength = minLength(input , 4)
    const isMaxLength = maxLength(input , 13)
    return setError((oldData) => {
      return {
        ...oldData,
        [key]:  isRequired.state && isRequired ||
        isMinLength.state && isMinLength || isMaxLength
      }
    })

  }

//  max length validation
const maxLength = (input , requiredLength)=>{ 
  const value = input.value.trim();
  if(value.length > requiredLength){
    return{
      state : true,
      message : `Maximum ${requiredLength} characters is required`
    }
  }else{
    return{
      state : false,
      message : ""
    }
  }

}
//  min length validation
const minLength = (input , requiredLength)=>{ 
  const value = input.value.trim();
  if(value.length < requiredLength){
    return{
      state : true,
      message : `Minimum ${requiredLength} characters is required`
    }
  }else{
    return{
      state : false,
      message : ""
    }
  }

}

  const required = (input) => {
    let value = input.value;
    let key = input.name;
    if (value.length === 0) {
      return {
        state: true,
        message: `${key} Field Is Required !`
      }
    } else {
      return {
        state: false,
        message: ""
      }
    }


  }
// email sentex check
  const emailSyntax = (input) => {
    let value = input.value.trim();
    let regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    if (regexp.test(value)) {
            return{
              state : false,
              message : ""
            }
    } else {
      return {
        state: true,
        message: "This Email is not valid !"
      }
    }
  }

  // strong sentex check password
  const strongPassword = (input) => {
    let value = input.value.trim();
    let regexp = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/g
    if (regexp.test(value)) {
            return{
              state : false,
              message : ""
            }
    } else {
      return {
        state: true,
        message : "Password contains capital,lowercase letter,special character,numeric character"

      }
    }
  }

  const [input, setInput] = useState(signupForm);
  const [error, setError] = useState(signupFormValidation);
  const [checked , setChecked] = useState(false)

  const updateValue = (e) => {
    let input = e.target;
    let key = input.name;
    let value = input.value;

    return setInput((oldData) => {
      return {
        ...oldData,
        [key]: value
      }
    })
  }

const validateOnSubmit = ()=>{
  let valid = true;
  for(let key in input){

    if(input[key].length === 0){
       
        valid = false;
        setError((oldData)=>{   // loop me direct return use nahi karen gey
          return{
            ...oldData,
            [key] : {
                state : true,
                message : "This filed is required !"
            }
          }
        })  
    }
  }

  return valid
}

  const register = (e)=>{
      e.preventDefault();
    const isValid =  validateOnSubmit();
    if(isValid){
      alert("success")
    }

  }

  const design = (
    <>
      <Grid container>
        <Grid item sm={7} xs={12}>
          <img src="images/auth.png" alt="auth-image" width="100%" height="100%" />
        </Grid>
        <Grid item sm={5} xs={12} sx={{
          p: {
            xs: 3,
            sm: 5
          }
        }}>
          <Typography variant="h4" sx={{
            mt: {
              xs: 0,
              sm: 3
            },
            mb: 4
          }}>
            Register
          </Typography>
          <form onSubmit={register} >
            <Stack spacing={3}>
              <TextField type="text"
                error={error.fullname.state}
                helperText={error.fullname.message}
                variant="outlined"
                label="Full name"
                name="fullname"
                value={input.fullname}
                onChange={updateValue}
                onBlur={requiredValidation}
                onInput={requiredValidation}
              />
              <TextField
                error={error.mobile.state}
                helperText={error.mobile.message}
                type="number"
                name="mobile"
                variant="outlined"
                label="Mobile"
                value={input.mobile}
                onChange={updateValue}
                onBlur={mobileValidation}
                onInput={mobileValidation}
              />
              <TextField
                error={error.email.state}
                helperText={error.email.message}
                type="email"
                name="email"
                variant="outlined"
                label="Email"
                value={input.email}
                onChange={updateValue}
                onBlur={emailValidation}
                onInput={emailValidation}
              />
              <TextField
                error={error.password.state}
                helperText={error.password.message}
                type="password"
                name="password"
                variant="outlined"
                label="password"
                value={input.password}
                onChange={updateValue}
                onBlur={passwordValidation}
                onInput={passwordValidation}
              />
              <Stack 
               direction="row" 
               justifyContent="space-between"
                alignItems="center" 
                >
                <FormGroup>
                  <FormControlLabel 
                   label="I Accept Terms & Conditions !"
                    control={
                    <Checkbox 
                    checked={checked}
                     color="info" 
                     onClick={()=>setChecked(!checked)}
                     
                     />}
                     />
                  <Button 
                   LinkComponent={Link}
                   to="login"
                    type="button"
                    >Already Have An Account !</Button>
                </FormGroup>
              </Stack>
              <Button 
              disabled={
                error.fullname.state ||
                error.mobile.state ||
                error.email.state ||
                error.password.state || 
                !checked
              } 
               variant="contained" 
               type="submit" 
               >Register 
               </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>


    </>
  )
  return design
}

export default Signup

// use navegate us waqat use karna hey jab authentication use karen gey 
// link waley ko with out security use karna hey


{/* <Button onClick={()=>navegate("/login")}>Login</Button>
    <Link to="/login">Login </Link> */}