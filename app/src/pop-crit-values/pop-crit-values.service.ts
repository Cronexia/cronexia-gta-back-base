import { Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import { PopCritValue, Prisma as PrismaClient } from '@prisma/client';

@Injectable()
export class PopCritValuesService {
  constructor(private prisma: PrismaService) {}

  // ! 🔍 Query / Queries

  // * findUnique
  async findUnique(
    popCritValueWhereUniqueInput: PrismaClient.PopCritValueWhereUniqueInput,
  ): Promise<PopCritValue | null> {
    return this.prisma.popCritValue.findUnique({
      where: popCritValueWhereUniqueInput,
    });
  }

  // * findFirst
  async findFirst(
    popCritValueFindFirstArgs: PrismaClient.PopCritValueFindFirstArgs,
  ): Promise<PopCritValue | null> {
    return this.prisma.popCritValue.findFirst(popCritValueFindFirstArgs);
  }

  // * findMany
  async findMany(
    popCritValuefindManyArgs: PrismaClient.PopCritValueFindManyArgs,
  ): Promise<PopCritValue[]> {
    return this.prisma.popCritValue.findMany(popCritValuefindManyArgs);
  }

  // ---

  // ! ⬆️ Mutations

  // * create
  async create(
    data: PrismaClient.PopCritValueCreateInput,
  ): Promise<PopCritValue> {
    return this.prisma.popCritValue.create({
      data,
    });
  }

  // * createMany
  async createMany(
    data: PrismaClient.PopCritValueCreateManyArgs,
  ): Promise<object> {
    // returns { count: 0 }
    return await this.prisma.popCritValue.createMany(data);
  }

  // * update
  async update(params: {
    where: PrismaClient.PopCritValueWhereUniqueInput;
    data: PrismaClient.PopCritValueUpdateInput;
  }): Promise<PopCritValue> {
    const { where, data } = params;

    return this.prisma.popCritValue.update({
      data,
      where,
    });
  }

  // * delete
  async remove(
    popCritValueWhereUniqueInput: PrismaClient.PopCritValueWhereUniqueInput,
  ): Promise<PopCritValue> {
    // // 🔥🔗 Delete nested PopCriterias
    // await this.prisma.popCritValue.update({
    //   where: popCritValueWhereUniqueInput,
    //   data: {
    //     popCriterias: {
    //       deleteMany: {},
    //     },
    //   },
    // });

    return this.prisma.popCritValue.delete({
      where: popCritValueWhereUniqueInput,
    });
  }
}
