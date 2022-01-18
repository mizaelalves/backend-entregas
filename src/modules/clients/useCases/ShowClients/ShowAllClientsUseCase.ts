import { ClientRequest } from "http";
import { prisma } from "../../../../database/prismaClient";

interface IShowClient {
  username: string;
  password?: string;

}

export class ShowAllClientsUseCase {
  async execute({ username, password }: IShowClient) {
    const clientsExist = await prisma.clients.findMany({
      where: {
        username: {
          mode: "insensitive",
        },
      },
    });

    if (clientsExist.length === 0) {
      throw new Error("Clients empty");
    }
   
    for (var i = 0; i < clientsExist.length; i++) {
      // @ts-expect-error
      delete clientsExist[i].password
    }

    return clientsExist;
  }
}
