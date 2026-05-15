# 💈 BarberHub

O **BarberHub** é uma plataforma Full-Stack de agendamentos para barbearias. O sistema permite que clientes encontrem as barbearias mais próximas utilizando geolocalização em tempo real, acompanhem seus agendamentos e vejam os valores formatados, enquanto os proprietários de barbearias possuem um painel administrativo para gerenciar, aprovar ou rejeitar novos horários marcados.

---

## 📸 Demonstração da Aplicação

<div align="center">
  <img src="./snapshots/home.png" alt="Listagem de Barbearias" width="400px" />
  <img src="./snapshots/appointments.png" alt="Painel do Barbeiro" width="400px" />
</div>

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
* **Java 17** & **Spring Boot 3**
* **Spring Data JPA** (Persistência de dados)
* **H2 Database** (Utilizado exclusivamente para isolamento em ambiente de testes)
* **Fórmula de Haversine** (Cálculo matemático de distância geográfica entre coordenadas)

### **Frontend**
* **React.js** & **Vite**
* **Axios** (Consumo de API HTTP)
* **React Router Dom** (Gerenciamento de rotas e parâmetros dinâmicos)

### **Infraestrutura e Banco de Dados**
* **PostgreSQL** (Banco de dados de produção)
* **Docker** & **Docker Compose** (Containerização da aplicação e do banco)

---

## 🔒 Foco em Segurança e Arquitetura Backend

A aplicação foi desenhada prezando pela robustez e resiliência das regras de negócio no servidor:

1. **Proteção de Endpoints Críticos:** Operações de escrita, como a aprovação (`/approve`) e rejeição (`/reject`) de agendamentos, possuem validações rígidas no ecossistema do backend, garantindo que apenas o estabelecimento dono da agenda possa alterar o estado do agendamento.
2. **Isolamento de Ambiente de Testes:** Configuração de perfil `@ActiveProfiles("test")` integrada ao Maven. Ao executar `mvn clean test verify`, a aplicação valida os contextos e roda os testes utilizando o banco **H2 em memória**, impedindo chamadas indesejadas ou corrupção do banco PostgreSQL de produção.
3. **Tratamento de Fuso Horário (Timezone Local):** Implementação de checagem de horários de abertura e fechamento baseada em `ZoneId.of("America/Sao_Paulo")`, blindando o sistema contra disparidades de horário UTC comumente encontradas ao implantar containers Docker em servidores internacionais (AWS, DigitalOcean, etc.).

---

## 🚀 Como Executar o Projeto

### Prerequisites
* Docker e Docker Compose instalados.
* Node.js instalado (para rodar o frontend localmente se preferir).
* Java 17 e Maven (para rodar o backend localmente se preferir).

### 1. Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/barberhub.git](https://github.com/seu-usuario/barberhub.git)
cd barberhub
