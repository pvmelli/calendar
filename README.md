# CALENDARIO SEMANAL
Calendario diseñado para mostrar eventos de manera semanal. Estos eventos son generados a partir de un archivo json que actúa a modo de API.

 ## REQUISITOS
 
 A fin de correr la aplicación, es necesario disponer de las siguientes herramientas:
  * IDE de preferencia
  * [Node](https://nodejs.org/es/ "Node")

 ## CORRER LA APLICACIÓN
 
 ### Descargar o clonar el repositorio
 
 Será necesario, para comenzar, descargar o clonar el repositorio en el que se encuentra en este momento. Para ello, deberá clickear el botón verde "Clone or download".

 ![Descargar un repositorio](https://i.imgur.com/cBeY4Zp.png "Descargar un repositorio")

 Si prefiere descargarlo, simplemente deberá clickear en la opcion "Download ZIP". Y luego extrar el archivo en la dirección de su preferencia.
 
 ___

 Si, por otro lado, prefiere clonarlo, puede hacer uso de software como [Github Desktop](https://desktop.github.com "Github Desktop"). En este caso, copie el URL presentado al clikear el boton verde. Luego abra Github Desktop y diríjase a la opción "File" de la barra superior, elija la opción "Clone Repository" en el menú. Este proceso puede llevarse a cabo con Ctrl+Shift+O.

 ![Clonar un repositorio en Github Desktop](https://i.imgur.com/KWss1Ga.png "Clonar un repositorio en Github Desktop")
 
 Se le presentará una ventana en la que deberá clickear la opción "URL". Allí podrá pegar el URL del repositorio y decidir una dirección en la que clonarlo.

 ![Clonar un repositorio en Github Desktop](https://i.imgur.com/Y3k4xmk.png "Clonar un repositorio en Github Desktop")

 ### Instalar las dependencias
 
 Para este paso será necesario tener acceso a las herramientas mencionadas en el apartado REQUISITOS, por favor asegúrese de que dispone de ellas.

 Tras abrir la carpeta del repositorio con su IDE de preferencia, abra una nueva terminal/consola. Allí tipee el siguiente comando:
```
npm install 
```

### Levantar un servidor

La aplicación necesita de un servidor para funcionar. Para levantar uno, tipee el siguiente comando en la terminal:
``` 
npm run server
```
Por favor asegúrese de no cerrar la terminal. Si lo hace, la aplicación no podrá correrse.

### Abrir la aplicación

Visite el sitio `localhost:8080/index.html` en su navegador. Al hacerlo, debería ver lo siguiente:

![Calendario](https://i.imgur.com/oynFl03.png "Calendario")


 ### Posibles problemas
 
 #### El calendario no muestra eventos
 
 ![Calendario error](https://i.imgur.com/Kr8C4WG.png "Calendario error")

 Si el calendario no muestra eventos al iniciarse, asegúrese de que su Local Storage esté vacío. Para vaciarlo, puede seguir estos pasos:
 * Presione F12. Aparecerá ante usted la consola.
 * Si desea, puede escribir allí `localStorage.clear()` y presionar enter.
 * Si prefiere no llevar a cabo el paso anterior, diríjase a la pestaña "Application" y busque allí la opción "Clear Storage", clickeela.

 ## CORRER TESTS DE INTERFAZ
 
 Para realizar los tests de interfaz, hice uso de [Cypress](https://www.cypress.io "Cypress").

 ### Correr Cypress en un navegador
 
Con el servidor levantado, abra otra terminal y tipee el comando:
```
npm run cypress:open
```

Esto debería abrir Cypress, de modo que aparecerá la siguiente ventana:
![Cypress open](https://i.imgur.com/2wsrpd1.png "Cypress open")

Clickee en la opción resaltada ("Run all specs").

### Correr Cypress en el IDE

Con el servidor levantado, abra una terminal y tipee el comando:
```
npm run cypress:run
```

Los resultados de los tests se mostrarán en la terminal. Al finalizar los testeos, puede dirigirse a la carpeta './cypress/videos'. Allí encontrará videos donde podrá ver como se llevó a cabo el testeo. 

 ## CORRER TESTS UNITARIOS
 
 Para realizar los tests unitarios, hice uso de [Jest](https://jestjs.io "Jest").

 ### Correr Jest de manera rápida
 
 Para correr Jest normalmente, tipee el siguiente comando en la terminal:
 ```
 npm run test
 ```

 ### Correr Jest con informe de cobertura
 
 Para que Jest le brinde un informe con los porcentajes de código que los testeos han cubierto, puede utilizar en la terminal el comando:
  ```
  npm run test-coverage
  ```


