# ==========================================================================
# Project:   CWB
# Copyright: @2014 My Company, Inc.
# ==========================================================================

# This is your Buildfile, which determines how your project is built.
# In addition to this Buildfile, each of your apps and frameworks may have its
# own Buildfile with settings specific to each.

# Project-wide settings:
config :all,
  :build_prefix => 'public',
  :url_prefix => 'static'

# Application-specific settings:
config :cwb,
  :required => [:sproutcore, 'sproutcore/statechart'],
  :theme => 'sproutcore/ace',
  :title => "Curator's Workbench (CWB)",
  :mime_types => {},
  :load_fixtures => true

# Development (debug) mode configuration.
mode :debug do
end

# Production (build) mode configuration.
mode :production do
end

proxy '/', :to => 'localhost:3000'

# Proxying.
# When running the app locally, same-origin policy prevents the app (at localhost)
# from accessing other domains.  One of the major roles of the SproutCore
# development server is to proxy local requests for remote resources so that
# the browser believes they are coming from the same domain.
#
# You should place all your proxy directives in this Buildfile.
#
# For example, proxy all requests for '/users' to 'https://my-domain.com/people'.
# proxy "/users", :to => "my-domain.com", :secure => true, :url => "/people"


# To learn more about configuring the Buildfile, please visit
# http://guides.sproutcore.com/build_tools.html.
