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
  PopCritValue,
  PopCriteria,
  Prisma as PrismaClient,
} from '@prisma/client';

// * Generics
import { SkipTakeArgs } from '../_utility/graphql/args/skip-take.args';
import { CountModel } from '../_utility/graphql/models/count.model';

// * PopCritValue
// Internal
import { PopCritValuesService } from './pop-crit-values.service';
// ENUMs
import { PopCritValueDistinctEnum } from './enums/pop-crit-value-distinct.enum';
// DTOs
import { PopCritValueEntity } from './entities/pop-crit-value.entity';
import { PopCritValueModel } from './models/pop-crit-value.model';
import { CreatePopCritValueInput } from './dto/create-pop-crit-value.input';
import { CreateManyPopCritValuesInput } from './dto/create-many-pop-crit-values.input';
import { FindArgs } from './dto/find-pop-crit-value.args';
import { FindUniquePopCritValue } from './dto/find-unique-pop-crit-value';
import { UpdatePopCritValueInput } from './dto/update-pop-crit-value.input';

// 🔗 Relations, nested fields
import { PopCriteriaModel } from '../pop-criterias/models/pop-criteria.model';
import { PopCriteriasService } from '../pop-criterias/pop-criterias.service';

@Resolver(() => PopCritValueModel)
export class PopCritValuesResolver {
  constructor(
    private readonly popCritValuesService: PopCritValuesService,
    // 🔗 Relations
    private readonly popCriteriasService: PopCriteriasService,
  ) {
    // ! 🔢 Dedicated ENUMs
    registerEnumType(PopCritValueDistinctEnum, {
      name: 'PopCritValueDistinctEnum',
      description: '👥 Filter out duplicates rows for one or all fields.',
      valuesMap: {
        allFields: {
          description:
            '👥 Filter out duplicates rows for all valueBol, valueDat, valueNbr, valueStr',
        },
        valueBol: {
          description: '👥 Filter out duplicates rows for valueBol',
        },
        valueDat: {
          description: '👥 Filter out duplicates rows for valueDat',
        },
        valueNbr: {
          description: '👥 Filter out duplicates rows for valueNbr',
        },
        valueStr: {
          description: '👥 Filter out duplicates rows for valueStr',
        },
        none: {
          description: 'Default value, no deduplicate.',
        },
      },
    });
  }

  // ---

  // ! 🔗 Relations, nested fields

  // * PopCriteria / One to many / Return only one 📦
  @ResolveField('popCriteria', () => PopCriteriaModel)
  async popCriteria(
    @Parent() popCritValue: PopCritValueEntity,
  ): Promise<PopCriteria | null> {
    // * Do not overload if already defined (include/filters in the service)
    if (popCritValue.hasOwnProperty('popCriteria')) {
      return popCritValue['popCriteria'];
    }

    // * If not, return all related entries (join)
    const { popCriteriaId } = popCritValue;

    // If no relation is found, return null
    if (popCriteriaId === null) return null;

    // Appel de la méthode du service de la ressource concernée
    //    Besoin de passer le service concerné dans le constructeur
    return this.popCriteriasService.findUnique({
      idPopCriteria: popCriteriaId,
    });
  }

  // ---

  // ! 🔍 Query / Queries

  // * findUnique
  @Query(() => PopCritValueModel, {
    name: 'popCritValue',
    description: `🔍⭐ Rechercher par ID
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      popCritValue(id: "00000000-0000-0000-909c-700000000001") {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    \n#### 🔧 Arguments
    \n**id** > PopCritValue unique ID
    \n
    \n---
    \n#### 🔗 Relations
    \n**PopCriteria**
    \n
    {
      popCritValue(id: "00000000-0000-0000-909c-700000000001") {
        valueBol
        valueDat
        valueNbr
        valueStr

        popCriteria {
          name
          table
          field
          fieldTypeHelper
          operatorComparison
        }
      }
    }
    \n`,
  })
  async findUnique(
    @Args()
    findUniquePopCritValue: FindUniquePopCritValue,
  ): Promise<PopCritValue | null> {
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopCritValue).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // TODO: 🌱 Automatic property renaming/mapping ~= id for GraphQL > idPopCritValue for PC
    // Object.entries(findUniquePopCritValue).forEach(([key, value]) => {
    //   console.log(`${key}: ${value}`);
    //   // * Dynamic property assignation
    //   whereUniqueInput[key] = value;
    // });

    // Transformer 'id' (GraphQL) en 'idPopCritValue' NestJs
    if (findUniquePopCritValue.hasOwnProperty('id')) {
      whereUniqueInput['idPopCritValue'] = findUniquePopCritValue.id;
    }

    return this.popCritValuesService.findUnique(
      whereUniqueInput as PrismaClient.PopCritValueWhereUniqueInput,
    );
  }

  // * findFirst
  @Query(() => PopCritValueModel, {
    name: 'popCritValueFindFirst',
    description: `🔍🥇 Rechercher et récupérer le premier qui correspond
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      popCritValueFindFirst {
        valueBol
        valueDat
        valueNbr
        valueStr
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
    \n**distinct** > 👥 Filter out duplicates rows for one or all fields. Possible values: allFields, valueBol, valueDat, valueNbr, valueStr
    \n
    {
      popCritValueFindFirst(skip: 1) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValueFindFirst(take: 1) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValueFindFirst(where: { id: "00000000-0000-0000-909c-700000000001" }) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    
    \n
    {
      popCritValueFindFirst(orderBy: { id: desc }) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValueFindFirst(cursor: { id: "00000000-0000-0000-909c-700000000001" }) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValueFindFirst(distinct: allFields) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValueFindFirst(whereOpen: { valueStr: { contains: "c", }, }) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValueFindFirst(orderByOpen: [ { valueStr: "desc", }, { id: "desc", }, ]) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    \n---
    \n#### 🔗 Relations
    \n**PopCriteria**
    \n
    {
      popCritValueFindFirst {
        valueBol
        valueDat
        valueNbr
        valueStr

        popCriteria {
          name
          table
          field
          fieldTypeHelper
          operatorComparison
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
  ): Promise<PopCritValue | null> {
    const { where, whereOpen, orderBy, orderByOpen, cursor, distinct } =
      findArgs;

    // * Merged arguments for Prisma Client
    const popCritValueFindArgs = {};

    // * skip, take
    Object.entries(skipTakeArgs).forEach(([key, value]) => {
      // * Dynamic property assignation
      popCritValueFindArgs[key] = value;
    });

    // * where, ours
    if (typeof where !== 'undefined') {
      const wherePropertiesCount = Object.keys(where).length;

      if (wherePropertiesCount > 0) {
        const whereWithoutTypes = JSON.parse(JSON.stringify(where));

        // Transform 'id' (GraphQL) in 'idPopCritValue' for Prisma Client
        if (whereWithoutTypes.hasOwnProperty('id')) {
          whereWithoutTypes['idPopCritValue'] = whereWithoutTypes.id;
          // Remove old property
          delete whereWithoutTypes.id;
        }

        popCritValueFindArgs['where'] = whereWithoutTypes;
      }
    }

    // * where, Prisma Client
    // * whereOpen as priority over our where
    if (typeof whereOpen !== 'undefined') {
      const whereOpenPropertiesCount = Object.keys(whereOpen).length;

      if (whereOpenPropertiesCount > 0) {
        const whereOpenWithoutTypes = JSON.parse(JSON.stringify(whereOpen));

        // Transform 'id' (GraphQL) in 'idPopCritValue' for Prisma Client
        if (whereOpenWithoutTypes.hasOwnProperty('id')) {
          whereOpenWithoutTypes['idPopCritValue'] = whereOpenWithoutTypes.id;
          // Remove old property
          delete whereOpenWithoutTypes.id;
        }

        // popCritValueFindArgs['where'] = whereOpen;
        popCritValueFindArgs['where'] = whereOpenWithoutTypes;
      }
    }

    // * orderBy, ours
    if (typeof orderBy !== 'undefined') {
      const orderByPropertiesCount = Object.keys(orderBy).length;

      if (orderByPropertiesCount > 0) {
        const orderByWithoutTypes = JSON.parse(JSON.stringify(orderBy));

        // Transform 'id' (GraphQL) in 'idPopCritValue' for Prisma Client
        if (orderByWithoutTypes.hasOwnProperty('id')) {
          orderByWithoutTypes['idPopCritValue'] = orderByWithoutTypes.id;
          // Remove old property
          delete orderByWithoutTypes.id;
        }

        popCritValueFindArgs['orderBy'] = orderByWithoutTypes;
      }
    }

    // * orderBy, Prisma Client
    // * orderByOpen as priority over our orderBy
    if (typeof orderByOpen !== 'undefined') {
      const orderByOpenPropertiesCount = Object.keys(orderByOpen).length;

      if (orderByOpenPropertiesCount > 0) {
        const orderByOpenWithoutTypes = JSON.parse(JSON.stringify(orderByOpen));

        // Transform 'id' (GraphQL) in 'idPopCritValue' for Prisma Client
        //    It's an array
        orderByOpenWithoutTypes.forEach((element) => {
          if (element.hasOwnProperty('id')) {
            element['idPopCritValue'] = element.id;
            // Remove old property
            delete element.id;
          }
        });

        popCritValueFindArgs['orderBy'] = orderByOpenWithoutTypes;
      }
    }

    // * cursor
    if (typeof cursor !== 'undefined') {
      const cursorPropertiesCount = Object.keys(cursor).length;

      if (cursorPropertiesCount > 0) {
        const cursorWithoutTypes = JSON.parse(JSON.stringify(cursor));

        // Transform 'id' (GraphQL) in 'idPopCritValue' for Prisma Client
        if (cursorWithoutTypes.hasOwnProperty('id')) {
          cursorWithoutTypes['idPopCritValue'] = cursorWithoutTypes.id;
          // Remove old property
          delete cursorWithoutTypes.id;
        }
        // No need to transform 'name' to 'name'

        popCritValueFindArgs['cursor'] = cursorWithoutTypes;
      }
    }

    // * distinct
    if (typeof distinct !== 'undefined') {
      const distinctWithoutTypes = JSON.parse(JSON.stringify(distinct));

      // Transform 'all' (GraphQL) in '['valueBol', 'valueDat', 'valueNbr', 'valueStr']' for Prisma Client
      if (distinctWithoutTypes === 'all') {
        popCritValueFindArgs['distinct'] = [
          'valueBol',
          'valueDat',
          'valueNbr',
          'valueStr',
        ];
      }

      if (distinctWithoutTypes === 'valueBol') {
        popCritValueFindArgs['distinct'] = ['valueBol'];
      }

      if (distinctWithoutTypes === 'valueDat') {
        popCritValueFindArgs['distinct'] = ['valueDat'];
      }

      if (distinctWithoutTypes === 'valueNbr') {
        popCritValueFindArgs['distinct'] = ['valueNbr'];
      }

      if (distinctWithoutTypes === 'valueStr') {
        popCritValueFindArgs['distinct'] = ['valueStr'];
      }

      // if (distinctWithoutTypes === 'none')
      // Do nothing. Needs a default value else it crashes when the argument isn't provided
    }

    return this.popCritValuesService.findFirst(
      popCritValueFindArgs as PrismaClient.PopCritValueFindFirstArgs,
    );
  }

  // * findMany
  @Query(() => [PopCritValueModel], {
    name: 'popCritValues',
    description: `🔍💯 Récupérer des *PopCritValues*\n& détails relations 🔗
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      popCritValues {
        valueBol
        valueDat
        valueNbr
        valueStr
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
    \n**distinct** > 👥 Filter out duplicates rows for one or all fields. Possible values: allFields, valueBol, valueDat, valueNbr, valueStr
    \n
    {
      popCritValues(skip: 1) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValues(take: 1) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValues(where: { id: "00000000-0000-0000-909c-700000000001" }) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValues(orderBy: { id: desc }) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValues(cursor: { id: "00000000-0000-0000-909c-700000000001" }) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValues(distinct: allFields) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValues(whereOpen: { valueStr: { contains: "c", }, }) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    {
      popCritValues(orderByOpen: [ { valueStr: "desc", }, { id: "desc", }, ]) {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
    \n
    \n---
    \n#### 🔗 Relations
    \n**PopCriteria**
    \n
    {
      popCritValues(take: 10) {
        valueBol
        valueDat
        valueNbr
        valueStr

        popCriteria {
          name
          table
          field
          fieldTypeHelper
          operatorComparison
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
  ): Promise<PopCritValue[]> {
    const { where, whereOpen, orderBy, orderByOpen, cursor, distinct } =
      findArgs;

    // * Merged arguments for Prisma Client
    const popCritValueFindArgs = {};

    // * skip, take
    Object.entries(skipTakeArgs).forEach(([key, value]) => {
      // * Dynamic property assignation
      popCritValueFindArgs[key] = value;
    });

    // * where, ours
    if (typeof where !== 'undefined') {
      const wherePropertiesCount = Object.keys(where).length;

      if (wherePropertiesCount > 0) {
        const whereWithoutTypes = JSON.parse(JSON.stringify(where));

        // Transform 'id' (GraphQL) in 'idPopCritValue' for Prisma Client
        if (whereWithoutTypes.hasOwnProperty('id')) {
          whereWithoutTypes['idPopCritValue'] = whereWithoutTypes.id;
          // Remove old property
          delete whereWithoutTypes.id;
        }

        popCritValueFindArgs['where'] = whereWithoutTypes;
      }
    }

    // * where, Prisma Client
    // * whereOpen as priority over our where
    if (typeof whereOpen !== 'undefined') {
      const whereOpenPropertiesCount = Object.keys(whereOpen).length;

      if (whereOpenPropertiesCount > 0) {
        const whereOpenWithoutTypes = JSON.parse(JSON.stringify(whereOpen));

        // Transform 'id' (GraphQL) in 'idPopCritValue' for Prisma Client
        if (whereOpenWithoutTypes.hasOwnProperty('id')) {
          whereOpenWithoutTypes['idPopCritValue'] = whereOpenWithoutTypes.id;
          // Remove old property
          delete whereOpenWithoutTypes.id;
        }

        // popCritValueFindArgs['where'] = whereOpen;
        popCritValueFindArgs['where'] = whereOpenWithoutTypes;
      }
    }

    // * orderBy, ours
    if (typeof orderBy !== 'undefined') {
      const orderByPropertiesCount = Object.keys(orderBy).length;

      if (orderByPropertiesCount > 0) {
        const orderByWithoutTypes = JSON.parse(JSON.stringify(orderBy));

        // Transform 'id' (GraphQL) in 'idPopCritValue' for Prisma Client
        if (orderByWithoutTypes.hasOwnProperty('id')) {
          orderByWithoutTypes['idPopCritValue'] = orderByWithoutTypes.id;
          // Remove old property
          delete orderByWithoutTypes.id;
        }

        popCritValueFindArgs['orderBy'] = orderByWithoutTypes;
      }
    }

    // * orderBy, Prisma Client
    // * orderByOpen as priority over our orderBy
    if (typeof orderByOpen !== 'undefined') {
      const orderByOpenPropertiesCount = Object.keys(orderByOpen).length;

      if (orderByOpenPropertiesCount > 0) {
        const orderByOpenWithoutTypes = JSON.parse(JSON.stringify(orderByOpen));

        // Transform 'id' (GraphQL) in 'idPopCritValue' for Prisma Client
        //    It's an array
        orderByOpenWithoutTypes.forEach((element) => {
          if (element.hasOwnProperty('id')) {
            element['idPopCritValue'] = element.id;
            // Remove old property
            delete element.id;
          }
        });

        popCritValueFindArgs['orderBy'] = orderByOpenWithoutTypes;
      }
    }

    // * cursor
    if (typeof cursor !== 'undefined') {
      const cursorPropertiesCount = Object.keys(cursor).length;

      if (cursorPropertiesCount > 0) {
        const cursorWithoutTypes = JSON.parse(JSON.stringify(cursor));

        // Transform 'id' (GraphQL) in 'idPopCritValue' for Prisma Client
        if (cursorWithoutTypes.hasOwnProperty('id')) {
          cursorWithoutTypes['idPopCritValue'] = cursorWithoutTypes.id;
          // Remove old property
          delete cursorWithoutTypes.id;
        }
        // No need to transform 'name' to 'name'

        popCritValueFindArgs['cursor'] = cursorWithoutTypes;
      }
    }

    // * distinct
    if (typeof distinct !== 'undefined') {
      const distinctWithoutTypes = JSON.parse(JSON.stringify(distinct));

      // Transform 'all' (GraphQL) in '['valueBol', 'valueDat', 'valueNbr', 'valueStr']' for Prisma Client
      if (distinctWithoutTypes === 'all') {
        popCritValueFindArgs['distinct'] = [
          'valueBol',
          'valueDat',
          'valueNbr',
          'valueStr',
        ];
      }

      if (distinctWithoutTypes === 'valueBol') {
        popCritValueFindArgs['distinct'] = ['valueBol'];
      }

      if (distinctWithoutTypes === 'valueDat') {
        popCritValueFindArgs['distinct'] = ['valueDat'];
      }

      if (distinctWithoutTypes === 'valueNbr') {
        popCritValueFindArgs['distinct'] = ['valueNbr'];
      }

      if (distinctWithoutTypes === 'valueStr') {
        popCritValueFindArgs['distinct'] = ['valueStr'];
      }

      // if (distinctWithoutTypes === 'none')
      // Do nothing. Needs a default value else it crashes when the argument isn't provided
    }

    return this.popCritValuesService.findMany(
      popCritValueFindArgs as PrismaClient.PopCritValueFindManyArgs,
    );
  }

  // ---

  // ! ⬆️ Mutations

  // * create
  @Mutation(() => PopCritValueModel, {
    name: 'createPopCritValue',
    description: `🔨+🔗 Créer un *PopCritValue*, avec possibilité de créer également ses valeurs String (nested)
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddOne($params: CreatePopCritValueInput) {
      createPopCritValue(params: $params) {
        valueBol
        valueDat
        valueNbr
        valueStr

        popCriteria {
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
    \n 🚨 Ne rentrer qu'un seul type, afin d'éviter les confusions
    \n 🌱 TODO: Contrôle afin de ne rentrer qu'un seul type
    \n
    {
      "params": {
        // "valueBol": true,
        // "valueDat": "2024-12-24",
        // "valueNbr": 42,
        "valueStr": "Chevasson",

        "popCriteria": {
          "connect": {
            "id": "PopCriteria id"
          }
        }
      }
    }
    \n`,
  })
  async createPopCritValue(
    @Args({
      name: 'params',
      description: `Object containing values for PopCritValue, and optionnaly also PopCriterias.`,
      nullable: true,
      type: () => CreatePopCritValueInput,
    })
    params: CreatePopCritValueInput,
  ): Promise<PopCritValue | null> {
    // * 🔗 Relation One to many / Only one 📦 > connect
    // Transformer 'id' (GraphQL) en 'idPopCriteria' NestJs
    if (typeof params !== 'undefined') {
      if (params.hasOwnProperty('popCriteria')) {
        if (params.popCriteria.hasOwnProperty('connect')) {
          if (params.popCriteria['connect'].hasOwnProperty('id')) {
            params.popCriteria['connect']['idPopCriteria'] =
              params.popCriteria['connect'].id;

            // Remove old property
            delete params.popCriteria['connect'].id;
          }
        }
      }
    }

    const data: PrismaClient.PopCritValueCreateInput =
      params as PrismaClient.PopCritValueCreateInput;

    return this.popCritValuesService.create(data);
  }

  // * createOpen
  @Mutation(() => PopCritValueModel, {
    name: 'createPopCritValueOpen',
    description: `🔨🆓 Créer un *PopCritValue*, passage de ce qu'on veut (PC) en argument
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddOne($params: JSONObject) {
      createPopCritValueOpen(params: $params) {
        valueBol
        valueDat
        valueNbr
        valueStr

        popCriteria {
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
    \n 🚨 Ne rentrer qu'un seul type, afin d'éviter les confusions
    \n 🌱 TODO: Contrôle afin de ne rentrer qu'un seul type
    \n
    {
      "params": {
        // "valueBol": true,
        // "valueDat": "2024-12-24",
        // "valueNbr": 42,
        "valueStr": "Chevasson",

        "popCriteria": {
          "connect": {
            "id": "PopCriteria id"
          }
        }
      }
    }
    \n`,
  })
  async createPopCritValueOpen(
    @Args({
      name: 'params',
      description: `Object containing values for PopCritValue, and optionnaly also PopCriterias.`,
      nullable: true,
      type: () => GraphQLJSONObject,
    })
    params: PrismaClient.PopCritValueCreateInput,
  ): Promise<PopCritValue | null> {
    return this.popCritValuesService.create(
      params as PrismaClient.PopCritValueCreateInput,
    );
  }

  @Mutation(() => CountModel, {
    name: 'createManyPopCritValues',
    description: `🏭 Créer plusieurs *PopCritValues*, ne supporte pas la création nestée
    \nRenvoi le nombre de *PopCritValues* créés, potentiellement sans doublons.
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddMany($popCritValues: [CreateManyPopCritValuesInput!]!) {
      createManyPopCritValues(popCritValues: $popCritValues, skipDuplicates: true) {
        count
      }
    }
    \n##### 💬 Variables
    \n
    {
      "popCritValues": [
        {
          "valueBol": true,
          "popCriteriaId": "00000000-0000-0000-909c-000000000001"
        },
        {
          "valueDat": "2024-12-24",
          "popCriteriaId": "00000000-0000-0000-909c-000000000002"
        },
        {
          "valueNbr": 42,
          "popCriteriaId": "00000000-0000-0000-909c-000000000003"
        },
        {
          "valueStr": "Chevasson",
          "popCriteriaId": "00000000-0000-0000-909c-000000000004"
        }
      ]
    }
    \n
    \n#### 🔧 Arguments
    \n**popCritValues** > Un tableau de PopCritValues à créer
    \n**skipDuplicates** > 👥 Boolean, si \`true\` ne rajoute pas les doublons
    `,
  })
  async createManyPopCritValues(
    @Args({
      name: 'popCritValues',
      description: `Tableau de Références.`,
      nullable: false,
      type: () => [CreateManyPopCritValuesInput],
    })
    popCritValues: CreateManyPopCritValuesInput[],

    @Args({
      name: 'skipDuplicates',
      defaultValue: true,
      description: `Supprimer les doublons ?`,
      nullable: false,
      type: () => Boolean,
    })
    skipDuplicates: boolean,
  ): Promise<CountModel> {
    const params: PrismaClient.PopCritValueCreateManyArgs = {
      data: popCritValues,
      skipDuplicates: skipDuplicates,
    };

    const countModel: CountModel = (await this.popCritValuesService.createMany(
      params,
    )) as CountModel;
    return countModel;
  }

  // * update
  @Mutation(() => PopCritValueModel, {
    name: 'updatePopCritValue',
    description: `⬆️+🔗 Mettre à jour un *PopCritValue*, avec possibilité de créer/connecter également ses valeurs String (nested)
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testUpdateOne($where: FindUniquePopCritValueInput!, $data: UpdatePopCritValueInput!) {
      updatePopCritValue(where: $where, data: $data) {
        valueBol
        valueDat
        valueNbr
        valueStr

        popCriteria {
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
        "id": "XXX"
      },
      "data": {
        "valueBol": true,
        "valueDat": "2024-12-24",
        "valueNbr": 42,
        "valueStr": "Chevasson",
        
        // Pas de création nestée pour relation 1TM
        // "popCriteria": {
        //   "create": [
        //     {
        //       "name": "PopCriteria name",
        //       "table": "ResourceField",
        //       "field": "lastName",
        //       "fieldTypeHelper": "String",
        //       "operatorComparison": "equals"
        //     }
        //   ]
        // }
      }
    }
    \n##### 💬 Variables, 🔗 connexion nestée
    \n
    \n 🌱 Uniquement via l'identifiant pour le moment (seul champ unique de PopCriteria)
    \n
    {
      "where": {
        "id": "XXX"
      },
      "data": {
        "popCriteria": {
          "connect": {
            "id": "PopCriteria id"
          }
        }
      }
    }\n
    ##### 💬 Variables, 🔗❌ déconnexion nestée
    \n
    \n 💩 KO pour le moment ?
    \n
    {
      "where": {
        "id": "XXX"
      },
      "data": {
        "popCriteria": {
          "disconnect": {
            "id": "PopCriteria id"
          }
        }
      }
    }
    \n`,
  })
  async updatePopCritValue(
    @Args('where')
    findUniquePopCritValue: FindUniquePopCritValue,

    @Args('data')
    dataInput: UpdatePopCritValueInput,
  ): Promise<PopCritValue | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopCritValue).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idPopCritValue' NestJs
    if (findUniquePopCritValue.hasOwnProperty('id')) {
      whereUniqueInput['idPopCritValue'] = findUniquePopCritValue.id;
    }

    // * data
    const params: {
      where: PrismaClient.PopCritValueWhereUniqueInput;
      data: PrismaClient.PopCritValueUpdateInput;
    } = {
      where: whereUniqueInput as PrismaClient.PopCritValueWhereUniqueInput,
      data: dataInput as PrismaClient.PopCritValueUpdateInput,
    };
    return this.popCritValuesService.update(params);
  }

  // * updateOpen
  @Mutation(() => PopCritValueModel, {
    name: 'updatePopCritValueOpen',
    description: `⬆️🆓 Modifier un *PopCritValue*, passage de ce qu'on veut (PC) en argument
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testUpdateOne($where: FindUniquePopCritValueInput!, $data: JSONObject!) {
      updatePopCritValueOpen(where: $where, data: $data) {
        valueBol
        valueDat
        valueNbr
        valueStr

        popCriteria {
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
        "id": "XXX"
      },
      "data": {
        "valueBol": true,
        "valueDat": "2024-12-24",
        "valueNbr": 42,
        "valueStr": "Chevasson",
        
        // Pas de création nestée pour relation 1TM
        // "popCriteria": {
        //   "create": [
        //     {
        //       "name": "PopCriteria name (MUST BE UNIQUE)",
        //       "table": "ResourceField",
        //       "field": "lastName",
        //       "fieldTypeHelper": "String",
        //       "operatorComparison": "equals"
        //     }
        //   ]
        // }
      }
    }
    \n##### 💬 Variables, 🔗 connexion nestée
    \n
    \n 🌱 Uniquement via l'identifiant pour le moment (seul champ unique de PopCriteria)
    \n
    {
      "where": {
        "id": "XXX"
      },
      "data": {
        "popCriteria": {
          "connect": {
            "id": "PopCriteria id"
          }
        }
      }
    }\n
    ##### 💬 Variables, 🔗❌ déconnexion nestée
    \n
    \n 💩 KO pour le moment ?
    \n
    {
      "where": {
        "id": "XXX"
      },
      "data": {
        "popCriteria": {
          "disconnect": {
            "id": "PopCriteria id"
          }
        }
      }
    }
    \n`,
  })
  async updatePopCritValueOpen(
    @Args('where')
    findUniquePopCritValue: FindUniquePopCritValue,

    @Args({
      name: 'data',
      description: `Object containing values for PopCritValue, and optionnaly also PopCriterias.`,
      nullable: true,
      type: () => GraphQLJSONObject,
    })
    dataInput: PrismaClient.PopCritValueUpdateInput,
  ): Promise<PopCritValue | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopCritValue).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idPopCritValue' NestJs
    if (findUniquePopCritValue.hasOwnProperty('id')) {
      whereUniqueInput['idPopCritValue'] = findUniquePopCritValue.id;
    }

    // * data
    const params: {
      where: PrismaClient.PopCritValueWhereUniqueInput;
      data: PrismaClient.PopCritValueUpdateInput;
    } = {
      where: whereUniqueInput as PrismaClient.PopCritValueWhereUniqueInput,
      data: dataInput as PrismaClient.PopCritValueUpdateInput,
    };
    return this.popCritValuesService.update(params);
  }

  // * delete
  @Mutation(() => PopCritValueModel, {
    name: 'deletePopCritValue',
    description: `🔥🔗 Supprimer un *PopCritValue*
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testRemoveOne($id: String) {
      deletePopCritValue(id: $id) {
        valueBol
        valueDat
        valueNbr
        valueStr
        
        popCriteria {
          name
          table
          field
          fieldTypeHelper
          operatorComparison
        }
      }
    }
    \n##### 💬 Variables
    \n 👋 Change id to target wanted entry
    \n 🚨🔥🔗 It will delete all connected PopCriterias
    \n
    {
      "id": "XXX"
    }
    \n`,
  })
  async deletePopCritValue(
    @Args()
    findUniquePopCritValue: FindUniquePopCritValue,
  ): Promise<PopCritValue | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniquePopCritValue).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idPopCritValue' NestJs
    if (findUniquePopCritValue.hasOwnProperty('id')) {
      whereUniqueInput['idPopCritValue'] = findUniquePopCritValue.id;
    }

    return this.popCritValuesService.remove(
      whereUniqueInput as PrismaClient.PopCritValueWhereUniqueInput,
    );
  }
}
