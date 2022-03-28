Buenas tardes!
Lo primero que debe hacer cuando ingresa es ver todas las dependencias necesarias para el funcionamiento del proyecto
El proyecto tiene como idea, hacer persistir informacion de "productos" y de "carrito", de 3 maneras distintas!

Se plantea, la posible utilizacion de Mongo DB, de Firebase, y de FileSystem!

Cada uno tiene su contenedor, con el correcto funcionamiento para cada uno.

Se utiliza como middleware, un boolean de admin, para limitar el acceso en un futuro, planteando que determinadas acciones estan disponibles solo en el caso que
el boolean admin este en "true", sino algunas acciones estaran limitadas cuando el mismo se encuentre en "false".

Para iniciar el proyecto:

---> script = "node src/server.js" <---

Endpoints a probar en POSTMAN:
--->de productos, en la ruta inicial de /api/productos
post '/' ------------------------------------------------->Devuelve el productos creado
put '/:id' ----------------------------------------------->Devuelve el producto creado, pero actualizado
delete'/:id' --------------------------------------------->Devuelve el siguiente msj: "ID:{numero del id que se decidio borrar} borrado"
get '/' -------------------------------------------------->Devuelve un array con todos los productos existentes
delete "/"------------------------------------------------>Devuelve el siguiente msj : "Se ha eliminado la informacion"
get '/:id' ----------------------------------------------->Devuelve el productos que coincide con el id buscado

--->de carrito, en la ruta /api/carrito
post "/" ------------------------------------------------->Duvuelve el carrito creaado(en fs)
get '/' -------------------------------------------------->Devuelve los carritos existentes
delete "/:id" -------------------------------------------->Devuelve el siguiente msj: "ID:{numero del id que se decidio borrar} borrado"
post "/:id/productos"------------------------------------->Devulve el carrito, con el productos pusheado dentro del array de productos
get "/:id/productos"-------------------------------------->Devuelve un array con los productos existentes en el carrito buscado
delete "/:id/productos/:id_prod"-------------------------->Devuelve el carrito sin el productos
delete "/"------------------------------------------------>Devuelve el siguiente msj : "Se ha eliminado la informacion"

En el caso de firebase, se debera usar como ID el generado por la misma aplicacion, para su funcionamiento.

Espero que les sea sencillo la implementacion y que todo resulte como esperaban!

Saludos :)
