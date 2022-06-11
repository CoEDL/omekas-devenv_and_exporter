FROM debian:bullseye

ENV OMEKA_VERSION=3.2.1
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y vim-nox unzip rsync curl apache2 libapache2-mod-php php7.4-mysql imagemagick php-imagick php-mbstring php-xml
RUN a2enmod rewrite php7.4
RUN cd /srv && \
    curl -O --silent -L https://github.com/omeka/omeka-s/releases/download/v${OMEKA_VERSION}/omeka-s-${OMEKA_VERSION}.zip && \
    unzip omeka-s-${OMEKA_VERSION}.zip && \
    rsync -av --delete omeka-s/ /var/www/html/ && \
    cd /var/www/html && \
    chown www-data files

WORKDIR /var/www/html
RUN rm /etc/apache2/sites-enabled/*
COPY omeka-s.conf /etc/apache2/sites-enabled/omeka-s.conf
COPY apache2.conf /etc/apache2/apache2.conf
RUN rm -rf /srv/* && apt-get remove -y --purge unzip rsync curl

EXPOSE 80
CMD ["apachectl", "-D",  "FOREGROUND"]


