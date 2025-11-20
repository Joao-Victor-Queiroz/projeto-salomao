# 🕊 Projeto Salomão: Aplicativo de Gerenciamento de Pastoral

### 📱 Mobile
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-24292e?style=for-the-badge&logo=clerk&logoColor=white)

### 🖥️ Back-end
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Clerk](https://img.shields.io/badge/Clerk-24292e?style=for-the-badge&logo=clerk&logoColor=white)

## 🚀 Sobre o projeto
O **Projeto Salomão** nasceu de uma necessidade real observada no dia a dia da gestão da pastoral. O controle de frequência, registro de caixinhas pagas pelos crismandos eram feitos em planilhas e em anotações no caderno.

### O Problema
Essa forma de gerenciar os dados da pastoral gerava três dores principais:
1. **Inconsistência dos dados:** Informações duplicadas ou desatualizadas em diferentes arquivos.
2. **Baixa acessibilidade:** A liderança não conseguia acessar dados rápidos fora do computador principal.
3. **Risco de perda:** Falta de backups automáticos e segurança na manipulação dos dados.

### A Solução
Desenvolvi uma solução Full Stack para **digitalizar 100% desse processo**. O aplicativo permite que a gestão seja feita na palma da mão, com um back-end robusto garantindo que os dados estejam sempre seguros, validados e sincronizados em tempo real.

## 📸 Take a look!
### Login e Visualização de Crismando(s)
<div align="center">
  <img src="https://github.com/user-attachments/assets/108449bb-ff8d-4d57-8d9f-58a1d7eefd92" width="30%" alt="tela-login" />
  <img src="https://github.com/user-attachments/assets/eeb1954d-4e11-4c7e-82d2-5d3b4d0e6821" width="30%" alt="tela-lista-crismandos" />
  <img src="https://github.com/user-attachments/assets/26a36a32-0dbd-4d51-827f-d42575f8c788" width="30%" alt="tela-visualizacao-crismando" />
</div>

### Cadastro e Edição de Crismando
<div align="center">
  <img src="https://github.com/user-attachments/assets/dba405f2-cb21-4200-8629-be54edccaa58" width="30%" alt="tela-registro-crismando" />
  <img src="https://github.com/user-attachments/assets/c7966ec9-1b83-4f7c-a69c-a6d0a4fecff3" width="30%" alt="tela-edicao-crismando" />
  <img src="https://github.com/user-attachments/assets/f2cf85d0-a26d-4a38-b9b3-e65bef71c627" width="30%" alt="tela-registro-caixinha" />
</div>

### Visualização de Grupo e Registro de Frequência
<div align="center">
  <img src="https://github.com/user-attachments/assets/7ebd8588-43c0-4127-958b-e7a8c42088e8" width="30%" alt="tela-lista-grupos" />
  <img src="https://github.com/user-attachments/assets/505c3f77-1d20-4869-9bbb-4e1c738b7106" width="30%" alt="tela-visualizacao-grupo" />
  <img src="https://github.com/user-attachments/assets/78d8b631-6e00-4366-b1d5-06ef6c9e1f04" width="30%" alt="tela-registro-frequencia" />
</div>

## 🚀 Funcionalidades
- [x] **Autenticação Segura:** Login e gestão de sessões via Clerk.
- [x] **Gestão de Crismandos:** Cadastro, edição, listagem e remoção de crismandos (CRUD).
- [x] **Registro de Frequência pelo App:** Registro de frequência nos encontros diretamente pelo aplicativo.
- [x] **Validação de Dados:** Formulários protegidos contra dados inválidos usando Zod.
- [x] **Sincronização:** Atualização de dados em tempo real e cacheamento com React Query.

## 📌 Próximos Passos (Roadmap)
- [ ] **Filtros e Relatórios:** Procurar crismandos por filtros e gerar relatórios completos para crismandos ou grupos.
- [ ] **Controle de acesso baseado em RBAC:** Permissões diferenciadas para Coordenadores (acesso total) e Catequistas (visualização restrita).
- [ ] **Gestão Financeira de Eventos:** Controle de pagamentos (retiros, camisetas) com status (Pendente/Pago) por participante.
- [ ] **Notificações Push:** Lembretes automáticos sobre encontros e avisos importantes via OneSignal ou Expo Notifications.

## 🛠️ Decisões Técnicas

### Front-end (Mobile)
* **React Query:** Escolhido para gerenciar o estado do servidor. Ele elimina a necessidade de `useEffect` complexos para buscar dados e fornece cache automático, deixando o app muito mais rápido.
* **React Hook Form + Zod:** A combinação foi usada para criar formulários performáticos (sem re-renderizações desnecessárias) e garantir que nenhum dado inválido seja enviado para o Back-end.
* **Expo:** Utilizado para agilizar o desenvolvimento e facilitar o deploy e testes em dispositivos físicos.

### Back-end & Dados
* **Node.js & Express:** Arquitetura REST API para servir os dados ao aplicativo.
* **MongoDB:** Escolhido pela flexibilidade do esquema (NoSQL), ideal para dados que podem sofrer alterações de estrutura, como fichas de membros de pastoral.
* **Clerk:** Implementado para terceirizar a complexidade da autenticação, garantindo segurança de nível industrial sem precisar reinventar a roda.

## 📦 Como rodar o projeto

Este projeto é dividido em duas partes: Back-end (API) e Mobile.

### Pré-requisitos
* **[Node.js](https://nodejs.org/)** (versão LTS recomendada).
* **[Expo Go](https://expo.dev/client)** (na versão para o SDK 53 do Expo) no seu celular (Android ou iOS)
* Contas no **MongoDB Atlas** e **Clerk** (para as variáveis de ambiente).

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/Joao-Victor-Queiroz/projeto-salomao.git
```

### Passo 2: Rodar o Back-End
1. Abra a pasta "back":
```bash
cd back/
```
2. Instale as dependências:
```bash
npm install
```
3. Configure as variáveis de ambiente:
- Duplique o arquivo .env.example e renomeie para .env.
- Preencha com as chaves do MongoDB e Clerk.

4. Inicialize o servidor:
```bash
npm run dev
```
5. O projeto estará disponível em:
```bash
http://localhost:5000
```

### Passo 3: Rodar o Front-End
1. Abra a pasta "projeto-salomao":
```bash
cd projeto-salomao
```
2. Instale as dependências:
```bash
npm install
```
3. Configure as variáveis de ambiente:
- Duplique o arquivo .env.example e renomeie para .env.
- Preencha com a chave publicável do Clerk.
  
4. Inicialize o projeto:
```bash
npx expo start
```

## 👨‍💻 Autor

Feito com ❤️ por **João Victor Queiroz**. Entre em contato!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joao-victor-queiroz/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joaovictorqueiroz.dev@gmail.com)
