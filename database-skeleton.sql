-- Adminer 4.8.1 PostgreSQL 15.1 (Debian 15.1-1.pgdg110+1) dump

\connect "myDatabase";

DROP TABLE IF EXISTS "visualization1";
DROP SEQUENCE IF EXISTS visualization1_id_seq;
CREATE SEQUENCE visualization1_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."visualization1" (
    "id" integer DEFAULT nextval('visualization1_id_seq') NOT NULL,
    "x" date NOT NULL,
    "y" double precision NOT NULL,
    "annual" boolean NOT NULL,
    "hemisphere" smallint NOT NULL,
    CONSTRAINT "visualization1_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "visualization2";
DROP SEQUENCE IF EXISTS visualization2_id_seq;
CREATE SEQUENCE visualization2_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."visualization2" (
    "id" integer DEFAULT nextval('visualization2_id_seq') NOT NULL,
    "x" date NOT NULL,
    "y" real NOT NULL,
    CONSTRAINT "visualization2_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "visualization3";
DROP SEQUENCE IF EXISTS visualization3_id_seq;
CREATE SEQUENCE visualization3_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."visualization3" (
    "id" integer DEFAULT nextval('visualization3_id_seq') NOT NULL,
    "x" date NOT NULL,
    "y" real NOT NULL,
    "annual" boolean NOT NULL,
    CONSTRAINT "visualization3_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "visualization4";
DROP SEQUENCE IF EXISTS visualization4_id_seq;
CREATE SEQUENCE visualization4_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."visualization4" (
    "id" integer DEFAULT nextval('visualization4_id_seq') NOT NULL,
    "x" date NOT NULL,
    "y" real NOT NULL,
    "sampleId" character varying(6) NOT NULL,
    CONSTRAINT "visualization4_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "visualization5";
DROP SEQUENCE IF EXISTS visualization5_id_seq;
CREATE SEQUENCE visualization5_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."visualization5" (
    "id" integer DEFAULT nextval('visualization5_id_seq') NOT NULL,
    "x" integer NOT NULL,
    "y" real NOT NULL,
    CONSTRAINT "visualization5_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "visualization6";
DROP SEQUENCE IF EXISTS visualization6_id_seq;
CREATE SEQUENCE visualization6_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."visualization6" (
    "id" integer DEFAULT nextval('visualization6_id_seq') NOT NULL,
    "x" integer NOT NULL,
    "y" real NOT NULL,
    CONSTRAINT "visualization6_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "visualization7";
DROP SEQUENCE IF EXISTS visualization7_id_seq;
CREATE SEQUENCE visualization7_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."visualization7" (
    "id" integer DEFAULT nextval('visualization7_id_seq') NOT NULL,
    "x" integer NOT NULL,
    "y" real NOT NULL,
    CONSTRAINT "visualization7_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "visualization8";
DROP SEQUENCE IF EXISTS visualization8_id_seq;
CREATE SEQUENCE visualization8_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."visualization8" (
    "id" integer DEFAULT nextval('visualization8_id_seq') NOT NULL,
    "x" integer NOT NULL,
    "y" real NOT NULL,
    "country" character varying(255) NOT NULL,
    CONSTRAINT "visualization8_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "visualization9";
DROP SEQUENCE IF EXISTS visualization9_id_seq;
CREATE SEQUENCE visualization9_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."visualization9" (
    "id" integer DEFAULT nextval('visualization9_id_seq') NOT NULL,
    "sector" character varying(255) NOT NULL,
    "subsector" character varying(255) NOT NULL,
    "val" real NOT NULL,
    CONSTRAINT "visualization9_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


-- 2022-11-18 11:34:09.320908+00