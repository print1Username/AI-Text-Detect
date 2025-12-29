# Text detected OCR Website

[![Run Vitest](https://github.com/print1Username/Text-Detect/actions/workflows/vitest.yml/badge.svg)](https://github.com/print1Username/Text-Detect/actions/workflows/vitest.yml)

This is a website that can detect fonts in images. Simply upload an image, and it will identify the fonts within it.
\
If you prefer not to upload images, this website also supports uploading via image URLs.

## Running
To run this program locally, you need to prepare the following:
Node.js, React components, Docker
- For the Node.js, we can just download in official website: [Nodejs](https://nodejs.org/en)
- Docker can also be downloaded from the official website. [Docker](https://www.docker.com/)

For other components, we can proceed with the download directly.
After downloading these environments, we need to download the required components.
```
npm install i
npm install react-router-dom
```

After downloading it, simply run Docker.
```
docker compose up --build
```

## Introduction

When you enter this website, you'll see a simple homepage.
\
In the center of the homepage are two buttons: one for uploading images and the other for image links.
\
In the bottom-left corner of the website, you can switch between light and dark themes.

<img width="1920" height="912" alt="Screenshot 2025-12-26 at 16-59-17 Text Detecter" src="https://github.com/user-attachments/assets/c4a69a55-c31e-4114-9c15-1552087edc6d" />
<img width="1920" height="912" alt="Screenshot 2025-12-26 at 16-59-37 Text Detecter" src="https://github.com/user-attachments/assets/2b5d418d-9e64-4734-a20f-74eeff066911" />

After uploading an image or link, users can view the image and its content.
\
A back button is located in the top-left corner of the page, allowing users to return to the homepage.

<img width="1920" height="912" alt="Screenshot 2025-12-26 at 17-00-08 Text Detecter" src="https://github.com/user-attachments/assets/d95800a8-a483-45d3-a5bc-eb10a2f82316" />

## Vite + React

This website's frontend utilizes Vite + React for development. React is a free, open-source framework well-suited for building websites.
\
Vite serves as the frontend content for the website, enabling its creation and deployment in React format.

## Docker

Docker is a containerization platform that allows you to package an application, its runtime environment, and dependencies into a single container. This container can then be deployed and run identically on any machine with Docker installed.

## Tools

[The Build Tool for the Web](https://vite.dev/)

[The library for web and native user interfaces](https://react.dev/)

[A safer container ecosystem, for everyone](https://www.docker.com/)
