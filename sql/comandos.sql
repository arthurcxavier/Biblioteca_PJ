CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS biblioteca_pj(
    uuid uuid DEFAULT uuid_generated_v4(),
    nome VARCHAR(120) NOT NULL,
    autor VARCHAR(80) NOT NULL,
    ano_publicacao INTEGER(4),
    PRIMARY KEY (uuid)
);

INSERT INTO biblioteca_pj (nome, autor, ano_publicacao) VALUES ('Memorias de um Sargento de Milicias', 'Manuel Antonio de Almeida', 1853);