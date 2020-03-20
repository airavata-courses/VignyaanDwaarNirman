# VignyaanDwaarNirman

* A weather data retrieval and visualization web-application
* //This is an older branch for an older release of the web-application, for accessing/testing the current release follow the instructions below.

## Authors

* **Anshul Vohra** 
* **Devansh Jain**
* **Viral Prajapati**


## Getting Started

The application is already deployed on Jetstream instances which can be accessed by going to http://149.165.168.66:30012/ 

## Testing CI/CD:

Follow the steps below to test CI/CD. 

#### Clone the repo :  
Clone the repository to your local device, by running the following command :
```
git clone https://github.com/airavata-courses/VignyaanDwaarNirman.git

```

#### Switch to any dockerize_* branch and pull :
Switch to any branch of the form dockerize_"insert_microservice_name" and pull the latest changes.
```
git checkout $BRANCH_NAME
git pull origin $BRANCH_NAME

```
Switch to any of the following branches:
- dockerize_apiGateway
- dockerize_dataRetrival
- dockerize_frontEnd
- dockerize_modelAnalysis
- dockerize_modelExecution
- dockerize_sessionManagement
- dockerize_userManagement

#### Make some minor change to the code and push it 
Add a comment to the code that you have pulled and then input the following commands: 
1) Check the status to see if changes are refelcted or not 
```
git status
```
This should display the file that you have added a comment to.

2) Stage the changed files and commit and push it :

```
git add *
git commit -m " $PEER_REVIEWER_NAME testing CI/CD "
git push origin $BRANCH_NAME

```


#### Go to TRAVIS-CI

Go to https://travis-ci.org/ search for VignyaanDvaarNirman under repositories and a new build should have been triggered, with your name.

Depending on the microservice, you pulled it should take 3-10 minutes for the microservice to successfully build and be deployed.
This should conclude the CI/CD testing. 

## Testing Kubernetes

#### Contact any of the team-members:
For accessing the deployed microservice, you will require the private ssh key, please contact any of the team members on https://airavta.slack.com/ to get the key.

#### SSH into the master instance :
SSH into the master instance using the following command :
```
ssh -i vdn-pub.pem ubuntu@149.165.168.66

```
This should give you access to the master instance

#### KubeCTL commands :

After accessing the master instance you should see a prompt of this kind :

```
ubuntu@vdn-master:~$

```
Now, try any of the following commands for testing Kubernetes.

1) See deployed pods :
```
kubectl get pods
```
This should list down all the deployed microservices and their pods with their status, no. of restarts and age.

2) See running services :

```
kubectl get service
```

3) See logs of pods :

```
kubectl logs $POD_NAME

```

4) Delete a pod for testing :

```
kubectl delete pod $POD_NAME

```
This should delete the pod and then list the pods to see that the pod would have restarted with an age of < 1 minute. 

Thanks for reading through, feel free to leave an issue or a comment if needed. 😃
