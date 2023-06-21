import { userProps } from "../utils/propsModel";
import User from "../models/User";
import { transporter } from '../config/mailer';


interface localProps {
	param: number | string;
}

export const createUser = async ({
	id,
	name,
	lastName,
	password,
	email,
	image,
}: userProps) => {
	const userFound = await findUser({ param: email });
	if (!userFound) {
		return await User.create({
			name,
			lastName,
			password,
			email,
			image,
		});
	}
};

export const findUser = async ({ param }: localProps) => {
	if (typeof param === "number") {
		return await User.findOne({
			where: {
				id: param,
			},
		});
	}
	const emailExist = await User.findOne({
		where: {
			email: param,
		},
	});
	if (emailExist) {
		throw new Error("This email already exists");
	}
};

export const findAllUsers = async () => await User.findAll();

export const sendEmailToUser = async (email:string, name:string) => {
  const verificationLink = "http://localhost:3001/verification"; // Reemplaza con la URL correcta de tu página de verificación

  await transporter.sendMail({
    from: '"Soporte de Facil Market" <benjaminszodo@gmail.com>',
    to: email,
    subject: "Bienvenido a Facil Market",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
        <img src="https://cspmarketplaceprd.s3.us-west-2.amazonaws.com/media-files/marketplace_logo_large.png" alt="Logo de Facil Market" style="max-width: 200px; margin-bottom: 10px;">
        <p style="color: #1D428A; font-family: 'Gochi Hand', cursive; font-size: 20px; margin-top: 0;">Facil-Market</p>
        <h1 style="color: #333333;">¡Hola, ${name}!</h1>
        <p style="color: #333333;">¡Bienvenido a Facil Market! 😎</p>
        <p style="color: #333333;">Estamos encantados de tenerte como parte de nuestra comunidad. Queremos asegurarnos de que tu experiencia sea lo más placentera posible, por lo que estamos aquí para ayudarte en todo lo que necesites.</p>
        <p style="color: #333333;">Si tienes alguna pregunta, inquietud o sugerencia, no dudes en ponerte en contacto con nosotros. Estamos disponibles para ayudarte en cualquier momento.</p>
        <p style="color: #333333;">Una vez más, ¡bienvenido a Facil Market! Esperamos que disfrutes de todas las ventajas y beneficios que nuestra plataforma tiene para ofrecerte.</p>
        <p style="color: #333333;">Para verificar tu cuenta, por favor haz clic en el siguiente enlace:</p>
        <p style="color: #333333;"><a href="${verificationLink}">${verificationLink}</a></p>
        <p style="color: #333333;">¡Saludos cordiales!</p>
        <p style="color: #333333;">El equipo de Facil Market</p>
      </div>
    `,
  });
};

