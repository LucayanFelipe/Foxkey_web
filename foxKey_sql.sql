CREATE DATABASE fox_key;
USE fox_key;
CREATE TABLE usuario(
id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
senha VARCHAR(255) NOT NULL,
perfilAcesso BOOLEAN NOT NULL
);

CREATE TABLE loginExclusivo (
id_login INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
data_ativacao DATE NOT NULL,
id_usuario_fk INT NOT NULL,
FOREIGN KEY (id_usuario_fk) REFERENCES usuario(id_usuario)
);

CREATE TABLE despesa (
id_despesa INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
tipo_despesa ENUM('COMERCIAL','ADMINISTRATIVA','COMPRA') NOT NULL,
valor DECIMAL NOT NULL,
data_gerada DATE NOT NULL,
descricao VARCHAR(255),
id_login_fk INT,
FOREIGN KEY (id_login_fk) REFERENCES loginExclusivo(id_login)
);

CREATE TABLE endereco_contato (
id_endereco_contato INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
rua VARCHAR(100) NOT NULL,
numero VARCHAR(100) NOT NULL,
bairro VARCHAR(100) NOT NULL,
complemento VARCHAR(100),
referencia VARCHAR(255),
cep VARCHAR(20) NOT NULL,
estado VARCHAR(100) NOT NULL,
cidade VARCHAR(100) NOT NULL,
email VARCHAR(255) NOT NULL,
celular VARCHAR(14) NOT NULL
);

CREATE TABLE fornecedor_pf (
id_fornecedor_pf INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(150) NOT NULL,
sobrenome VARCHAR(100) NOT NULL,
cpf VARCHAR (14) NOT NULL,
data_nascimento DATE NOT NULL,
rg VARCHAR(10) NOT NULL,
sexo ENUM ('MASCULINO','FEMININO','OUTRO') NOT NULL,
estado_civil ENUM('SOLTEIRO','CASADO','SEPARADO','DIVORCIADO','VIUVO') NOT NULL,
orgao_expedidor VARCHAR(100) NOT NULL,
nacionalidade VARCHAR(50) NOT NULL,
raca ENUM('BRANCA','PARDA','PRETA','INDÍGENA','AMARELA') NOT NULL,
id_endereco_contato_fk INT NOT NULL,
FOREIGN KEY (id_endereco_contato_fk) REFERENCES endereco_contato(id_endereco_contato)
);

CREATE TABLE fornecedor_pj (
id_fornecedor_pj INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome_fantasia VARCHAR(100) NOT NULL,
razao_social VARCHAR(100),
inscricao_municipal VARCHAR(16),
cnpj VARCHAR(16) NOT NULL NOT NULL,
data_abertura DATE,
representante VARCHAR(150) NOT NULL,
id_endereco_contato_fk INT NOT NULL,
FOREIGN KEY (id_endereco_contato_fk) REFERENCES endereco_contato(id_endereco_contato)
);

CREATE TABLE cliente_pf (
id_cliente_pf INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(150) NOT NULL,
sobrenome VARCHAR(100) NOT NULL,
data_nascimento DATE NOT NULL,
cpf VARCHAR(14) UNIQUE NOT NULL,
rg VARCHAR(14) NOT NULL,
sexo ENUM ('MASCULINO','FEMININO','OUTRO') NOT NULL,
id_endereco_contato_fk INT NOT NULL,
FOREIGN KEY (id_endereco_contato_fk) REFERENCES endereco_contato(id_endereco_contato)
);


CREATE TABLE cliente_pj (
id_cliente_pj INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome_fantasia VARCHAR(150) NOT NULL,
razao_social VARCHAR(100),
inscricao_municipal VARCHAR(16),
cnpj VARCHAR(16) NOT NULL,
data_abertura DATE NOT NULL,
representante VARCHAR(150) NOT NULL,
id_endereco_contato_fk INT NOT NULL,
FOREIGN KEY (id_endereco_contato_fk) REFERENCES endereco_contato(id_endereco_contato)
);

CREATE TABLE funcionario (
id_funcionario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(150) NOT NULL,
sobrenome VARCHAR(150) NOT NULL,
cpf VARCHAR(14) NOT NULL,
rg VARCHAR(10) NOT NULL,
orgao_expedidor VARCHAR(100) NOT NULL,
nacionalidade VARCHAR(50) NOT NULL,
numero_ctps VARCHAR(20) NOT NULL,
numero_pis VARCHAR(20) NOT NULL,
raca ENUM('BRANCA','PARDA','PRETA','INDÍGENA','AMARELA') NOT NULL,
sexo ENUM ('MASCULINO','FEMININO','OUTRO') NOT NULL,
estado_civil ENUM('SOLTEIRO','CASADO','SEPARADO','DIVORCIADO','VIUVO') NOT NULL,
cargo VARCHAR(150),
grau_instrucao ENUM('ENSINO FUNDAMENTAL','ENSINO MÉDIO','ENSINO SUPERIOR','PÓS-GRADUAÇÃO'),
data_nascimento DATE,
id_endereco_contato_fk INT NOT NULL,
FOREIGN KEY (id_endereco_contato_fk) REFERENCES endereco_contato(id_endereco_contato)
);

CREATE TABLE categoria (
id_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(150) NOT NULL,
descricao VARCHAR(150),
prioridade_reposicao INT NOT NULL,
data_registro DATE NOT NULL,
ativo BOOLEAN NOT NULL
);

CREATE TABLE produto (
id_produto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
codigo_barra VARCHAR(100),
unidade_medida ENUM('un','cx','kg','g','t','l','ml','m'),
preco_custo DECIMAL,
preco_venda DECIMAL,
ativo BOOLEAN,
data_cadastro DATE,
nome VARCHAR(150),
descricao VARCHAR(150),
id_categoria_fk INT NOT NULL,
id_fornecedor_pf_fk INT NOT NULL,
id_fornecedor_pj_fk INT NOT NULL,
FOREIGN KEY (id_categoria_fk) REFERENCES categoria(id_categoria),
FOREIGN KEY (id_fornecedor_pf_fk) REFERENCES fornecedor_pf(id_fornecedor_pf),
FOREIGN KEY (id_fornecedor_pj_fk) REFERENCES fornecedor_pj(id_fornecedor_pj)
);


CREATE TABLE estoque (
id_estoque INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
qtd_atual DECIMAL NOT NULL,
qtd_reservada DECIMAL,
qtd_minima DECIMAL,
status_estoque ENUM( 'disponivel',
    'reservado',
    'em_transporte',
    'bloqueado',
    'devolucao',
    'quarentena') NOT NULL,
observacao VARCHAR(255),
id_produto_fk INT NOT NULL,
FOREIGN KEY (id_produto_fk) REFERENCES produto(id_produto)
);

/*incompleto*/

INSERT INTO endereco_contato VALUES (1,"Rio branco","1997","setor 01", "CASA", "do lado da unicesumar",
"76890000", "ro", "jaru", "lucayanfelips@hotmail.com", "69992050073");

INSERT INTO cliente_pf VALUES (1,"lucayan","felipe teixeira da silva", "2000-02-18", "02514705207", "13343579",
"MASCULINO",1);

/*
CREATE TABLE caixa (
id_caixa INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
data_abertura DATE,
data_fechamento DATE,
saldo_inicial DECIMAL,
saldo_final DECIMAL,
total_entrada DECIMAL,
total_saida DECIMAL,
id_funcionario_fk INT,
id_login_fk INT,
id_movimentacao_fk INT

);
*/





