#Installation for TrafficLight

APP_PATH=/opt/traffic_light
SERVER_PATH=$APP_PATH/server
CLIENT_PATH=$APP_PATH/client
WWW_PATH=$APP_PATH/www
NGINX_CONF=/etc/nginx/sites-available/default



#stop service
sudo systemctl stop traffic-light.service

#update git resources
cd $SERVER_PATH
sudo git pull


cd $CLIENT_PATH
sudo git pull
sudo npm run build

cd $SERVER_PATH
npm test

#start service
sudo systemctl start traffic-light.service



echo traffic-light successfuly updated!!
exit 1