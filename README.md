# 📜 Project description

In this project, we make use of the present face recognition and voice technologies to access our personal information on the web. We will build a profile app where we can see our profiles, modify them. But the login to our profile can be done using

* Username and Password
* Face recognition
* Trigger word detection

## LBPHFaceRecognizer

### Folder Structure

* data
    * haarcascade_frontalface_default.xml

* TrainingImage
    * 60 Images captured for training

* Training Image Label
    * trainner.yml (model)

* UserDetails
    * UserDetails.csv (ID, Name)

* Sample.py (program)

### How it works?

1. We have to give id and name, and click sample, which takes approximatle 60 imgs and stores in `TrainingImage` directory.

2. Train the model by clicking `train`.

3. It trains the model if new samples were added.

4. Click on `test` to test if it is working properly or not

Please try it out and inform me the results. I already added my face images and trained it.
