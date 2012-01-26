set :application, "ot-crew"
set :repository,  "git@github.com:jquery-ot/ot-crew.com.git"
set :deploy_to,   "/data/www/ot-crew.com"
set :scm,         :git
set :user,        :gianni

set :use_sudo,    false

role :web, "192.168.10.10"
role :app, "192.168.10.10"

# after :deploy, "deploy:npm"

namespace :deploy do
  task :restart, roles: :app, except: { :no_release => true } do
    run "forever restart 0"
  end

  task :npm, roles: :app, except: { :no_release => true } do
    run "cd #{release_path}; npm install"
  end
end

