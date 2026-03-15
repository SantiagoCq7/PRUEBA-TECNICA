# Prueba Tecnica - Symfony 6 + Vue 3 + React Native

Solucion monorepo para la prueba tecnica con:

- `backend/`: API REST en Symfony 6 + Doctrine ORM
- `frontend/`: cliente web en Vue 3 + Vite
- `mobile/`: cliente mobile en React Native + Expo + TypeScript

## 1. Titulo del proyecto

Prueba Tecnica - Biblioteca con Symfony, Vue y React Native.

## 2. Requisitos

- PHP 8.2+
- Composer 2.x
- Node.js 20.19.4+ recomendado
- npm 10+
- Expo CLI via `npx expo`
- Base de datos SQLite incluida por defecto en desarrollo

Notas:

- El proyecto viene configurado con SQLite para facilitar evaluacion local.
- Si se prefiere MySQL o PostgreSQL, basta con cambiar `DATABASE_URL` en `backend/.env`.
- Para Expo 55 se recomienda Node `>= 20.19.4`.

## 3. Instalacion backend

```bash
git clone <repo-url>
cd <repo>
```

Copiar variables de entorno:

```bash
cd backend
copy .env.example .env
```

Instalar dependencias:

```bash
composer install
```

Crear base de datos y cargar estructura:

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
```

Levantar servidor:

```bash
symfony server:start
```

Alternativa con PHP embebido:

```bash
php -S 127.0.0.1:8000 -t public public/index.php
```

Variables relevantes:

- `DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"`
- `CORS_ALLOW_ORIGIN='^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$'`

## 4. Como correr el frontend web (Vue)

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Build de produccion:

```bash
npm run build
```

Variable de entorno:

- `VITE_API_BASE_URL=http://127.0.0.1:8000`

## 5. Como correr el frontend mobile (React Native / Expo)

```bash
cd mobile
copy .env.example .env
npm install
npm run start
```

Alternativas:

```bash
npm run android
npm run ios
npm run web
```

Notas de ejecucion:

- En Android Emulator suele funcionar `http://10.0.2.2:8000`.
- En iOS Simulator o Expo Web se puede usar `http://127.0.0.1:8000`.
- Si usas Expo Go en un dispositivo fisico, configura `EXPO_PUBLIC_API_BASE_URL` con la IP local de tu maquina.
- En este repo mobile esta implementado con React Native + Expo + TypeScript/TSX.

Variable de entorno:

- `EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:8000`

## 6. Endpoints

### GET /api/books

Devuelve listado de libros con promedio de rating calculado en Doctrine mediante `AVG()` y `QueryBuilder`.

Ejemplo de respuesta:

```json
[
	{
		"title": "El Arte de Programar",
		"author": "Donald Knuth",
		"published_year": 1968,
		"average_rating": 4.5
	}
]
```

Decision tecnica:

- Si un libro no tiene resenas, `average_rating` se devuelve como `null`.

### POST /api/reviews

Registra una resena para un libro.

Ejemplo de request:

```json
{
	"book_id": 1,
	"rating": 5,
	"comment": "Excelente libro"
}
```

Ejemplo de response exitosa (`201 Created`):

```json
{
	"id": 8,
	"book_id": 1,
	"rating": 5,
	"comment": "Excelente libro",
	"created_at": "2026-03-15T06:07:12+00:00"
}
```

## 7. Captura o curl del endpoint funcionando

Listado de libros:

```bash
curl http://127.0.0.1:8000/api/books
```

Crear resena:

```bash
curl -X POST http://127.0.0.1:8000/api/reviews \
	-H "Content-Type: application/json" \
	-d "{\"book_id\":1,\"rating\":5,\"comment\":\"Excelente libro\"}"
```

Ejemplo real verificado localmente para `GET /api/books`:

```json
[
	{
		"title": "Clean Code",
		"author": "Robert C. Martin",
		"published_year": 2008,
		"average_rating": 4
	},
	{
		"title": "El Arte de Programar",
		"author": "Donald Knuth",
		"published_year": 1968,
		"average_rating": 4.67
	},
	{
		"title": "Refactoring",
		"author": "Martin Fowler",
		"published_year": 1999,
		"average_rating": 3
	}
]
```

## 8. Respuestas esperadas ante errores de validacion

Ejemplo de request invalida:

```json
{
	"book_id": 999,
	"rating": 7,
	"comment": ""
}
```

Ejemplo de response (`400 Bad Request`):

```json
{
	"message": "La validacion ha fallado.",
	"errors": {
		"rating": ["rating debe estar entre 1 y 5."],
		"comment": ["comment no puede estar vacio."]
	}
}
```

Si `book_id` no existe y el resto del payload es valido, la API responde `400` con error claro sobre `book_id`.

## 9. Que cambiaria para escalar esta app a cientos de miles de libros y usuarios

Separaria claramente lectura y escritura. Para `GET /api/books` usaria una proyeccion optimizada o una tabla/materialized view con ratings agregados por libro, evitando recalcular `AVG()` en tiempo real para trafico alto. Pondria cache HTTP y cache de aplicacion para listados frecuentes, con invalidacion al crear nuevas resenas.

En base de datos agregaria indices sobre `review.book_id`, fechas y campos de busqueda. Si el volumen crece mucho, consideraria particion de tablas de resenas y colas para tareas asincronas como recalculo de metricas, notificaciones o analytics.

Para API y frontends, incorporaria autenticacion, rate limiting, observabilidad, logs estructurados y pruebas automatizadas. A nivel de infraestructura, desplegaria servicios stateless detras de un balanceador, almacenamiento de assets separado y un pipeline CI/CD con migraciones controladas.

## Datos iniciales incluidos

Fixtures incluidas:

- 3 libros: `El Arte de Programar`, `Clean Code`, `Refactoring`
- 6 resenas con variedad de ratings

Comando de carga:

```bash
php bin/console doctrine:fixtures:load
```

## Video de demostracion

Pendiente de agregar enlace publico a Google Drive o YouTube mostrando frontend Vue y frontend React Native funcionando.
