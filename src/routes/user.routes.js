import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = new Router();

router.get('/', loginRequired, UserController.index);
router.get('/:id', loginRequired,UserController.show);


router.post('/', UserController.create);
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;
