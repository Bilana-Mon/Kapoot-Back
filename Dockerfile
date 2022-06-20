FROM postgres
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB kapoot
COPY kapoot.sql /docker-entrypoint-initdb.d/