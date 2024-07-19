import server from "./src/app";
import database from "./src/db";
import Category from "./src/models/Category";
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await database.sync({ force: false });
    await Category.sync();
    await Category.loadDefaultCategories();
    
    server.listen(PORT, () => {
      console.log(`Server raised with so much love in port: ${PORT}`);
    });
  } catch (error: any) {
    console.error("Failed to start server:", error.message);
    process.exit(1);  // Opcional: termina el proceso si hay un error crítico
  }
};

// Manejador global para promesas no manejadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);  // Opcional: termina el proceso si hay un error crítico
});

startServer();
