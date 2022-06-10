import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { TestRunEntity } from "./TestRunEntity";

@Entity({
    tableName: 'test_case'
})
export class TestCaseEntity {
    @PrimaryKey({
        autoincrement: true
    })
    id: number;

    @Property()
    title: string;

    @ManyToOne(() => TestRunEntity)
    testRun: TestRunEntity;
}
