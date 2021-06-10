FROM ubuntu:18.04

ENV TZ=Indian/Maldives
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update
RUN apt-get -y --no-install-recommends install software-properties-common 
RUN add-apt-repository ppa:ondrej/php
RUN apt-get update
RUN apt-get -y --no-install-recommends install php7.4-cli
RUN apt-get install -y --no-install-recommends openssl zip unzip git curl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apt-get install -y --no-install-recommends php7.4-mysql php7.4-mbstring php-xml
RUN phpenmod pdo_mysql

WORKDIR /var/www