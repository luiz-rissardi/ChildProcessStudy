import { Writable } from "stream"

export class Controller {

    #service;
    constructor(service) {
        this.#service = service;
    }

    async findAll(req, res) {
        try {
            const stream = await this.#service.findAll();
            stream.pipe(new Writable({
                write(chunk,enc,cb){
                    cb();
                    res.write(chunk)
                },
                final(cb){
                    res.end();
                    cb();
                }
            }))
        } catch (error) {
            res.writeHead(500);
            res.end("");
            console.log(error);
        } 
    }
}