# Project Name
Jacaton
## Description

Una comunidad donde los usuarios podrán encontrar los Hackathones que se celebrarán en España. Las empresas podrán publicar sus eventos para darle más difusión.

## User Stories

-  **404:** Usuarios, administradores, empresas y sin registro, llegarán a esta página cuando la ruta no exista.
-  **Signup:** Los usuarios no registrados en la plataforma podrán hacerlo en esta página.
-  **Login:** Los usuarios registrados podrán acceder a la plataforma para conocer los próximos hackathones y ver tutoriales.
-  **Logout:** Los usuarios podrán cerrar sesión con este botón.
-  **Añadir Hackathones** Las empresas podrán crear un nuevo evento y compartirlo con la comunidad. 
-  **Añadir Tutoriales** Los administradores pueden añadir tutoriales.
-  **Lista de Hackathones** Todos los usuarios podrán ver la lista de hackathones y apuntarse.
-  **Lista de Tutoriales** Los usuarios podrán ver los tutoriales necesarios para superar esos hackathones.
-  **Mapa** El usuario podrá ver en un mapa todos los hackatones que se van a celebrar.

## Backlog

Geo Location:
- Puedes ver los hackathones en un mapa.
  
# Client

## Routes

- / - Home

- /login - Inicio de sesión
- /signup - Registro

- /hackaton-list - Lista de hackathones
- /hackaton/details/:id - Detalles del hackathon
- /hackaton/create- Crear un hackaton
- /hackaton/edit/:id- Editar hackaton

- /tutorial-list - Lista de tutoriales
- /tutorial/details/:id - Detalles del tutorial
- /tutorial/create- Crear un tutorial
- /tutorial/edit/:id- Editar tutorial

- /hackaton/map- Mapa de hackatones

- /profile - Detalles del perfil
- /profile/edit - Editar el perfil

- 404

## Pages

- Home (Pública)

- Inicio de sesión (Pública)
- Registro (Pública)

- Lista de hackathones (Usuario, Empresa, Administrador)
- Detalles del hackathon (Usuario, Empresa, Administrador)
- Crear un hackaton (Empresa)
- Editar hackaton (Empresa)

- Lista de tutoriales (Usuario, Empresa, Administrador)
- Detalles del tutorial (Usuario, Empresa, Administrador)
- Crear un tutorial (Administrador)
- Editar tutorial (Administrador)

- Mapa de hackatones (Usuario, Empresa, Administrador)

- Detalles del perfil (Usuario, Empresa, Administrador)
- Editar el perfil (Usuario, Empresa, Administrador)

- 404 (Usuario, Empresa, Administrador)

## IO


## Services

- Auth Service
  - loginService (userCredentials)
  - signupService (newUser)
  - verifyService ()
- Hackathon Service
  - getAllHackatonsService()
  - getHackatonDetailsService(hackatonId)
  - createHackatonService (newUser)
  - editHackatonService (hackatonId, updatedHackaton)
  - deleteHackatonService (hackatonId)
  - getHackatonByCityService ()
  - updateHackatonArrService (hackatonId)
  - deleteHackatonArrService (hackatonId)
  - getHackatonByAssistService ()
  - getHackatonByMap ()
- Profile Service
  - getProfileService ()
  - deleteProfileService ()
  - editProfileService (updatedProfile)
  - getHackatonByProfile ()
  - getTutorialByProfile ()
-Tutorial Service
  - getAllTutorialsService ()
  - getTutorialDetailsService (tutorialId)
  - createTutorialService (newTutorial)
  - editTutorialService (tutorialId, updatedTutorial)
  - deleteTutorialService (tutorialId)
- Upload Service
  - uploadImageHackatonService (imageFile)
  - uploadImageProfilelService (imageFile)

# Server

## Models

Modelo User

```
email - String /Require
password - String /Require
username - String /Require /Unique
profilePhoto - String
comunidadAutonoma - String /Enum
tech - String /Enum
level - String /Enum
hackaton - ObjectID<hackaton>
role - String /Enum


Modelo Hackathon

```
title - String /Require/Unique
date - String /Require
tech - String /Enum
level - String /Enum
photo - String
description - String
owner - ObjectID<user>
coordinates - Number

```

Modelo Tutorial

```
title - String /Require/Unique
tech - String /Enum
description - String
owner - ObjectID<user>
videoUrl - String

```

## API Endpoints/Backend Routes

- POST "/api/auth/signup"
- POST "api/auth/login"
- GET "api/auth/verify"

- POST "/api/hackaton/create"
- PATCH "/api/hackaton/edit/:hackatonId"
- DELETE "/api/hackaton/delete/:hackatonId"
- GET "/api/hackaton/details/:hackatonId"
- GET "/api/hackaton/cercaDeTi"
- PATCH "/api/hackaton/assist/:hackatonId"
- PATCH "/api/hackaton/assist-delete/:hackatonId" 
- GET "/api/hackaton/assist"
- GET "/api/hackaton/map"

- GET "/api/tutorials-list"
- GET "/api/hackaton-list"

- GET "/api/profile/:id"
- PATCH "/api/profile/edit/:id"
- DELETE "/api/profile/delete/:id"
- GET "/api/profile/hackaton-list-company"
- GET "/api/profile/tutorial-list-admin"

- POST "/api/tutorial/create"
- PATCH "/api/tutorial/edit/:tutorialId"
- DELETE "/api/tutorial/delete/:tutorialId"
- GET "/api/tutorial/details/:tutorialId"

- POST "/api/upload/hackaton" 
- POST "/api/upload/profile"


## Links


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/albertogomrod/hackaton-client)
[Server repository Link](https://github.com/albertogomrod/hackaton-server)

[Deploy Link](https://hackaton-app.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)