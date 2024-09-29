alter table "public"."profiles" add column "stripe_customer_id" text;

alter table "public"."profiles" alter column "group" set default 'USER'::text;


