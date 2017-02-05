#Installation for TrafficLight

APP_PATH=/opt/traffic_light
SERVER_PATH=$APP_PATH/server
CLIENT_PATH=$APP_PATH/client
WWW_PATH=$APP_PATH/www
NGINX_CONF=/etc/nginx/sites-available/default



#stop service
sudo systemctl stop traffic-light.service
sudo systemctl stop mongod.service
sudo systemctl stop nginx


#start service
sudo systemctl start mongod.service
sudo systemctl start nginx
sudo systemctl start traffic-light.service



echo traffic-light successfuly restarted!!
exit 1