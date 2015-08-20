# Angular-PHP-Slim (With AdminLTE)

My own scaffold of webapps using AngularJS as front-end and PHP Slim as back-end. This scaffold uses:
* PHP 5.4+
* Apache HTTP Server
* MySQL
* Node.js (as dev tool), Yeoman, Grunt, Bower
* Composer

### Development

Some frequenly used commands:

```sh
# install new PHP libraries
cd api
composer require XXXXX/XXXXX

# install new JS libraries
cd app
bower install XXXXX/XXXXX --save

# scaffold new AngularJS files
cd app
yo angular:route myRoute
yo angular:controller myController
yo angular:directive myDirective
yo angular:filter myFilter
yo angular:view myView
yo angular:service myService

# testing
grunt serve
```

### Deploy

To deploy this:

```sh
# build JS project (and ignore JS warnings)
grunt --force
# copy front-end files
cp -a /xxx/app/dist/. /prod_folder/
# copy PHP files to "api" subfolder
cp -a /xxx/api/. /prod_folder/api/
# modify environment variables, turn "REQUEST_ORIGIN" to empty
vi /prod_folder/api/.env
```

### Acknowledgement

This project uses the following JS libraries:
* [AngularJS](https://angularjs.org/)
* [Angular UI Router](https://github.com/angular-ui/ui-router)
* [Angular UI Grid](https://github.com/angular-ui/ui-grid)
* [Bootstrap](http://getbootstrap.com/)
* [Restangular](https://github.com/mgonto/restangular)
* [Satellizer](https://github.com/sahat/satellizer)

This project uses the following PHP libraries:
* [Slim](http://www.slimframework.com/)
* [tuupola/slim-basic-auth](https://github.com/tuupola/slim-basic-auth)
* [tuupola/slim-jwt-auth](https://github.com/tuupola/slim-jwt-auth)
* [vlucas/phpdotenv](https://github.com/vlucas/phpdotenv)
* [palanik/corsslim](https://github.com/palanik/CorsSlim)
* [voku/simple-mysqli](https://github.com/voku/simple-mysqli)