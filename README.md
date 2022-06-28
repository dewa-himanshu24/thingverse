# thingverse
Web app to upload and view 3Dmodels (.gltf, .glb and .fbx extention) 

## Demo
Click here to open demo - https://bubbly-spicy-kumquat.glitch.me/

## Screenshots

### Home page view
![Screenshot (1)](https://user-images.githubusercontent.com/101580513/176237317-e3d16ac6-780c-4777-adb9-7aa4e5e6363a.png)

### Uploaded file preview view
![Screenshot (4)](https://user-images.githubusercontent.com/101580513/176237354-01417c57-236f-4a5f-9959-1021bafa6f3c.png)

## How to run locally
- Install node and npm
- Install package.json using command `npm install`
- Create S3 bucket with name `3d-models-bucket`
- Put your aws access keys in `credentials` file in `~/.aws` folder
- Declare `MONGO_URI` in environment variable
- Run using `npm start`
