import { useState } from "react";
import { validate } from "../utils/registerValidation";

interface newUser{
    name: string
    lastname: string
    password: string
    email:string
    image: string,
    confirm?: string
}

const Register = () => {
    const [inputs, setInputs] = useState<newUser>({
        name: '',
        lastname: '',
        password: '',
        email: '',
        image: ''
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [errors, setErrors] = useState<Partial<newUser>>({})
    const [confirmPsw, setConfirmPsw] = useState("");

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
        setErrors(validate({ ...inputs, [e.target.name]: e.target.value }))
      };

    const handleShowPassword = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setConfirmPsw(e.target.value)
        setErrors(validate({ ...inputs, [e.target.name]: e.target.value }))
    }

    return (
      <>
      <h1 className="register-title">Crea una cuenta</h1>
      <div className="register-container">
          <button className="google-auth">Sign in with Google</button>
          <hr />
          <form className="register-form">
            <div className="names">
                <div>
                  <label>Nombre:</label><br />
                  <input type="text" name="name" value={inputs.name} onChange={(e) => handleInputs(e)}/>
                  {errors.name !== '' ? <p className='error-register'><strong>{errors.name}</strong></p> : ''}
                </div>   
                <div>
                  <label>Apellido:</label><br />
                  <input type="text" name="lastname" value={inputs.lastname} onChange={(e) => handleInputs(e)}/>
                  {errors.lastname !== '' ? <p className='error-register'><strong>{errors.lastname}</strong></p> : ''}
                </div>
            </div>
              
              <label>Contraseña:</label><br />
              <input type={showPassword ? 'text' : 'password'} name="password" value={inputs.password} onChange={(e) => handleInputs(e)}/>
              <button onClick={(e) => handleShowPassword(e)}>{!showPassword ? 'Mostrar' : 'Ocultar'}</button>
              {errors.password !== '' ? <p className='error-register'><strong>{errors.password}</strong></p> : ''}

              <label>Confirmar contraseña:</label><br />
              <input type="password" name="confirm" onChange={(e) => handleConfirmPassword(e)} value={confirmPsw}/>
              {errors.confirm && <p className='error-register'><strong>{errors.confirm}</strong></p>}

              <label>Email:</label><br />
              <input type="email" name="email" value={inputs.email} onChange={(e) => handleInputs(e)}/>
              {errors.email !== '' ? <p className='error-register'><strong>{errors.email}</strong></p> : ''}

              <label>Image:</label><br />
              <input type="text" name="image" value={inputs.image} onChange={(e) => handleInputs(e)} 
              placeholder="Ingrese una url"/>
              {errors.image !== '' ? <p className='error-register'><strong>{errors.image}</strong></p> : ''}

              <button>Submit</button>
          </form>

          <p>Ya tengo cuenta</p>
      </div>
      </>
    );
  };
  
  export default Register;