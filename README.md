The front-end SproutCore application for the Curators Workbench.

## Running

After checking out, run `bundle install`. Now install the new build tools `npm install`. Then start the server:

    ./node_modules/sproutcore/bin/sproutcore serve

You'll find it running at [http://localhost:4020/cwb](http://localhost:4020/cwb/).

## Building

To build the app for production, run the following command:

    sproutcore build cwb

If you want to bundle with the Rails application, you can specify the build root:

    sproutcore build cwb --buildroot ../cwb-rails/public
