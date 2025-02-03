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
  PopCriteria,
  PopCritValue,
  Population,
  Prisma as PrismaClient,
} from '@prisma/client';

// * Generics
import { SkipTakeArgs } from '../_utility/graphql/args/skip-take.args';
import { CountModel } from '../_utility/graphql/models/count.model';

// * PopCriteria
// Internal
import { PopCriteriasService } from './pop-criterias.service';
// ENUMs
import { PopCriteriaDistinctEnum } from './enums/pop-criteria-distinct.enum';
// DTOs
import { PopCriteriaEntity } from './entities/pop-criteria.entity';
import { PopCriteriaModel } from './models/pop-criteria.model';
import { CreatePopCriteriaInput } from './dto/create-pop-criteria.input';
import { CreateManyPopCriteriasInput } from './dto/create-many-pop-criterias.input';
import { FindArgs } from './dto/find-pop-criteria.args';
import { FindUniquePopCriteria } from './dto/find-unique-pop-criteria';
import { UpdatePopCriteriaInput } from './dto/update-pop-criteria.input';

// 🔗 Relations, nested fields
// import { ResourceFieldsService } from '../resource-fields/resource-fields.service';

import { PopCritValueModel } from '../pop-crit-values/models/pop-crit-value.model';
import { PopCritValuesService } from '../pop-crit-values/pop-crit-values.service';

import { PopulationModel } from '../populations/models/population.model';
import { PopulationsService } from '../populations/populations.service';

@Resolver(() => PopCriteriaModel)
export class PopCriteriasResolver {
  constructor(
    private readonly popCriteriasService: PopCriteriasService,
    // 🔗 Relations
    // private readonly resourceFieldsService: ResourceFieldsService,
    private readonly popCritValuesService: PopCritValuesService,
    private readonly populationsService: PopulationsService,
  ) {
    // ! 🔢 Dedicated ENUMs
    registerEnumType(PopCriteriaDistinctEnum, {
      name: 'PopCriteriaDistinctEnum',
      description: '👥 Filter out duplicates rows for one or all fields.',
      valuesMap: {
        allFields: {
          description:
            '👥 Filter out duplicates rows for all name, table, field, fieldTypeHelper, operatorComparison',
        },
        name: {
          description: '👥 Filter out duplicates rows for name',
        },
        table: {
          description: '👥 Filter out duplicates rows for table',
        },
        field: {
          description: '👥 Filter out duplicates rows for field',
        },
        fieldTypeHelper: {
          description: '👥 Filter out duplicates rows for fieldTypeHelper',
        },
        operatorComparison: {
          description: '👥 Filter out duplicates rows for operatorComparison',
        },
        none: {
          description: 'Default value, no deduplicate.',
        },
      },
    });
  }

  // ---

  // ! 🔗 Relations, nested fields
  popCritValue;
  // * PopCritValues / Many to one / Return [0-N] 📦📦📦
  @ResolveField('popCritValues', () => [PopCritValueModel])
  async popCritValues(
    @Parent() popCriteria: PopCriteriaEntity,
  ): Promise<PopCritValue[]> {
    // * Do not overload if already defined (include/filters in the service)
    if (popCriteria.hasOwnProperty('popCritValues')) {
      return popCriteria['popCritValues'];
    }

    // * If not, return all related entries (join)
    const { idPopCriteria } = popCriteria;
    return this.popCritValuesService.findMany({
      where: {
        popCriteriaId: idPopCriteria,
      },
    });
  }

  // ---

  // * Population / One to many / Return only one 📦
  @ResolveField('population', () => PopulationModel)
  async population(
    @Parent() popCriteria: PopCriteriaEntity,
  ): Promise<Population | null> {
    // * Do not overload if already defined (include/filters in the service)
    if (popCriteria.hasOwnProperty('population')) {
      return popCriteria['population'];
    }

    // * If not, return all related entries (join)
    const { populationId } = popCriteria;

    // If no relation is found, return null
    if (populationId === null) return null;

    // Appel de la méthode du service de la ressource concernée
    //    Besoin de passer le service concerné dans le constructeur
    return this.populationsService.findUnique({
      idPopulation: populationId,
    });
  }

  // ---

  // ! 🔍 Query / Queries

  // * findUnique
  @Query(() => PopCriteriaModel, {
    name: 'popCriteria',
    description: `🔍⭐ Rechercher par ID
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      popCriteria(id: "00000000-0000-0000-909c-000000000001") {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    \n#### 🔧 Arguments
    \n**id** > PopCriteria unique ID
    \n**name** > PopCriteria unique name
    \n
    \n---
    \n#### 🔗 Relations
    \n**Population**
    \n**PopCritValues [  ]**
    \n
    {
      popCriteria(id: "00000000-0000-0000-909c-000000000001") {
        name
        table
        field
        fieldTypeHelper
        operatorComparison

        population {
          name
          operatorLogical
        }
        
        popCritValues {
          valueBol
          valueDat
          valueNbr
          valueStr
        }
      }
    }
    \n`,
  })
  async findUnique(
    @Args()
    findUniquePopCriteria: FindUniquePopCriteria,
  ): Promise<PopCriteria | null> {
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopCriteria).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // TODO: 🌱 Automatic property renaming/mapping ~= id for GraphQL > idPopCriteria for PC
    // Object.entries(findUniquePopCriteria).forEach(([key, value]) => {
    //   console.log(`${key}: ${value}`);
    //   // * Dynamic property assignation
    //   whereUniqueInput[key] = value;
    // });

    // Transformer 'id' (GraphQL) en 'idPopCriteria' NestJs
    if (findUniquePopCriteria.hasOwnProperty('id')) {
      whereUniqueInput['idPopCriteria'] = findUniquePopCriteria.id;
    }

    return this.popCriteriasService.findUnique(
      whereUniqueInput as PrismaClient.PopCriteriaWhereUniqueInput,
    );
  }

  // * findFirst
  @Query(() => PopCriteriaModel, {
    name: 'popCriteriaFindFirst',
    description: `🔍🥇 Rechercher et récupérer le premier qui correspond
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      popCriteriaFindFirst {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
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
    \n**distinct** > 👥 Filter out duplicates rows for one or all fields. Possible values: allFields, name, table, field, fieldTypeHelper, operatorComparison
    \n
    {
      popCriteriaFindFirst(skip: 1) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriteriaFindFirst(take: 1) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriteriaFindFirst(where: { id: "00000000-0000-0000-909c-000000000001" }) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    
    \n
    {
      popCriteriaFindFirst(orderBy: {name: desc}) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriteriaFindFirst(cursor: { id: "00000000-0000-0000-909c-000000000001" }) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriteriaFindFirst(distinct: allFields) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriteriaFindFirst(whereOpen: { name: { contains: "c", }, }) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriteriaFindFirst(orderByOpen: [ { table: "desc", }, { field: "desc", } ,]) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    \n---
    \n#### 🔗 Relations
    \n**Population**
    \n**PopCritValues [  ]**
    \n
    {
      popCriteriaFindFirst {
        name
        table
        field
        fieldTypeHelper
        operatorComparison

        population {
          name
          operatorLogical
        }
        
        popCritValues {
          valueBol
          valueDat
          valueNbr
          valueStr
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
  ): Promise<PopCriteria | null> {
    const { where, whereOpen, orderBy, orderByOpen, cursor, distinct } =
      findArgs;

    // * Merged arguments for Prisma Client
    const popCriteriaFindArgs = {};

    // * skip, take
    Object.entries(skipTakeArgs).forEach(([key, value]) => {
      // * Dynamic property assignation
      popCriteriaFindArgs[key] = value;
    });

    // * where, ours
    if (typeof where !== 'undefined') {
      const wherePropertiesCount = Object.keys(where).length;

      if (wherePropertiesCount > 0) {
        const whereWithoutTypes = JSON.parse(JSON.stringify(where));

        // Transform 'id' (GraphQL) in 'idPopCriteria' for Prisma Client
        if (whereWithoutTypes.hasOwnProperty('id')) {
          whereWithoutTypes['idPopCriteria'] = whereWithoutTypes.id;
          // Remove old property
          delete whereWithoutTypes.id;
        }

        popCriteriaFindArgs['where'] = whereWithoutTypes;
      }
    }

    // * where, Prisma Client
    // * whereOpen as priority over our where
    if (typeof whereOpen !== 'undefined') {
      const whereOpenPropertiesCount = Object.keys(whereOpen).length;

      if (whereOpenPropertiesCount > 0) {
        const whereOpenWithoutTypes = JSON.parse(JSON.stringify(whereOpen));

        // Transform 'id' (GraphQL) in 'idPopCriteria' for Prisma Client
        if (whereOpenWithoutTypes.hasOwnProperty('id')) {
          whereOpenWithoutTypes['idPopCriteria'] = whereOpenWithoutTypes.id;
          // Remove old property
          delete whereOpenWithoutTypes.id;
        }

        // popCriteriaFindArgs['where'] = whereOpen;
        popCriteriaFindArgs['where'] = whereOpenWithoutTypes;
      }
    }

    // * orderBy, ours
    if (typeof orderBy !== 'undefined') {
      const orderByPropertiesCount = Object.keys(orderBy).length;

      if (orderByPropertiesCount > 0) {
        const orderByWithoutTypes = JSON.parse(JSON.stringify(orderBy));

        // Transform 'id' (GraphQL) in 'idPopCriteria' for Prisma Client
        if (orderByWithoutTypes.hasOwnProperty('id')) {
          orderByWithoutTypes['idPopCriteria'] = orderByWithoutTypes.id;
          // Remove old property
          delete orderByWithoutTypes.id;
        }

        popCriteriaFindArgs['orderBy'] = orderByWithoutTypes;
      }
    }

    // * orderBy, Prisma Client
    // * orderByOpen as priority over our orderBy
    if (typeof orderByOpen !== 'undefined') {
      const orderByOpenPropertiesCount = Object.keys(orderByOpen).length;

      if (orderByOpenPropertiesCount > 0) {
        const orderByOpenWithoutTypes = JSON.parse(JSON.stringify(orderByOpen));

        // Transform 'id' (GraphQL) in 'idPopCriteria' for Prisma Client
        //    It's an array
        orderByOpenWithoutTypes.forEach((element) => {
          if (element.hasOwnProperty('id')) {
            element['idPopCriteria'] = element.id;
            // Remove old property
            delete element.id;
          }
        });

        popCriteriaFindArgs['orderBy'] = orderByOpenWithoutTypes;
      }
    }

    // * cursor
    if (typeof cursor !== 'undefined') {
      const cursorPropertiesCount = Object.keys(cursor).length;

      if (cursorPropertiesCount > 0) {
        const cursorWithoutTypes = JSON.parse(JSON.stringify(cursor));

        // Transform 'id' (GraphQL) in 'idPopCriteria' for Prisma Client
        if (cursorWithoutTypes.hasOwnProperty('id')) {
          cursorWithoutTypes['idPopCriteria'] = cursorWithoutTypes.id;
          // Remove old property
          delete cursorWithoutTypes.id;
        }
        // No need to transform 'name' to 'name'

        popCriteriaFindArgs['cursor'] = cursorWithoutTypes;
      }
    }

    // * distinct
    if (typeof distinct !== 'undefined') {
      const distinctWithoutTypes = JSON.parse(JSON.stringify(distinct));

      // Transform 'all' (GraphQL) in '['name', 'table', 'field', 'fieldTypeHelper', 'operatorComparison']' for Prisma Client
      if (distinctWithoutTypes === 'all') {
        popCriteriaFindArgs['distinct'] = [
          'name',
          'table',
          'field',
          'fieldTypeHelper',
          'operatorComparison',
        ];
      }

      if (distinctWithoutTypes === 'name') {
        popCriteriaFindArgs['distinct'] = ['name'];
      }

      if (distinctWithoutTypes === 'table') {
        popCriteriaFindArgs['distinct'] = ['table'];
      }

      if (distinctWithoutTypes === 'field') {
        popCriteriaFindArgs['distinct'] = ['field'];
      }

      if (distinctWithoutTypes === 'fieldTypeHelper') {
        popCriteriaFindArgs['distinct'] = ['fieldTypeHelper'];
      }

      if (distinctWithoutTypes === 'operatorComparison') {
        popCriteriaFindArgs['distinct'] = ['operatorComparison'];
      }

      // if (distinctWithoutTypes === 'none')
      // Do nothing. Needs a default value else it crashes when the argument isn't provided
    }

    return this.popCriteriasService.findFirst(
      popCriteriaFindArgs as PrismaClient.PopCriteriaFindFirstArgs,
    );
  }

  // * findMany
  @Query(() => [PopCriteriaModel], {
    name: 'popCriterias',
    description: `🔍💯 Récupérer des *PopCriterias*\n& détails relations 🔗
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      popCriterias {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
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
    \n**distinct** > 👥 Filter out duplicates rows for one or all fields. Possible values: allFields, name, table, field, fieldTypeHelper, operatorComparison
    \n
    {
      popCriterias(skip: 1) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriterias(take: 1) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriterias(where: { id: "00000000-0000-0000-909c-000000000001" }) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriterias(orderBy: {name: desc}) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriterias(cursor: { id: "00000000-0000-0000-909c-000000000001" }) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriterias(distinct: allFields) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriterias(whereOpen: { name: { contains: "c", }, }) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    {
      popCriterias(orderByOpen: [ { table: "desc", }, { field: "desc", }, ]) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
      }
    }
    \n
    \n---
    \n#### 🔗 Relations
    \n**Population**
    \n**PopCritValues [  ]**
    \n
    {
      popCriterias(take: 10) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison

        population {
          name
          operatorLogical
        }
        
        popCritValues {
          valueBol
          valueDat
          valueNbr
          valueStr
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
  ): Promise<PopCriteria[]> {
    const { where, whereOpen, orderBy, orderByOpen, cursor, distinct } =
      findArgs;

    // * Merged arguments for Prisma Client
    const popCriteriaFindArgs = {};

    // * skip, take
    Object.entries(skipTakeArgs).forEach(([key, value]) => {
      // * Dynamic property assignation
      popCriteriaFindArgs[key] = value;
    });

    // * where, ours
    if (typeof where !== 'undefined') {
      const wherePropertiesCount = Object.keys(where).length;

      if (wherePropertiesCount > 0) {
        const whereWithoutTypes = JSON.parse(JSON.stringify(where));

        // Transform 'id' (GraphQL) in 'idPopCriteria' for Prisma Client
        if (whereWithoutTypes.hasOwnProperty('id')) {
          whereWithoutTypes['idPopCriteria'] = whereWithoutTypes.id;
          // Remove old property
          delete whereWithoutTypes.id;
        }

        popCriteriaFindArgs['where'] = whereWithoutTypes;
      }
    }

    // * where, Prisma Client
    // * whereOpen as priority over our where
    if (typeof whereOpen !== 'undefined') {
      const whereOpenPropertiesCount = Object.keys(whereOpen).length;

      if (whereOpenPropertiesCount > 0) {
        const whereOpenWithoutTypes = JSON.parse(JSON.stringify(whereOpen));

        // Transform 'id' (GraphQL) in 'idPopCriteria' for Prisma Client
        if (whereOpenWithoutTypes.hasOwnProperty('id')) {
          whereOpenWithoutTypes['idPopCriteria'] = whereOpenWithoutTypes.id;
          // Remove old property
          delete whereOpenWithoutTypes.id;
        }

        // popCriteriaFindArgs['where'] = whereOpen;
        popCriteriaFindArgs['where'] = whereOpenWithoutTypes;
      }
    }

    // * orderBy, ours
    if (typeof orderBy !== 'undefined') {
      const orderByPropertiesCount = Object.keys(orderBy).length;

      if (orderByPropertiesCount > 0) {
        const orderByWithoutTypes = JSON.parse(JSON.stringify(orderBy));

        // Transform 'id' (GraphQL) in 'idPopCriteria' for Prisma Client
        if (orderByWithoutTypes.hasOwnProperty('id')) {
          orderByWithoutTypes['idPopCriteria'] = orderByWithoutTypes.id;
          // Remove old property
          delete orderByWithoutTypes.id;
        }

        popCriteriaFindArgs['orderBy'] = orderByWithoutTypes;
      }
    }

    // * orderBy, Prisma Client
    // * orderByOpen as priority over our orderBy
    if (typeof orderByOpen !== 'undefined') {
      const orderByOpenPropertiesCount = Object.keys(orderByOpen).length;

      if (orderByOpenPropertiesCount > 0) {
        const orderByOpenWithoutTypes = JSON.parse(JSON.stringify(orderByOpen));

        // Transform 'id' (GraphQL) in 'idPopCriteria' for Prisma Client
        //    It's an array
        orderByOpenWithoutTypes.forEach((element) => {
          if (element.hasOwnProperty('id')) {
            element['idPopCriteria'] = element.id;
            // Remove old property
            delete element.id;
          }
        });

        popCriteriaFindArgs['orderBy'] = orderByOpenWithoutTypes;
      }
    }

    // * cursor
    if (typeof cursor !== 'undefined') {
      const cursorPropertiesCount = Object.keys(cursor).length;

      if (cursorPropertiesCount > 0) {
        const cursorWithoutTypes = JSON.parse(JSON.stringify(cursor));

        // Transform 'id' (GraphQL) in 'idPopCriteria' for Prisma Client
        if (cursorWithoutTypes.hasOwnProperty('id')) {
          cursorWithoutTypes['idPopCriteria'] = cursorWithoutTypes.id;
          // Remove old property
          delete cursorWithoutTypes.id;
        }
        // No need to transform 'name' to 'name'

        popCriteriaFindArgs['cursor'] = cursorWithoutTypes;
      }
    }

    // * distinct
    if (typeof distinct !== 'undefined') {
      const distinctWithoutTypes = JSON.parse(JSON.stringify(distinct));

      // Transform 'all' (GraphQL) in '['name', 'table', 'field', 'fieldTypeHelper', 'operatorComparison']' for Prisma Client
      if (distinctWithoutTypes === 'all') {
        popCriteriaFindArgs['distinct'] = [
          'name',
          'table',
          'field',
          'fieldTypeHelper',
          'operatorComparison',
        ];
      }

      if (distinctWithoutTypes === 'name') {
        popCriteriaFindArgs['distinct'] = ['name'];
      }

      if (distinctWithoutTypes === 'table') {
        popCriteriaFindArgs['distinct'] = ['table'];
      }

      if (distinctWithoutTypes === 'field') {
        popCriteriaFindArgs['distinct'] = ['field'];
      }

      if (distinctWithoutTypes === 'fieldTypeHelper') {
        popCriteriaFindArgs['distinct'] = ['fieldTypeHelper'];
      }

      if (distinctWithoutTypes === 'operatorComparison') {
        popCriteriaFindArgs['distinct'] = ['operatorComparison'];
      }

      // if (distinctWithoutTypes === 'none')
      // Do nothing. Needs a default value else it crashes when the argument isn't provided
    }

    return this.popCriteriasService.findMany(
      popCriteriaFindArgs as PrismaClient.PopCriteriaFindManyArgs,
    );
  }

  // ---

  // ! ⬆️ Mutations

  // * create
  @Mutation(() => PopCriteriaModel, {
    name: 'createPopCriteria',
    description: `🔨+🔗 Créer un *PopCriteria*, avec possibilité de créer également ses valeurs String (nested)
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddOne($params: CreatePopCriteriaInput) {
      createPopCriteria(params: $params) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison

        population {
          name
          operatorLogical
        }
        
        popCritValues {
          valueBol
          valueDat
          valueNbr
          valueStr
        }
      }
    }
    \n##### 💬 Variables
    \n
    {
      "params": {
        "name": "PopCriteria name",
        "table": "ResourceField",
        "field": "lastName",
        "fieldTypeHelper": "String",
        "operatorComparison": "equals",

        "population": {
          "connect": {
            "name": "Boolean_isPointage_equals_true"
          }
        },

        "popCritValues": {
          "create": [
            {
              // "valueBol": true,
              // "valueDat": "2024-12-24",
              // "valueNbr": 42,
              "valueStr": "Le nom de famille"
            }
          ]
        }
      }
    }
    \n`,
  })
  async createPopCriteria(
    @Args({
      name: 'params',
      description: `Object containing values for PopCriteria, and optionnaly also Populations.`,
      nullable: true,
      type: () => CreatePopCriteriaInput,
    })
    params: CreatePopCriteriaInput,
  ): Promise<PopCriteria | null> {
    // * 🔗 Relation One to many / Only one 📦 > connect
    // Transformer 'id' (GraphQL) en 'idPopulation' NestJs
    if (typeof params !== 'undefined') {
      if (params.hasOwnProperty('population')) {
        if (params.population.hasOwnProperty('connect')) {
          if (params.population['connect'].hasOwnProperty('id')) {
            params.population['connect']['idPopulation'] =
              params.population['connect'].id;

            // Remove old property
            delete params.population['connect'].id;
          }
        }
      }
    }

    // * Get authorized fields
    // const authorizedFields = await getAuthorizedFields(
    //   this.resourceFieldsService,
    // );

    // * Check if the PopCriteria about to be created has a field that exists
    // console.log('authorizedFields', authorizedFields);
    // console.log('params.field', params.field);
    // console.log(
    //   '!authorizedFields.includes(params.field)',
    //   !authorizedFields.includes(params.field),
    // );

    //     if (!authorizedFields.includes(params.field)) {
    //       console.log('---');
    //       console.error(
    //         `🚨 The field "${params.field}" isn't authorized in Population criteria creation`,
    //       );
    //       console.error('Authorized fields are:');
    //       console.error(authorizedFields);
    //       console.log('---');

    //       throw new Error(`🚨 The field '${params.field}' isn't authorized in Population criteria creation.
    // Authorized fields are:

    // ${authorizedFields}`);
    //     }

    const data: PrismaClient.PopCriteriaCreateInput =
      params as PrismaClient.PopCriteriaCreateInput;

    return this.popCriteriasService.create(data);
  }

  // * createOpen
  @Mutation(() => PopCriteriaModel, {
    name: 'createPopCriteriaOpen',
    description: `🔨🆓 Créer un *PopCriteria*, passage de ce qu'on veut (PC) en argument
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddOne($params: JSONObject) {
      createPopCriteriaOpen(params: $params) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison

        population {
          name
          operatorLogical
        }
        
        popCritValues {
          valueBol
          valueDat
          valueNbr
          valueStr
        }
      }
    }
    \n##### 💬 Variables
    \n
    {
      "params": {
        "name": "PopCriteria name",
        "table": "ResourceField",
        "field": "lastName",
        "fieldTypeHelper": "String",
        "operatorComparison": "equals",

        "population": {
          "connect": {
            "name": "Boolean_isPointage_equals_true"
          }
        },

        "popCritValues": {
          "create": [
            {
              // "valueBol": true,
              // "valueDat": "2024-12-24",
              // "valueNbr": 42,
              "valueStr": "Le nom de famille"
            }
          ]
        }
      }
    }
    \n`,
  })
  async createPopCriteriaOpen(
    @Args({
      name: 'params',
      description: `Object containing values for PopCriteria, and optionnaly also Populations.`,
      nullable: true,
      type: () => GraphQLJSONObject,
    })
    params: PrismaClient.PopCriteriaCreateInput,
  ): Promise<PopCriteria | null> {
    // * Get authorized fields
    //     const authorizedFields = await getAuthorizedFields(
    //       this.resourceFieldsService,
    //     );

    //     // * Check if the PopCriteria about to be created has a field that exists
    //     // console.log('authorizedFields', authorizedFields);
    //     // console.log('params.field', params.field);
    //     // console.log(
    //     //   '!authorizedFields.includes(params.field)',
    //     //   !authorizedFields.includes(params.field),
    //     // );

    //     if (!authorizedFields.includes(params.field)) {
    //       console.log('---');
    //       console.error(
    //         `🚨 The field "${params.field}" isn't authorized in Population criteria creation`,
    //       );
    //       console.error('Authorized fields are:');
    //       console.error(authorizedFields);
    //       console.log('---');

    //       throw new Error(`🚨 The field '${params.field}' isn't authorized in Population criteria creation.
    // Authorized fields are:

    // ${authorizedFields}`);
    //     }

    return this.popCriteriasService.create(
      params as PrismaClient.PopCriteriaCreateInput,
    );
  }

  @Mutation(() => CountModel, {
    name: 'createManyPopCriterias',
    description: `🏭 Créer plusieurs *PopCriterias*, ne supporte pas la création nestée
    \nRenvoi le nombre de *PopCriterias* créés, potentiellement sans doublons.
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddMany($popCriterias: [CreateManyPopCriteriasInput!]!) {
      createManyPopCriterias(popCriterias: $popCriterias, skipDuplicates: true) {
        count
      }
    }
    \n##### 💬 Variables
    \n
    {
      "popCriterias": [
        {
          "name": "Many one PopCriteria name",
          "table": "ResourceField",
          "field": "lastName",
          "fieldTypeHelper": "String",
          "operatorComparison": "equals",
          "populationId": "00000000-0000-0000-9090-000000000001"
        },
        {
          "name": "Many Two PopCriteria name",
          "table": "ResourceField",
          "field": "lastName",
          "fieldTypeHelper": "String",
          "operatorComparison": "equals",
          "populationId": "00000000-0000-0000-9090-000000000002"
        }
      ]
    }
    \n
    \n#### 🔧 Arguments
    \n**popCriterias** > Un tableau de PopCriterias à créer
    \n**skipDuplicates** > 👥 Boolean, si \`true\` ne rajoute pas les doublons
    `,
  })
  async createManyPopCriterias(
    @Args({
      name: 'popCriterias',
      description: `Tableau de Références.`,
      nullable: false,
      type: () => [CreateManyPopCriteriasInput],
    })
    popCriterias: CreateManyPopCriteriasInput[],

    @Args({
      name: 'skipDuplicates',
      defaultValue: true,
      description: `Supprimer les doublons ?`,
      nullable: false,
      type: () => Boolean,
    })
    skipDuplicates: boolean,
  ): Promise<CountModel> {
    const params: PrismaClient.PopCriteriaCreateManyArgs = {
      data: popCriterias,
      skipDuplicates: skipDuplicates,
    };

    const countModel: CountModel = (await this.popCriteriasService.createMany(
      params,
    )) as CountModel;
    return countModel;
  }

  // * update
  @Mutation(() => PopCriteriaModel, {
    name: 'updatePopCriteria',
    description: `⬆️+🔗 Mettre à jour un *PopCriteria*, avec possibilité de créer/connecter également ses valeurs String (nested)
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testUpdateOne($where: FindUniquePopCriteriaInput!, $data: UpdatePopCriteriaInput!) {
      updatePopCriteria(where: $where, data: $data) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison

        population {
          name
          operatorLogical
        }
        
        popCritValues {
          valueBol
          valueDat
          valueNbr
          valueStr
        }
      }
    }
    \n##### 💬 Variables, ✨ création nestée
    \n
    {
      "where": {
        id: "l'identfiant du critère à mettre à jour"
      },
      "data": {
        "name": "Many one PopCriteria name",
        "table": "ResourceField",
        "field": "lastName",
        "fieldTypeHelper": "String",
        "operatorComparison": "equals"

        "popCritValues": {
          "create": [
            {
              // "valueBol": true,
              // "valueDat": "2024-12-24",
              // "valueNbr": 42,
              "valueStr": "Le nom de famille",
            }
          ]
        }
      }
    }
    \n##### 💬 Variables, 🔗 connexion nestée
    \n
    \n 🌱 Uniquement via l'identifiant pour le moment (seul champ unique de Population)
    \n
    {
      "where": {
        id: "l'identfiant du critère à mettre à jour"
      },
      "data": {
        "population": {
          "connect": {
            "name": "Boolean_isPointage_not_true"
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
        id: "l'identfiant du critère à mettre à jour"
      },
      "data": {
        "population": {
          "disconnect": {
            "name": "Boolean_isPointage_not_true"
          }
        }
      }
    }
    \n`,
  })
  async updatePopCriteria(
    @Args('where')
    findUniquePopCriteria: FindUniquePopCriteria,

    @Args('data')
    dataInput: UpdatePopCriteriaInput,
  ): Promise<PopCriteria | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopCriteria).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idPopCriteria' NestJs
    if (findUniquePopCriteria.hasOwnProperty('id')) {
      whereUniqueInput['idPopCriteria'] = findUniquePopCriteria.id;
    }

    // * data
    const params: {
      where: PrismaClient.PopCriteriaWhereUniqueInput;
      data: PrismaClient.PopCriteriaUpdateInput;
    } = {
      where: whereUniqueInput as PrismaClient.PopCriteriaWhereUniqueInput,
      data: dataInput as PrismaClient.PopCriteriaUpdateInput,
    };
    return this.popCriteriasService.update(params);
  }

  // * updateOpen
  @Mutation(() => PopCriteriaModel, {
    name: 'updatePopCriteriaOpen',
    description: `⬆️🆓 Modifier un *PopCriteria*, passage de ce qu'on veut (PC) en argument
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testUpdateOne($where: FindUniquePopCriteriaInput!, $data: JSONObject!) {
      updatePopCriteriaOpen(where: $where, data: $data) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison

        population {
          name
          operatorLogical
        }
        
        popCritValues {
          valueBol
          valueDat
          valueNbr
          valueStr
        }
      }
    }
    \n##### 💬 Variables, ✨ création nestée
    \n
    {
      "where": {
        id: "l'identfiant du critère à mettre à jour"
      },
      "data": {
        "name": "Many one PopCriteria name",
        "table": "ResourceField",
        "field": "lastName",
        "fieldTypeHelper": "String",
        "operatorComparison": "equals"

        "popCritValues": {
          "create": [
            {
              // "valueBol": true,
              // "valueDat": "2024-12-24",
              // "valueNbr": 42,
              "valueStr": "Le nom de famille",
            }
          ]
        }
      }
    }
    \n##### 💬 Variables, 🔗 connexion nestée
    \n
    \n 🌱 Uniquement via l'identifiant pour le moment (seul champ unique de Population)
    \n
    {
      "where": {
        id: "l'identfiant du critère à mettre à jour"
      },
      "data": {
        "population": {
          "connect": {
            "name": "Boolean_isPointage_not_true"
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
        id: "l'identfiant du critère à mettre à jour"
      },
      "data": {
        "population": {
          "disconnect": {
            "name": "Boolean_isPointage_not_true"
          }
        }
      }
    }
    \n`,
  })
  async updatePopCriteriaOpen(
    @Args('where')
    findUniquePopCriteria: FindUniquePopCriteria,

    @Args({
      name: 'data',
      description: `Object containing values for PopCriteria, and optionnaly also Populations.`,
      nullable: true,
      type: () => GraphQLJSONObject,
    })
    dataInput: PrismaClient.PopCriteriaUpdateInput,
  ): Promise<PopCriteria | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopCriteria).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idPopCriteria' NestJs
    if (findUniquePopCriteria.hasOwnProperty('id')) {
      whereUniqueInput['idPopCriteria'] = findUniquePopCriteria.id;
    }

    // * data
    const params: {
      where: PrismaClient.PopCriteriaWhereUniqueInput;
      data: PrismaClient.PopCriteriaUpdateInput;
    } = {
      where: whereUniqueInput as PrismaClient.PopCriteriaWhereUniqueInput,
      data: dataInput as PrismaClient.PopCriteriaUpdateInput,
    };
    return this.popCriteriasService.update(params);
  }

  // * delete
  @Mutation(() => PopCriteriaModel, {
    name: 'deletePopCriteria',
    description: `🔥🔗 Supprimer un *PopCriteria*
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testRemoveOne($id: String) {
      deletePopCriteria(id: $id) {
        name
        table
        field
        fieldTypeHelper
        operatorComparison
        
        population {
          name
          operatorLogical
        }
        
        popCritValues {
          valueBol
          valueDat
          valueNbr
          valueStr
        }
      }
    }
    \n##### 💬 Variables
    \n 👋 Change name to target wanted entry
    \n 🚨🔥🔗 It will delete all connected Populations
    \n
    {
      id: "l'identfiant du critère à supprimer"
    }
    \n`,
  })
  async deletePopCriteria(
    @Args()
    findUniquePopCriteria: FindUniquePopCriteria,
  ): Promise<PopCriteria | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopCriteria).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idPopCriteria' NestJs
    if (findUniquePopCriteria.hasOwnProperty('id')) {
      whereUniqueInput['idPopCriteria'] = findUniquePopCriteria.id;
    }

    return this.popCriteriasService.remove(
      whereUniqueInput as PrismaClient.PopCriteriaWhereUniqueInput,
    );
  }
}

// ---
// ---
// ---

// // * Get all authorized fields for PopCriteria > field values
// async function getAuthorizedFields(
//   resourceFieldsService,
// ): Promise<Array<string> | null> {
//   // * Check for field existance either in Resource or ResourceFields
//   const resource_FieldNames = getResourceAuthorizedFields();

//   const resourceField_FieldNames = await getResourceFieldAuthorizedFields(
//     resourceFieldsService,
//   );

//   // Merge all fields in a single array
//   const authorizedFields = [
//     ...resource_FieldNames,
//     ...resourceField_FieldNames,
//   ];

//   // console.log('PopCriteriasResolver > getAuthorizedFields() > authorizedFields');
//   // console.log(authorizedFields);
//   // console.log('/PopCriteriasResolver > getAuthorizedFields() > authorizedFields');

//   return authorizedFields;
// }

// ---

// // * Table Resource > Return all field names
// //    No dynamic fields
// function getResourceAuthorizedFields(): Array<string> {
//   return ['matricule', 'socialSecurityNumber'];
// }

// // ---

// // * Table ResourceField > Return all field names
// //    Dynamic fields
// //      Request > lint > return
// async function getResourceFieldAuthorizedFields(
//   resourceFieldsService,
// ): Promise<Array<string> | null> {
//   const resourceField_FieldNamesAsObjects =
//     // * All ResourceField, return only the name
//     await resourceFieldsService.findMany({
//       select: { name: true },
//     } as PrismaClient.ResourceFieldFindManyArgs);

//   // Extract names from object, creating an Array of string
//   const resourceField_FieldNames = resourceField_FieldNamesAsObjects.map(
//     ({ name }) => name,
//   );

//   // console.log('PopCriteriasResolver > getResourceFieldAuthorizedFields() > resourceField_FieldNames');
//   // console.log(resourceField_FieldNames);
//   // console.log('/PopCriteriasResolver > getResourceFieldAuthorizedFields() > resourceField_FieldNames');

//   return resourceField_FieldNames;
// }
