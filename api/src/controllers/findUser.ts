import User from "../models/User";

interface localProps{
   id?: number
}

const findUser = async({id}:localProps) =>{
   
   return await User.findOne({ where: { id} })
    
}


export default findUser;