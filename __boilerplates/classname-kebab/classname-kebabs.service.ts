// CLASSNAME_MAJ_FIRST REMOVE
// CLASSNAME_LOWC_FIRST REMOVE

// RELATION_MAJ_FIRST REMOVE
// RELATION_LOWC_FIRST REMOVE

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import { CLASSNAME_MAJ_FIRST, Prisma as PrismaClient } from '@prisma/client';

@Injectable()
export class CLASSNAME_MAJ_FIRSTsService {
  constructor(private prisma: PrismaService) {}

  // ! 🔍 Query / Queries

  // * findUnique
  async findUnique(
    CLASSNAME_LOWC_FIRSTWhereUniqueInput: PrismaClient.CLASSNAME_MAJ_FIRSTWhereUniqueInput,
  ): Promise<CLASSNAME_MAJ_FIRST | null> {
    return this.prisma.CLASSNAME_LOWC_FIRST.findUnique({
      where: CLASSNAME_LOWC_FIRSTWhereUniqueInput,
    });
  }

  // * findFirst
  async findFirst(
    CLASSNAME_LOWC_FIRSTFindFirstArgs: PrismaClient.CLASSNAME_MAJ_FIRSTFindFirstArgs,
  ): Promise<CLASSNAME_MAJ_FIRST | null> {
    return this.prisma.CLASSNAME_LOWC_FIRST.findFirst(CLASSNAME_LOWC_FIRSTFindFirstArgs);
  }

  // * findMany
  async findMany(
    CLASSNAME_LOWC_FIRSTfindManyArgs: PrismaClient.CLASSNAME_MAJ_FIRSTFindManyArgs,
  ): Promise<CLASSNAME_MAJ_FIRST[]> {
    return this.prisma.CLASSNAME_LOWC_FIRST.findMany(CLASSNAME_LOWC_FIRSTfindManyArgs);
  }

  // ---

  // ! ⬆️ Mutations

  // * create
  async create(data: PrismaClient.CLASSNAME_MAJ_FIRSTCreateInput): Promise<CLASSNAME_MAJ_FIRST> {
    return this.prisma.CLASSNAME_LOWC_FIRST.create({
      data,
    });
  }

  // * createMany
  async createMany(
    data: PrismaClient.CLASSNAME_MAJ_FIRSTCreateManyArgs,
  ): Promise<object> {
    // returns { count: 0 }
    return await this.prisma.CLASSNAME_LOWC_FIRST.createMany(data);
  }

  // * update
  async update(params: {
    where: PrismaClient.CLASSNAME_MAJ_FIRSTWhereUniqueInput;
    data: PrismaClient.CLASSNAME_MAJ_FIRSTUpdateInput;
  }): Promise<CLASSNAME_MAJ_FIRST> {
    const { where, data } = params;

    return this.prisma.CLASSNAME_LOWC_FIRST.update({
      data,
      where,
    });
  }

  // * delete
  async remove(
    CLASSNAME_LOWC_FIRSTWhereUniqueInput: PrismaClient.CLASSNAME_MAJ_FIRSTWhereUniqueInput,
  ): Promise<CLASSNAME_MAJ_FIRST> {
    // // 🔥🔗 Delete nested RELATION_MAJ_FIRSTs
    // await this.prisma.CLASSNAME_LOWC_FIRST.update({
    //   where: CLASSNAME_LOWC_FIRSTWhereUniqueInput,
    //   data: {
    //     RELATION_LOWC_FIRSTs: {
    //       deleteMany: {},
    //     },
    //   },
    // });

    return this.prisma.CLASSNAME_LOWC_FIRST.delete({
      where: CLASSNAME_LOWC_FIRSTWhereUniqueInput,
    });
  }
}
