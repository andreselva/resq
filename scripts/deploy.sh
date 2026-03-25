#!/bin/bash

set -e

echo "Parando containers antigos..."
docker compose -f docker-compose.prod.yml down

echo "Buildando nova imagem..."
docker compose -f docker-compose.prod.yml build

echo "Subindo nova versão..."
docker compose -f docker-compose.prod.yml up -d

echo "Removendo imagens antigas..."
docker image prune -f

echo "Deploy finalizado com sucesso!"0