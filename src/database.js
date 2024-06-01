import {  createPool } from "mysql2";

export class DataBaseMySql {

    #database = null
    constructor(connectionString) {
        this.#database = createPool(connectionString)
        console.log("database running");
    }

    async #getConnection() {
        return await this.#database.promise().getConnection()
    }

    async findAll() {
        const connection = await this.#getConnection();
        try {
            const [users] = await connection.query("SELECT * FROM usuario LIMIT 30");
            return users;
        } catch (error) {
            console.log(error);
            throw new Error("um erro acontece no banco de dados")
        }finally{
            connection.release();
        }
    }
}