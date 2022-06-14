import { MikroORM } from "@mikro-orm/core";
import { TestRunEntity } from "./entities/TestRunEntity";
import db from './mikro-orm.config';

(async () => {
    const orm = await MikroORM.init({
        ...db,
    });

    await orm.getSchemaGenerator().refreshDatabase();

    console.time('testrun.create');
    const entity = orm.em.create(TestRunEntity, {
        cases: Array(10_000).fill(undefined).map((_, index) => ({
            title: `Test Case #${index}`
        }))
    });
    console.timeEnd('testrun.create');

    console.time('testrun.cases.remove');
    entity.cases.remove(entity.cases[13]);
    console.timeEnd('testrun.cases.remove');

    // console.dir({
    //     index: 13,
    //     accessByIndex: {
    //         before: entity.cases[12], // Test Case #12
    //         current: entity.cases[13], // Test Case #14
    //         after: entity.cases[14], // Test Case #15
    //     },
    //     accessBySet: {
    //         before: entity.cases.getItems()[12], // Test Case #12
    //         current: entity.cases.getItems()[13], // Test Case #14
    //         after: entity.cases.getItems()[14], // Test Case #15
    //     },
    // }, { colors: true });

    console.time('testrun.cases.removeAll');
    entity.cases.removeAll();
    console.timeEnd('testrun.cases.removeAll');

    // Without changes
    // testrun.create: 92.887ms
    // testrun.cases.remove: 2.871ms
    // testrun.cases.removeAll: 11.941s

    // With changes
    // testrun.create: 94.648ms
    // testrun.cases.remove: 2.65ms
    // testrun.cases.removeAll: 10.396ms

    await orm.close();
})();
