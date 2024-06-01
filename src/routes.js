import { Router } from "express";

export function getRoutes(Controller) {
    const router = Router();

    router.route("/users")
        .get((req, res) => {
            Controller.findAll(req, res);
        })

    return router;
}