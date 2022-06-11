# Build the omeka-s container

docker build -t omeka-s --rm .

# run the app

docker compose up -d ; docker compose logs -f ; docker compose stop ; docker compose rm -f

# run the exporter

<!-- TODO: write this documentation - WIP -->
