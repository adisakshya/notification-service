import {BaseEntity, Entity, Column, CreateDateColumn, Index, PrimaryColumn} from "typeorm";

@Entity()
export class Device extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    @Index()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        unique: true
    })
    fcmToken: string;

    @Column()
    type: string;

    @Column()
    name: string;

    public static findByUserId(userId: string): Promise<[Device[], number]> {
        return this.findAndCount({
            where: {userId},
            order: {createdAt: "DESC"}
        });
    }

    public static findByDeviceId(userId: string, id: string): Promise<Device> {
        return this.findOne({
            where: {userId, id}
        }); 
    }

    public static findByFcmToken(userId: string, fcmToken: string): Promise<Device> {
        return this.findOne({
            where: {userId, fcmToken}
        }); 
    }
}
