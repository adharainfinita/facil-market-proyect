import server from "./src/app";
import database from "./src/db";
import Category from "./src/models/Category"; 
const PORT = 3001;

database
	.sync({ alter: true })
	Category.sync()
	.then(() => Category.loadDefaultCategories()) 
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Server raised with so much love in port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error.message);
	});
