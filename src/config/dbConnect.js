import mongoose from "mongoose";

mongoose.connect(process.env.STRING_CONEXAO_DB);

const dbConnection = mongoose.connection;

export default dbConnection;