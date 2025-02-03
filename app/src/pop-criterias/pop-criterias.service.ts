import { Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import { PopCriteria, Prisma as PrismaClient } from '@prisma/client';

@Injectable()
export class PopCriteriasService {
  constructor(private prisma: PrismaService) {}

  // ! 🔍 Query / Queries

  // * findUnique
  async findUnique(
    popCriteriaWhereUniqueInput: PrismaClient.PopCriteriaWhereUniqueInput,
  ): Promise<PopCriteria | null> {
    return this.prisma.popCriteria.findUnique({
      where: popCriteriaWhereUniqueInput,
    });
  }

  // * findFirst
  async findFirst(
    popCriteriaFindFirstArgs: PrismaClient.PopCriteriaFindFirstArgs,
  ): Promise<PopCriteria | null> {
    return this.prisma.popCriteria.findFirst(popCriteriaFindFirstArgs);
  }

  // * findMany
  async findMany(
    popCriteriafindManyArgs: PrismaClient.PopCriteriaFindManyArgs,
  ): Promise<PopCriteria[]> {
    return this.prisma.popCriteria.findMany(popCriteriafindManyArgs);
  }

  // ---

  // ! ⬆️ Mutations

  // * create
  async create(
    data: PrismaClient.PopCriteriaCreateInput,
  ): Promise<PopCriteria> {
    return this.prisma.popCriteria.create({
      data,
    });
  }

  // * createMany
  async createMany(
    data: PrismaClient.PopCriteriaCreateManyArgs,
  ): Promise<object> {
    // returns { count: 0 }
    return await this.prisma.popCriteria.createMany(data);
  }

  // * update
  async update(params: {
    where: PrismaClient.PopCriteriaWhereUniqueInput;
    data: PrismaClient.PopCriteriaUpdateInput;
  }): Promise<PopCriteria> {
    const { where, data } = params;

    return this.prisma.popCriteria.update({
      data,
      where,
    });
  }

  // * delete
  async remove(
    popCriteriaWhereUniqueInput: PrismaClient.PopCriteriaWhereUniqueInput,
  ): Promise<PopCriteria> {
    // // 🔥🔗 Delete nested Populations
    // await this.prisma.popCriteria.update({
    //   where: popCriteriaWhereUniqueInput,
    //   data: {
    //     populations: {
    //       deleteMany: {},
    //     },
    //   },
    // });

    return this.prisma.popCriteria.delete({
      where: popCriteriaWhereUniqueInput,
    });
  }
}
