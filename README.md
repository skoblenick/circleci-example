# CircleCI Example

This repository demonstates using multiple docker containers within a CircleCI
build; one container running the source and the other, a service which the
source relies on.

## Local Execution

Using `docker-compose` requires an additional config that duplicates the "same"
definitions as the `circleci.yml`. Using Circle's CLI has the advantage of
running the same process as the build system but comes at the cost of having to
preprocess the config before running it locally.

### With Docker Compose

```
# Start the mysql server locally
docker-compose up -d

# install
npm install

# Run tests
npm test
```

### With Circle's CLI

```
# Install CircleCI CLI
curl -fLSs https://circle.ci/cli | bash

mkdir -p tmp

# Pre-process the 2.1 config into a config we can run locally
circleci config process .circleci/config.yml > tmp/circleci.yml

# run "build" job
circleci local execute --job build --config tmp/circleci.yml
```

__or__

```
npm run circleci
```