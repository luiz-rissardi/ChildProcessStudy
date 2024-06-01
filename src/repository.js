
export class RepositoryContext {

    #dataBaseContext;
    constructor(context) {
        this.#dataBaseContext = context;
    }

    async findAll() {
        try {
            return await this.#dataBaseContext.findAll();
        } catch (error) {
            console.log(error);
        }
    }
}