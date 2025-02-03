import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  registerEnumType,
} from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';

import {
  Population,
  PopCriteria,
  Prisma as PrismaClient,
} from '@prisma/client';

// * Generics
import { SkipTakeArgs } from '../_utility/graphql/args/skip-take.args';
import { CountModel } from '../_utility/graphql/models/count.model';

// * Population
// Internal
import { PopulationsService } from './populations.service';
// ENUMs
import { PopulationDistinctEnum } from './enums/population-distinct.enum';
// DTOs
import { PopulationEntity } from './entities/population.entity';
import { PopulationModel } from './models/population.model';
import { CreatePopulationInput } from './dto/create-population.input';
import { CreateManyPopulationsInput } from './dto/create-many-populations.input';
import { FindArgs } from './dto/find-population.args';
import { FindUniquePopulation } from './dto/find-unique-population';
import { UpdatePopulationInput } from './dto/update-population.input';

// 🔗 Relations, nested fields
import { PopCriteriaModel } from '../pop-criterias/models/pop-criteria.model';
import { PopCriteriasService } from '../pop-criterias/pop-criterias.service';

@Resolver(() => PopulationModel)
export class PopulationsResolver {
  constructor(
    private readonly populationsService: PopulationsService,
    // 🔗 Relations
    private readonly popCriteriasService: PopCriteriasService,
  ) {
    // ! 🔢 Dedicated ENUMs
    registerEnumType(PopulationDistinctEnum, {
      name: 'PopulationDistinctEnum',
      description: '👥 Filter out duplicates rows for one or all fields.',
      valuesMap: {
        allFields: {
          description:
            '👥 Filter out duplicates rows for both name and operatorLogical',
        },
        name: {
          description: '👥 Filter out duplicates rows for name',
        },
        operatorLogical: {
          description: '👥 Filter out duplicates rows for operatorLogical',
        },
        none: {
          description: 'Default value, no deduplicate.',
        },
      },
    });
  }

  // ---

  // ! 🔗 Relations, nested fields

  // * PopCriterias / Many to one / Return [0-N] 📦📦📦
  @ResolveField('popCriterias', () => [PopCriteriaModel])
  async popCriterias(
    @Parent() population: PopulationEntity,
  ): Promise<PopCriteria[]> {
    // * Do not overload if already defined (include/filters in the service)
    if (population.hasOwnProperty('popCriterias')) {
      return population['popCriterias'];
    }

    // * If not, return all related entries (join)
    const { idPopulation } = population;
    return this.popCriteriasService.findMany({
      where: {
        populationId: idPopulation,
      },
    });
  }

  // ---

  // ! 🔍 Query / Queries

  // * findUnique
  @Query(() => PopulationModel, {
    name: 'population',
    description: `🔍⭐ Rechercher par ID ou par champ unique (name)
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      population(name: "4_criteres") {
        name
        operatorLogical
      }
    }
    \n
    \n---
    \n
    {
      population(id: "00000000-0000-0000-9090-000000000001") {
        name
        operatorLogical
      }
    }
    \n
    \n#### 🔧 Arguments
    \n**id** > Population unique ID
    \n**name** > Population unique name
    \n
    \n---
    \n#### 🔗 Relations
    \n**PopCriterias [  ]**
    \n
    {
      population(name: "4_criteres") {
        name
        operatorLogical

        popCriterias {
          name
          table
          field
          fieldTypeHelper
          operatorComparison

          popCritValues {
            valueBol
            valueDat
            valueNbr
            valueStr
          }
        }
      }
    }
    \n`,
  })
  async findUnique(
    @Args()
    findUniquePopulation: FindUniquePopulation,
  ): Promise<Population | null> {
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopulation).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // TODO: 🌱 Automatic property renaming/mapping ~= id for GraphQL > idPopulation for PC
    // Object.entries(findUniquePopulation).forEach(([key, value]) => {
    //   console.log(`${key}: ${value}`);
    //   // * Dynamic property assignation
    //   whereUniqueInput[key] = value;
    // });

    // Transformer 'id' (GraphQL) en 'idPopulation' NestJs
    if (findUniquePopulation.hasOwnProperty('id')) {
      whereUniqueInput['idPopulation'] = findUniquePopulation.id;
    }

    if (findUniquePopulation.hasOwnProperty('name')) {
      whereUniqueInput['name'] = findUniquePopulation.name;
    }

    return this.populationsService.findUnique(
      whereUniqueInput as PrismaClient.PopulationWhereUniqueInput,
    );
  }

  // * findFirst
  @Query(() => PopulationModel, {
    name: 'populationFindFirst',
    description: `🔍🥇 Rechercher et récupérer le premier qui correspond
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      populationFindFirst {
        name
        operatorLogical
      }
    }
    \n#### 🔧 Arguments
    \n**skip** > ⏭️ Skips the first N records
    \n**take** > 🔺 Return the N records max
    \n**where** > 🔍 Search by native field/column/property
    \n**whereOpen** > 🔍♾️ Same as where, but with all GraphQL capabilities provided by Prisma Client
    \n**orderBy** > 🔀 Sort by one or multiple fields, ascendent or descendant.
    \n**orderByOpen** > 🔀 Same as orderBy, but with all GraphQL capabilities provided by Prisma Client.
    Sort by one or multiple fields, and their relations.
    \n**cursor** > 🎯 Start the result from an element. ⚡️ Better performances than ~ > 10 000.
    \n**distinct** > 👥 Filter out duplicates rows for one or all fields. Possible values: allFields, name, operatorLogical
    \n
    {
      populationFindFirst(skip: 1) {
        name
        operatorLogical
      }
    }
    \n
    {
      populationFindFirst(take: 1) {
        name
        operatorLogical
      }
    }
    \n
    {
      populationFindFirst(where: { name: "4_criteres" }) {
        name
        operatorLogical
      }
    }
    
    \n
    {
      populationFindFirst(orderBy: { name: desc }) {
        name
        operatorLogical
      }
    }
    \n
    {
      populationFindFirst(cursor: { name: "4_criteres" }) {
        name
        operatorLogical
      }
    }
    \n
    {
      populationFindFirst(distinct: allFields) {
        name
        operatorLogical
      }
    }
    \n
    {
      populationFindFirst(whereOpen: { name: { contains: "c", }, }) {
        name
        operatorLogical
      }
    }
    \n
    {
      populationFindFirst(orderByOpen: [ { operatorLogical: "desc", }, { name: "desc", }, ]) {
        name
        operatorLogical
      }
    }
    \n
    \n---
    \n#### 🔗 Relations
    \n**PopCriterias [  ]**
    \n
    {
      populationFindFirst {
        name
        operatorLogical

        popCriterias {
          name
          table
          field
          fieldTypeHelper
          operatorComparison

          popCritValues {
            valueBol
            valueDat
            valueNbr
            valueStr
          }
        }
      }
    }
    \n`,
  })
  async findFirst(
    // 2 Args : skip and take
    @Args()
    skipTakeArgs: SkipTakeArgs,

    @Args() findArgs: FindArgs,
  ): Promise<Population | null> {
    const { where, whereOpen, orderBy, orderByOpen, cursor, distinct } =
      findArgs;

    // * Merged arguments for Prisma Client
    const populationFindArgs = {};

    // * skip, take
    Object.entries(skipTakeArgs).forEach(([key, value]) => {
      // * Dynamic property assignation
      populationFindArgs[key] = value;
    });

    // * where, ours
    if (typeof where !== 'undefined') {
      const wherePropertiesCount = Object.keys(where).length;

      if (wherePropertiesCount > 0) {
        const whereWithoutTypes = JSON.parse(JSON.stringify(where));

        // Transform 'id' (GraphQL) in 'idPopulation' for Prisma Client
        if (whereWithoutTypes.hasOwnProperty('id')) {
          whereWithoutTypes['idPopulation'] = whereWithoutTypes.id;
          // Remove old property
          delete whereWithoutTypes.id;
        }

        populationFindArgs['where'] = whereWithoutTypes;
      }
    }

    // * where, Prisma Client
    // * whereOpen as priority over our where
    if (typeof whereOpen !== 'undefined') {
      const whereOpenPropertiesCount = Object.keys(whereOpen).length;

      if (whereOpenPropertiesCount > 0) {
        const whereOpenWithoutTypes = JSON.parse(JSON.stringify(whereOpen));

        // Transform 'id' (GraphQL) in 'idPopulation' for Prisma Client
        if (whereOpenWithoutTypes.hasOwnProperty('id')) {
          whereOpenWithoutTypes['idPopulation'] = whereOpenWithoutTypes.id;
          // Remove old property
          delete whereOpenWithoutTypes.id;
        }

        // populationFindArgs['where'] = whereOpen;
        populationFindArgs['where'] = whereOpenWithoutTypes;
      }
    }

    // * orderBy, ours
    if (typeof orderBy !== 'undefined') {
      const orderByPropertiesCount = Object.keys(orderBy).length;

      if (orderByPropertiesCount > 0) {
        const orderByWithoutTypes = JSON.parse(JSON.stringify(orderBy));

        // Transform 'id' (GraphQL) in 'idPopulation' for Prisma Client
        if (orderByWithoutTypes.hasOwnProperty('id')) {
          orderByWithoutTypes['idPopulation'] = orderByWithoutTypes.id;
          // Remove old property
          delete orderByWithoutTypes.id;
        }

        populationFindArgs['orderBy'] = orderByWithoutTypes;
      }
    }

    // * orderBy, Prisma Client
    // * orderByOpen as priority over our orderBy
    if (typeof orderByOpen !== 'undefined') {
      const orderByOpenPropertiesCount = Object.keys(orderByOpen).length;

      if (orderByOpenPropertiesCount > 0) {
        const orderByOpenWithoutTypes = JSON.parse(JSON.stringify(orderByOpen));

        // Transform 'id' (GraphQL) in 'idPopulation' for Prisma Client
        //    It's an array
        orderByOpenWithoutTypes.forEach((element) => {
          if (element.hasOwnProperty('id')) {
            element['idPopulation'] = element.id;
            // Remove old property
            delete element.id;
          }
        });

        populationFindArgs['orderBy'] = orderByOpenWithoutTypes;
      }
    }

    // * cursor
    if (typeof cursor !== 'undefined') {
      const cursorPropertiesCount = Object.keys(cursor).length;

      if (cursorPropertiesCount > 0) {
        const cursorWithoutTypes = JSON.parse(JSON.stringify(cursor));

        // Transform 'id' (GraphQL) in 'idPopulation' for Prisma Client
        if (cursorWithoutTypes.hasOwnProperty('id')) {
          cursorWithoutTypes['idPopulation'] = cursorWithoutTypes.id;
          // Remove old property
          delete cursorWithoutTypes.id;
        }
        // No need to transform 'name' to 'name'

        populationFindArgs['cursor'] = cursorWithoutTypes;
      }
    }

    // * distinct
    if (typeof distinct !== 'undefined') {
      const distinctWithoutTypes = JSON.parse(JSON.stringify(distinct));

      // Transform 'all' (GraphQL) in '['name', 'operatorLogical']' for Prisma Client
      if (distinctWithoutTypes === 'all') {
        populationFindArgs['distinct'] = ['name', 'operatorLogical'];
      }

      if (distinctWithoutTypes === 'name') {
        populationFindArgs['distinct'] = ['name'];
      }

      if (distinctWithoutTypes === 'operatorLogical') {
        populationFindArgs['distinct'] = ['operatorLogical'];
      }

      // if (distinctWithoutTypes === 'none')
      // Do nothing. Needs a default value else it crashes when the argument isn't provided
    }

    return this.populationsService.findFirst(
      populationFindArgs as PrismaClient.PopulationFindFirstArgs,
    );
  }

  // * findMany
  @Query(() => [PopulationModel], {
    name: 'populations',
    description: `🔍💯 Récupérer des *Populations*\n& détails relations 🔗
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      populations {
        name
        operatorLogical
      }
    }
    \n#### 🔧 Arguments
    \n**skip** > ⏭️ Skips the first N records
    \n**take** > 🔺 Return the N records max
    \n**where** > 🔍 Search by native field/column/property
    \n**whereOpen** > 🔍♾️ Same as where, but with all GraphQL capabilities provided by Prisma Client
    \n**orderBy** > 🔀 Sort by one or multiple fields, ascendent or descendant.
    \n**orderByOpen** > 🔀 Same as orderBy, but with all GraphQL capabilities provided by Prisma Client.
    Sort by one or multiple fields, and their relations.
    \n**cursor** > 🎯 Start the result from an element. ⚡️ Better performances than ~ > 10 000.
    \n**distinct** > 👥 Filter out duplicates rows for one or all fields. Possible values: allFields, name, operatorLogical
    \n
    {
      populations(skip: 1) {
        name
        operatorLogical
      }
    }
    \n
    {
      populations(take: 1) {
        name
        operatorLogical
      }
    }
    \n
    {
      populations(where: { name: "4_criteres" }) {
        name
        operatorLogical
      }
    }
    \n
    {
      populations(orderBy: { name: desc }) {
        name
        operatorLogical
      }
    }
    \n
    {
      populations(cursor: { name: "4_criteres" }) {
        name
        operatorLogical
      }
    }
    \n
    {
      populations(distinct: allFields) {
        name
        operatorLogical
      }
    }
    \n
    {
      populations(whereOpen: { name: { contains: "c", }, }) {
        name
        operatorLogical
      }
    }
    \n
    {
      populations(orderByOpen: [ { operatorLogical: "desc", }, { name: "desc", }, ]) {
        name
        operatorLogical
      }
    }
    \n
    \n---
    \n#### 🔗 Relations
    \n**PopCriterias [  ]**
    \n
    {
      populations(take: 10) {
        name
        operatorLogical

        popCriterias {
          name
          table
          field
          fieldTypeHelper
          operatorComparison

          popCritValues {
            valueBol
            valueDat
            valueNbr
            valueStr
          }
        }
      }
    }
    \n`,
  })
  async findMany(
    // 2 Args : skip and take
    @Args()
    skipTakeArgs: SkipTakeArgs,

    @Args() findArgs: FindArgs,
  ): Promise<Population[]> {
    const { where, whereOpen, orderBy, orderByOpen, cursor, distinct } =
      findArgs;

    // * Merged arguments for Prisma Client
    const populationFindArgs = {};

    // * skip, take
    Object.entries(skipTakeArgs).forEach(([key, value]) => {
      // * Dynamic property assignation
      populationFindArgs[key] = value;
    });

    // * where, ours
    if (typeof where !== 'undefined') {
      const wherePropertiesCount = Object.keys(where).length;

      if (wherePropertiesCount > 0) {
        const whereWithoutTypes = JSON.parse(JSON.stringify(where));

        // Transform 'id' (GraphQL) in 'idPopulation' for Prisma Client
        if (whereWithoutTypes.hasOwnProperty('id')) {
          whereWithoutTypes['idPopulation'] = whereWithoutTypes.id;
          // Remove old property
          delete whereWithoutTypes.id;
        }

        populationFindArgs['where'] = whereWithoutTypes;
      }
    }

    // * where, Prisma Client
    // * whereOpen as priority over our where
    if (typeof whereOpen !== 'undefined') {
      const whereOpenPropertiesCount = Object.keys(whereOpen).length;

      if (whereOpenPropertiesCount > 0) {
        const whereOpenWithoutTypes = JSON.parse(JSON.stringify(whereOpen));

        // Transform 'id' (GraphQL) in 'idPopulation' for Prisma Client
        if (whereOpenWithoutTypes.hasOwnProperty('id')) {
          whereOpenWithoutTypes['idPopulation'] = whereOpenWithoutTypes.id;
          // Remove old property
          delete whereOpenWithoutTypes.id;
        }

        // populationFindArgs['where'] = whereOpen;
        populationFindArgs['where'] = whereOpenWithoutTypes;
      }
    }

    // * orderBy, ours
    if (typeof orderBy !== 'undefined') {
      const orderByPropertiesCount = Object.keys(orderBy).length;

      if (orderByPropertiesCount > 0) {
        const orderByWithoutTypes = JSON.parse(JSON.stringify(orderBy));

        // Transform 'id' (GraphQL) in 'idPopulation' for Prisma Client
        if (orderByWithoutTypes.hasOwnProperty('id')) {
          orderByWithoutTypes['idPopulation'] = orderByWithoutTypes.id;
          // Remove old property
          delete orderByWithoutTypes.id;
        }

        populationFindArgs['orderBy'] = orderByWithoutTypes;
      }
    }

    // * orderBy, Prisma Client
    // * orderByOpen as priority over our orderBy
    if (typeof orderByOpen !== 'undefined') {
      const orderByOpenPropertiesCount = Object.keys(orderByOpen).length;

      if (orderByOpenPropertiesCount > 0) {
        const orderByOpenWithoutTypes = JSON.parse(JSON.stringify(orderByOpen));

        // Transform 'id' (GraphQL) in 'idPopulation' for Prisma Client
        //    It's an array
        orderByOpenWithoutTypes.forEach((element) => {
          if (element.hasOwnProperty('id')) {
            element['idPopulation'] = element.id;
            // Remove old property
            delete element.id;
          }
        });

        populationFindArgs['orderBy'] = orderByOpenWithoutTypes;
      }
    }

    // * cursor
    if (typeof cursor !== 'undefined') {
      const cursorPropertiesCount = Object.keys(cursor).length;

      if (cursorPropertiesCount > 0) {
        const cursorWithoutTypes = JSON.parse(JSON.stringify(cursor));

        // Transform 'id' (GraphQL) in 'idPopulation' for Prisma Client
        if (cursorWithoutTypes.hasOwnProperty('id')) {
          cursorWithoutTypes['idPopulation'] = cursorWithoutTypes.id;
          // Remove old property
          delete cursorWithoutTypes.id;
        }
        // No need to transform 'name' to 'name'

        populationFindArgs['cursor'] = cursorWithoutTypes;
      }
    }

    // * distinct
    if (typeof distinct !== 'undefined') {
      const distinctWithoutTypes = JSON.parse(JSON.stringify(distinct));

      // Transform 'all' (GraphQL) in '['name', 'operatorLogical']' for Prisma Client
      if (distinctWithoutTypes === 'all') {
        populationFindArgs['distinct'] = ['name', 'operatorLogical'];
      }

      if (distinctWithoutTypes === 'name') {
        populationFindArgs['distinct'] = ['name'];
      }

      if (distinctWithoutTypes === 'operatorLogical') {
        populationFindArgs['distinct'] = ['operatorLogical'];
      }

      // if (distinctWithoutTypes === 'none')
      // Do nothing. Needs a default value else it crashes when the argument isn't provided
    }

    return this.populationsService.findMany(
      populationFindArgs as PrismaClient.PopulationFindManyArgs,
    );
  }

  // ---
  // ---
  // ---

  // ! 🐛 Circular dependancy > to FIX, move to Resource > Resolver
  // // * 📌 Requêtes en dur
  // @Query(() => [ResourceModel], {
  //   name: 'populationsEnDur',
  //   description: `🔍📌 Requêtes en dur
  //   \n#### Exemple d'utilisation
  //   \n##### 🌐 Requête
  //   {
  //     # Default: Boolean_isPointage_equals_true
  //     populationsEnDur {
  //       matricule
  //       socialSecurityNumber
  //     }
  //   }
  //   \n
  //   \n - { populationsEnDur(name: "Boolean_isPointage_not_true") { matricule } }
  //   \n - { populationsEnDur(name: "Date_inDate_equals_2023_12_01") { matricule } }
  //   \n - { populationsEnDur(name: "Date_inDate_not_2023_12_01") { matricule } }
  //   \n - { populationsEnDur(name: "Date_inDate_lowerThan_2003_01_01") { matricule } }
  //   \n - { populationsEnDur(name: "Date_inDate_lowerThanOrEqual_2003_01_01") { matricule } }
  //   \n - { populationsEnDur(name: "Date_inDate_greaterThan_2003_01_01") { matricule } }
  //   \n - { populationsEnDur(name: "Date_inDate_greaterThanOrEqual_2003_01_01") { matricule } }
  //   \n - { populationsEnDur(name: "Date_inDate_in_2023_12_01__2023_06_01") { matricule } }
  //   \n - { populationsEnDur(name: "Date_inDate_notIn_2023_12_01__2023_06_01") { matricule } }
  //   \n - { populationsEnDur(name: "Date_inDate_range_2003_01_01__2008_01_01") { matricule } }
  //   \n - { populationsEnDur(name: "Number_employmentRatePercent_equals_90") { matricule } }
  //   \n - { populationsEnDur(name: "Number_employmentRatePercent_equals_100") { matricule } }
  //   \n - { populationsEnDur(name: "Number_employmentRatePercent_not_100") { matricule } }
  //   \n - { populationsEnDur(name: "Number_employmentRatePercent_in_90_100") { matricule } }
  //   \n - { populationsEnDur(name: "String_firstName_in_Maxime_Pierre_Olivier") { matricule } }
  //   \n - { populationsEnDur(name: "Number_employmentRatePercent_notIn_90_100") { matricule } }
  //   \n - { populationsEnDur(name: "Number_employmentRatePercent_lowerThan_90") { matricule } }
  //   \n - { populationsEnDur(name: "Number_employmentRatePercent_lowerThanOrEqual_90") { matricule } }
  //   \n - { populationsEnDur(name: "Number_employmentRatePercent_greaterThan_90") { matricule } }
  //   \n - { populationsEnDur(name: "Number_employmentRatePercent_greaterThanOrEqual_90") { matricule } }
  //   \n - { populationsEnDur(name: "String_lastName_equals_Chevasson") { matricule } }
  //   \n - { populationsEnDur(name: "String_lastName_not_Chevasson") { matricule } }
  //   \n - { populationsEnDur(name: "String_lastName_in_Chevasson_Courtois") { matricule } }
  //   \n - { populationsEnDur(name: "String_lastName_notIn_Chevasson_Courtois") { matricule } }
  //   \n - { populationsEnDur(name: "String_lastName_contains_a") { matricule } }
  //   \n - { populationsEnDur(name: "String_lastName_startsWith_c") { matricule } }
  //   \n - { populationsEnDur(name: "String_lastName_startsWith_c_insensitive_case") { matricule } }
  //   \n - { populationsEnDur(name: "String_lastName_endsWith_n") { matricule } }
  //   \n - { populationsEnDur(name: "String_lastName_endsWith_n_insensitive_case") { matricule } }
  //   \n - { populationsEnDur(name: "EnumNumber_echelon_equals_2") { matricule } }
  //   \n - { populationsEnDur(name: "EnumString_quality_equals_Monsieur") { matricule } }
  //   \n - { populationsEnDur(name: "Resource_String_matricule_equals_123456A") { matricule } }
  //   \n - { populationsEnDur(name: "Resource_String_matricule_not_123456A") { matricule } }
  //   \n - { populationsEnDur(name: "Resource_String_matricule_in_123456A_987654B") { matricule } }
  //   \n - { populationsEnDur(name: "Resource_String_matricule_notIn_123456A_987654B") { matricule } }
  //   \n - { populationsEnDur(name: "Resource_String_matricule_contains_a") { matricule } }
  //   \n - { populationsEnDur(name: "Resource_String_matricule_startsWith_1") { matricule } }
  //   \n - { populationsEnDur(name: "Resource_String_matricule_endsWith_a") { matricule } }
  //   \n - { populationsEnDur(name: "2C_quality_equals_Mr_AND_lastname_contains_a") { matricule } }
  //   \n - { populationsEnDur(name: "4_criteres") { matricule } }
  //   \n`,
  // })
  // async populationsEnDur(
  //   @Args({
  //     name: 'name',
  //     description: `Name of the test population.\n
  //     \n - Boolean_isPointage_equals_true (default)
  //     \n - Boolean_isPointage_not_true
  //     \n - Date_inDate_equals_2023_12_01
  //     \n - Date_inDate_not_2023_12_01
  //     \n - Date_inDate_lowerThan_2003_01_01
  //     \n - Date_inDate_lowerThanOrEqual_2003_01_01
  //     \n - Date_inDate_greaterThan_2003_01_01
  //     \n - Date_inDate_greaterThanOrEqual_2003_01_01
  //     \n - Date_inDate_in_2023_12_01__2023_06_01
  //     \n - Date_inDate_notIn_2023_12_01__2023_06_01
  //     \n - Date_inDate_range_2003_01_01__2008_01_01
  //     \n - Number_employmentRatePercent_equals_90
  //     \n - Number_employmentRatePercent_equals_100
  //     \n - Number_employmentRatePercent_not_100
  //     \n - Number_employmentRatePercent_in_90_100
  //     \n - String_firstName_in_Maxime_Pierre_Olivier
  //     \n - Number_employmentRatePercent_notIn_90_100
  //     \n - Number_employmentRatePercent_lowerThan_90
  //     \n - Number_employmentRatePercent_lowerThanOrEqual_90
  //     \n - Number_employmentRatePercent_greaterThan_90
  //     \n - Number_employmentRatePercent_greaterThanOrEqual_90
  //     \n - String_lastName_equals_Chevasson
  //     \n - String_lastName_not_Chevasson
  //     \n - String_lastName_in_Chevasson_Courtois
  //     \n - String_lastName_notIn_Chevasson_Courtois
  //     \n - String_lastName_contains_a
  //     \n - String_lastName_startsWith_c
  //     \n - String_lastName_startsWith_c_insensitive_case
  //     \n - String_lastName_endsWith_n
  //     \n - String_lastName_endsWith_n_insensitive_case
  //     \n - EnumNumber_echelon_equals_2
  //     \n - EnumString_quality_equals_Monsieur
  //     \n - Resource_String_matricule_equals_123456A
  //     \n - Resource_String_matricule_not_123456A
  //     \n - Resource_String_matricule_in_123456A_987654B
  //     \n - Resource_String_matricule_notIn_123456A_987654B
  //     \n - Resource_String_matricule_contains_a
  //     \n - Resource_String_matricule_startsWith_1
  //     \n - Resource_String_matricule_endsWith_a
  //     \n - 2C_quality_equals_Mr_AND_lastname_contains_a
  //     \n - 4_criteres
  //     \n`,
  //     nullable: true,
  //     type: () => String,
  //   })
  //   name: string,
  // ): Promise<Resource[] | null> {
  //   console.time('⏱️ populationsEnDur');
  //   console.log(name);

  //   // Default
  //   // Boolean_isPointage_equals_true
  //   let resourceFindManyArgs: any = {
  //     where: {
  //       resourceBolVals: {
  //         some: {
  //           fieldnameHelper: 'isPointage',
  //           value: true,
  //         },
  //       },
  //     },
  //   };

  //   switch (name) {
  //     // Boolean_isPointage_not_true
  //     case 'Boolean_isPointage_not_true':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceBolVals: {
  //             // none: {
  //             //   fieldnameHelper: 'isPointage',
  //             //   value: true,
  //             // },
  //             some: {
  //               fieldnameHelper: 'isPointage',
  //               value: { not: true },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Date_inDate_equals_2023_12_01
  //     case 'Date_inDate_equals_2023_12_01':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceDatVals: {
  //             some: {
  //               fieldnameHelper: 'inDate',
  //               // ! 🚨 new Date()
  //               value: new Date('2023-12-01'),
  //               // value: new Date('2023-12-01').toISOString(),
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Date_inDate_not_2023_12_01
  //     case 'Date_inDate_not_2023_12_01':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceDatVals: {
  //             some: {
  //               fieldnameHelper: 'inDate',
  //               // ! 🚨 new Date()
  //               value: { not: new Date('2023-12-01') },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Date_inDate_lowerThan_2003_01_01
  //     case 'Date_inDate_lowerThan_2003_01_01':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceDatVals: {
  //             some: {
  //               fieldnameHelper: 'inDate',
  //               // ! 🚨 new Date()
  //               value: { lt: new Date('2003-01-01') },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Date_inDate_lowerThanOrEqual_2003_01_01
  //     case 'Date_inDate_lowerThanOrEqual_2003_01_01':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceDatVals: {
  //             some: {
  //               fieldnameHelper: 'inDate',
  //               // ! 🚨 new Date()
  //               value: { lte: new Date('2003-01-01') },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Date_inDate_greaterThan_2003_01_01
  //     case 'Date_inDate_greaterThan_2003_01_01':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceDatVals: {
  //             some: {
  //               fieldnameHelper: 'inDate',
  //               // ! 🚨 new Date()
  //               value: { gt: new Date('2003-01-01') },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Date_inDate_greaterThanOrEqual_2003_01_01
  //     case 'Date_inDate_greaterThanOrEqual_2003_01_01':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceDatVals: {
  //             some: {
  //               fieldnameHelper: 'inDate',
  //               // ! 🚨 new Date()
  //               value: { gte: new Date('2003-01-01') },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Date_inDate_in_2023_12_01__2023_06_01
  //     case 'Date_inDate_in_2023_12_01__2023_06_01':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceDatVals: {
  //             some: {
  //               fieldnameHelper: 'inDate',
  //               // ! 🚨 new Date()
  //               value: {
  //                 in: [new Date('2023-12-01'), new Date('2023-06-01')],
  //               },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Date_inDate_notIn_2023_12_01__2023_06_01
  //     case 'Date_inDate_notIn_2023_12_01__2023_06_01':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceDatVals: {
  //             some: {
  //               fieldnameHelper: 'inDate',
  //               // ! 🚨 new Date()
  //               value: {
  //                 notIn: [new Date('2023-12-01'), new Date('2023-06-01')],
  //               },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // 💩
  //     // // Date_inDate_contains_2023
  //     // case 'Date_inDate_contains_2023':
  //     //   resourceFindManyArgs = {
  //     //     where: {
  //     //       resourceDatVals: {
  //     //         some: {
  //     //           fieldnameHelper: 'inDate',
  //     //           // ! 🚨 new Date()
  //     //           value: {
  //     //             contains: '2023',
  //     //           },
  //     //         },
  //     //       },
  //     //     },
  //     //   };
  //     //   break;

  //     // Date_inDate_range_2003_01_01__2008_01_01
  //     case 'Date_inDate_range_2003_01_01__2008_01_01':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceDatVals: {
  //             some: {
  //               fieldnameHelper: 'inDate',
  //               // ! 🚨 new Date()
  //               // ! 🚨 1st date < 2eme date
  //               value: {
  //                 gte: new Date('2003-01-01'),
  //                 lte: new Date('2008-01-01'),
  //               },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Number_employmentRatePercent_equals_90
  //     case 'Number_employmentRatePercent_equals_90':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceNbrVals: {
  //             some: {
  //               fieldnameHelper: 'employmentRatePercent',
  //               value: 90,
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Number_employmentRatePercent_equals_100
  //     case 'Number_employmentRatePercent_equals_100':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceNbrVals: {
  //             some: {
  //               fieldnameHelper: 'employmentRatePercent',
  //               value: 100,
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Number_employmentRatePercent_not_100
  //     case 'Number_employmentRatePercent_not_100':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceNbrVals: {
  //             // none: {
  //             //   fieldnameHelper: 'employmentRatePercent',
  //             //   value: 100,
  //             // },
  //             some: {
  //               fieldnameHelper: 'employmentRatePercent',
  //               value: { not: 100 },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Number_employmentRatePercent_in_90_100
  //     case 'Number_employmentRatePercent_in_90_100':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceNbrVals: {
  //             some: {
  //               fieldnameHelper: 'employmentRatePercent',
  //               value: { in: [90, 100] },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // String_firstName_in_Maxime_Pierre_Olivier
  //     case 'String_firstName_in_Maxime_Pierre_Olivier':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceStrVals: {
  //             some: {
  //               fieldnameHelper: 'firstName',
  //               value: { in: ['Maxime', 'Pierre-Olivier'] },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Number_employmentRatePercent_notIn_90_100
  //     case 'Number_employmentRatePercent_notIn_90_100':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceNbrVals: {
  //             some: {
  //               fieldnameHelper: 'employmentRatePercent',
  //               value: { notIn: [90, 100] },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Number_employmentRatePercent_lowerThan_90
  //     case 'Number_employmentRatePercent_lowerThan_90':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceNbrVals: {
  //             some: {
  //               fieldnameHelper: 'employmentRatePercent',
  //               value: { lt: 90 },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Number_employmentRatePercent_lowerThanOrEqual_90
  //     case 'Number_employmentRatePercent_lowerThanOrEqual_90':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceNbrVals: {
  //             some: {
  //               fieldnameHelper: 'employmentRatePercent',
  //               value: { lte: 90 },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Number_employmentRatePercent_greaterThan_90
  //     case 'Number_employmentRatePercent_greaterThan_90':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceNbrVals: {
  //             some: {
  //               fieldnameHelper: 'employmentRatePercent',
  //               value: { gt: 90 },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Number_employmentRatePercent_greaterThanOrEqual_90
  //     case 'Number_employmentRatePercent_greaterThanOrEqual_90':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceNbrVals: {
  //             some: {
  //               fieldnameHelper: 'employmentRatePercent',
  //               value: { gte: 90 },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // String_lastName_equals_Chevasson
  //     case 'String_lastName_equals_Chevasson':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceStrVals: {
  //             some: {
  //               fieldnameHelper: 'lastName',
  //               value: 'Chevasson',
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // String_lastName_not_Chevasson
  //     case 'String_lastName_not_Chevasson':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceStrVals: {
  //             // ! 🚨 Différence ? la non mais probab. si plusieurs critères
  //             // none: {
  //             //   fieldnameHelper: 'lastName',
  //             //   value: 'Chevasson',
  //             // },
  //             some: {
  //               fieldnameHelper: 'lastName',
  //               value: { not: 'Chevasson' },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // String_lastName_in_Chevasson_Courtois
  //     case 'String_lastName_in_Chevasson_Courtois':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceStrVals: {
  //             some: {
  //               fieldnameHelper: 'lastName',
  //               value: { in: ['Chevasson', 'Courtois'] },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // String_lastName_notIn_Chevasson_Courtois
  //     case 'String_lastName_notIn_Chevasson_Courtois':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceStrVals: {
  //             some: {
  //               fieldnameHelper: 'lastName',
  //               value: { notIn: ['Chevasson', 'Courtois'] },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // String_lastName_contains_a
  //     case 'String_lastName_contains_a':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceStrVals: {
  //             some: {
  //               fieldnameHelper: 'lastName',
  //               value: { contains: 'a' },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // ---
  //     // ⚡️ Performances recommandations on text filtering in Postgre
  //     //      Options for case-insensitive filtering
  //     //        https://www.prisma.io/docs/orm/prisma-client/queries/case-sensitivity#options-for-case-insensitive-filtering
  //     //
  //     // String_lastName_startsWith_c
  //     case 'String_lastName_startsWith_c':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceStrVals: {
  //             some: {
  //               fieldnameHelper: 'lastName',
  //               value: { startsWith: 'C' },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // String_lastName_startsWith_c_insensitive_case
  //     case 'String_lastName_startsWith_c_insensitive_case':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceStrVals: {
  //             some: {
  //               fieldnameHelper: 'lastName',
  //               value: {
  //                 startsWith: 'c',
  //                 mode: 'insensitive',
  //               },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // String_lastName_endsWith_n
  //     case 'String_lastName_endsWith_n':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceStrVals: {
  //             some: {
  //               fieldnameHelper: 'lastName',
  //               value: {
  //                 endsWith: 'n',
  //               },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // String_lastName_endsWith_n_insensitive_case
  //     case 'String_lastName_endsWith_n_insensitive_case':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceStrVals: {
  //             some: {
  //               fieldnameHelper: 'lastName',
  //               value: {
  //                 endsWith: 'n',
  //                 mode: 'insensitive',
  //               },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // EnumNumber_echelon_equals_2
  //     // ! 🚨 Jointure supplémentaire via ResourceEnumVal
  //     case 'EnumNumber_echelon_equals_2':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceEnumVals: {
  //             some: {
  //               // ! 🚨 One to many
  //               resourceEnumNbrVal: {
  //                 is: {
  //                   fieldnameHelper: 'echelon',
  //                   value: 2,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // EnumString_quality_equals_Monsieur
  //     // ! 🚨 Jointure supplémentaire via ResourceEnumVal
  //     case 'EnumString_quality_equals_Monsieur':
  //       resourceFindManyArgs = {
  //         where: {
  //           resourceEnumVals: {
  //             some: {
  //               // ! 🚨 One to many
  //               resourceEnumStrVal: {
  //                 is: {
  //                   fieldnameHelper: 'quality',
  //                   value: 'Monsieur',
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       };
  //       break;

  //     // Resource_String_matricule_equals_123456A
  //     case 'Resource_String_matricule_equals_123456A':
  //       resourceFindManyArgs = {
  //         where: {
  //           matricule: '123456A',
  //         },
  //       };
  //       break;

  //     // Resource_String_matricule_not_123456A
  //     case 'Resource_String_matricule_not_123456A':
  //       resourceFindManyArgs = {
  //         where: {
  //           matricule: { not: '123456A' },
  //         },
  //       };
  //       break;

  //     // Resource_String_matricule_in_123456A_987654B
  //     case 'Resource_String_matricule_in_123456A_987654B':
  //       resourceFindManyArgs = {
  //         where: {
  //           matricule: { in: ['123456A', '987654B'] },
  //         },
  //       };
  //       break;

  //     // Resource_String_matricule_notIn_123456A_987654B
  //     case 'Resource_String_matricule_notIn_123456A_987654B':
  //       resourceFindManyArgs = {
  //         where: {
  //           matricule: { notIn: ['123456A', '987654B'] },
  //         },
  //       };
  //       break;

  //     // Resource_String_matricule_contains_a
  //     case 'Resource_String_matricule_contains_a':
  //       resourceFindManyArgs = {
  //         where: {
  //           matricule: { contains: 'a' },
  //         },
  //       };
  //       break;

  //     // Resource_String_matricule_startsWith_1
  //     case 'Resource_String_matricule_startsWith_1':
  //       resourceFindManyArgs = {
  //         where: {
  //           matricule: { startsWith: '1' },
  //         },
  //       };
  //       break;

  //     // Resource_String_matricule_endsWith_a
  //     case 'Resource_String_matricule_endsWith_a':
  //       resourceFindManyArgs = {
  //         where: {
  //           matricule: { endsWith: 'a' },
  //         },
  //       };
  //       break;

  //     // * Deux Critères
  //     // 2C_quality_equals_Mr_AND_lastname_contains_a
  //     case '2C_quality_equals_Mr_AND_lastname_contains_a':
  //       resourceFindManyArgs = {
  //         where: {
  //           // ! 🚨 Logical Operator between criterias
  //           AND: [
  //             // quality_equals_Mr
  //             {
  //               resourceEnumVals: {
  //                 some: {
  //                   // ! 🚨 One to many (ENUM)
  //                   resourceEnumStrVal: {
  //                     is: {
  //                       fieldnameHelper: 'quality',
  //                       value: 'Monsieur',
  //                     },
  //                   },
  //                 },
  //               },
  //             },

  //             // lastname_contains_a
  //             {
  //               resourceStrVals: {
  //                 some: {
  //                   fieldnameHelper: 'lastName',
  //                   value: { contains: 'a', mode: 'insensitive' },
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       };
  //       break;

  //     // * 4 Critères
  //     // 4_criteres
  //     case '4_criteres':
  //       resourceFindManyArgs = {
  //         where: {
  //           // ! 🚨 Logical Operator between criterias
  //           AND: [
  //             // popCriteria_EnumString_contract_equals_CDI
  //             {
  //               resourceEnumVals: {
  //                 some: {
  //                   // ! 🚨 One to many (ENUM)
  //                   resourceEnumStrVal: {
  //                     is: {
  //                       fieldnameHelper: 'contract',
  //                       value: 'CDI',
  //                     },
  //                   },
  //                 },
  //               },
  //             },

  //             // popCriteria_EnumNumber_echelon_in_1_2_3
  //             {
  //               resourceEnumVals: {
  //                 some: {
  //                   // ! 🚨 One to many
  //                   resourceEnumNbrVal: {
  //                     is: {
  //                       fieldnameHelper: 'echelon',
  //                       value: { in: [1, 2, 3] },
  //                     },
  //                   },
  //                 },
  //               },
  //             },

  //             // popCriteria_Number_employmentRatePercent_greaterThan_90_2
  //             {
  //               resourceNbrVals: {
  //                 some: {
  //                   fieldnameHelper: 'employmentRatePercent',
  //                   value: { gt: 90 },
  //                 },
  //               },
  //             },

  //             // popCriteria_Resource_String_matricule_contains_a_2
  //             {
  //               matricule: { contains: 'a' },
  //             },
  //           ],
  //         },
  //       };
  //       break;
  //   }

  // !                                   🐛 v must be called from inside Resource
  //   const returnFindMany = await this.resourcesService.findMany(
  //     resourceFindManyArgs as PrismaClient.ResourceFindManyArgs,
  //   );

  //   console.timeEnd('⏱️ populationsEnDur');

  //   return returnFindMany;
  // }

  // ---
  // ---
  // ---

  // ! ⬆️ Mutations

  // * create
  @Mutation(() => PopulationModel, {
    name: 'createPopulation',
    description: `🔨+🔗 Créer un *Population*, avec possibilité de créer également ses valeurs String (nested)
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddOne($params: CreatePopulationInput) {
      createPopulation(params: $params) {
        name
        operatorLogical

        popCriterias {
          name
          table
          field
          fieldTypeHelper
          operatorComparison
        }
      }
    }
    \n##### 💬 Variables
    \n
    {
      "params": {
        "name": "Population name (MUST BE UNIQUE)",
        "operatorLogical": "AND",

        "popCriterias": {
          "create": [
            {
              "name": "PopCriteria name",
              "table": "ResourceField",
              "field": "lastName",
              "fieldTypeHelper": "String",
              "operatorComparison": "equals"
            }
          ]
        }
      }
    }
    \n`,
  })
  async createPopulation(
    @Args({
      name: 'params',
      description: `Object containing values for Population, and optionnaly also PopCriterias.`,
      nullable: true,
      type: () => CreatePopulationInput,
    })
    params: CreatePopulationInput,
  ): Promise<Population | null> {
    const data: PrismaClient.PopulationCreateInput =
      params as PrismaClient.PopulationCreateInput;

    return this.populationsService.create(data);
  }

  // * createOpen
  @Mutation(() => PopulationModel, {
    name: 'createPopulationOpen',
    description: `🔨🆓 Créer un *Population*, passage de ce qu'on veut (PC) en argument
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddOne($params: JSONObject) {
      createPopulationOpen(params: $params) {
        name
        operatorLogical

        popCriterias {
          name
          table
          field
          fieldTypeHelper
          operatorComparison
        }
      }
    }
    \n##### 💬 Variables
    \n
    {
      "params": {
        "name": "Population name (MUST BE UNIQUE)",
        "operatorLogical": "AND",

        "popCriterias": {
          "create": [
            {
              "name": "PopCriteria name",
              "table": "ResourceField",
              "field": "lastName",
              "fieldTypeHelper": "String",
              "operatorComparison": "equals"
            }
          ]
        }
      }
    }
    \n`,
  })
  async createPopulationOpen(
    @Args({
      name: 'params',
      description: `Object containing values for Population, and optionnaly also PopCriterias.`,
      nullable: true,
      type: () => GraphQLJSONObject,
    })
    params: PrismaClient.PopulationCreateInput,
  ): Promise<Population | null> {
    return this.populationsService.create(
      params as PrismaClient.PopulationCreateInput,
    );
  }

  @Mutation(() => CountModel, {
    name: 'createManyPopulations',
    description: `🏭 Créer plusieurs *Populations*, ne supporte pas la création nestée
    \nRenvoi le nombre de *Populations* créés, potentiellement sans doublons.
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddMany($populations: [CreateManyPopulationsInput!]!) {
      createManyPopulations(populations: $populations, skipDuplicates: true) {
        count
      }
    }
    \n##### 💬 Variables
    \n
    {
      "populations": [
        {"name": "many first name", "operatorLogical": "AND"},
        {"name": "many second name", "operatorLogical": "AND"},
        {"name": "many third name", "operatorLogical": "AND"},
        {"name": "doublon", "operatorLogical": "AND"},
        {"name": "doublon", "operatorLogical": "AND"}
      ]
    }
    \n
    \n#### 🔧 Arguments
    \n**populations** > Un tableau de Populations à créer
    \n**skipDuplicates** > 👥 Boolean, si \`true\` ne rajoute pas les doublons
    `,
  })
  async createManyPopulations(
    @Args({
      name: 'populations',
      description: `Tableau de Références.`,
      nullable: false,
      type: () => [CreateManyPopulationsInput],
    })
    populations: CreateManyPopulationsInput[],

    @Args({
      name: 'skipDuplicates',
      defaultValue: true,
      description: `Supprimer les doublons ?`,
      nullable: false,
      type: () => Boolean,
    })
    skipDuplicates: boolean,
  ): Promise<CountModel> {
    const params: PrismaClient.PopulationCreateManyArgs = {
      data: populations,
      skipDuplicates: skipDuplicates,
    };

    const countModel: CountModel = (await this.populationsService.createMany(
      params,
    )) as CountModel;
    return countModel;
  }

  // * update
  @Mutation(() => PopulationModel, {
    name: 'updatePopulation',
    description: `⬆️+🔗 Mettre à jour un *Population*, avec possibilité de créer/connecter également ses valeurs String (nested)
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testUpdateOne($where: FindUniquePopulationInput!, $data: UpdatePopulationInput!) {
      updatePopulation(where: $where, data: $data) {
        name
        operatorLogical

        popCriterias {
          name
          table
          field
          fieldTypeHelper
          operatorComparison
        }
      }
    }
    \n##### 💬 Variables, ✨ création nestée
    \n
    {
      "where": {
        "name": "Le nom de la Population à mettre à jour"
      },
      "data": {
        "name": "Nouveau nom",
        "operatorLogical": "AND",

        "popCriterias": {
          "create": [
            {
              "name": "PopCriteria name",
              "table": "ResourceField",
              "field": "lastName",
              "fieldTypeHelper": "String",
              "operatorComparison": "equals"
            }
          ]
        }
      }
    }
    \n##### 💬 Variables, 🔗 connexion nestée
    \n
    \n 🌱 Uniquement via l'identifiant pour le moment (seul champ unique de PopCriteria)
    \n
    {
      "where": {
        "name": "Le nom de la Population à mettre à jour"
      },
      "data": {
        "popCriterias": {
          "connect": {
            "id": "PopCriteria id"
          }
        }
      }
    }
    \n##### 💬 Variables, 🔗❌ déconnexion nestée
    \n
    \n 💩 KO pour le moment ?
    \n
    {
      "where": {
        "name": "Le nom de la Population à mettre à jour"
      },
      "data": {
        "popCriterias": {
          "disconnect": {
            "id": "PopCriteria id"
          }
        }
      }
    }
    \n`,
  })
  async updatePopulation(
    @Args('where')
    findUniquePopulation: FindUniquePopulation,

    @Args('data')
    dataInput: UpdatePopulationInput,
  ): Promise<Population | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopulation).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idPopulation' NestJs
    if (findUniquePopulation.hasOwnProperty('id')) {
      whereUniqueInput['idPopulation'] = findUniquePopulation.id;
    }

    if (findUniquePopulation.hasOwnProperty('name')) {
      whereUniqueInput['name'] = findUniquePopulation.name;
    }

    // * data
    const params: {
      where: PrismaClient.PopulationWhereUniqueInput;
      data: PrismaClient.PopulationUpdateInput;
    } = {
      where: whereUniqueInput as PrismaClient.PopulationWhereUniqueInput,
      data: dataInput as PrismaClient.PopulationUpdateInput,
    };
    return this.populationsService.update(params);
  }

  // * updateOpen
  @Mutation(() => PopulationModel, {
    name: 'updatePopulationOpen',
    description: `⬆️🆓 Modifier un *Population*, passage de ce qu'on veut (PC) en argument
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testUpdateOne($where: FindUniquePopulationInput!, $data: JSONObject!) {
      updatePopulationOpen(where: $where, data: $data) {
        name
        operatorLogical

        popCriterias {
          name
          table
          field
          fieldTypeHelper
          operatorComparison
        }
      }
    }
    \n##### 💬 Variables, ✨ création nestée
    \n
    {
      "where": {
        "name": "Le nom de la Population à mettre à jour"
      },
      "data": {
        "name": "Nouveau nom",
        "operatorLogical": "AND",

        "popCriterias": {
          "create": [
            {
              "name": "PopCriteria name",
              "table": "ResourceField",
              "field": "lastName",
              "fieldTypeHelper": "String",
              "operatorComparison": "equals"
            }
          ]
        }
      }
    }
    \n##### 💬 Variables, 🔗 connexion nestée
    \n
    \n 🌱 Uniquement via l'identifiant pour le moment (seul champ unique de PopCriteria)
    \n
    {
      "where": {
        "name": "Le nom de la Population à mettre à jour"
      },
      "data": {
        "popCriterias": {
          "connect": {
            "id": "PopCriteria id"
          }
        }
      }
    }
    \n##### 💬 Variables, 🔗❌ déconnexion nestée
    \n
    \n 💩 KO pour le moment ?
    \n
    {
      "where": {
        "name": "Le nom de la Population à mettre à jour"
      },
      "data": {
        "popCriterias": {
          "disconnect": {
            "id": "PopCriteria id"
          }
        }
      }
    }
    \n`,
  })
  async updatePopulationOpen(
    @Args('where')
    findUniquePopulation: FindUniquePopulation,

    @Args({
      name: 'data',
      description: `Object containing values for Population, and optionnaly also PopCriterias.`,
      nullable: true,
      type: () => GraphQLJSONObject,
    })
    dataInput: PrismaClient.PopulationUpdateInput,
  ): Promise<Population | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopulation).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idPopulation' NestJs
    if (findUniquePopulation.hasOwnProperty('id')) {
      whereUniqueInput['idPopulation'] = findUniquePopulation.id;
    }

    if (findUniquePopulation.hasOwnProperty('name')) {
      whereUniqueInput['name'] = findUniquePopulation.name;
    }

    // * data
    const params: {
      where: PrismaClient.PopulationWhereUniqueInput;
      data: PrismaClient.PopulationUpdateInput;
    } = {
      where: whereUniqueInput as PrismaClient.PopulationWhereUniqueInput,
      data: dataInput as PrismaClient.PopulationUpdateInput,
    };
    return this.populationsService.update(params);
  }

  // * delete
  @Mutation(() => PopulationModel, {
    name: 'deletePopulation',
    description: `🔥🔗 Supprimer un *Population*
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testRemoveOne($name: String) {
      deletePopulation(name: $name) {
        name
        operatorLogical
        
        popCriterias {
          name
          table
          field
          fieldTypeHelper
          operatorComparison
        }
      }
    }
    \n##### 💬 Variables
    \n 👋 Change name to target wanted entry
    \n 🚨🔥🔗 It will delete all connected PopCriterias
    \n
    {
      "name": "Test delete nested"
    }
    \n`,
  })
  async deletePopulation(
    @Args()
    findUniquePopulation: FindUniquePopulation,
  ): Promise<Population | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopulation).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idPopulation' NestJs
    if (findUniquePopulation.hasOwnProperty('id')) {
      whereUniqueInput['idPopulation'] = findUniquePopulation.id;
    }

    if (findUniquePopulation.hasOwnProperty('name')) {
      whereUniqueInput['name'] = findUniquePopulation.name;
    }

    return this.populationsService.remove(
      whereUniqueInput as PrismaClient.PopulationWhereUniqueInput,
    );
  }

  // ---
  // ---
  // ---
  // ---
  // ---
  // ---
  // ---
  // ---
  // ---
  // ---

  // * 👪 Get population from its name
  @Query(() => PopulationModel, {
    name: 'getPopulationFromName',
    description: `🔍👪➡️📁 Récupérer les resources d'une population
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    { 
      getPopulationFromName(name: "Boolean_isPointage_equals_true") {
        name
        operatorLogical

        popCriterias {
          name
          table
          field
          fieldTypeHelper
          operatorComparison

          popCritValues {
            valueBol
            valueDat
            valueNbr
            valueStr
          }
        }
      }
    }
    \n
    \n##### 👷 All populations names are available in a single request
    \n
    \n  { populations { name } }
    \n
    \n##### 🌐 Default if no name is provided
    \n
    \n  Default: Boolean_isPointage_equals_true
    \n
    \n#### 🔧 Arguments
    \n✨**name** > Name of the population
    `,
  })
  async getPopulationFromName(
    @Args({
      name: 'name',
      description: `Name of the population.\n
      \n
      \n
      \n##### 👷 All populations names are available in a single request
      \n
      \n  { populations { name } }
      \n
      \n  🌱 Some seeded examples :
      \n
      \n - Boolean_isPointage_equals_true
      \n - Boolean_isPointage_not_true
      \n - Date_inDate_equals_2023_12_01
      \n - Date_inDate_not_2023_12_01
      \n - Date_inDate_lowerThan_2003_01_01
      \n - Date_inDate_lowerThanOrEqual_2003_01_01
      \n - Date_inDate_greaterThan_2003_01_01
      \n - Date_inDate_greaterThanOrEqual_2003_01_01
      \n - Date_inDate_in_2023_12_01__2023_06_01
      \n - Date_inDate_notIn_2023_12_01__2023_06_01
      \n - Date_inDate_range_2003_01_01__2008_01_01
      \n - Number_employmentRatePercent_equals_100
      \n - Number_employmentRatePercent_not_100
      \n - Number_employmentRatePercent_in_90_100
      \n - Number_employmentRatePercent_notIn_90_100
      \n - Number_employmentRatePercent_lowerThan_90
      \n - Number_employmentRatePercent_lowerThanOrEqual_90
      \n - Number_employmentRatePercent_greaterThan_90
      \n - Number_employmentRatePercent_greaterThanOrEqual_90
      \n - Number_employmentRatePercent_range_80_90
      \n - String_lastName_equals_Chevasson
      \n - String_lastName_not_Chevasson
      \n - String_lastName_in_Chevasson_Courtois
      \n - String_lastName_notIn_Chevasson_Courtois
      \n - String_lastName_contains_a
      \n - String_lastName_startsWith_c
      \n - String_lastName_endsWith_n
      \n - EnumNumber_echelon_equals_2
      \n - EnumString_quality_equals_Monsieur
      \n - Resource_String_matricule_equals_123456A
      \n - Resource_String_matricule_not_123456A
      \n - Resource_String_matricule_in_123456A_987654B
      \n - Resource_String_matricule_notIn_123456A_987654B
      \n - Resource_String_matricule_contains_a
      \n - Resource_String_matricule_startsWith_1
      \n - Resource_String_matricule_endsWith_a
      \n - 2C_quality_equals_Mr_AND_lastname_contains_a
      \n - 4_criteres
      \n`,
      nullable: true,
      type: () => String,
    })
    name: string,
  ): Promise<Population | null> {
    const population = this.populationsService.getPopulationFromName(name);
    return population;
  }
}
