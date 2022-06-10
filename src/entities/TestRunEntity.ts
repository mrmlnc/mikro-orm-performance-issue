import { Collection, Entity, OneToMany, PrimaryKey } from "@mikro-orm/core";
import { TestCaseEntity } from "./TestCaseEntity";

@Entity({
    tableName: 'test_run'
})
export class TestRunEntity {
    @PrimaryKey({
        autoincrement: true
    })
    id: number;

    @OneToMany(() => TestCaseEntity, e => e.testRun)
    cases = new Collection<TestCaseEntity>(this);
}
