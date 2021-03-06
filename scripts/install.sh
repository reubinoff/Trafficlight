#Installation for TrafficLight

APP_PATH=/opt/traffic_light
SERVER_PATH=$APP_PATH/server
CLIENT_PATH=$APP_PATH/client
WWW_PATH=$APP_PATH/www
NGINX_CONF=/etc/nginx/sites-available/default

#adding mongodb source
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list


echo Start Installation
sudo apt-get update

sudo apt-get --quiet --assume-yes install curl

# installing nodejs
echo installing NodeJS
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get --quiet --assume-yes install npm

#installing build tools
echo installing  build-essential
sudo apt-get --quiet --assume-yes install build-essential

# install MongoDb
echo install mongoDB
sudo apt-get --quiet --assume-yes install -y mongodb-org
sudo mkdir /data
sudo mkdir /data/db
sudo chown $USER /data/db


#install Redis
sudo apt-get --quiet --assume-yes install redis-server -y  



# installing Git
echo installing git
sudo apt-get --quiet --assume-yes install git
sleep 0.5

# Clonnig the source code
echo Clonnig server source to $APP_PATH
sudo git clone --depth=50 --branch=master  http://github.com/reubinoff/trafficlight $APP_PATH

#installing Nginx server
sudo apt-get --quiet --assume-yes install nginx
sudo mv $SERVER_PATH/nginx.conf $NGINX_CONF


# install NPM packages
cd $SERVER_PATH
sudo npm install

cd $CLIENT_PATH
sudo npm install
sudo mkdir $WWW_PATH
sudo npm run build

#adding app to systemd
echo Adding application to systemd
sudo cp $SERVER_PATH/traffic-light.service /etc/systemd/system/

sudo systemctl enable mongod.service
sudo service mongod start




# run test
cd $SERVER_PATH
sudo npm test #running test before starting the server



sudo systemctl enable traffic-light.service
sudo systemctl start nginx
sudo systemctl start traffic-light.service

echo traffic-light successfuly installed!!
exit 1