DROP TABLE IF EXISTS resources;

-- Creation of resource table
CREATE TABLE IF NOT EXISTS schemas(
  schema_id INT GENERATED ALWAYS AS IDENTITY,
  name varchar(250) NOT NULL,
  PRIMARY KEY (schema_id)
);

CREATE TABLE IF NOT EXISTS fields(
  field_id INT GENERATED ALWAYS AS IDENTITY,
  schema_id varchar(250) NOT NULL,
  name varchar(250) NOT NULL,
  type varchar(250) NOT NULL,
  required BOOLEAN NOT NULL,
  default BOOLEAN NOT NULL,
  PRIMARY KEY (field_id)
  CONSTRAINT fk_schema
    FOREIGN KEY(schema_id)
	  REFERENCES schemas(schema_id)
);

CREATE TABLE IF NOT EXISTS resources(
  resource_id INT GENERATED ALWAYS AS IDENTITY,
  schema_id varchar(250) NOT NULL,
  endpoint varchar(250) NOT NULL,
  PRIMARY KEY (resource_id)
  CONSTRAINT fk_schema
    FOREIGN KEY(schema_id)
	  REFERENCES schemas(schema_id)
);
