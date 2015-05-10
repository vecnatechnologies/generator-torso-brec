# generator-torso-brec


[Yeoman](http://yeoman.io/ "yoeman's website") can scaffold out a new application using prebuilt generators. This generator sets up a project using [backbone-torso](https://github.com/vecnatechnologies/backbone-torso) (a [backbone](http://backbonejs.org)-based framework) and [brec](https://github.com/vecnatechnologies/brec-base) (beautiful, responsive, ergonomic, and configurable) styling and plugins.

### Install yoeman
> npm install -g yo

### Install generator-torso-brec
> npm install -g generator-torso-brec

### Create a new project
> cd path/to/project  
> yo torso-brec

In your current directory, the generator will produce the following files:

  ├─ .gitignore  
  ├─ package.json  
  ├─ gulpfile.js  
  ├─ dist  
  └─ app  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     ├─ main.js  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     ├─ app.scss  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     ├─ index.html  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     └─ home  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        ├─ homeView.js  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        ├─ home-template.hbs  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        └─ _home.scss  

## Pod Generator

When creating an application, generating a new feature typically requires creating a view, template for that view, and sometimes special styling for that view as well. Pods are directories filled with these feature-specific files. Use the pod sub generator to rapidly create a pod pre-filled with a view, template, and scss file.  

### Create a new pod
> cd path/to/project/app  
> yo torso-brec:pod foo  

This will create the following files:  

└─ foo  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     ├─ fooView.js  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     ├─ foo-template.hbs  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     └─ _foo.scss  

If an app.scss file exists, it will add: @import 'foo/foo'; to that file

## Credits
Originally developed by [Vecna Technologies, Inc.](http://www.vecna.com/) and open sourced as part of its community service program. See the LICENSE file for more details.
Vecna Technologies encourages employees to give 10% of their paid working time to community service projects.
To learn more about Vecna Technologies, its products and community service programs, please visit http://www.vecna.com.
