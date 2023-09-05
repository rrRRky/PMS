import './authentication.styles.css'
// import SignUpForm from '../../component/sign-up/sign-up.component';
import SignInForm from '../../component/sign-in/sign-in.component';
const Authentication =() =>{

    return(
        <div className='auth-container row m-0 p-0'>
            <SignInForm/>
            {/* <SignUpForm/> */}
        </div>
    );
};

export default Authentication;