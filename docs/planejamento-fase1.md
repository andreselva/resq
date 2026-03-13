# ResQ — Planejamento da Fase 1 (Configuração e Automação Inicial)

## 1. Identificação do projeto

**Nome do projeto:** ResQ  
**Tipo:** API backend para apoio em eventos extremos  
**Stack atual:** NestJS, TypeScript, MySQL 8, Docker Compose, GitHub Actions, Terraform  
**Repositório GitHub:** `https://github.com/andreselva/resq`  

> Substitua o link acima pelo link real do seu repositório antes de entregar o trabalho.

---

## 2. Descrição do projeto

O **ResQ** é um sistema backend voltado para apoio operacional em situações de emergência, como enchentes, tempestades severas e desastres climáticos. A proposta da aplicação é centralizar o cadastro de pessoas, voluntários e eventos de risco, permitindo identificar indivíduos localizados dentro de uma área de impacto e organizar grupos de ajuda de forma inicial.

Na versão atual do projeto, a API já contempla os seguintes pontos:

- cadastro de usuários;
- cadastro de eventos extremos;
- cálculo de área de impacto a partir de latitude, longitude e raio;
- busca de pessoas dentro da área afetada;
- separação entre pessoas em risco e voluntários;
- formação inicial de grupos de ajuda.

O sistema foi desenvolvido em **NestJS** com **TypeScript**, utiliza **MySQL 8** como banco de dados e pode ser executado localmente por meio de **Docker Compose**.

---

## 3. Objetivos do projeto

### 3.1 Objetivo geral

Construir uma API capaz de apoiar a coordenação inicial de respostas a eventos extremos, com foco em identificação geográfica de pessoas afetadas e organização de voluntários.

### 3.2 Objetivos específicos

- disponibilizar endpoints para cadastro de usuários e eventos;
- persistir dados geográficos utilizando recursos espaciais do MySQL;
- identificar pessoas dentro de um raio de impacto informado em um evento;
- classificar os usuários encontrados entre pessoas em risco e voluntários;
- formar grupos de ajuda com regras simples de agrupamento;
- estruturar o projeto para evolução contínua com práticas de DevOps.

---

## 4. Requisitos do projeto

### 4.1 Requisitos funcionais

1. O sistema deve permitir cadastrar usuários com nome, CPF, telefone, tipo e localização.
2. O sistema deve permitir cadastrar eventos com tipo, descrição, localização e raio de impacto.
3. O sistema deve identificar pessoas localizadas dentro da área impactada pelo evento.
4. O sistema deve separar usuários do tipo `NORMAL` como pessoas em risco.
5. O sistema deve separar usuários do tipo `VOLUNTEER` como voluntários elegíveis para grupos de ajuda.
6. O sistema deve formar grupos de voluntários com base em regras simples:
   - até 7 voluntários: 1 grupo;
   - acima disso: grupos de até 5 pessoas;
   - se o último grupo tiver menos de 3 integrantes, ele é anexado ao grupo anterior.
7. O sistema deve retornar o resultado do processamento do evento com pessoas em risco e grupos de ajuda.

### 4.2 Requisitos não funcionais

1. O backend deve ser executável em ambiente containerizado.
2. O código deve permitir validação automatizada por pipeline.
3. O projeto deve possuir versionamento em repositório Git.
4. A infraestrutura deve poder ser provisionada por código.
5. O projeto deve possuir estrutura mínima para integração contínua.
6. O banco de dados deve suportar consultas espaciais.

---

## 5. Arquitetura atual do projeto

### 5.1 Componentes principais

- **API NestJS**: responsável pelos endpoints e regras de negócio.
- **MySQL 8**: persistência de usuários, eventos e grupos.
- **Docker Compose**: orquestração do ambiente local.
- **GitHub**: hospedagem do repositório.
- **GitHub Actions**: execução da pipeline de integração contínua.
- **Terraform**: provisionamento da infraestrutura em nuvem.

### 5.2 Estrutura lógica atual

- módulo de usuários;
- módulo de eventos;
- módulo de banco de dados;
- entidades e DTOs;
- scripts SQL de criação de tabelas.

---

## 6. Plano de Integração Contínua

A integração contínua do ResQ foi planejada para validar automaticamente a aplicação a cada alteração enviada ao repositório.

### 6.1 Objetivo da CI

Garantir que toda mudança submetida ao projeto passe por verificações automáticas antes de ser incorporada à branch principal.

### 6.2 Eventos que disparam a pipeline

A pipeline deve ser executada em:

- `push` para as branches `main` e `develop`;
- `pull_request` direcionado para `main` e `develop`.

### 6.3 Etapas da pipeline

1. **Checkout do código**  
   O GitHub Actions baixa o conteúdo do repositório.

2. **Configuração do Node.js**  
   O workflow instala a versão Node 20, alinhada ao projeto.

3. **Instalação das dependências**  
   Execução de `npm ci` para garantir instalação limpa e reproduzível.

4. **Verificação de formatação e lint**  
   Execução do ESLint para validar padrões do código.

5. **Build da aplicação**  
   Execução de `npm run build` para validar compilação TypeScript/NestJS.

6. **Testes automatizados**  
   Execução de `npm test -- --runInBand` e `npm run test:e2e`.

### 6.4 Benefícios da CI no projeto

- detecção rápida de erros de sintaxe e build;
- prevenção de regressões antes do merge;
- padronização da validação do projeto;
- base sólida para futura entrega contínua.

### 6.5 Evoluções futuras planejadas

- adicionar análise de cobertura de testes;
- publicar imagem Docker automaticamente;
- executar deploy automatizado após aprovação em `main`;
- validar segurança com ferramentas de SAST e dependency scanning.

---

## 7. Especificação da infraestrutura necessária

Para esta fase, a infraestrutura foi planejada em AWS e descrita com Terraform.

### 7.1 Objetivo da infraestrutura

Disponibilizar um ambiente inicial para execução da API ResQ em nuvem, com banco de dados dedicado e separação mínima entre camada de aplicação e persistência.

### 7.2 Componentes de infraestrutura

1. **VPC dedicada**  
   Rede isolada para os recursos do projeto.

2. **Sub-rede pública**  
   Utilizada pela instância EC2 da aplicação.

3. **Sub-rede privada**  
   Utilizada pelo banco de dados RDS.

4. **Internet Gateway e tabela de rotas**  
   Permitem acesso externo controlado para a instância pública.

5. **Security Group da aplicação**  
   Libera portas necessárias, como:
   - 22 para SSH;
   - 8001 para a API.

6. **Security Group do banco**  
   Permite acesso à porta 3306 somente a partir da instância da aplicação.

7. **EC2 Ubuntu**  
   Responsável por hospedar a aplicação com Docker.

8. **RDS MySQL 8.0**  
   Responsável pela persistência relacional da aplicação.

### 7.3 Requisitos técnicos da infraestrutura

#### Aplicação

- 1 instância EC2 `t3.micro` ou `t3.small`;
- Docker instalado;
- Docker Compose plugin instalado;
- porta 8001 exposta para acesso à API.

#### Banco de dados

- 1 instância RDS MySQL 8.0;
- storage inicial de 20 GB;
- acesso restrito ao security group da aplicação;
- banco inicial `resq`.

### 7.4 Variáveis sensíveis

As seguintes informações não devem ser hardcoded no código-fonte:

- usuário e senha do banco;
- chave SSH;
- credenciais AWS;
- secrets do GitHub Actions.

Essas configurações devem ser armazenadas em:

- **GitHub Secrets**, no caso da pipeline;
- **terraform.tfvars** ou variáveis de ambiente, no caso do Terraform.

---

## 8. Estrutura de branches sugerida

- **main**: branch principal e estável;
- **develop**: branch de integração;
- **feature/nome-da-feature**: desenvolvimento de novas funcionalidades;
- **hotfix/nome-do-ajuste**: correções urgentes.

---

## 9. Estratégia de versionamento e automação

### 9.1 Versionamento

O código-fonte será mantido em um repositório GitHub contendo:

- código da aplicação;
- workflow de integração contínua;
- scripts Terraform;
- documentação do projeto.

### 9.2 Itens que devem existir no repositório

- `.github/workflows/ci.yml`
- `infra/terraform/*`
- `docs/planejamento-fase1.md`
- `README.md`

---

## 10. Critérios de aceite da fase

A fase será considerada concluída quando:

1. o repositório estiver criado no GitHub;
2. o código estiver versionado no repositório;
3. o workflow do GitHub Actions estiver executando com sucesso;
4. os scripts Terraform forem capazes de provisionar a infraestrutura planejada;
5. a documentação estiver anexada com o link do repositório.

---

## 11. Conclusão

Nesta primeira fase, o foco não é ampliar funcionalidades do ResQ, mas sim estruturar o projeto com práticas fundamentais de DevOps. Com a implementação da integração contínua e da infraestrutura como código, o sistema passa a ter uma base mais profissional, reprodutível e preparada para crescer com maior segurança.

Essa etapa também prepara o projeto para fases futuras, como entrega contínua, deploy automatizado, observabilidade, monitoramento e escalabilidade.
