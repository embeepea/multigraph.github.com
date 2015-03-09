

# How to Work on this multigraph.org Web Site Code

This repository contains the source code for the http://multigraph.org web site.  

To publish a change to the site,
clone this repository, commit your change, and push to the master branch
of the repository at https://github.com/multigraph/multigraph.github.com.

Note that the name of this repository is *multigraph.github.com*,
which is a holdover from the days before Github moved the hosting of
Github Pages from the github.com domain to the github.io domain -- if
this repository were created today it would need to be named
*multigraph.github.io*.  Also note that the site actually lives at the
URL http://multigraph.org, but the URLs http://multigraph.github.com
and http://multigraph.github.io are both aliases for this.  So a user
who types http://multigraph.github.com, or http://multigraph.github.io
into a browser will end up at http://multigraph.org.

The site uses Github Pages for hosting, and uses the Jekyll static
site generator. See
https://help.github.com/articles/using-jekyll-with-pages for general
instructions on how to work with a Github Pages site that uses Jekyll.

## Setting Up a Working Copy

To set up a working local copy of this site that you can use for
making and previewing changes before pushing them to the public site,
first make sure you have a computer with the following required software
installed:

* Perl; this is only necessary if you need to run the `update-site` script to
  update site content based on new commits or new releases in
  js-multigraph; see below for details.

* Jekyll; see https://help.github.com/articles/using-jekyll-with-pages
  for instructions on installing Jekyll. Jekyll depends on both Ruby
  and Bundler, so you will need to install them as well; the instructions
  on Github explain how to do this.

Then, to set up a working local copy of the site, follow these steps:

1. Clone the repository
   ```bash
   git clone https://multigraph/multigraph.github.com
   ```
   
1. Install the necessary gems
   ```bash
   bundle install
   ```
The above steps are only needed once, to initialize a new local
copy of the site.

To preview your local copy of the site in a browser, give the
command

```bash
jekyll serve
```

Give this command in a terminal that you can leave running while you
work; this command generates a copy of the site in the `_site`
subdirectory, and starts a local web server running on port 4000.
To view the site, load the URL http://localhost:4000 in a browser.
(Ignore the message that Jekyll prints telling you that the
server address is http://0.0.0.0:4000.)

If you leave this `jekyll serve` process running, then whenever you
make a change to any of the site files, jekyll will regenerate
the necessary files in the `_site` directory automatically.

Note that you should not directly work with the files in
the `_site`directory, and you should definitely not commit these
files to the repository. This directory is simply where your local
jekyll process writes the files that it generates.  When you push
your changes to github, the jekyll process there generates its
own copy of the pages in a different location.

## Updating Content from the js-multigraph Repository

This repository contains a copy of the 
[js-multigraph](https://github.com/multigraph/js-multigraph)
repository as a git submodule, in the `lib/js-multigraph` subdirectory.
Some of the content on this site is generated
programmatically from the contents of the js-multigraph submodule.
This includes, among other things, the example graphs and the list
of Multigraph releases.

To update any of these generated files, you must first initialize
the git submodules in the project with the command

```bash
git submodule update --init --recursive
```

This is a setup step that you only need to do once after creating
your copy of the repository.  (Note that this is the step that
creates the `lib/js-multigraph` directory; before doing this step,
the `lib` subdirectory will be empty.)

After you have initialized the js-multigraph submodule, run the script

```bash
./update-site
```

to update everything based on the contents of the js-multigraph repo.

Note that the code in the js-multigraph submodule is not used directly on the
multigraph.org web site --- in fact, it is not even included in the files
hosted on the server.  The `update-site` script takes care of copying
all the needed content from the `lib/js-multigraph` submodule into the appropriate
places in the multigraph.github.com repository.

It is only necessary to run `update-site` whenever the content
of the js-multigraph respository has changed, such as when a new
example graph has been added, or a new release has been created.
If you are just making changes to the static html files on the
site, you can skip the `git submodule update ...` and `update-site`
steps.
