import { MikroORM } from "@mikro-orm/core";
import { TestRunEntity } from "./entities/TestRunEntity";
import db from './mikro-orm.config';

(async () => {
    const orm = await MikroORM.init({
        ...db,
    });

    await orm.getSchemaGenerator().refreshDatabase();

    console.time('testrun.create');
    orm.em.create(TestRunEntity, {
        cases: Array(10_000).fill(undefined).map((_, index) => ({
            title: `Test Case #${index}`
        }))
    });
    console.timeEnd('testrun.create');

    // Without changes
    // testrun.create: 12.023s

    // With changes
    // testrun.create: 99.503ms

    await orm.close();
})();
