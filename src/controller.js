


export class Controller {

    #service;
    constructor(service) {
        this.#service = service;
    }

    async findAll(req,res){
        try {
            const result = await this.#service.findAll();
            res.json(result);
        } catch (error) {
            res.writeHead(500);
            console.log(error);
        }finally{
            res.end("");
        }
    }
}