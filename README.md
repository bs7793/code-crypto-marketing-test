Prueba Backend Code Crypto Marketing

Para crear el entorno de ejecución localmente es necesario tener Node.js instalado en una versión mayor a 20 y tener instalado Vercel.

```sh
npm install vercel -g
```

Para ejecutar la aplicación:

```sh
next dev
```

Los endpoint locales son:

```sh
localhost:3000/api/validar-nit
localhost:3000/api/nits-validados
localhost:3000/api/validar-tarjeta
```

## Formato de Body JSON para hacer POST
api/valdar-nit
```sh
{
 "nit": "585328-1"
}
```
api/validar-tarjeta
```sh
{
 "tarjeta": "585328-1"
}
```
