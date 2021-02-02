#!/bin/bash

curl -X POST -H "Content-Type: application/json" -d '{"name":"test"}' http://127.0.0.1:3000/entity

curl -X PUT -H "Content-Type: application/json" -d '{"name":"update"}' http://127.0.0.1:3000/entity/1

curl -X DELETE -H "Content-Type: application/json" http://127.0.0.1:3000/entity/1