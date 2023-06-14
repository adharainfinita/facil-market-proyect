import { useState } from "react";
import { validate } from "../services/registerValidation";

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
        <button>Register with Google</button>
        <hr />
        <form>
            <label>Nombre:</label>
            <input type="text" name="name" value={inputs.name} onChange={(e) => handleInputs(e)}/>
            {errors.name !== '' ? <p><strong>{errors.name}</strong></p> : ''}

            <label>Apellido:</label>
            <input type="text" name="lastname" value={inputs.lastname} onChange={(e) => handleInputs(e)}/>
            {errors.lastname !== '' ? <p><strong>{errors.lastname}</strong></p> : ''}

            <label>Contraseña:</label>
            <input type={showPassword ? 'text' : 'password'} name="password" value={inputs.password} onChange={(e) => handleInputs(e)}/>
            <button onClick={(e) => handleShowPassword(e)}>{!showPassword ? 'Mostrar' : 'Ocultar'}</button>
            {errors.password !== '' ? <p><strong>{errors.password}</strong></p> : ''}

            <label>Confirmar contraseña:</label>
            <input type="text" name="confirm" onChange={(e) => handleConfirmPassword(e)} value={confirmPsw}/>
            {errors.confirm && <p><strong>{errors.confirm}</strong></p>}

            <label>Email:</label>
            <input type="text" name="email" value={inputs.email} onChange={(e) => handleInputs(e)}/>
            {errors.email !== '' ? <p><strong>{errors.email}</strong></p> : ''}

            <label>Image:</label>
            <input type="text" name="image" value={inputs.image} onChange={(e) => handleInputs(e)} 
            placeholder="Ingresa una url de tu imagen"/>
            {errors.image !== '' ? <p><strong>{errors.image}</strong></p> : ''}

            <button>Submit</button>
        </form>

        <p>Ya tengo cuenta</p>
      </>
    );
  };
  
  export default Register;