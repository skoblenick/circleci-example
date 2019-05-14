#!/usr/bin/env bash

command_exists () {
    type "$1" &> /dev/null ;
}

if ! command_exists circleci ; then
    curl -fLSs https://circle.ci/cli | bash
fi

mkdir -p tmp
circleci config process .circleci/config.yml > ./tmp/circleci.yml
circleci local execute --job build --config ./tmp/circleci.yml
