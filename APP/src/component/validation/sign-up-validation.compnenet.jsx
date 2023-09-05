
function SignUpValidation(values){
    let error = {}
    // const username_pattern = /^[A-Za-z0-9]{10,}$/
    // const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{10,}$/

    if(values.username === ""){
        error.username = "Display Name Should not be Empty"
    }
    // else if(!username_pattern.test(values.username)) {
    //     error.username = "Display is not Valid"
    // }
    else {
        error.username=""
    }

    if(values.email === ""){
        error.email = "email Name Should not be Empty"
    }
    // else if(!email_pattern.test(values.email)) {
    //     error.email = "email is not Valid"
    // }
    else {
        error.email=""
    }
    
    if(values.password === ""){
        error.password = "password Should not be Empty"
    }
    // else if(!password_pattern.test(values.password)) {
    //     error.password = "password is not Valid"
    // }
    else {
        error.password=""
    }

    return error;
    

}

export default SignUpValidation;