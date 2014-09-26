# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'cwb-sc'
set :repo_url, 'git@git.metabahn.net:client/cwb-sc.git'
# set :branch, :develop

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/var/apps/cwb-sc'

# Default value for :scm is :git
set :scm, :git

set :rbenv_ruby, '2.1.2'

namespace :deploy do
  desc 'Create sc release'
  task :sc_release do
    on roles(:app) do
      execute "cd /var/apps/cwb-sc/current; /root/.rbenv/shims/bundle exec sproutcore build cwb --buildroot /var/apps/cwb/shared/public"
    end
  end

  # after :updated, :sc_release
end
