#Installation for TrafficLight

APP_PATH=/opt/traffic_light

#adding mongodb source
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

echo Start Installation
sudo apt-get update

sudo apt-get --quiet --assume-yes install curl

echo installing NodeJS
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get --quiet --assume-yes install npm

echo installing  build-essential
sudo apt-get --quiet --assume-yes install build-essential

echo install mongoDB
sudo apt-get --quiet --assume-yes install -y mongodb-org
sudo mkdir /data
sudo mkdir /data/db
sudo chown $USER /data/db
sudo systemctl start mongodb

echo installing git
sudo apt-get --quiet --assume-yes install git

echo Clonnig server source to $APP_PATH
sudo git clone --depth=50 --branch=master  http://github.com/reubinoff/trafficlight $APP_PATH

cd $APP_PATH/server
sudo npm install
sudo npm test

echo Adding application to systemd
sudo cp $APP_PATH/server/traffic-light.service /etc/systemd/system/
sudo systemctl enable traffic-light.service
sudo systemctl start traffic-light.service
