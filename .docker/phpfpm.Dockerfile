FROM ubuntu:20.04

ENV TZ=Indian/Maldives
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get -y --no-install-recommends install software-properties-common 
RUN add-apt-repository ppa:ondrej/php
RUN apt-get update
RUN apt-get -y --no-install-recommends install php8.0-cli
RUN apt-get install -y --no-install-recommends openssl zip unzip git curl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apt-get install -y --no-install-recommends php8.0-mysql php8.0-mbstring php8.0-xml php8.0-zip php8.0-gd
RUN phpenmod pdo_mysql

RUN apt-get update && apt-get install -y --no-install-recommends  apache2 libapache2-mod-fcgid php8.0-fpm sudo php8.0-xdebug php8.0-ldap
RUN a2enmod proxy_fcgi setenvif fcgid actions alias rewrite headers
RUN a2enconf php8.0-fpm
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
COPY php-cli.ini /etc/php/8.0/cli/php.ini
COPY php-fpm.ini /etc/php/8.0/fpm/php.ini

RUN echo "error_reporting = E_ALL" >> /etc/php/8.0/cli/conf.d/20-xdebug.ini; \
    echo "display_startup_errors = On" >> /etc/php/8.0/cli/conf.d/20-xdebug.ini; \
    echo "display_errors = On" >> /etc/php/8.0/cli/conf.d/20-xdebug.ini; \
    echo "xdebug.mode = debug" >> /etc/php/8.0/cli/conf.d/20-xdebug.ini;

RUN useradd -m user && echo "user:user" | chpasswd && adduser user sudo
COPY start.sh /opt/start.sh
RUN chmod ug+x /opt/start.sh
ENTRYPOINT [ "/opt/start.sh" ]
