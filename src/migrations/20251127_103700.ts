import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contact_form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_form_submissions_id" integer;
  ALTER TABLE "pages_texts" ADD CONSTRAINT "pages_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_texts_order_parent" ON "pages_texts" USING btree ("order","parent_id");
  CREATE INDEX "contact_form_submissions_updated_at_idx" ON "contact_form_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_form_submissions_created_at_idx" ON "contact_form_submissions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_form_submissions_fk" FOREIGN KEY ("contact_form_submissions_id") REFERENCES "public"."contact_form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_contact_form_submissions_i_idx" ON "payload_locked_documents_rels" USING btree ("contact_form_submissions_id");
  ALTER TABLE "media" DROP COLUMN "display_name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_form_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_texts" CASCADE;
  DROP TABLE "contact_form_submissions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_form_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_contact_form_submissions_i_idx";
  ALTER TABLE "media" ADD COLUMN "display_name" varchar;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_form_submissions_id";`)
}
