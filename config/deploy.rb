set :application, "ot-crew"
set :repository,  "git@github.com:gf3/runlevel6.org.git"
set :deploy_to,   "/data/www/ot-crew.com"
set :scm,         :git
set :user,        :gianni

role :web, "192.168.10.10"                          # Your HTTP server, Apache/etc
role :app, "192.168.10.10"                          # This may be the same as your `Web` server

namespace :deploy do
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "forever restart 0"
  end
end

