import { LoadStrategy, Options } from "@mikro-orm/core";

const options: Options = {
    entities: ['./build/entities/*.js'],
    type: 'sqlite',
    dbName: ':memory:',

    allowGlobalContext: true,
    implicitTransactions: true,
    loadStrategy: LoadStrategy.JOINED,
};

export default options;
