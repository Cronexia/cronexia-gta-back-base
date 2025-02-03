// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
// * Hasher les password
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // * Prisma tutorial
  // create two dummy users
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      password: passwordSabin,
    },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: passwordSabin,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      password: passwordAlex,
    },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: passwordAlex,
    },
  });

  // create three dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {
      authorId: user2.id,
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      authorId: user2.id,
    },
  });

  const post3 = await prisma.article.upsert({
    where: { title: 'Prisma Client Just Became a Lot More Flexible' },
    update: {},
    create: {
      title: 'Prisma Client Just Became a Lot More Flexible',
      body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
      published: true,
    },
  });

  console.log(`🤡 MOCK from Prisma's tutorial`);
  console.log({ user1, user2, post1, post2, post3 });

  console.log(`---`);
  console.log(`---`);
  console.log(`---`);

  console.log(`💼 Cronexia`);

  // * Populations
  // ! Table Population
  console.log(`👪 Population`);

  const population_Boolean_isPointage_equals_true =
    await prisma.population.upsert({
      where: {
        name: 'Boolean_isPointage_equals_true',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000001',
        name: 'Boolean_isPointage_equals_true',

        operatorLogical: 'AND',
      },
    });

  const population_Boolean_isPointage_not_true = await prisma.population.upsert(
    {
      where: {
        name: 'Boolean_isPointage_not_true',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000002',
        name: 'Boolean_isPointage_not_true',

        operatorLogical: 'AND',
      },
    },
  );

  // ---

  const population_Date_inDate_equals_2023_12_01 =
    await prisma.population.upsert({
      where: {
        name: 'Date_inDate_equals_2023_12_01',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000003',
        name: 'Date_inDate_equals_2023_12_01',

        operatorLogical: 'AND',
      },
    });

  const population_Date_inDate_not_2023_12_01 = await prisma.population.upsert({
    where: {
      name: 'Date_inDate_not_2023_12_01',
    },
    update: {},
    create: {
      idPopulation: '00000000-0000-0000-9090-00000d200003',
      name: 'Date_inDate_not_2023_12_01',

      operatorLogical: 'AND',
    },
  });

  const population_Date_inDate_lowerThan_2003_01_01 =
    await prisma.population.upsert({
      where: {
        name: 'Date_inDate_lowerThan_2003_01_01',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-00000d300003',
        name: 'Date_inDate_lowerThan_2003_01_01',

        operatorLogical: 'AND',
      },
    });

  const population_Date_inDate_lowerThanOrEqual_2003_01_01 =
    await prisma.population.upsert({
      where: {
        name: 'Date_inDate_lowerThanOrEqual_2003_01_01',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-00000d400003',
        name: 'Date_inDate_lowerThanOrEqual_2003_01_01',

        operatorLogical: 'AND',
      },
    });

  const population_Date_inDate_greaterThan_2003_01_01 =
    await prisma.population.upsert({
      where: {
        name: 'Date_inDate_greaterThan_2003_01_01',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-00000d500003',
        name: 'Date_inDate_greaterThan_2003_01_01',

        operatorLogical: 'AND',
      },
    });

  const population_Date_inDate_greaterThanOrEqual_2003_01_01 =
    await prisma.population.upsert({
      where: {
        name: 'Date_inDate_greaterThanOrEqual_2003_01_01',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-00000d600003',
        name: 'Date_inDate_greaterThanOrEqual_2003_01_01',

        operatorLogical: 'AND',
      },
    });

  const population_Date_inDate_in_2023_12_01__2023_06_01 =
    await prisma.population.upsert({
      where: {
        name: 'Date_inDate_in_2023_12_01__2023_06_01',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-00000d700003',
        name: 'Date_inDate_in_2023_12_01__2023_06_01',

        operatorLogical: 'AND',
      },
    });

  const population_Date_inDate_notIn_2023_12_01__2023_06_01 =
    await prisma.population.upsert({
      where: {
        name: 'Date_inDate_notIn_2023_12_01__2023_06_01',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-00000d800003',
        name: 'Date_inDate_notIn_2023_12_01__2023_06_01',

        operatorLogical: 'AND',
      },
    });

  const population_Date_inDate_range_2003_01_01__2008_01_01 =
    await prisma.population.upsert({
      where: {
        name: 'Date_inDate_range_2003_01_01__2008_01_01',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-00000d900003',
        name: 'Date_inDate_range_2003_01_01__2008_01_01',

        operatorLogical: 'AND',
      },
    });

  // ---

  const population_Number_employmentRatePercent_equals_100 =
    await prisma.population.upsert({
      where: {
        name: 'Number_employmentRatePercent_equals_100',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000004',
        name: 'Number_employmentRatePercent_equals_100',

        operatorLogical: 'AND',
      },
    });

  const population_Number_employmentRatePercent_not_100 =
    await prisma.population.upsert({
      where: {
        name: 'Number_employmentRatePercent_not_100',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000005',
        name: 'Number_employmentRatePercent_not_100',

        operatorLogical: 'AND',
      },
    });

  const population_Number_employmentRatePercent_in_90_100 =
    await prisma.population.upsert({
      where: {
        name: 'Number_employmentRatePercent_in_90_100',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000006',
        name: 'Number_employmentRatePercent_in_90_100',

        operatorLogical: 'AND',
      },
    });

  const population_Number_employmentRatePercent_notIn_90_100 =
    await prisma.population.upsert({
      where: {
        name: 'Number_employmentRatePercent_notIn_90_100',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000007',
        name: 'Number_employmentRatePercent_notIn_90_100',

        operatorLogical: 'AND',
      },
    });

  const population_Number_employmentRatePercent_lowerThan_90 =
    await prisma.population.upsert({
      where: {
        name: 'Number_employmentRatePercent_lowerThan_90',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000008',
        name: 'Number_employmentRatePercent_lowerThan_90',

        operatorLogical: 'AND',
      },
    });

  const population_Number_employmentRatePercent_lowerThanOrEqual_90 =
    await prisma.population.upsert({
      where: {
        name: 'Number_employmentRatePercent_lowerThanOrEqual_90',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000009',
        name: 'Number_employmentRatePercent_lowerThanOrEqual_90',

        operatorLogical: 'AND',
      },
    });

  const population_Number_employmentRatePercent_greaterThan_90 =
    await prisma.population.upsert({
      where: {
        name: 'Number_employmentRatePercent_greaterThan_90',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000010',
        name: 'Number_employmentRatePercent_greaterThan_90',

        operatorLogical: 'AND',
      },
    });

  const population_Number_employmentRatePercent_greaterThanOrEqual_90 =
    await prisma.population.upsert({
      where: {
        name: 'Number_employmentRatePercent_greaterThanOrEqual_90',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000011',
        name: 'Number_employmentRatePercent_greaterThanOrEqual_90',

        operatorLogical: 'AND',
      },
    });

  const population_Number_employmentRatePercent_range_80_90 =
    await prisma.population.upsert({
      where: {
        name: 'Number_employmentRatePercent_range_80_90',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-020000000011',
        name: 'Number_employmentRatePercent_range_80_90',

        operatorLogical: 'AND',
      },
    });

  const population_String_lastName_equals_Chevasson =
    await prisma.population.upsert({
      where: {
        name: 'String_lastName_equals_Chevasson',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000012',
        name: 'String_lastName_equals_Chevasson',

        operatorLogical: 'AND',
      },
    });

  const population_String_lastName_not_Chevasson =
    await prisma.population.upsert({
      where: {
        name: 'String_lastName_not_Chevasson',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000013',
        name: 'String_lastName_not_Chevasson',

        operatorLogical: 'AND',
      },
    });

  const population_String_lastName_in_Chevasson_Courtois =
    await prisma.population.upsert({
      where: {
        name: 'String_lastName_in_Chevasson_Courtois',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000014',
        name: 'String_lastName_in_Chevasson_Courtois',

        operatorLogical: 'AND',
      },
    });

  const population_String_lastName_notIn_Chevasson_Courtois =
    await prisma.population.upsert({
      where: {
        name: 'String_lastName_notIn_Chevasson_Courtois',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000015',
        name: 'String_lastName_notIn_Chevasson_Courtois',

        operatorLogical: 'AND',
      },
    });

  const population_String_lastName_contains_a = await prisma.population.upsert({
    where: {
      name: 'String_lastName_contains_a',
    },
    update: {},
    create: {
      idPopulation: '00000000-0000-0000-9090-000000000016',
      name: 'String_lastName_contains_a',

      operatorLogical: 'AND',
    },
  });

  const population_String_lastName_startsWith_c =
    await prisma.population.upsert({
      where: {
        name: 'String_lastName_startsWith_c',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000017',
        name: 'String_lastName_startsWith_c',

        operatorLogical: 'AND',
      },
    });

  const population_String_lastName_endsWith_n = await prisma.population.upsert({
    where: {
      name: 'String_lastName_endsWith_n',
    },
    update: {},
    create: {
      idPopulation: '00000000-0000-0000-9090-000000000018',
      name: 'String_lastName_endsWith_n',

      operatorLogical: 'AND',
    },
  });

  const population_EnumNumber_echelon_equals_2 = await prisma.population.upsert(
    {
      where: {
        name: 'EnumNumber_echelon_equals_2',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000019',
        name: 'EnumNumber_echelon_equals_2',

        operatorLogical: 'AND',
      },
    },
  );

  const population_EnumString_quality_equals_Monsieur =
    await prisma.population.upsert({
      where: {
        name: 'EnumString_quality_equals_Monsieur',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000020',
        name: 'EnumString_quality_equals_Monsieur',

        operatorLogical: 'AND',
      },
    });

  const population_Resource_String_matricule_equals_123456A =
    await prisma.population.upsert({
      where: {
        name: 'Resource_String_matricule_equals_123456A',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000021',
        name: 'Resource_String_matricule_equals_123456A',

        operatorLogical: 'AND',
      },
    });

  const population_Resource_String_matricule_not_123456A =
    await prisma.population.upsert({
      where: {
        name: 'Resource_String_matricule_not_123456A',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000022',
        name: 'Resource_String_matricule_not_123456A',

        operatorLogical: 'AND',
      },
    });

  const population_Resource_String_matricule_in_123456A_987654B =
    await prisma.population.upsert({
      where: {
        name: 'Resource_String_matricule_in_123456A_987654B',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000023',
        name: 'Resource_String_matricule_in_123456A_987654B',

        operatorLogical: 'AND',
      },
    });

  const population_Resource_String_matricule_notIn_123456A_987654B =
    await prisma.population.upsert({
      where: {
        name: 'Resource_String_matricule_notIn_123456A_987654B',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000024',
        name: 'Resource_String_matricule_notIn_123456A_987654B',

        operatorLogical: 'AND',
      },
    });

  const population_Resource_String_matricule_contains_a =
    await prisma.population.upsert({
      where: {
        name: 'Resource_String_matricule_contains_a',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000025',
        name: 'Resource_String_matricule_contains_a',

        operatorLogical: 'AND',
      },
    });

  const population_Resource_String_matricule_startsWith_1 =
    await prisma.population.upsert({
      where: {
        name: 'Resource_String_matricule_startsWith_1',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000026',
        name: 'Resource_String_matricule_startsWith_1',

        operatorLogical: 'AND',
      },
    });

  const population_Resource_String_matricule_endsWith_a =
    await prisma.population.upsert({
      where: {
        name: 'Resource_String_matricule_endsWith_a',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000027',
        name: 'Resource_String_matricule_endsWith_a',

        operatorLogical: 'AND',
      },
    });

  const population_2C_quality_equals_Mr_AND_lastname_contains_a =
    await prisma.population.upsert({
      where: {
        name: '2C_quality_equals_Mr_AND_lastname_contains_a',
      },
      update: {},
      create: {
        idPopulation: '00000000-0000-0000-9090-000000000028',
        name: '2C_quality_equals_Mr_AND_lastname_contains_a',

        operatorLogical: 'AND',
      },
    });

  const population_4_criteres = await prisma.population.upsert({
    where: {
      name: '4_criteres',
    },
    update: {},
    create: {
      idPopulation: '00000000-0000-0000-9090-000000000029',
      name: '4_criteres',

      operatorLogical: 'AND',
    },
  });

  // ---

  const population_generated_resources = await prisma.population.upsert({
    where: {
      name: 'generated_resources',
    },
    update: {},
    create: {
      idPopulation: '00000000-0000-0000-9090-000000000030',
      name: 'generated_resources',

      operatorLogical: 'AND',
    },
  });

  console.log({
    population_Boolean_isPointage_equals_true,
    population_Boolean_isPointage_not_true,
    population_Date_inDate_equals_2023_12_01,
    population_Date_inDate_not_2023_12_01,
    population_Date_inDate_lowerThan_2003_01_01,
    population_Date_inDate_lowerThanOrEqual_2003_01_01,
    population_Date_inDate_greaterThan_2003_01_01,
    population_Date_inDate_greaterThanOrEqual_2003_01_01,
    population_Date_inDate_in_2023_12_01__2023_06_01,
    population_Date_inDate_notIn_2023_12_01__2023_06_01,
    population_Date_inDate_range_2003_01_01__2008_01_01,
    population_Number_employmentRatePercent_equals_100,
    population_Number_employmentRatePercent_not_100,
    population_Number_employmentRatePercent_in_90_100,
    population_Number_employmentRatePercent_notIn_90_100,
    population_Number_employmentRatePercent_lowerThan_90,
    population_Number_employmentRatePercent_lowerThanOrEqual_90,
    population_Number_employmentRatePercent_greaterThan_90,
    population_Number_employmentRatePercent_greaterThanOrEqual_90,
    population_Number_employmentRatePercent_range_80_90,
    population_String_lastName_equals_Chevasson,
    population_String_lastName_not_Chevasson,
    population_String_lastName_in_Chevasson_Courtois,
    population_String_lastName_notIn_Chevasson_Courtois,
    population_String_lastName_contains_a,
    population_String_lastName_startsWith_c,
    population_String_lastName_endsWith_n,
    population_EnumNumber_echelon_equals_2,
    population_EnumString_quality_equals_Monsieur,
    population_Resource_String_matricule_equals_123456A,
    population_Resource_String_matricule_not_123456A,
    population_Resource_String_matricule_in_123456A_987654B,
    population_Resource_String_matricule_notIn_123456A_987654B,
    population_Resource_String_matricule_contains_a,
    population_Resource_String_matricule_startsWith_1,
    population_Resource_String_matricule_endsWith_a,
    population_2C_quality_equals_Mr_AND_lastname_contains_a,
    population_4_criteres,
    // ---
    population_generated_resources,
  });

  // ---

  // * Populations > Critères
  // ! Table PopCriteria
  console.log(`👪⚗️ PopCriteria`);

  const popCriteria_Boolean_isPointage_equals_true =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000001',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000001',
        name: 'Criteria_Boolean_isPointage_equals_true',

        table: 'ResourceField',
        field: 'isPointage',
        fieldTypeHelper: 'Boolean',

        operatorComparison: 'equals',

        populationId: population_Boolean_isPointage_equals_true.idPopulation,
      },
    });

  const popCriteria_Boolean_isPointage_not_true =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000002',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000002',
        name: 'Criteria_Boolean_isPointage_not_true',

        table: 'ResourceField',
        field: 'isPointage',
        fieldTypeHelper: 'Boolean',

        operatorComparison: 'not',

        populationId: population_Boolean_isPointage_not_true.idPopulation,
      },
    });

  // ---

  const popCriteria_Date_inDate_equals_2023_12_01 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000003',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000003',
        name: 'Criteria_Date_inDate_equals_2023_12_01',

        table: 'ResourceField',
        field: 'inDate',
        fieldTypeHelper: 'Date',

        operatorComparison: 'equals',

        populationId: population_Date_inDate_equals_2023_12_01.idPopulation,
      },
    });

  const popCriteria_Date_inDate_not_2023_12_01 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-00000d200003',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-00000d200003',
        name: 'Criteria_Date_inDate_not_2023_12_01',

        table: 'ResourceField',
        field: 'inDate',
        fieldTypeHelper: 'Date',

        operatorComparison: 'not',

        populationId: population_Date_inDate_not_2023_12_01.idPopulation,
      },
    });

  const popCriteria_Date_inDate_lowerThan_2003_01_01 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-00000d300003',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-00000d300003',
        name: 'Criteria_Date_inDate_lowerThan_2003_01_01',

        table: 'ResourceField',
        field: 'inDate',
        fieldTypeHelper: 'Date',

        operatorComparison: 'lowerThan',

        populationId: population_Date_inDate_lowerThan_2003_01_01.idPopulation,
      },
    });

  const popCriteria_Date_inDate_lowerThanOrEqual_2003_01_01 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-00000d400003',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-00000d400003',
        name: 'Criteria_Date_inDate_lowerThanOrEqual_2003_01_01',

        table: 'ResourceField',
        field: 'inDate',
        fieldTypeHelper: 'Date',

        operatorComparison: 'lowerThanOrEqual',

        populationId:
          population_Date_inDate_lowerThanOrEqual_2003_01_01.idPopulation,
      },
    });

  const popCriteria_Date_inDate_greaterThan_2003_01_01 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-00000d500003',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-00000d500003',
        name: 'Criteria_Date_inDate_greaterThan_2003_01_01',

        table: 'ResourceField',
        field: 'inDate',
        fieldTypeHelper: 'Date',

        operatorComparison: 'greaterThan',

        populationId:
          population_Date_inDate_greaterThan_2003_01_01.idPopulation,
      },
    });

  const popCriteria_Date_inDate_greaterThanOrEqual_2003_01_01 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-00000d600003',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-00000d600003',
        name: 'Criteria_Date_inDate_greaterThanOrEqual_2003_01_01',

        table: 'ResourceField',
        field: 'inDate',
        fieldTypeHelper: 'Date',

        operatorComparison: 'greaterThanOrEqual',

        populationId:
          population_Date_inDate_greaterThanOrEqual_2003_01_01.idPopulation,
      },
    });

  const popCriteria_Date_inDate_in_2023_12_01__2023_06_01 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-00000d700003',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-00000d700003',
        name: 'Criteria_Date_inDate_in_2023_12_01__2023_06_01',

        table: 'ResourceField',
        field: 'inDate',
        fieldTypeHelper: 'Date',

        operatorComparison: 'in',

        populationId:
          population_Date_inDate_in_2023_12_01__2023_06_01.idPopulation,
      },
    });

  const popCriteria_Date_inDate_notIn_2023_12_01__2023_06_01 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-00000d800003',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-00000d800003',
        name: 'Criteria_Date_inDate_notIn_2023_12_01__2023_06_01',

        table: 'ResourceField',
        field: 'inDate',
        fieldTypeHelper: 'Date',

        operatorComparison: 'notIn',

        populationId:
          population_Date_inDate_notIn_2023_12_01__2023_06_01.idPopulation,
      },
    });

  const popCriteria_Date_inDate_range_2003_01_01__2008_01_01 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-00000d900003',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-00000d900003',
        name: 'Criteria_Date_inDate_range_2003_01_01__2008_01_01',

        table: 'ResourceField',
        field: 'inDate',
        fieldTypeHelper: 'Date',

        operatorComparison: 'range',

        populationId:
          population_Date_inDate_range_2003_01_01__2008_01_01.idPopulation,
      },
    });

  // ---

  const popCriteria_Number_employmentRatePercent_equals_100 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000004',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000004',
        name: 'Criteria_Number_employmentRatePercent_equals_100',

        table: 'ResourceField',
        field: 'employmentRatePercent',
        fieldTypeHelper: 'Number',

        operatorComparison: 'equals',

        populationId:
          population_Number_employmentRatePercent_equals_100.idPopulation,
      },
    });

  const popCriteria_Number_employmentRatePercent_not_100 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000005',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000005',
        name: 'Criteria_Number_employmentRatePercent_not_100',

        table: 'ResourceField',
        field: 'employmentRatePercent',
        fieldTypeHelper: 'Number',

        operatorComparison: 'not',

        populationId:
          population_Number_employmentRatePercent_not_100.idPopulation,
      },
    });

  const popCriteria_Number_employmentRatePercent_in_90_100 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000006',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000006',
        name: 'Criteria_Number_employmentRatePercent_in_90_100',

        table: 'ResourceField',
        field: 'employmentRatePercent',
        fieldTypeHelper: 'Number',

        operatorComparison: 'in',

        populationId:
          population_Number_employmentRatePercent_in_90_100.idPopulation,
      },
    });

  const popCriteria_Number_employmentRatePercent_notIn_90_100 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000007',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000007',
        name: 'Criteria_Number_employmentRatePercent_notIn_90_100',

        table: 'ResourceField',
        field: 'employmentRatePercent',
        fieldTypeHelper: 'Number',

        operatorComparison: 'notIn',

        populationId:
          population_Number_employmentRatePercent_notIn_90_100.idPopulation,
      },
    });

  const popCriteria_Number_employmentRatePercent_lowerThan_90 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000008',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000008',
        name: 'Criteria_Number_employmentRatePercent_lowerThan_90',

        table: 'ResourceField',
        field: 'employmentRatePercent',
        fieldTypeHelper: 'Number',

        operatorComparison: 'lowerThan',

        populationId:
          population_Number_employmentRatePercent_lowerThan_90.idPopulation,
      },
    });

  const popCriteria_Number_employmentRatePercent_lowerThanOrEqual_90 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000009',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000009',
        name: 'Criteria_Number_employmentRatePercent_lowerThanOrEqual_90',

        table: 'ResourceField',
        field: 'employmentRatePercent',
        fieldTypeHelper: 'Number',

        operatorComparison: 'lowerThanOrEqual',

        populationId:
          population_Number_employmentRatePercent_lowerThanOrEqual_90.idPopulation,
      },
    });

  const popCriteria_Number_employmentRatePercent_greaterThan_90 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000010',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000010',
        name: 'Criteria_Number_employmentRatePercent_greaterThan_90',

        table: 'ResourceField',
        field: 'employmentRatePercent',
        fieldTypeHelper: 'Number',

        operatorComparison: 'greaterThan',

        populationId:
          population_Number_employmentRatePercent_greaterThan_90.idPopulation,
      },
    });

  const popCriteria_Number_employmentRatePercent_greaterThanOrEqual_90 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000011',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000011',
        name: 'Criteria_Number_employmentRatePercent_greaterThanOrEqual_90',

        table: 'ResourceField',
        field: 'employmentRatePercent',
        fieldTypeHelper: 'Number',

        operatorComparison: 'greaterThanOrEqual',

        populationId:
          population_Number_employmentRatePercent_greaterThanOrEqual_90.idPopulation,
      },
    });

  const popCriteria_Number_employmentRatePercent_range_80_90 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000200000011',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000200000011',
        name: 'Criteria_Number_employmentRatePercent_range_80_90',

        table: 'ResourceField',
        field: 'employmentRatePercent',
        fieldTypeHelper: 'Number',

        operatorComparison: 'range',

        populationId:
          population_Number_employmentRatePercent_range_80_90.idPopulation,
      },
    });

  const popCriteria_String_lastName_equals_Chevasson =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000012',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000012',
        name: 'Criteria_String_lastName_equals_Chevasson',

        table: 'ResourceField',
        field: 'lastName',
        fieldTypeHelper: 'String',

        operatorComparison: 'equals',

        populationId: population_String_lastName_equals_Chevasson.idPopulation,
      },
    });

  const popCriteria_String_lastName_not_Chevasson =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000013',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000013',
        name: 'Criteria_String_lastName_not_Chevasson',

        table: 'ResourceField',
        field: 'lastName',
        fieldTypeHelper: 'String',

        operatorComparison: 'not',

        populationId: population_String_lastName_not_Chevasson.idPopulation,
      },
    });

  const popCriteria_String_lastName_in_Chevasson_Courtois =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000014',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000014',
        name: 'Criteria_String_lastName_in_Chevasson_Courtois',

        table: 'ResourceField',
        field: 'lastName',
        fieldTypeHelper: 'String',

        operatorComparison: 'in',

        populationId:
          population_String_lastName_in_Chevasson_Courtois.idPopulation,
      },
    });

  const popCriteria_String_lastName_notIn_Chevasson_Courtois =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000015',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000015',
        name: 'Criteria_String_lastName_notIn_Chevasson_Courtois',

        table: 'ResourceField',
        field: 'lastName',
        fieldTypeHelper: 'String',

        operatorComparison: 'notIn',

        populationId:
          population_String_lastName_notIn_Chevasson_Courtois.idPopulation,
      },
    });

  const popCriteria_String_lastName_contains_a =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000016',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000016',
        name: 'Criteria_String_lastName_contains_a',

        table: 'ResourceField',
        field: 'lastName',
        fieldTypeHelper: 'String',

        operatorComparison: 'contains',

        populationId: population_String_lastName_contains_a.idPopulation,
      },
    });

  const popCriteria_String_lastName_startsWith_c =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000017',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000017',
        name: 'Criteria_String_lastName_startsWith_c',

        table: 'ResourceField',
        field: 'lastName',
        fieldTypeHelper: 'String',

        operatorComparison: 'startsWith',

        populationId: population_String_lastName_startsWith_c.idPopulation,
      },
    });

  const popCriteria_String_lastName_endsWith_n =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000018',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000018',
        name: 'Criteria_String_lastName_endsWith_n',

        table: 'ResourceField',
        field: 'lastName',
        fieldTypeHelper: 'String',

        operatorComparison: 'endsWith',

        populationId: population_String_lastName_endsWith_n.idPopulation,
      },
    });

  const popCriteria_EnumNumber_echelon_equals_2 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000019',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000019',
        name: 'Criteria_EnumNumber_echelon_equals_2',

        table: 'ResourceField',
        field: 'echelon',
        fieldTypeHelper: 'EnumNumber',

        operatorComparison: 'equals',

        populationId: population_EnumNumber_echelon_equals_2.idPopulation,
      },
    });

  const popCriteria_EnumString_quality_equals_Monsieur =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000020',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000020',
        name: 'Criteria_EnumString_quality_equals_Monsieur',

        table: 'ResourceField',
        field: 'quality',
        fieldTypeHelper: 'EnumString',

        operatorComparison: 'equals',

        populationId:
          population_EnumString_quality_equals_Monsieur.idPopulation,
      },
    });

  const popCriteria_Resource_String_matricule_equals_123456A =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000021',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000021',
        name: 'Criteria_Resource_String_matricule_equals_123456A',

        table: 'Resource',
        field: 'matricule',
        fieldTypeHelper: 'String',

        operatorComparison: 'equals',

        populationId:
          population_Resource_String_matricule_equals_123456A.idPopulation,
      },
    });

  const popCriteria_Resource_String_matricule_not_123456A =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000022',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000022',
        name: 'Criteria_Resource_String_matricule_not_123456A',

        table: 'Resource',
        field: 'matricule',
        fieldTypeHelper: 'String',

        operatorComparison: 'not',

        populationId:
          population_Resource_String_matricule_not_123456A.idPopulation,
      },
    });

  const popCriteria_Resource_String_matricule_in_123456A_987654B =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000023',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000023',
        name: 'Criteria_Resource_String_matricule_in_123456A_987654B',

        table: 'Resource',
        field: 'matricule',
        fieldTypeHelper: 'String',

        operatorComparison: 'in',

        populationId:
          population_Resource_String_matricule_in_123456A_987654B.idPopulation,
      },
    });

  const popCriteria_Resource_String_matricule_notIn_123456A_987654B =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000024',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000024',
        name: 'Criteria_Resource_String_matricule_notIn_123456A_987654B',

        table: 'Resource',
        field: 'matricule',
        fieldTypeHelper: 'String',

        operatorComparison: 'notIn',

        populationId:
          population_Resource_String_matricule_notIn_123456A_987654B.idPopulation,
      },
    });

  const popCriteria_Resource_String_matricule_contains_a =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000025',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000025',
        name: 'Criteria_Resource_String_matricule_contains_a',

        table: 'Resource',
        field: 'matricule',
        fieldTypeHelper: 'String',

        operatorComparison: 'contains',

        populationId:
          population_Resource_String_matricule_contains_a.idPopulation,
      },
    });

  const popCriteria_Resource_String_matricule_startsWith_1 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000026',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000026',
        name: 'Criteria_Resource_String_matricule_startsWith_1',

        table: 'Resource',
        field: 'matricule',
        fieldTypeHelper: 'String',

        operatorComparison: 'startsWith',

        populationId:
          population_Resource_String_matricule_startsWith_1.idPopulation,
      },
    });

  const popCriteria_Resource_String_matricule_endsWith_a =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000027',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000027',
        name: 'Criteria_Resource_String_matricule_endsWith_a',

        table: 'Resource',
        field: 'matricule',
        fieldTypeHelper: 'String',

        operatorComparison: 'endsWith',

        populationId:
          population_Resource_String_matricule_endsWith_a.idPopulation,
      },
    });

  const popCriteria_EnumString_quality_equals_Monsieur2 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000028',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000028',
        name: 'Criteria_EnumString_quality_equals_Monsieur2',

        table: 'ResourceField',
        field: 'quality',
        fieldTypeHelper: 'EnumString',

        operatorComparison: 'equals',

        populationId:
          population_2C_quality_equals_Mr_AND_lastname_contains_a.idPopulation,
      },
    });

  const popCriteria_String_lastname_contains_a =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000010028',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000010028',
        name: 'Criteria_String_lastname_contains_a',

        table: 'ResourceField',
        field: 'lastName',
        fieldTypeHelper: 'String',

        operatorComparison: 'contains',

        populationId:
          population_2C_quality_equals_Mr_AND_lastname_contains_a.idPopulation,
      },
    });

  const popCriteria_EnumString_contract_equals_CDI =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000000029',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000000029',
        name: 'Criteria_EnumString_contract_equals_CDI',

        table: 'ResourceField',
        field: 'contract',
        fieldTypeHelper: 'EnumString',

        operatorComparison: 'equals',

        populationId: population_4_criteres.idPopulation,
      },
    });

  const popCriteria_EnumNumber_echelon_in_1_2_3 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000010029',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000010029',
        name: 'Criteria_EnumNumber_echelon_in_1_2_3',

        table: 'ResourceField',
        field: 'echelon',
        fieldTypeHelper: 'EnumNumber',

        operatorComparison: 'in',

        populationId: population_4_criteres.idPopulation,
      },
    });

  const popCriteria_Number_employmentRatePercent_greaterThan_90_2 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000020029',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000020029',
        name: 'popCriteria_Number_employmentRatePercent_greaterThan_90_2',

        table: 'ResourceField',
        field: 'employmentRatePercent',
        fieldTypeHelper: 'Number',

        operatorComparison: 'greaterThan',

        populationId: population_4_criteres.idPopulation,
      },
    });

  const popCriteria_Resource_String_matricule_contains_a_2 =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000030029',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000030029',
        name: 'popCriteria_Resource_String_matricule_contains_a_2',

        table: 'Resource',
        field: 'matricule',
        fieldTypeHelper: 'String',

        operatorComparison: 'contains',

        populationId: population_4_criteres.idPopulation,
      },
    });

  const popCriteria_Boolean_TEST_isGenerated_equals_true =
    await prisma.popCriteria.upsert({
      where: {
        idPopCriteria: '00000000-0000-0000-909c-000000030030',
      },
      update: {},
      create: {
        idPopCriteria: '00000000-0000-0000-909c-000000030030',
        name: 'Criteria_Boolean_TEST_isGenerated_equals_true',

        table: 'ResourceField',
        field: 'TEST_isGenerated',
        fieldTypeHelper: 'Boolean',

        operatorComparison: 'equals',

        populationId: population_generated_resources.idPopulation,
      },
    });

  console.log({
    popCriteria_Boolean_isPointage_equals_true,
    popCriteria_Boolean_isPointage_not_true,
    popCriteria_Date_inDate_equals_2023_12_01,
    popCriteria_Date_inDate_not_2023_12_01,
    popCriteria_Date_inDate_lowerThan_2003_01_01,
    popCriteria_Date_inDate_lowerThanOrEqual_2003_01_01,
    popCriteria_Date_inDate_greaterThan_2003_01_01,
    popCriteria_Date_inDate_greaterThanOrEqual_2003_01_01,
    popCriteria_Date_inDate_in_2023_12_01__2023_06_01,
    popCriteria_Date_inDate_notIn_2023_12_01__2023_06_01,
    popCriteria_Date_inDate_range_2003_01_01__2008_01_01,
    popCriteria_Number_employmentRatePercent_equals_100,
    popCriteria_Number_employmentRatePercent_not_100,
    popCriteria_Number_employmentRatePercent_in_90_100,
    popCriteria_Number_employmentRatePercent_notIn_90_100,
    popCriteria_Number_employmentRatePercent_lowerThan_90,
    popCriteria_Number_employmentRatePercent_lowerThanOrEqual_90,
    popCriteria_Number_employmentRatePercent_greaterThan_90,
    popCriteria_Number_employmentRatePercent_greaterThanOrEqual_90,
    popCriteria_Number_employmentRatePercent_range_80_90,
    popCriteria_String_lastName_equals_Chevasson,
    popCriteria_String_lastName_not_Chevasson,
    popCriteria_String_lastName_in_Chevasson_Courtois,
    popCriteria_String_lastName_notIn_Chevasson_Courtois,
    popCriteria_String_lastName_contains_a,
    popCriteria_String_lastName_startsWith_c,
    popCriteria_String_lastName_endsWith_n,
    popCriteria_EnumNumber_echelon_equals_2,
    popCriteria_EnumString_quality_equals_Monsieur,
    popCriteria_Resource_String_matricule_equals_123456A,
    popCriteria_Resource_String_matricule_not_123456A,
    popCriteria_Resource_String_matricule_in_123456A_987654B,
    popCriteria_Resource_String_matricule_notIn_123456A_987654B,
    popCriteria_Resource_String_matricule_contains_a,
    popCriteria_Resource_String_matricule_startsWith_1,
    popCriteria_Resource_String_matricule_endsWith_a,
    popCriteria_EnumString_quality_equals_Monsieur2,
    popCriteria_String_lastname_contains_a,
    popCriteria_EnumString_contract_equals_CDI,
    popCriteria_EnumNumber_echelon_in_1_2_3,
    popCriteria_Number_employmentRatePercent_greaterThan_90_2,
    popCriteria_Resource_String_matricule_contains_a_2,
    popCriteria_Boolean_TEST_isGenerated_equals_true,
  });

  // ---

  // * Populations > Critères > Valeurs typées
  // ! Table popCritValue
  console.log(`👪⚗️👌 popCritValue`);

  const popCritValue_Boolean_isPointage_equals_true =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000001',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000001',

        valueBol: true,

        popCriteriaId: popCriteria_Boolean_isPointage_equals_true.idPopCriteria,
      },
    });

  const popCritValue_Boolean_isPointage_not_true =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000002',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000002',

        valueBol: true,

        popCriteriaId: popCriteria_Boolean_isPointage_not_true.idPopCriteria,
      },
    });

  // ---

  const popCritValue_Date_inDate_equals_2023_12_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000003',

        valueDat: new Date('2023-12-01'),

        popCriteriaId: popCriteria_Date_inDate_equals_2023_12_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_not_2023_12_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d200003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d200003',

        valueDat: new Date('2023-12-01'),

        popCriteriaId: popCriteria_Date_inDate_not_2023_12_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_lowerThan_2003_01_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d300003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d300003',

        valueDat: new Date('2003-01-01'),

        popCriteriaId:
          popCriteria_Date_inDate_lowerThan_2003_01_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_lowerThanOrEqual_2003_01_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d400003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d400003',

        valueDat: new Date('2003-01-01'),

        popCriteriaId:
          popCriteria_Date_inDate_lowerThanOrEqual_2003_01_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_greaterThan_2003_01_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d500003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d500003',

        valueDat: new Date('2003-01-01'),

        popCriteriaId:
          popCriteria_Date_inDate_greaterThan_2003_01_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_greaterThanOrEqual_2003_01_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d600003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d600003',

        valueDat: new Date('2003-01-01'),

        popCriteriaId:
          popCriteria_Date_inDate_greaterThanOrEqual_2003_01_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_in_2023_12_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d700003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d700003',

        valueDat: new Date('2023-12-01'),

        popCriteriaId:
          popCriteria_Date_inDate_in_2023_12_01__2023_06_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_in_2023_06_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d720003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d720003',

        valueDat: new Date('2023-06-01'),

        popCriteriaId:
          popCriteria_Date_inDate_in_2023_12_01__2023_06_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_notIn_2023_12_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d800003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d800003',

        valueDat: new Date('2023-12-01'),

        popCriteriaId:
          popCriteria_Date_inDate_notIn_2023_12_01__2023_06_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_notIn_2023_06_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d820003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d820003',

        valueDat: new Date('2023-06-01'),

        popCriteriaId:
          popCriteria_Date_inDate_notIn_2023_12_01__2023_06_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_range_2003_01_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d900003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d900003',

        valueDat: new Date('2003-01-01'),

        popCriteriaId:
          popCriteria_Date_inDate_range_2003_01_01__2008_01_01.idPopCriteria,
      },
    });

  const popCritValue_Date_inDate_notIn_2008_01_01 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-70000d920003',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-70000d920003',

        valueDat: new Date('2008-01-01'),

        popCriteriaId:
          popCriteria_Date_inDate_range_2003_01_01__2008_01_01.idPopCriteria,
      },
    });

  // ---

  const popCritValue_Number_employmentRatePercent_equals_100 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000004',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000004',

        valueNbr: 100,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_equals_100.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_not_100 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000005',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000005',

        valueNbr: 100,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_not_100.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_in_90 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000006',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000006',

        valueNbr: 90,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_in_90_100.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_in_100 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000010006',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000010006',

        valueNbr: 100,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_in_90_100.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_notIn_90 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000007',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000007',

        valueNbr: 90,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_notIn_90_100.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_notIn_100 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000010007',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000010007',

        valueNbr: 100,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_notIn_90_100.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_lowerThan_90 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000008',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000008',

        valueNbr: 90,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_lowerThan_90.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_lowerThanOrEqual_90 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000009',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000009',

        valueNbr: 90,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_lowerThanOrEqual_90.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_greaterThan_90 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000010',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000010',

        valueNbr: 90,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_greaterThan_90.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_greaterThanOrEqual_90 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000011',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000011',

        valueNbr: 90,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_greaterThanOrEqual_90.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_range_80 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700200000011',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700200000011',

        valueNbr: 80,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_range_80_90.idPopCriteria,
      },
    });

  const popCritValue_Number_employmentRatePercent_range_90 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700300000011',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700300000011',

        valueNbr: 90,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_range_80_90.idPopCriteria,
      },
    });

  const popCritValue_String_lastName_equals_Chevasson =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000012',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000012',

        valueStr: 'Chevasson',

        popCriteriaId:
          popCriteria_String_lastName_equals_Chevasson.idPopCriteria,
      },
    });

  const popCritValue_String_lastName_not_Chevasson =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000013',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000013',

        valueStr: 'Chevasson',

        popCriteriaId: popCriteria_String_lastName_not_Chevasson.idPopCriteria,
      },
    });

  const popCritValue_String_lastName_in_Chevasson =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000014',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000014',

        valueStr: 'Chevasson',

        popCriteriaId:
          popCriteria_String_lastName_in_Chevasson_Courtois.idPopCriteria,
      },
    });

  const popCritValue_String_lastName_in_Courtois =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000010014',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000010014',

        valueStr: 'Courtois',

        popCriteriaId:
          popCriteria_String_lastName_in_Chevasson_Courtois.idPopCriteria,
      },
    });

  const popCritValue_String_lastName_notIn_Chevasson =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000015',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000015',

        valueStr: 'Chevasson',

        popCriteriaId:
          popCriteria_String_lastName_notIn_Chevasson_Courtois.idPopCriteria,
      },
    });

  const popCritValue_String_lastName_notIn_Courtois =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000010015',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000010015',

        valueStr: 'Courtois',

        popCriteriaId:
          popCriteria_String_lastName_notIn_Chevasson_Courtois.idPopCriteria,
      },
    });

  const popCritValue_String_lastName_contains_a =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000016',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000016',

        valueStr: 'a',

        popCriteriaId: popCriteria_String_lastName_contains_a.idPopCriteria,
      },
    });

  const popCritValue_String_lastName_startsWith_c =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000017',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000017',

        valueStr: 'c',

        popCriteriaId: popCriteria_String_lastName_startsWith_c.idPopCriteria,
      },
    });

  const popCritValue_String_lastName_endsWith_n =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000018',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000018',

        valueStr: 'n',

        popCriteriaId: popCriteria_String_lastName_endsWith_n.idPopCriteria,
      },
    });

  const popCritValue_EnumNumber_echelon_equals_2 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000019',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000019',

        valueNbr: 2,

        popCriteriaId: popCriteria_EnumNumber_echelon_equals_2.idPopCriteria,
      },
    });

  const popCritValue_EnumString_quality_equals_Monsieur =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000020',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000020',

        valueStr: 'Monsieur',

        popCriteriaId:
          popCriteria_EnumString_quality_equals_Monsieur.idPopCriteria,
      },
    });

  const popCritValue_Resource_String_matricule_equals_123456A =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000021',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000021',

        valueStr: '123456A',

        popCriteriaId:
          popCriteria_Resource_String_matricule_equals_123456A.idPopCriteria,
      },
    });

  const popCritValue_Resource_String_matricule_not_123456A =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000022',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000022',

        valueStr: '123456A',

        popCriteriaId:
          popCriteria_Resource_String_matricule_not_123456A.idPopCriteria,
      },
    });

  const popCritValue_Resource_String_matricule_in_123456A =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000023',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000023',

        valueStr: '123456A',

        popCriteriaId:
          popCriteria_Resource_String_matricule_in_123456A_987654B.idPopCriteria,
      },
    });

  const popCritValue_Resource_String_matricule_in_987654B =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000010023',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000010023',

        valueStr: '987654B',

        popCriteriaId:
          popCriteria_Resource_String_matricule_in_123456A_987654B.idPopCriteria,
      },
    });

  const popCritValue_Resource_String_matricule_notIn_123456A =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000024',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000024',

        valueStr: '123456A',

        popCriteriaId:
          popCriteria_Resource_String_matricule_notIn_123456A_987654B.idPopCriteria,
      },
    });

  const popCritValue_Resource_String_matricule_notIn_987654B =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000010024',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000010024',

        valueStr: '987654B',

        popCriteriaId:
          popCriteria_Resource_String_matricule_notIn_123456A_987654B.idPopCriteria,
      },
    });

  const popCritValue_Resource_String_matricule_contains_a =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000025',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000025',

        valueStr: 'a',

        popCriteriaId:
          popCriteria_Resource_String_matricule_contains_a.idPopCriteria,
      },
    });

  const popCritValue_Resource_String_matricule_startsWith_1 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000026',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000026',

        valueStr: '1',

        popCriteriaId:
          popCriteria_Resource_String_matricule_startsWith_1.idPopCriteria,
      },
    });

  const popCritValue_Resource_String_matricule_endsWith_a =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000027',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000027',

        valueStr: 'a',

        popCriteriaId:
          popCriteria_Resource_String_matricule_endsWith_a.idPopCriteria,
      },
    });

  const popCritValue_EnumString_quality_equals_Monsieur2 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000028',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000028',

        valueStr: 'Monsieur',

        popCriteriaId:
          popCriteria_EnumString_quality_equals_Monsieur2.idPopCriteria,
      },
    });

  const popCritValue_String_lastname_contains_a =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000010028',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000010028',

        valueStr: 'a',

        popCriteriaId: popCriteria_String_lastname_contains_a.idPopCriteria,
      },
    });

  const popCritValue_EnumString_contract_equals_CDI =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000000029',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000000029',

        valueStr: 'CDI',

        popCriteriaId: popCriteria_EnumString_contract_equals_CDI.idPopCriteria,
      },
    });

  const popCritValue_EnumNumber_echelon_in_1 = await prisma.popCritValue.upsert(
    {
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000010029',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000010029',

        valueNbr: 1,

        popCriteriaId: popCriteria_EnumNumber_echelon_in_1_2_3.idPopCriteria,
      },
    },
  );

  const popCritValue_EnumNumber_echelon_in_2 = await prisma.popCritValue.upsert(
    {
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000020029',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000020029',

        valueNbr: 2,

        popCriteriaId: popCriteria_EnumNumber_echelon_in_1_2_3.idPopCriteria,
      },
    },
  );

  const popCritValue_EnumNumber_echelon_in_3 = await prisma.popCritValue.upsert(
    {
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000030029',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000030029',

        valueNbr: 3,

        popCriteriaId: popCriteria_EnumNumber_echelon_in_1_2_3.idPopCriteria,
      },
    },
  );

  const popCritValue_Number_employmentRatePercent_greaterThan_90_2 =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000040029',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000040029',

        valueNbr: 90,

        popCriteriaId:
          popCriteria_Number_employmentRatePercent_greaterThan_90_2.idPopCriteria,
      },
    });

  const popCritValue_Number_matricule_contains_a =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000050029',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000050029',

        valueStr: 'a',

        popCriteriaId:
          popCriteria_Resource_String_matricule_contains_a_2.idPopCriteria,
      },
    });

  const popCritValue_Boolean_TEST_isGenerated_equals_true =
    await prisma.popCritValue.upsert({
      where: {
        idPopCritValue: '00000000-0000-0000-909c-700000050030',
      },
      update: {},
      create: {
        idPopCritValue: '00000000-0000-0000-909c-700000050030',

        valueBol: true,

        popCriteriaId:
          popCriteria_Boolean_TEST_isGenerated_equals_true.idPopCriteria,
      },
    });

  console.log({
    popCritValue_Boolean_isPointage_equals_true,
    popCritValue_Boolean_isPointage_not_true,
    popCritValue_Date_inDate_equals_2023_12_01,
    popCritValue_Date_inDate_not_2023_12_01,
    popCritValue_Date_inDate_lowerThan_2003_01_01,
    popCritValue_Date_inDate_lowerThanOrEqual_2003_01_01,
    popCritValue_Date_inDate_greaterThan_2003_01_01,
    popCritValue_Date_inDate_greaterThanOrEqual_2003_01_01,
    popCritValue_Date_inDate_in_2023_12_01,
    popCritValue_Date_inDate_in_2023_06_01,
    popCritValue_Date_inDate_notIn_2023_12_01,
    popCritValue_Date_inDate_notIn_2023_06_01,
    popCritValue_Date_inDate_range_2003_01_01,
    popCritValue_Date_inDate_notIn_2008_01_01,
    popCritValue_Number_employmentRatePercent_equals_100,
    popCritValue_Number_employmentRatePercent_not_100,
    popCritValue_Number_employmentRatePercent_in_90,
    popCritValue_Number_employmentRatePercent_in_100,
    popCritValue_Number_employmentRatePercent_notIn_90,
    popCritValue_Number_employmentRatePercent_notIn_100,
    popCritValue_Number_employmentRatePercent_lowerThan_90,
    popCritValue_Number_employmentRatePercent_lowerThanOrEqual_90,
    popCritValue_Number_employmentRatePercent_greaterThan_90,
    popCritValue_Number_employmentRatePercent_greaterThanOrEqual_90,
    popCritValue_Number_employmentRatePercent_range_80,
    popCritValue_Number_employmentRatePercent_range_90,
    popCritValue_String_lastName_equals_Chevasson,
    popCritValue_String_lastName_not_Chevasson,
    popCritValue_String_lastName_in_Chevasson,
    popCritValue_String_lastName_in_Courtois,
    popCritValue_String_lastName_notIn_Chevasson,
    popCritValue_String_lastName_notIn_Courtois,
    popCritValue_String_lastName_contains_a,
    popCritValue_String_lastName_startsWith_c,
    popCritValue_String_lastName_endsWith_n,
    popCritValue_EnumNumber_echelon_equals_2,
    popCritValue_EnumString_quality_equals_Monsieur,
    popCritValue_Resource_String_matricule_equals_123456A,
    popCritValue_Resource_String_matricule_not_123456A,
    popCritValue_Resource_String_matricule_in_123456A,
    popCritValue_Resource_String_matricule_in_987654B,
    popCritValue_Resource_String_matricule_notIn_123456A,
    popCritValue_Resource_String_matricule_notIn_987654B,
    popCritValue_Resource_String_matricule_contains_a,
    popCritValue_Resource_String_matricule_startsWith_1,
    popCritValue_Resource_String_matricule_endsWith_a,
    popCritValue_EnumString_quality_equals_Monsieur2,
    popCritValue_String_lastname_contains_a,
    popCritValue_EnumString_contract_equals_CDI,
    popCritValue_EnumNumber_echelon_in_1,
    popCritValue_EnumNumber_echelon_in_2,
    popCritValue_EnumNumber_echelon_in_3,
    popCritValue_Number_employmentRatePercent_greaterThan_90_2,
    popCritValue_Number_matricule_contains_a,
    popCritValue_Boolean_TEST_isGenerated_equals_true,
  });

  console.log(`---`);

  // ---

  console.log(`---`);
  console.log(`---`);
  console.log(`---`);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
