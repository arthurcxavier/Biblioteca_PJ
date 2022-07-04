/*Comandos utilizados para a criação do banco de dados*/

CREATE TABLE IF NOT EXISTS biblioteca_pj(
    uuid uuid DEFAULT uuid_generate_v1(),
    nome VARCHAR NOT NULL,
    autor VARCHAR NOT NULL,
    ano_publicacao INTEGER,
    PRIMARY KEY (uuid)
);

INSERT INTO biblioteca_pj (nome, autor, ano_publicacao) VALUES ('Memorias de um Sargento de Milicias', 'Manuel Antonio de Almeida', 1853);