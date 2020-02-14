# VignyaanDwaarNirman

A weather forecasting application

## Authors

* **Anshul Vohra** 
* **Devansh Jain**
* **Viral Prajapati**


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. To begin with, clone the repository on your system using the following command: 

```
git clone 
```

### Installing dependencies for all the services

What things you need to install the application and how to install them. 

#### Download & install RabbitMQ:  
https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.2/rabbitmq-server-3.8.2.exe  
```
Set 2 environment variables:  
- RABBITMQ_SERVER - that has the path to the installation directory  
- RABBITMQ_NODENAME - rabbit@localhost  
Append the following variable to path:  
%RABBITMQ_SERVER%\sbin      
&nbsp;open a command prompt and enter:  
i) rabbitmqctl start_app  (You should see rabbitmqctl starting up)   
ii) rabbitmqctl start_app (You should see rabbitmqctl ports in use)  

If you dont see rabbitmq running:
go to start and click on RAbbitMQ service - START then run the 2 commads mentioned above again
```

##### Download & Install python anaconda package:
Python-anaconda package: https://repo.anaconda.com/archive/Anaconda3-2019.10-Windows-x86_64.exe

##### Download & install MongoDB
https://www.mongodb.com/download-center/community select windows x64 version and download

##### Download and install JDK
https://download.oracle.com/otn-pub/java/jdk/13.0.2+8/d4173c853231432d94f001e99d882ca7/jdk-13.0.2_windows-x64_bin.exe

Go to /VignyaanDwaarNirman, we will use the rqeuirements.txt file to install to install the dependencies for python, using this command.

```
pip install requirements.txt
```
Go to /Front_End_Statging and run the following commands in order to get all the dependencies,
```
npm install -g
```
Go to /User_Mgmt_Statging and run the following commands in order to get all the dependencies,
```
npm install -g
```
Go to /Session_Mgmt_Statging and run the following commands in order to get all the dependencies,
```
npm install -g
```
Go to /Session_Mgmt_Statging and run the following commands in order to get all the dependencies,
```
npm install -g
```



## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
