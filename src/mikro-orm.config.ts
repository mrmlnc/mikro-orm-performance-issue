import type { Options } from "@mikro-orm/core";
import { TestCaseEntity } from "./entities/TestCaseEntity";
import { TestRunEntity } from "./entities/TestRunEntity";

const options: Options = {
    entities: [TestRunEntity, TestCaseEntity],
    type: 'better-sqlite',
    dbName: ':memory:',

    allowGlobalContext: true,
};

export default options;
