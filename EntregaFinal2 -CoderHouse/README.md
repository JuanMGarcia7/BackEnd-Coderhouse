Buenas tardes!
Lo primero que debe hacer cuando ingresa es ver todas las dependencias necesarias para el funcionamiento del proyecto

Para iniciar el proyecto:

---> script = "node src/server.js" <---

Endpoints a probar en POSTMAN:
--->de productos, en la ruta inicial de /api/productos
post '/'
put '/:id'
delete'/:id'
get '/'
get '/:id'

--->de carrito, en la ruta /api/carrito
post "/"
delete "/:id"
post "/:id/productos/:id_prod"
get "/:id/productos"
delete "/:id/productos/:id_prod"

En el caso de firebase, se debera usar como ID el generado por la misma aplicacion, para su funcionamiento.

Saludos :)
