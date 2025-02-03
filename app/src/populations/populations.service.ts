import { Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import { Population, Prisma as PrismaClient } from '@prisma/client';

@Injectable()
export class PopulationsService {
  constructor(
    private prisma: PrismaService,
    // 🔗 Relations
    // private readonly popCriteriasService: PopCriteriasService,
  ) {}

  // ! 🔍 Query / Queries

  // * findUnique
  async findUnique(
    populationWhereUniqueInput: PrismaClient.PopulationWhereUniqueInput,
  ): Promise<Population | null> {
    return this.prisma.population.findUnique({
      where: populationWhereUniqueInput,
    });
  }

  // * findFirst
  async findFirst(
    populationFindFirstArgs: PrismaClient.PopulationFindFirstArgs,
  ): Promise<Population | null> {
    return this.prisma.population.findFirst(populationFindFirstArgs);
  }

  // * findMany
  async findMany(
    populationfindManyArgs: PrismaClient.PopulationFindManyArgs,
  ): Promise<Population[]> {
    return this.prisma.population.findMany(populationfindManyArgs);
  }

  // ---

  // * getPopulationFromName
  async getPopulationFromName(name: string): Promise<Population | null> {
    // console.log(`---`);
    // console.log(`🔎👪 Looking for population "${name}"`);
    // console.log(`---`);

    const populationFindFirstArgs = {
      where: {
        name: name,
      },
      select: {
        name: true,
        operatorLogical: true,
        popCriterias: {
          select: {
            name: true,
            table: true,
            field: true,
            fieldTypeHelper: true,
            operatorComparison: true,
            popCritValues: {
              select: {
                valueBol: true,
                valueDat: true,
                valueNbr: true,
                valueStr: true,
              },
            },
          },
        },
      },
    };
    const population = (await this.prisma.population.findFirst(
      populationFindFirstArgs as PrismaClient.PopulationFindFirstArgs,
    )) as unknown as Population;

    // 📌 Does the population exist ?
    if (population === null) {
      console.log('👤 404 / Aucune population ne porte ce nom 👤');
      throw new Error(`404 / Population '${name}' does not exist`);
    }

    // console.log('---');
    // console.log(`👪 Population "${population.name}" found !`);
    // console.group();
    // console.log(`operatorLogical : ${population.operatorLogical}`);
    // console.log(`# popCriterias : ${population['popCriterias'].length}`);

    // population['popCriterias'].forEach((popCriteria, popCriteriaIndex) => {
    //   console.log();
    //   console.group();
    //   console.group();
    //   console.log(`👪⚗️ population.popCriterias[${popCriteriaIndex}]`);
    //   console.log(popCriteria);
    //   console.log(`/👪⚗️ population.popCriterias[${popCriteriaIndex}]`);
    //   console.log('---');
    //   console.groupEnd();
    //   console.groupEnd();
    //   console.log();
    // });
    // console.groupEnd();
    // console.log('---');
    // console.log('---');
    // console.log('---');

    return population;
  }

  // ---
  // ---
  // ---

  // ! ⬆️ Mutations

  // * create
  async create(data: PrismaClient.PopulationCreateInput): Promise<Population> {
    return this.prisma.population.create({
      data,
    });
  }

  // * createMany
  async createMany(
    data: PrismaClient.PopulationCreateManyArgs,
  ): Promise<object> {
    // returns { count: 0 }
    return await this.prisma.population.createMany(data);
  }

  // * update
  async update(params: {
    where: PrismaClient.PopulationWhereUniqueInput;
    data: PrismaClient.PopulationUpdateInput;
  }): Promise<Population> {
    const { where, data } = params;

    return this.prisma.population.update({
      data,
      where,
    });
  }

  // * delete
  async remove(
    populationWhereUniqueInput: PrismaClient.PopulationWhereUniqueInput,
  ): Promise<Population> {
    // // 🔥🔗 Delete nested PopCriterias
    // await this.prisma.population.update({
    //   where: populationWhereUniqueInput,
    //   data: {
    //     popCriterias: {
    //       deleteMany: {},
    //     },
    //   },
    // });

    return this.prisma.population.delete({
      where: populationWhereUniqueInput,
    });
  }
}
