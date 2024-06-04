
import { DataBaseMySql } from "./database.js";
import { RepositoryContext } from "./repository.js";

const database = new DataBaseMySql("mysql://root:13012006@localhost/users");
const repositoryContect = new RepositoryContext(database);

process.on("message", async () => {
    let data = await repositoryContect.findAll();
    process.send(data);
    data = undefined;
})