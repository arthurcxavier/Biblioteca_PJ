//Modelo de erro no banco de dados
class DatabaseError extends Error {
    constructor(
        public message: string,
        public error?: any,

    ) {
        super(message);
    }
}

export default DatabaseError;