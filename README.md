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
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        └─ home-template.hbs
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        └─ _home.scss

## Credits
Originally developed by [Vecna Technologies, Inc.](http://www.vecna.com/) and open sourced as part of its community service program. See the LICENSE file for more details.
Vecna Technologies encourages employees to give 10% of their paid working time to community service projects.
To learn more about Vecna Technologies, its products and community service programs, please visit http://www.vecna.com.
