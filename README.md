# Kitty Collector
## The place to view all the kittens!

**kitty collector** is part of the Kitty collector project. Collecting cat pictures from RaspberryPi equipped with webcam and AI.

3 components make up the kittycollector project:

- **Kitty Collector**: Frontend, presenting pictures, built with NextJs.
- **ImageUpload**: Backend, storge using mariadb and mongodb.
- **Kitty finder**: AI, deployed on RasberryPi using tensorflow-lite and opencv.


# How do I launch this?

This repository is avaliable on docker:  **kawasakidragonno/kittycollector**

To launch, specify the URL to ImageUpload backend:
```
docker run -e NEXT_PUBLIC_BACKEND_URL=<URL_OF_IMAGEUPLOAD> -p 3000:3000 kawasakidragonno/kittycollector
```