The front-end SproutCore application for the Curators Workbench.

## Running

After checking out, run `bundle install`. Then start the server:

    sproutcore server

You'll find it running at http://localhost:4042/cwb/.

## Building

To build the app for production, run the following command:

    sproutcore build cwb

If you want to bundle with the Rails application, you can specify the build root:

    sproutcore build cwb --buildroot ../cwb-rails/public
