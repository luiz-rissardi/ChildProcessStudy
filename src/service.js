import { fork } from "child_process"


const processes = new Map();
const MAX_PROCESSES = 3;

function startChilds() {
    for (let i = 0; i < MAX_PROCESSES; i++) {
        const child = fork("./src/task");
        processes.set(child.pid, child);
        child.on("error", () => {
            child.kill();
        })

    }
}

startChilds()

let index = 0;
const availableProcesses = [...processes.values()];
function getProcess() {
    if (availableProcesses.length >= index) index = 0;
    const chosenProcess = availableProcesses[index];
    index++;
    return chosenProcess;
}


export class Service {
    #repository;
    constructor(repositoryContext) {
        this.#repository = repositoryContext;
    }

    async findAll() {
        return new Promise((resolve, reject) => {
            try {
                const chosenProcess = getProcess();
                function handler(data) {
                    chosenProcess.removeListener("message", handler);
                    resolve(data)
                }

                chosenProcess.on("message", handler);
                chosenProcess.send("")
            } catch (error) {
                reject(error.message)
            }
        })
    }
}