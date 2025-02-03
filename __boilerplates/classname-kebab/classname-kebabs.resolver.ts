// CLASSNAME_MAJ_FIRST REMOVE
// CLASSNAME_LOWC_FIRST REMOVE
// CLASSNAME_FILE_KEBAB_CASE REMOVE

// RELATION_MAJ_FIRST REMOVE
// RELATION_LOWC_FIRST REMOVE
// RELATION_FILE_KEBAB_CASE REMOVE

import {
  Resolver,
  Query,
  Mutation,
  Args,
  // ResolveField,
  // Parent,
  registerEnumType,
} from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-scalars";

import {
  CLASSNAME_MAJ_FIRST,
  // RELATION_MAJ_FIRST,
  Prisma as PrismaClient,
} from "@prisma/client";

// * ♻️🧰 Utility / Generics
import { SkipTakeArgs } from "../_utility/graphql/args/skip-take.args";
import { CountModel } from "../_utility/graphql/models/count.model";

// * CLASSNAME_MAJ_FIRST
// Internal
import { CLASSNAME_MAJ_FIRSTsService } from "./CLASSNAME_FILE_KEBAB_CASEs.service";
// ENUMs
import { CLASSNAME_MAJ_FIRSTDistinctEnum } from "./enums/CLASSNAME_FILE_KEBAB_CASE-distinct.enum";
// DTOs
// import { CLASSNAME_MAJ_FIRSTEntity } from './entities/CLASSNAME_FILE_KEBAB_CASE.entity';
import { CLASSNAME_MAJ_FIRSTModel } from "./models/CLASSNAME_FILE_KEBAB_CASE.model";
import { CreateCLASSNAME_MAJ_FIRSTInput } from "./dto/create-CLASSNAME_FILE_KEBAB_CASE.input";
import { CreateManyCLASSNAME_MAJ_FIRSTsInput } from "./dto/create-many-CLASSNAME_FILE_KEBAB_CASEs.input";
import { FindArgs } from "./dto/find-CLASSNAME_FILE_KEBAB_CASE.args";
import { FindUniqueCLASSNAME_MAJ_FIRST } from "./dto/find-unique-CLASSNAME_FILE_KEBAB_CASE";
import { UpdateCLASSNAME_MAJ_FIRSTInput } from "./dto/update-CLASSNAME_FILE_KEBAB_CASE.input";

// 🔗 Relations, nested fields
// import { RELATION_MAJ_FIRSTModel } from '../RELATION_FILE_KEBAB_CASEs/models/RELATION_FILE_KEBAB_CASE.model';
// import { RELATION_MAJ_FIRSTsService } from '../RELATION_FILE_KEBAB_CASEs/RELATION_FILE_KEBAB_CASEs.service';

@Resolver(() => CLASSNAME_MAJ_FIRSTModel)
export class CLASSNAME_MAJ_FIRSTsResolver {
  constructor(
    private readonly CLASSNAME_LOWC_FIRSTsService: CLASSNAME_MAJ_FIRSTsService
    // 🔗 Relations
    // private readonly RELATION_LOWC_FIRSTsService: RELATION_MAJ_FIRSTsService,
  ) {
    // ! 🔢 Dedicated ENUMs
    registerEnumType(CLASSNAME_MAJ_FIRSTDistinctEnum, {
      name: "CLASSNAME_MAJ_FIRSTDistinctEnum",
      description: "👥 Filter out duplicates rows for one or all fields.",
      valuesMap: {
        allFields: {
          description: "👥 Filter out duplicates rows for both name and type",
        },
        name: {
          description: "👥 Filter out duplicates rows for name",
        },
        none: {
          description: "Default value, no deduplicate.",
        },
      },
    });
  }

  // ---

  // ! 🔗 Relations, nested fields

  // // * RELATION_LOWC_FIRSTs / Many to one / Return [0-N] 📦📦📦
  // @ResolveField('RELATION_LOWC_FIRSTs', () => [RELATION_MAJ_FIRSTModel])
  // async RELATION_LOWC_FIRSTs(@Parent() CLASSNAME_LOWC_FIRST: CLASSNAME_MAJ_FIRSTEntity
  // ): Promise<RELATION_MAJ_FIRST[]> {
  //   // * Do not overload if already defined (include/filters in the service)
  //   if (CLASSNAME_LOWC_FIRST.hasOwnProperty('RELATION_LOWC_FIRSTs')) {
  //     return CLASSNAME_LOWC_FIRST['RELATION_LOWC_FIRSTs'];
  //   }

  //   // * If not, return all related entries (join)
  //   const { idCLASSNAME_MAJ_FIRST } = CLASSNAME_LOWC_FIRST;
  //   return this.RELATION_LOWC_FIRSTsService.findMany({
  //     where: {
  //       CLASSNAME_LOWC_FIRSTId: idCLASSNAME_MAJ_FIRST,
  //     },
  //   });
  // }

  // ---

  // // * RELATION_MAJ_FIRST / One to many / Return only one 📦
  // @ResolveField('RELATION_LOWC_FIRST', () => RELATION_MAJ_FIRSTModel)
  // async RELATION_LOWC_FIRST(
  //   @Parent() CLASSNAME_LOWC_FIRST: CLASSNAME_MAJ_FIRSTEntity,
  // ): Promise<RELATION_MAJ_FIRST | null> {
  //   // * Do not overload if already defined (include/filters in the service)
  //   if (CLASSNAME_LOWC_FIRST.hasOwnProperty('RELATION_LOWC_FIRST')) {
  //     return CLASSNAME_LOWC_FIRST['RELATION_LOWC_FIRST'];
  //   }

  //   // * If not, return all related entries (join)
  //   const { RELATION_LOWC_FIRSTId } = CLASSNAME_LOWC_FIRST;

  //   // If no relation is found, return null
  //   if (RELATION_LOWC_FIRSTId === null) return null;

  //   // Appel de la méthode du service de la ressource concernée
  //   //    Besoin de passer le service concerné dans le constructeur
  //   return this.RELATION_LOWC_FIRSTsService.findUnique({
  //     idRELATION_MAJ_FIRST: RELATION_LOWC_FIRSTId,
  //   });
  // }

  // ---

  // // * RELATION_MAJ_FIRSTs / Many to Many / Return [0-N] 📦📦📦
  // @ResolveField('RELATION_LOWC_FIRSTs', () => [RELATION_MAJ_FIRSTModel])
  // async RELATION_LOWC_FIRSTs(@Parent() CLASSNAME_LOWC_FIRST: CLASSNAME_MAJ_FIRSTEntity): Promise<RELATION_MAJ_FIRST[]> {
  //   // * Do not overload if already defined (include/filters in the service)
  //   if (CLASSNAME_LOWC_FIRST.hasOwnProperty('RELATION_LOWC_FIRSTs')) {
  //     return CLASSNAME_LOWC_FIRST['RELATION_LOWC_FIRSTs'];
  //   }

  //   // * If not, return all related entries (join)
  //   const { idCLASSNAME_MAJ_FIRST } = CLASSNAME_LOWC_FIRST;

  //   // [n-m] implicit > JOIN table _CLASSNAME_MAJ_FIRSTToRELATION_MAJ_FIRST
  //   // Get all related (through where), RELATION_LOWC_FIRSTs (through include), then extract & returns them, if any
  //   const CLASSNAME_LOWC_FIRSTsWithRELATION_MAJ_FIRST = await this.CLASSNAME_LOWC_FIRSTsService.findMany({
  //     where: {
  //       idCLASSNAME_MAJ_FIRST: idCLASSNAME_MAJ_FIRST,
  //     },
  //     include: {
  //       RELATION_LOWC_FIRSTs: true, // Returns all joined RELATION_LOWC_FIRSTs
  //     },
  //   });

  //   if (CLASSNAME_LOWC_FIRSTsWithRELATION_MAJ_FIRST[0].hasOwnProperty('RELATION_LOWC_FIRSTs')) {
  //     return CLASSNAME_LOWC_FIRSTsWithRELATION_MAJ_FIRST[0]['RELATION_LOWC_FIRSTs'] as Array<RELATION_MAJ_FIRST>;
  //   }
  //   return [] as Array<RELATION_MAJ_FIRST>;
  // }

  // ---

  // ! 🔍 Query / Queries

  // * findUnique
  @Query(() => CLASSNAME_MAJ_FIRSTModel, {
    name: "CLASSNAME_LOWC_FIRST",
    description: `🔍⭐ Rechercher par ID ou par champ unique (XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX)
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      CLASSNAME_LOWC_FIRST(name: "XXX") {
        name
        type
      }
    }
    \n
    \n---
    \n
    {
      CLASSNAME_LOWC_FIRST(id: "XXX") {
        name
        type
      }
    }
    \n
    \n#### 🔧 Arguments
    \n**id** > CLASSNAME_MAJ_FIRST unique ID
    \n**name** > CLASSNAME_MAJ_FIRST unique name
    \n
    \n---
    \n#### 🔗 Relations
    \n**RELATION_MAJ_FIRST**
    \n**RELATION_MAJ_FIRSTs [  ]**
    \n
    {
      CLASSNAME_LOWC_FIRST(name: "XXX") {
        name
        type

        # RELATION_LOWC_FIRSTs {
        #   fieldnameHelper
        #   value
        # }
      }
    }
    \n`,
  })
  async findUnique(
    @Args()
    findUniqueCLASSNAME_MAJ_FIRST: FindUniqueCLASSNAME_MAJ_FIRST
  ): Promise<CLASSNAME_MAJ_FIRST | null> {
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniqueCLASSNAME_MAJ_FIRST).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // TODO: 🌱 Automatic property renaming/mapping ~= id for GraphQL > idCLASSNAME_MAJ_FIRST for PC
    // Object.entries(findUniqueCLASSNAME_MAJ_FIRST).forEach(([key, value]) => {
    //   console.log(`${key}: ${value}`);
    //   // * Dynamic property assignation
    //   whereUniqueInput[key] = value;
    // });

    // Transformer 'id' (GraphQL) en 'idCLASSNAME_MAJ_FIRST' NestJs
    if (findUniqueCLASSNAME_MAJ_FIRST.hasOwnProperty("id")) {
      whereUniqueInput["idCLASSNAME_MAJ_FIRST"] =
        findUniqueCLASSNAME_MAJ_FIRST.id;
    }

    if (findUniqueCLASSNAME_MAJ_FIRST.hasOwnProperty("name")) {
      whereUniqueInput["name"] = findUniqueCLASSNAME_MAJ_FIRST.name;
    }

    return this.CLASSNAME_LOWC_FIRSTsService.findUnique(
      whereUniqueInput as PrismaClient.CLASSNAME_MAJ_FIRSTWhereUniqueInput
    );
  }

  // * findFirst
  @Query(() => CLASSNAME_MAJ_FIRSTModel, {
    name: "CLASSNAME_LOWC_FIRSTFindFirst",
    description: `🔍🥇 Rechercher et récupérer le premier qui correspond
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      CLASSNAME_LOWC_FIRSTFindFirst {
        name
        type
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
    \n**distinct** > 👥 Filter out duplicates rows for one or all fields. Possible values: allFields, name
    \n
    {
      CLASSNAME_LOWC_FIRSTFindFirst(skip: 1) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTFindFirst(take: 1) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTFindFirst(where: { name: "XXX" }) {
        name
        type
      }
    }
    
    \n
    {
      CLASSNAME_LOWC_FIRSTFindFirst(orderBy: { name: desc }) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTFindFirst(cursor: { id: "XXX" }) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTFindFirst(distinct: allFields) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTFindFirst(whereOpen: { name: { contains: "c", }, }) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTFindFirst(orderByOpen: [ { type: "desc", }, { name: "desc", }, ]) {
        name
        type
      }
    }
    \n
    \n---
    \n#### 🔗 Relations
    \n**RELATION_MAJ_FIRST**
    \n**RELATION_MAJ_FIRSTs [  ]**
    \n
    {
      CLASSNAME_LOWC_FIRSTFindFirst {
        name
        type

        # RELATION_LOWC_FIRSTs {
        #   fieldnameHelper
        #   value
        # }
      }
    }
    \n`,
  })
  async findFirst(
    // 2 Args : skip and take
    @Args()
    skipTakeArgs: SkipTakeArgs,

    @Args() findArgs: FindArgs
  ): Promise<CLASSNAME_MAJ_FIRST | null> {
    const { where, whereOpen, orderBy, orderByOpen, cursor, distinct } =
      findArgs;

    // * Merged arguments for Prisma Client
    const CLASSNAME_LOWC_FIRSTFindArgs = {};

    // * skip, take
    Object.entries(skipTakeArgs).forEach(([key, value]) => {
      // * Dynamic property assignation
      CLASSNAME_LOWC_FIRSTFindArgs[key] = value;
    });

    // * where, ours
    if (typeof where !== "undefined") {
      const wherePropertiesCount = Object.keys(where).length;

      if (wherePropertiesCount > 0) {
        const whereWithoutTypes = JSON.parse(JSON.stringify(where));

        // Transform 'id' (GraphQL) in 'idCLASSNAME_MAJ_FIRST' for Prisma Client
        if (whereWithoutTypes.hasOwnProperty("id")) {
          whereWithoutTypes["idCLASSNAME_MAJ_FIRST"] = whereWithoutTypes.id;
          // Remove old property
          delete whereWithoutTypes.id;
        }

        CLASSNAME_LOWC_FIRSTFindArgs["where"] = whereWithoutTypes;
      }
    }

    // * where, Prisma Client
    // * whereOpen as priority over our where
    if (typeof whereOpen !== "undefined") {
      const whereOpenPropertiesCount = Object.keys(whereOpen).length;

      if (whereOpenPropertiesCount > 0) {
        const whereOpenWithoutTypes = JSON.parse(JSON.stringify(whereOpen));

        // Transform 'id' (GraphQL) in 'idCLASSNAME_MAJ_FIRST' for Prisma Client
        if (whereOpenWithoutTypes.hasOwnProperty("id")) {
          whereOpenWithoutTypes["idCLASSNAME_MAJ_FIRST"] =
            whereOpenWithoutTypes.id;
          // Remove old property
          delete whereOpenWithoutTypes.id;
        }

        // CLASSNAME_LOWC_FIRSTFindArgs['where'] = whereOpen;
        CLASSNAME_LOWC_FIRSTFindArgs["where"] = whereOpenWithoutTypes;
      }
    }

    // * orderBy, ours
    if (typeof orderBy !== "undefined") {
      const orderByPropertiesCount = Object.keys(orderBy).length;

      if (orderByPropertiesCount > 0) {
        const orderByWithoutTypes = JSON.parse(JSON.stringify(orderBy));

        // Transform 'id' (GraphQL) in 'idCLASSNAME_MAJ_FIRST' for Prisma Client
        if (orderByWithoutTypes.hasOwnProperty("id")) {
          orderByWithoutTypes["idCLASSNAME_MAJ_FIRST"] = orderByWithoutTypes.id;
          // Remove old property
          delete orderByWithoutTypes.id;
        }

        CLASSNAME_LOWC_FIRSTFindArgs["orderBy"] = orderByWithoutTypes;
      }
    }

    // * orderBy, Prisma Client
    // * orderByOpen as priority over our orderBy
    if (typeof orderByOpen !== "undefined") {
      const orderByOpenPropertiesCount = Object.keys(orderByOpen).length;

      if (orderByOpenPropertiesCount > 0) {
        const orderByOpenWithoutTypes = JSON.parse(JSON.stringify(orderByOpen));

        // Transform 'id' (GraphQL) in 'idCLASSNAME_MAJ_FIRST' for Prisma Client
        //    It's an array
        orderByOpenWithoutTypes.forEach((element) => {
          if (element.hasOwnProperty("id")) {
            element["idCLASSNAME_MAJ_FIRST"] = element.id;
            // Remove old property
            delete element.id;
          }
        });

        CLASSNAME_LOWC_FIRSTFindArgs["orderBy"] = orderByOpenWithoutTypes;
      }
    }

    // * cursor
    if (typeof cursor !== "undefined") {
      const cursorPropertiesCount = Object.keys(cursor).length;

      if (cursorPropertiesCount > 0) {
        const cursorWithoutTypes = JSON.parse(JSON.stringify(cursor));

        // Transform 'id' (GraphQL) in 'idCLASSNAME_MAJ_FIRST' for Prisma Client
        if (cursorWithoutTypes.hasOwnProperty("id")) {
          cursorWithoutTypes["idCLASSNAME_MAJ_FIRST"] = cursorWithoutTypes.id;
          // Remove old property
          delete cursorWithoutTypes.id;
        }
        // No need to transform 'name' to 'name'

        CLASSNAME_LOWC_FIRSTFindArgs["cursor"] = cursorWithoutTypes;
      }
    }

    // * distinct
    if (typeof distinct !== "undefined") {
      const distinctWithoutTypes = JSON.parse(JSON.stringify(distinct));

      // Transform 'all' (GraphQL) in '['name']' for Prisma Client
      if (distinctWithoutTypes === "all") {
        CLASSNAME_LOWC_FIRSTFindArgs["distinct"] = ["name"];
      }

      if (distinctWithoutTypes === "name") {
        CLASSNAME_LOWC_FIRSTFindArgs["distinct"] = ["name"];
      }

      // if (distinctWithoutTypes === 'none')
      // Do nothing. Needs a default value else it crashes when the argument isn't provided
    }

    return this.CLASSNAME_LOWC_FIRSTsService.findFirst(
      CLASSNAME_LOWC_FIRSTFindArgs as PrismaClient.CLASSNAME_MAJ_FIRSTFindFirstArgs
    );
  }

  // * findMany
  @Query(() => [CLASSNAME_MAJ_FIRSTModel], {
    name: "CLASSNAME_LOWC_FIRSTs",
    description: `🔍💯 Récupérer des *CLASSNAME_MAJ_FIRSTs*\n& détails relations 🔗
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    {
      CLASSNAME_LOWC_FIRSTs {
        name
        type
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
    \n**distinct** > 👥 Filter out duplicates rows for one or all fields. Possible values: allFields, name
    \n
    {
      CLASSNAME_LOWC_FIRSTs(skip: 1) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTs(take: 1) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTs(where: { name: "XXX" }) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTs(orderBy: { name: desc }) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTs(cursor: { id: "XXX" }) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTs(distinct: allFields) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTs(whereOpen: { name: { contains: "c", }, }) {
        name
        type
      }
    }
    \n
    {
      CLASSNAME_LOWC_FIRSTs(orderByOpen: [ { type: "desc", }, { name: "desc", }, ]) {
        name
        type
      }
    }
    \n
    \n---
    \n#### 🔗 Relations
    \n**RELATION_MAJ_FIRST**
    \n**RELATION_MAJ_FIRSTs [  ]**
    \n
    {
      CLASSNAME_LOWC_FIRSTs {
        name
        type

        # RELATION_LOWC_FIRSTs {
        #   fieldnameHelper
        #   value
        # }
      }
    }
    \n`,
  })
  async findMany(
    // 2 Args : skip and take
    @Args()
    skipTakeArgs: SkipTakeArgs,

    @Args() findArgs: FindArgs
  ): Promise<CLASSNAME_MAJ_FIRST[]> {
    const { where, whereOpen, orderBy, orderByOpen, cursor, distinct } =
      findArgs;

    // * Merged arguments for Prisma Client
    const CLASSNAME_LOWC_FIRSTFindArgs = {};

    // * skip, take
    Object.entries(skipTakeArgs).forEach(([key, value]) => {
      // * Dynamic property assignation
      CLASSNAME_LOWC_FIRSTFindArgs[key] = value;
    });

    // * where, ours
    if (typeof where !== "undefined") {
      const wherePropertiesCount = Object.keys(where).length;

      if (wherePropertiesCount > 0) {
        const whereWithoutTypes = JSON.parse(JSON.stringify(where));

        // Transform 'id' (GraphQL) in 'idCLASSNAME_MAJ_FIRST' for Prisma Client
        if (whereWithoutTypes.hasOwnProperty("id")) {
          whereWithoutTypes["idCLASSNAME_MAJ_FIRST"] = whereWithoutTypes.id;
          // Remove old property
          delete whereWithoutTypes.id;
        }

        CLASSNAME_LOWC_FIRSTFindArgs["where"] = whereWithoutTypes;
      }
    }

    // * where, Prisma Client
    // * whereOpen as priority over our where
    if (typeof whereOpen !== "undefined") {
      const whereOpenPropertiesCount = Object.keys(whereOpen).length;

      if (whereOpenPropertiesCount > 0) {
        const whereOpenWithoutTypes = JSON.parse(JSON.stringify(whereOpen));

        // Transform 'id' (GraphQL) in 'idCLASSNAME_MAJ_FIRST' for Prisma Client
        if (whereOpenWithoutTypes.hasOwnProperty("id")) {
          whereOpenWithoutTypes["idCLASSNAME_MAJ_FIRST"] =
            whereOpenWithoutTypes.id;
          // Remove old property
          delete whereOpenWithoutTypes.id;
        }

        // CLASSNAME_LOWC_FIRSTFindArgs['where'] = whereOpen;
        CLASSNAME_LOWC_FIRSTFindArgs["where"] = whereOpenWithoutTypes;
      }
    }

    // * orderBy, ours
    if (typeof orderBy !== "undefined") {
      const orderByPropertiesCount = Object.keys(orderBy).length;

      if (orderByPropertiesCount > 0) {
        const orderByWithoutTypes = JSON.parse(JSON.stringify(orderBy));

        // Transform 'id' (GraphQL) in 'idCLASSNAME_MAJ_FIRST' for Prisma Client
        if (orderByWithoutTypes.hasOwnProperty("id")) {
          orderByWithoutTypes["idCLASSNAME_MAJ_FIRST"] = orderByWithoutTypes.id;
          // Remove old property
          delete orderByWithoutTypes.id;
        }

        CLASSNAME_LOWC_FIRSTFindArgs["orderBy"] = orderByWithoutTypes;
      }
    }

    // * orderBy, Prisma Client
    // * orderByOpen as priority over our orderBy
    if (typeof orderByOpen !== "undefined") {
      const orderByOpenPropertiesCount = Object.keys(orderByOpen).length;

      if (orderByOpenPropertiesCount > 0) {
        const orderByOpenWithoutTypes = JSON.parse(JSON.stringify(orderByOpen));

        // Transform 'id' (GraphQL) in 'idCLASSNAME_MAJ_FIRST' for Prisma Client
        //    It's an array
        orderByOpenWithoutTypes.forEach((element) => {
          if (element.hasOwnProperty("id")) {
            element["idCLASSNAME_MAJ_FIRST"] = element.id;
            // Remove old property
            delete element.id;
          }
        });

        CLASSNAME_LOWC_FIRSTFindArgs["orderBy"] = orderByOpenWithoutTypes;
      }
    }

    // * cursor
    if (typeof cursor !== "undefined") {
      const cursorPropertiesCount = Object.keys(cursor).length;

      if (cursorPropertiesCount > 0) {
        const cursorWithoutTypes = JSON.parse(JSON.stringify(cursor));

        // Transform 'id' (GraphQL) in 'idCLASSNAME_MAJ_FIRST' for Prisma Client
        if (cursorWithoutTypes.hasOwnProperty("id")) {
          cursorWithoutTypes["idCLASSNAME_MAJ_FIRST"] = cursorWithoutTypes.id;
          // Remove old property
          delete cursorWithoutTypes.id;
        }
        // No need to transform 'name' to 'name'

        CLASSNAME_LOWC_FIRSTFindArgs["cursor"] = cursorWithoutTypes;
      }
    }

    // * distinct
    if (typeof distinct !== "undefined") {
      const distinctWithoutTypes = JSON.parse(JSON.stringify(distinct));

      // Transform 'all' (GraphQL) in '['name']' for Prisma Client
      if (distinctWithoutTypes === "all") {
        CLASSNAME_LOWC_FIRSTFindArgs["distinct"] = ["name"];
      }

      if (distinctWithoutTypes === "name") {
        CLASSNAME_LOWC_FIRSTFindArgs["distinct"] = ["name"];
      }

      // if (distinctWithoutTypes === 'none')
      // Do nothing. Needs a default value else it crashes when the argument isn't provided
    }

    return this.CLASSNAME_LOWC_FIRSTsService.findMany(
      CLASSNAME_LOWC_FIRSTFindArgs as PrismaClient.CLASSNAME_MAJ_FIRSTFindManyArgs
    );
  }

  // ---

  // ! ⬆️ Mutations

  // * create
  @Mutation(() => CLASSNAME_MAJ_FIRSTModel, {
    name: "createCLASSNAME_MAJ_FIRST",
    description: `🔨+🔗 Créer un *CLASSNAME_MAJ_FIRST*, avec possibilité de créer également ses valeurs String (nested)
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddOne($params: CreateCLASSNAME_MAJ_FIRSTInput) {
      createCLASSNAME_MAJ_FIRST(params: $params) {
        name
        type

        # RELATION_LOWC_FIRSTs {
        #   fieldnameHelper
        #   value
        # }
      }
    }
    \n##### 💬 Variables
    \n
    {
      "params": {
        "name": "CLASSNAME_MAJ_FIRST name (MUST BE UNIQUE)",
        "type": "String",

        // "RELATION_LOWC_FIRST": {
        //   "connect": {
        //     "name": "Nom de la RELATION_MAJ_FIRST à laquelle associer"
        //   }
        // }

        // "RELATION_LOWC_FIRSTs": {
        //   "create": [
        //     {
        //       "fieldname": "CLASSNAME_MAJ_FIRST name (helper)",
        //       "value": "The first CLASSNAME_MAJ_FIRST string value"
        //     }
        //   ]
        // }
      }
    }
    \n`,
  })
  async createCLASSNAME_MAJ_FIRST(
    @Args({
      name: "params",
      description: `Object containing values for CLASSNAME_MAJ_FIRST, and optionnaly also RELATION_MAJ_FIRSTs.`,
      nullable: true,
      type: () => CreateCLASSNAME_MAJ_FIRSTInput,
    })
    params: CreateCLASSNAME_MAJ_FIRSTInput
  ): Promise<CLASSNAME_MAJ_FIRST | null> {
    // // * 🔗 Relation One to many / Only one 📦 > connect
    // // Transformer 'id' (GraphQL) en 'idRELATION_MAJ_FIRST' NestJs
    // if (typeof params !== 'undefined') {
    //   if (params.hasOwnProperty('RELATION_LOWC_FIRST')) {
    //     if (params.RELATION_LOWC_FIRST.hasOwnProperty('connect')) {
    //       if (params.RELATION_LOWC_FIRST['connect'].hasOwnProperty('id')) {
    //         params.RELATION_LOWC_FIRST['connect']['idRELATION_MAJ_FIRST'] =
    //           params.RELATION_LOWC_FIRST['connect'].id;

    //         // Remove old property
    //         delete params.RELATION_LOWC_FIRST['connect'].id;
    //       }
    //     }
    //   }
    // }

    const data: PrismaClient.CLASSNAME_MAJ_FIRSTCreateInput =
      params as PrismaClient.CLASSNAME_MAJ_FIRSTCreateInput;

    return this.CLASSNAME_LOWC_FIRSTsService.create(data);
  }

  // * createOpen
  @Mutation(() => CLASSNAME_MAJ_FIRSTModel, {
    name: "createCLASSNAME_MAJ_FIRSTOpen",
    description: `🔨🆓 Créer un *CLASSNAME_MAJ_FIRST*, passage de ce qu'on veut (PC) en argument
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddOne($params: JSONObject) {
      createCLASSNAME_MAJ_FIRSTOpen(params: $params) {
        name
        type

        # RELATION_LOWC_FIRSTs {
        #   fieldnameHelper
        #   value
        # }
      }
    }
    \n##### 💬 Variables, 🚨 rouge partout syntaxe non reconnue mais fonctionne ✅
    \n
    {
      "params": {
        "name": "CLASSNAME_MAJ_FIRST name (MUST BE UNIQUE)",
        "type": "String",

        // "RELATION_LOWC_FIRST": {
        //   "connect": {
        //     "name": "Nom de la RELATION_MAJ_FIRST à laquelle associer"
        //     "idRELATION_MAJ_FIRST": "idRELATION_MAJ_FIRST de la RELATION_MAJ_FIRST à laquelle associer"
        //   }
        // }

        // "RELATION_LOWC_FIRSTs": {
        //   "create": [
        //     { "fieldname": "RELATION_LOWC_FIRST fieldname","value": "The first RELATION_MAJ_FIRST value" },
        //     { "fieldname": "RELATION_LOWC_FIRST fieldname","value": "The second RELATION_MAJ_FIRST value" }
        //   ]
        // }
      }
    }
    \n`,
  })
  async createCLASSNAME_MAJ_FIRSTOpen(
    @Args({
      name: "params",
      description: `Object containing values for CLASSNAME_MAJ_FIRST, and optionnaly also RELATION_MAJ_FIRSTs.`,
      nullable: true,
      type: () => GraphQLJSONObject,
    })
    params: PrismaClient.CLASSNAME_MAJ_FIRSTCreateInput
  ): Promise<CLASSNAME_MAJ_FIRST | null> {
    return this.CLASSNAME_LOWC_FIRSTsService.create(
      params as PrismaClient.CLASSNAME_MAJ_FIRSTCreateInput
    );
  }

  @Mutation(() => CountModel, {
    name: "createManyCLASSNAME_MAJ_FIRSTs",
    description: `🏭 Créer plusieurs *CLASSNAME_MAJ_FIRSTs*, ne supporte pas la création nestée
    \nRenvoi le nombre de *CLASSNAME_MAJ_FIRSTs* créés, potentiellement sans doublons.
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testAddMany($CLASSNAME_LOWC_FIRSTs: [CreateManyCLASSNAME_MAJ_FIRSTsInput!]!) {
      createManyCLASSNAME_MAJ_FIRSTs(CLASSNAME_LOWC_FIRSTs: $CLASSNAME_LOWC_FIRSTs, skipDuplicates: true) {
        count
      }
    }
    \n##### 💬 Variables
    \n
    {
      "CLASSNAME_LOWC_FIRSTs": [
        {"name": "many first name", "type": "String"},
        {"name": "many second name", "type": "String"},
        {"name": "many third name", "type": "String"},
        {"name": "doublon", "type": "String"},
        {"name": "doublon", "type": "String"}
      ]
    }
    \n
    \n#### 🔧 Arguments
    \n**CLASSNAME_LOWC_FIRSTs** > Un tableau de CLASSNAME_MAJ_FIRSTs à créer
    \n**skipDuplicates** > 👥 Boolean, si \`true\` ne rajoute pas les doublons
    `,
  })
  async createManyCLASSNAME_MAJ_FIRSTs(
    @Args({
      name: "CLASSNAME_LOWC_FIRSTs",
      description: `Tableau de Références.`,
      nullable: false,
      type: () => [CreateManyCLASSNAME_MAJ_FIRSTsInput],
    })
    CLASSNAME_LOWC_FIRSTs: CreateManyCLASSNAME_MAJ_FIRSTsInput[],

    @Args({
      name: "skipDuplicates",
      defaultValue: true,
      description: `Supprimer les doublons ?`,
      nullable: false,
      type: () => Boolean,
    })
    skipDuplicates: boolean
  ): Promise<CountModel> {
    const params: PrismaClient.CLASSNAME_MAJ_FIRSTCreateManyArgs = {
      data: CLASSNAME_LOWC_FIRSTs,
      skipDuplicates: skipDuplicates,
    };

    const countModel: CountModel =
      (await this.CLASSNAME_LOWC_FIRSTsService.createMany(
        params
      )) as CountModel;
    return countModel;
  }

  // * update
  @Mutation(() => CLASSNAME_MAJ_FIRSTModel, {
    name: "updateCLASSNAME_MAJ_FIRST",
    description: `⬆️+🔗 Mettre à jour un *CLASSNAME_MAJ_FIRST*, avec possibilité de créer/connecter également ses valeurs String (nested)
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testUpdateOne($where: FindUniqueCLASSNAME_MAJ_FIRSTInput!, $data: UpdateCLASSNAME_MAJ_FIRSTInput!) {
      updateCLASSNAME_MAJ_FIRST(where: $where, data: $data) {
        name
        type

        # RELATION_LOWC_FIRSTs {
        #   fieldnameHelper
        #   value
        # }
      }
    }
    \n##### 💬 Variables, ✨ création nestée
    \n
    {
      "where": {
        "name": "Le nom de la CLASSNAME_MAJ_FIRST à mettre à jour"
      },
      "data": {
        "name": "Nouveau nom",
        "type": "Nouveau type",

        // "RELATION_LOWC_FIRSTs": {
        //   "create": [
        //     {
        //       "fieldname": "Le nom du champ concerné",
        //       "value": "La valeur"
        //     }
        //   ]
        // }
      }
    }
    \n##### 💬 Variables, 🔗 connexion nestée
    \n
    \n 🌱 Uniquement via l'identifiant pour le moment (seul champ unique de RELATION_MAJ_FIRST)
    \n
    {
      "where": {
        "name": "Le nom de la CLASSNAME_MAJ_FIRST à mettre à jour"
      },
      "data": {
        "RELATION_LOWC_FIRST": {
          "connect": {
            "idRELATION_MAJ_FIRST": "XXX"
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
        "name": "Le nom de la CLASSNAME_MAJ_FIRST à mettre à jour"
      },
      "data": {
        "RELATION_LOWC_FIRST": {
          "disconnect": {
            "idRELATION_MAJ_FIRST": "XXX"
          }
        }
      }
    }
    \n`,
  })
  async updateCLASSNAME_MAJ_FIRST(
    @Args("where")
    findUniqueCLASSNAME_MAJ_FIRST: FindUniqueCLASSNAME_MAJ_FIRST,

    @Args("data")
    dataInput: UpdateCLASSNAME_MAJ_FIRSTInput
  ): Promise<CLASSNAME_MAJ_FIRST | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniqueCLASSNAME_MAJ_FIRST).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idCLASSNAME_MAJ_FIRST' NestJs
    if (findUniqueCLASSNAME_MAJ_FIRST.hasOwnProperty("id")) {
      whereUniqueInput["idCLASSNAME_MAJ_FIRST"] =
        findUniqueCLASSNAME_MAJ_FIRST.id;
    }

    if (findUniqueCLASSNAME_MAJ_FIRST.hasOwnProperty("name")) {
      whereUniqueInput["name"] = findUniqueCLASSNAME_MAJ_FIRST.name;
    }

    // * data
    const params: {
      where: PrismaClient.CLASSNAME_MAJ_FIRSTWhereUniqueInput;
      data: PrismaClient.CLASSNAME_MAJ_FIRSTUpdateInput;
    } = {
      where:
        whereUniqueInput as PrismaClient.CLASSNAME_MAJ_FIRSTWhereUniqueInput,
      data: dataInput as PrismaClient.CLASSNAME_MAJ_FIRSTUpdateInput,
    };
    return this.CLASSNAME_LOWC_FIRSTsService.update(params);
  }

  // * updateOpen
  @Mutation(() => CLASSNAME_MAJ_FIRSTModel, {
    name: "updateCLASSNAME_MAJ_FIRSTOpen",
    description: `⬆️🆓 Modifier un *CLASSNAME_MAJ_FIRST*, passage de ce qu'on veut (PC) en argument
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testUpdateOne($where: FindUniqueCLASSNAME_MAJ_FIRSTInput!, $data: JSONObject!) {
      updateCLASSNAME_MAJ_FIRSTOpen(where: $where, data: $data) {
        name
        type

        # RELATION_LOWC_FIRSTs {
        #   fieldnameHelper
        #   value
        # }
      }
    }
    \n##### 💬 Variables, ✨ création nestée
    \n
    {
      "where": {
        "name": "Le nom de la CLASSNAME_MAJ_FIRST à mettre à jour"
      },
      "data": {
        "name": "Nouveau nom",
        "type": "Nouveau type",

        // "RELATION_LOWC_FIRSTs": {
        //   "create": [
        //     {
        //       "fieldname": "Le nom du champ concerné",
        //       "value": "La valeur"
        //     }
        //   ]
        // }
      }
    }
    \n##### 💬 Variables, 🔗 connexion nestée
    \n
    \n 🌱 Uniquement via l'identifiant pour le moment (seul champ unique de RELATION_MAJ_FIRST)
    \n
    {
      "where": {
        "name": "Le nom de la CLASSNAME_MAJ_FIRST à mettre à jour"
      },
      "data": {
        "RELATION_LOWC_FIRSTs": {
          "connect": [
            {
              "idRELATION_MAJ_FIRST": "XXX"
            }
          ]
        }
      }
    }
    \n##### 💬 Variables, 🔗❌ déconnexion nestée
    \n
    \n 💩 KO pour le moment ?
    \n
    {
      "where": {
        "name": "Le nom de la CLASSNAME_MAJ_FIRST à mettre à jour"
      },
      "data": {
        "RELATION_LOWC_FIRSTs": {
          "disconnect": [
            {
              "idRELATION_MAJ_FIRST": "XXX"
            }
          ]
        }
      }
    }
    \n`,
  })
  async updateCLASSNAME_MAJ_FIRSTOpen(
    @Args("where")
    findUniqueCLASSNAME_MAJ_FIRST: FindUniqueCLASSNAME_MAJ_FIRST,

    @Args({
      name: "data",
      description: `Object containing values for CLASSNAME_MAJ_FIRST, and optionnaly also RELATION_MAJ_FIRSTs.`,
      nullable: true,
      type: () => GraphQLJSONObject,
    })
    dataInput: PrismaClient.CLASSNAME_MAJ_FIRSTUpdateInput
  ): Promise<CLASSNAME_MAJ_FIRST | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniqueCLASSNAME_MAJ_FIRST).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idCLASSNAME_MAJ_FIRST' NestJs
    if (findUniqueCLASSNAME_MAJ_FIRST.hasOwnProperty("id")) {
      whereUniqueInput["idCLASSNAME_MAJ_FIRST"] =
        findUniqueCLASSNAME_MAJ_FIRST.id;
    }

    if (findUniqueCLASSNAME_MAJ_FIRST.hasOwnProperty("name")) {
      whereUniqueInput["name"] = findUniqueCLASSNAME_MAJ_FIRST.name;
    }

    // * data
    const params: {
      where: PrismaClient.CLASSNAME_MAJ_FIRSTWhereUniqueInput;
      data: PrismaClient.CLASSNAME_MAJ_FIRSTUpdateInput;
    } = {
      where:
        whereUniqueInput as PrismaClient.CLASSNAME_MAJ_FIRSTWhereUniqueInput,
      data: dataInput as PrismaClient.CLASSNAME_MAJ_FIRSTUpdateInput,
    };
    return this.CLASSNAME_LOWC_FIRSTsService.update(params);
  }

  // * delete
  @Mutation(() => CLASSNAME_MAJ_FIRSTModel, {
    name: "deleteCLASSNAME_MAJ_FIRST",
    description: `🔥🔗 Supprimer un *CLASSNAME_MAJ_FIRST*
    \n#### Exemple d'utilisation
    \n##### 🌐 Requête
    mutation testRemoveOne($name: String) {
      deleteCLASSNAME_MAJ_FIRST(name: $name) {
        name
        type
        
        # RELATION_LOWC_FIRSTs {
        #   fieldnameHelper
        #   value
        # }
      }
    }
    \n##### 💬 Variables
    \n 👋 Change name to target wanted entry
    \n 🚨🔥🔗 It will delete all connected RELATION_MAJ_FIRSTs
    \n
    {
      "name": "Test delete"
    }
    \n`,
  })
  async deleteCLASSNAME_MAJ_FIRST(
    @Args()
    findUniqueCLASSNAME_MAJ_FIRST: FindUniqueCLASSNAME_MAJ_FIRST
  ): Promise<CLASSNAME_MAJ_FIRST | null> {
    // * where
    // * Must be 1 Arg (findUnique)
    const propertiesCount = Object.keys(findUniqueCLASSNAME_MAJ_FIRST).length;

    if (propertiesCount !== 1) {
      return null;
    }

    const whereUniqueInput = {};

    // Transformer 'id' (GraphQL) en 'idCLASSNAME_MAJ_FIRST' NestJs
    if (findUniqueCLASSNAME_MAJ_FIRST.hasOwnProperty("id")) {
      whereUniqueInput["idCLASSNAME_MAJ_FIRST"] =
        findUniqueCLASSNAME_MAJ_FIRST.id;
    }

    if (findUniqueCLASSNAME_MAJ_FIRST.hasOwnProperty("name")) {
      whereUniqueInput["name"] = findUniqueCLASSNAME_MAJ_FIRST.name;
    }

    return this.CLASSNAME_LOWC_FIRSTsService.remove(
      whereUniqueInput as PrismaClient.CLASSNAME_MAJ_FIRSTWhereUniqueInput
    );
  }
}
