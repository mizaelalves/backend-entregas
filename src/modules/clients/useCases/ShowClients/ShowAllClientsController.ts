import { Request, response, Response } from "express";
import { ShowAllClientsUseCase } from "./ShowAllClientsUseCase";

export class ShowAllClientsController {
  async handle(request: Request, response: Response) {
    const { username } = request.body;

    const showAllClientsUseCase = new ShowAllClientsUseCase();

    const result = await showAllClientsUseCase.execute({
      username,
    });
    return response.json(result);
  }
}
