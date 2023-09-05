function SignInValidation(values){
    let error = {}
    // const username_pattern = /^[A-Za-z0-9]$/
    // const password_pattern = /^[a-z@A-Z0-9]$/

    if(values.Name === ""){
        error.Name = "Name Should not be Empty"
    }else {
        error.Name=""
    }

    
    if(values.Password === ""){
        error.Password = "Password Should not be Empty"
    }
    // else if(!password_pattern.test(values.password)) {
    //     error.password = "password is not Valid"
    // }
    else {
        error.Password=""
    }

    return error;
    

}

export default SignInValidation;