# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'fwb_frontend'
set :repo_url, 'git@git.metabahn.net:client/fwb_frontend.git'
# set :branch, :develop

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/var/apps/fwb_frontend'

# Default value for :scm is :git
set :scm, :git

set :rbenv_ruby, '2.1.2'

namespace :deploy do
  desc 'Create sc release'
  task :sc_release do
    on roles(:app) do
      execute "cd /var/apps/fwb_frontend/current; /root/.rbenv/shims/bundle exec sproutcore build cwb --buildroot /var/apps/fwb/shared/public"
    end
  end

  # after :updated, :sc_release
end
