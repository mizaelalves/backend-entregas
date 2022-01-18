import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/auth/Client/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/auth/Deliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { ShowAllClientsController } from "./modules/clients/useCases/ShowClients/ShowAllClientsController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDeliveries/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/FindAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/UpdateEndDate/UpdateEndDateController";
import { UpdateEndDateUseCase } from "./modules/deliveries/useCases/UpdateEndDate/UpdateEndDateUseCase";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/FindAllDeliveries/FindAllDeliveriesDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();

const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const authenticateClientController = new AuthenticateClientController();

const showAllClientsController = new ShowAllClientsController();

const createDeliveyController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();

const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesClient = new FindAllDeliveriesController();
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController()
const updateEndDateController = new UpdateEndDateController()

routes.post(
  "/deliveryman/authenticate",
  authenticateDeliverymanController.handle
);
routes.post("/client/authenticate", authenticateClientController.handle);

routes.post("/client", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);

routes.post(
  "/delivery",
  ensureAuthenticateClient,
  createDeliveyController.handle
);

routes.get("/client/delivery", ensureAuthenticateClient, findAllDeliveriesClient.handle);

routes.get("/show/clients", showAllClientsController.handle);

routes.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);

routes.put(
  "/delivery/updatedeliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);

routes.get("/deliveryman/delivery", ensureAuthenticateDeliveryman, findAllDeliveriesDeliveryman.handle)

routes.put("/delivery/updateenddate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { routes };
