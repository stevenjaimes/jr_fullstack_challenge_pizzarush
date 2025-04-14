
# 🍕 PizzaRush - Sistema de Pedidos de Pizza

![PizzaRush Banner](https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&auto=format&fit=crop)

## 📝 Descripción
**PizzaRush** es una prueba técnica para gestión de pedidos de pizza, desarrollada bajo principios SOLID con **React** y **Express**.

## 🚀 Características

### 📦 Backend
- ✅ Arquitectura por capas (Controller - Service - Repository)
- 🔥 Firestore Database + Firebase Auth
- 🧪 Testing con Jest
- 🔒 Sistema de roles (Admin / Usuario)

### 🎨 Frontend
- ⚛️ React + TanStack Query
- 🛒 Zustand para el estado del carrito
- 💅 Tailwind CSS + shadcn/ui
- 📱 Diseño 100% responsive

## 🛠️ Stack Tecnológico

```mermaid
graph TD
    A[Frontend] --> B[React]
    A --> C[Tailwind CSS]
    A --> D[Zustand]
    A --> E[TanStack Query]
    
    F[Backend] --> G[Node.js]
    F --> H[Express]
    F --> I[Firebase]
    F --> J[Jest]
```

## 🏗️ Arquitectura con Inversión de Dependencias

```mermaid
graph TD
    A[Controller] -->|Depende de| B[IService]
    B[IService] -->|Implementa| C[Service]
    C -->|Depende de| D[IRepository]
    D -->|Implementa| E[Repository]
    E -->|Depende de| F[(Firestore)]

    style A fill:#f9f,stroke:#333
    style B fill:#ccf,stroke:#333,stroke-dasharray: 5
    style C fill:#bbf,stroke:#333
    style D fill:#ffc,stroke:#333,stroke-dasharray: 5
    style E fill:#f96,stroke:#333
    style F fill:#6f9,stroke:#333
```

## 📈 Próximas Mejoras Técnicas

### 🏗️ Evolución Arquitectónica

```mermaid
graph TD
    subgraph Clean Architecture
        A[API Controllers] --> B[Use Cases]
        B --> C[Domain Entities]
        C --> D[Interfaces]
        D --> E[Repositories]
        E --> F[(Firestore)]
        F -.->|Puede ser reemplazado| G[(MySQL/MongoDB)]
    end

    style A fill:#f9f,stroke:#333
    style B fill:#bbf,stroke:#333
    style C fill:#6f9,stroke:#333
    style D stroke-dasharray: 5
```

### 🔄 Próximas Integraciones

| Área           | Mejora Propuesta                                                  | Prioridad |
|:----------------|:----------------------------------------------------------------|:-----------|
| **Frontend**     | Implementar React Testing Library para cobertura completa de tests | Alta      |
| **Backend**      | Migrar a Clean Architecture                                        | Media     |
| **Pagos**        | Integrar Stripe/PayPal para flujo completo de compra               | Crítica   |
| **Performance**  | Implementar caché con Redis para consultas frecuentes              | Media     |
| **CI/CD**        | Configurar GitHub Actions para despliegues automáticos             | Alta      |

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/stevenjaimes/jr_fullstack_challenge_pizzarush.git

# Instalar dependencias
cd pizza-rush/backend && npm install
cd ../frontend && npm install

# Configurar variables de entorno
cp .env.example .env
```

## 🙏 Agradecimientos

Un especial agradecimiento a **[Coding Cloud](https://codingcloud.online/)** por este desafío técnico que permitió demostrar habilidades en:

- Arquitectura SOLID
- Integración con Firebase
- Desarrollo Fullstack
- Implementación de buenas prácticas

## 🌐 Demo

[🔗 Ver demo en vivo](https://pizza-rush-demo.com)

## 📄 Licencia

MIT © 2025 [Henry Steven Jaimes](https://linkedin.com/in/henry-steven-jaimes)

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/stevenjaimes)
