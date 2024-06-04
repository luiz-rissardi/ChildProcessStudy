import { fork } from "child_process"
import { Readable } from "stream";


const processes = new Map();
const MAX_PROCESSES = 4;

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
function getProcess() {
    const availableProcesses = [...processes.values()].filter(child => !child.killed);
    if (availableProcesses.length >= index) index = 0;
    if (availableProcesses.length === 0) {
       startChilds();
        return getProcess();
    }
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
                    resolve(
                        Readable.from(JSON.stringify(data))
                    )
                    chosenProcess.kill();
                    chosenProcess.removeListener("message",handler);
                    data = undefined;
                }

                chosenProcess.send("")
                chosenProcess.on("message", handler);
            } catch (error) {
                reject(error.message)
            }
        })
    }
}
