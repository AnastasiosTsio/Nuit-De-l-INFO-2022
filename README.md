# Nuit de L'info 2022 - Team Reblochons

## Introduction

Ce document a pour objectif de décrire l'image docker mise en place pour la nuit de l'info par la team Reblochons.

## Procédure d'installation de lancement du conteneur

```bash
docker pull baptistemht/reblochons-sans-sommeil
docker run -d --name "reblochons" -p 80:80 baptistemht/reblochons-sans-sommeil
```

__PS:__ Le port du conteneur est lié au port 80 de la machine.

## Liens supplémentaires

Acceder à l'image depuis Docker Hub : https://hub.docker.com/r/baptistemht/reblochons-sans-sommeil

__PS:__ La taille de l'image d'après `docker images` équivaut à `28Mo`.