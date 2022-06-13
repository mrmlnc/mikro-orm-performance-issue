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

    // Without changes
    // testrun.create: 12.023s

    // With changes
    // testrun.create: 99.503ms

    const itemsByIndex = entity.cases;
    const itemsFromSet = entity.cases.getItems();
    const itemsByIndexMax = itemsByIndex.length - 1;
    const itemsFromSetMax = itemsFromSet.length - 1;

    console.log('0: ', itemsByIndex[0] === itemsFromSet[0]);
    console.log('1: ', itemsByIndex[1] === itemsFromSet[1]);
    console.log(`${itemsByIndexMax}|${itemsFromSetMax}:`, itemsByIndex[itemsByIndexMax] === itemsFromSet[itemsFromSetMax]);

    await orm.close();
})();
