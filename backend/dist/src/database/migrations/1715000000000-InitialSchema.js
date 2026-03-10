"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1715000000000 = void 0;
class InitialSchema1715000000000 {
    constructor() {
        this.name = 'InitialSchema1715000000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('ADMIN', 'BARBER', 'CLIENT')`);
        await queryRunner.query(`CREATE TYPE "bookings_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NOSHOW')`);
        await queryRunner.query(`CREATE TYPE "queue_entries_status_enum" AS ENUM('WAITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TYPE "loyalty_cards_tier_enum" AS ENUM('BRONZE', 'SILVER', 'GOLD', 'PLATINUM')`);
        await queryRunner.query(`CREATE TYPE "notifications_type_enum" AS ENUM('SMS', 'EMAIL', 'PUSH')`);
        await queryRunner.query(`CREATE TYPE "notifications_status_enum" AS ENUM('SCHEDULED', 'SENT', 'FAILED')`);
        await queryRunner.query(`CREATE TYPE "payments_status_enum" AS ENUM('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "full_name" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'CLIENT', "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672db88f1d78d040473e18d3e" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_user_email" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "barbers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "specialties" jsonb NOT NULL DEFAULT '[]', "working_hours" jsonb, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_789456123" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_barber_user_id" ON "barbers" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "phone" character varying NOT NULL, "visit_count" integer NOT NULL DEFAULT 0, "notes" text, CONSTRAINT "PK_456789123" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_client_user_id" ON "clients" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "idx_client_phone" ON "clients" ("phone") `);
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "description" text, "duration_minutes" integer NOT NULL, "price" numeric(10,2) NOT NULL, "category" character varying, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_123456789" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "barber_id" uuid NOT NULL, "client_id" uuid NOT NULL, "service_id" uuid NOT NULL, "scheduled_at" TIMESTAMP NOT NULL, "status" "bookings_status_enum" NOT NULL DEFAULT 'PENDING', CONSTRAINT "PK_987654321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_booking_barber_id" ON "bookings" ("barber_id") `);
        await queryRunner.query(`CREATE INDEX "idx_booking_client_id" ON "bookings" ("client_id") `);
        await queryRunner.query(`CREATE INDEX "idx_booking_scheduled_at" ON "bookings" ("scheduled_at") `);
        await queryRunner.query(`CREATE TABLE "queue_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "client_id" uuid NOT NULL, "barber_id" uuid, "position" integer NOT NULL, "status" "queue_entries_status_enum" NOT NULL DEFAULT 'WAITING', "estimated_wait_minutes" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_321654987" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loyalty_cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "client_id" uuid NOT NULL, "points" integer NOT NULL DEFAULT 0, "tier" "loyalty_cards_tier_enum" NOT NULL DEFAULT 'BRONZE', "rewards_claimed" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_654321987" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_loyalty_client_id" ON "loyalty_cards" ("client_id") `);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "client_id" uuid NOT NULL, "type" "notifications_type_enum" NOT NULL, "message" text NOT NULL, "scheduled_at" TIMESTAMP NOT NULL, "sent_at" TIMESTAMP, "status" "notifications_status_enum" NOT NULL DEFAULT 'SCHEDULED', CONSTRAINT "PK_741852963" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_notification_client_id" ON "notifications" ("client_id") `);
        await queryRunner.query(`CREATE INDEX "idx_notification_scheduled_at" ON "notifications" ("scheduled_at") `);
        await queryRunner.query(`CREATE TABLE "commissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "barber_id" uuid NOT NULL, "booking_id" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "rate" numeric(5,2) NOT NULL, "paid_at" TIMESTAMP, CONSTRAINT "PK_852963741" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_commission_barber_id" ON "commissions" ("barber_id") `);
        await queryRunner.query(`CREATE INDEX "idx_commission_booking_id" ON "commissions" ("booking_id") `);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "booking_id" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "stripe_id" character varying, "status" "payments_status_enum" NOT NULL DEFAULT 'PENDING', CONSTRAINT "PK_963852741" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_payment_booking_id" ON "payments" ("booking_id") `);
        await queryRunner.query(`CREATE INDEX "idx_payment_stripe_id" ON "payments" ("stripe_id") `);
        await queryRunner.query(`ALTER TABLE "barbers" ADD CONSTRAINT "FK_barbers_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_clients_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_bookings_barbers" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id")`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_bookings_clients" FOREIGN KEY ("client_id") REFERENCES "clients"("id")`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_bookings_services" FOREIGN KEY ("service_id") REFERENCES "services"("id")`);
        await queryRunner.query(`ALTER TABLE "queue_entries" ADD CONSTRAINT "FK_queue_clients" FOREIGN KEY ("client_id") REFERENCES "clients"("id")`);
        await queryRunner.query(`ALTER TABLE "loyalty_cards" ADD CONSTRAINT "FK_loyalty_clients" FOREIGN KEY ("client_id") REFERENCES "clients"("id")`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_notifications_clients" FOREIGN KEY ("client_id") REFERENCES "clients"("id")`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_commissions_barbers" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id")`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_commissions_bookings" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id")`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_payments_bookings" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "commissions"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "loyalty_cards"`);
        await queryRunner.query(`DROP TABLE "queue_entries"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "barbers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "payments_status_enum"`);
        await queryRunner.query(`DROP TYPE "notifications_status_enum"`);
        await queryRunner.query(`DROP TYPE "notifications_type_enum"`);
        await queryRunner.query(`DROP TYPE "loyalty_cards_tier_enum"`);
        await queryRunner.query(`DROP TYPE "queue_entries_status_enum"`);
        await queryRunner.query(`DROP TYPE "bookings_status_enum"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
    }
}
exports.InitialSchema1715000000000 = InitialSchema1715000000000;
//# sourceMappingURL=1715000000000-InitialSchema.js.map