import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";


interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ password, username }: ICreateDeliveryman) {
  
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive",
          equals: username
        },
      },
    });

    if (deliverymanExist ) {
      throw new Error("Deliveryman "+username+" alredy exists");
    }

    const hashPassword = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });
    return deliveryman
  }
}
