import React, { Component, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import loadingGif from '../../img/loading.gif';
import { signup, clearErrorMessage } from '../../redux/actions/auth.action';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form'
import TextInput from '../../components/TextInput';



class Signup extends Component {
  
    render() {
        if(this.props.auth.isLoggedIn){ 
            return <Redirect to='/'/>
        }else {
            return (
                
                <div>
                    <div className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form" role="document">
                        <div className="modal-content" id="sign-up">
                            <span className="mod-close" data-dismiss="modal" aria-hidden="true"><i className="ti-close"></i></span>
                            <div className="modal-body">
                                <h4 className="modal-header-title">Sign Up</h4>
                               
                                  <RegisterForm  login={this.props}/>
                                
                                {/* <div className="modal-divider"><span>Or login via</span></div> */}
                                {/* <div className="social-login mb-3">
                                <ul>
                                    <li><a href="#" className="btn connect-fb"><i className="ti-facebook"></i>Facebook</a></li>
                                    <li><a href="#" className="btn connect-twitter"><i className="ti-twitter"></i>Twitter</a></li>
                                </ul>
                            </div> */}
                                <div className="text-center">
                                    <p className="mt-5"><i className="ti-user mr-1"></i>Already Have An Account? <Link to="/login" className="link">Go For LogIn</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
    auth: state.auth,
}}
const mapActionToProps = {
    signup,
    clearErrorMessage
}

function RegisterForm(props){
   
    const [formData, setFormdata] = useState( {
        firstname: 'Chika',
        lastname: 'Ndugba',
        username: 'chikacallis',
        phoneno: '07034722982',
        email: 'ccn22a1@yahoo.com',
        password: 'Kayode12@',
        confirmpassword:'Kayode12@',
        loginBtn: <input type="submit" className="btn btn-md full-width pop-login" value="Signup"/>,
        signUpErrors: ''
    });
   
 
    const { handleSubmit, errors, control, setError } = useForm({reValidateMode:'onBlur', mode: 'onBlur'});
    const onSubmit = (data) => {
       props.login.signup(data);  
    };
   

    useEffect(() => {
     if(props.login.auth.user){
            return <Redirect to='/signup/success'/>
    }else if (props.login.auth.authLoading) {
            setFormdata({...formData,
                loginBtn: <div style={{ textAlign: 'center' }} className='mt-3'><img src={loadingGif} alt='loading-img' /></div>
            })
        } else {
            setFormdata({...formData,
                password:'',
                confirmpassword:'',
                loginBtn: <input type="submit" className="btn btn-md full-width pop-login" value="Signup"/>
            })
        }

        if(props.login.auth.error){
            setFormdata({...formData,
               signUpErrors: 
               <div className="alert alert-danger" role="alert">
                    <h5 className="alert-heading">{props.login.auth.error.message}</h5>
                     <p>{props.login.auth.error.description}</p> 
                    </div>
            })
            props.login.clearErrorMessage();   
        }

        
    }, [props]);
 
    return (
        <div className="login-form">
            {formData.signUpErrors}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row">
                        <div className="col-lg-6 col-md-6">
            <Controller 
            control={control}
            name='firstname' 
            defaultValue={formData.firstname} 
            render= {({onChange, value, onBlur, name}) => (
                <TextInput as="div"  
                name={name}
                label="Firstname" 
                type="text"  
                icon="ti-user"  
                controlId="firstname" 
                placeholder="Firstname"
                defaultValue={value}
                errorMessage={errors?.firstname?.message} 
                autoFocus 
                onChange={onChange}
                onBlur={onBlur}
                
                />
            )}
            rules={{ required: { value: true, message: "Firstname is required"}, maxLength: { value:50, message: "Firstname requires 50 or less characters" }}} 
            
           />
           
            </div>

            <div className="col-lg-6 col-md-6">
            <Controller 
            control={control}
            name='lastname' 
            defaultValue={formData.lastname} 
            render= {({onChange, value, onBlur, name}) => (
            <TextInput as="div"   
            label="Surname / Lastname" 
            name={name}
            defaultValue={value} 
            errorMessage={errors?.lastname?.message} 
            type="text"  
            icon="ti-user"  
            controlId="lastname" 
            placeholder="Surname / Lastname"
            onChange={onChange}
            onBlur={onBlur}  />
            )} 
            rules={{ required: { value: true, message: "Surname / Lastname is required"}, maxLength: { value:50, message: "Surname / Lastname requires 50 or less characters" }}} 
           />
               
            </div>

            <div className="col-lg-6 col-md-6">
            <Controller 
            control={control}
            name='email'
            defaultValue={formData.email} 
            render= {({onChange, value, onBlur, name}) => (
            <TextInput as="div"
            label="Email" 
            name={name}
            defaultValue={value} 
            errorMessage={errors?.email?.message} 
            type="email"  
            icon="ti-email"  
            controlId="email" 
            placeholder="Email"  
            onChange={onChange}
            onBlur={onBlur}  
              />
            )} 
            rules={{ required: { value: true, message: "Please enter a valid email"}, maxLength: { value:90, message: "Please enter an email address with 90 or less characters" }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Please enter a valid email address"}}} 
        
           />
            </div>

            <div className="col-lg-6 col-md-6">
            <Controller 
            control={control}
            name="username" 
            defaultValue={formData.username} 
            render= {({onChange, value, onBlur, name}) => (
            <TextInput as="div"
            label="Username" 
            name={name} 
            defaultValue={value} 
            errorMessage={errors?.username?.message} 
            type="text"  
            icon="ti-user"  
            controlId="username" 
            placeholder="Username"  
            onChange={onChange}
            onBlur={onBlur} 
             />
             )} 
            rules={{ required: { value: true, message: "Please enter a username"},minLength: {value:6, message: "Please enter a username between 6 to 40 characters"}, maxLength: { value:40, message: "Please enter a username between 6 to 40 characters" }}} 
           />
            </div>

            <div className="col-lg-6 col-md-6">
            <Controller 
            control={control}
            name='password' 
            defaultValue={formData.password} 
            render= {({onChange, value, onBlur, name}) => (
            <TextInput as="div" 
            label="Password" 
            name={name} 
            defaultValue={value} 
            errorMessage={errors?.password?.message} 
            type="password"  
            icon="ti-unlock"  
            controlId="password" 
            placeholder="Password"  
            onChange={onChange}
            onBlur={onBlur}   
             />
            )} 
            
            rules={{ required: { value: true, message: "Please enter a password"},minLength: {value:6, message: "Please enter a password between 6 to 90 characters"}, maxLength: { value:90, message: "Please enter a password between 6 to 90 characters" }}} 
        
           />
            </div>

            <div className="col-lg-6 col-md-6">
             <Controller 
            control={control}
            name='confirmpassword' 
            defaultValue={formData.confirmpassword} 
            render= {({onChange, value, onBlur, name}) => (
                <TextInput as="div" 
                name={name} 
                defaultValue={value} 
                label="Confirm Password" 
                defaultValue={formData.confirmpassword} 
                errorMessage={errors?.confirmpassword?.message} 
                type="password"  
                icon="ti-unlock"  
                controlId="confirmpassword" 
                placeholder="Confirm Password"  
                onChange={onChange}
                onBlur={onBlur}   
                 />
                )} 
            rules={{ required: { value: true, message: "Confirm your password" }, validate: (value) => value === control.getValues().password || "Password does not match"}} 
        
           /> 
            
            </div>

            <div className="col-lg-12 col-md-12">

            <Controller 
            control={control}
            name='phoneno' 
            defaultValue={formData.phoneno} 
            render= {({onChange, value, onBlur, name}) => (
                <TextInput as="div" 
                name={name} 
                defaultValue={value} 
                label="Phone Number" 
                errorMessage={errors?.phoneno?.message} 
                type="tel"  
                icon="lni-phone-handset"  
                controlId="phoneno" 
                placeholder="Phone Number"  
                onChange={onChange}
                onBlur={onBlur}   
                 />
                )} 
            rules={{pattern: { value: /^\s*((\+234)|(0))[0-9]{10}\s*$/i, message: "Please enter a valid phone number"}}}
           />
            </div>
            
        </div>

        <div className="form-group">
            {formData.loginBtn}
        </div>

    </form>
  </div>
    );
    }
   

export default connect(mapStateToProps, mapActionToProps)(Signup);
