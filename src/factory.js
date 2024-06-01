import { DataBaseMySql } from "./database.js";
import { RepositoryContext } from "./repository.js";
import { Controller } from "./controller.js";
import { Service } from "./service.js";

export function getController(){
    const database = new DataBaseMySql("mysql://root:13012006@localhost/users");
    const repositoryContect = new RepositoryContext(database);
    const service = new Service(repositoryContect);
    return new Controller(service);
}