<span>
  <img src="https://img.shields.io/github/languages/top/choutkamartin/datapick?style=flat-square" />
  <img src="https://img.shields.io/github/languages/code-size/choutkamartin/datapick?style=flat-square" />
  <img src="https://img.shields.io/github/license/choutkamartin/datapick?style=flat-square" />
  <img src="https://img.shields.io/github/last-commit/choutkamartin/datapick?style=flat-square" />
</span>

# Datapick

Datapick is a tool for labelling raw data. These labelled data can be later used for a machine learning model. Datapick has been created as a bachelor's project. Right now, this tool is not suitable for companies or teams looking for quick data label. However, you can fork it and modify it. You can use it as an inspiration too.

If you want to learn more about Datapick and the process behind it, you can check out the blog page https://blog.datapick.tech/.

## How to run locally
To run this application a Node.js runtime is needed. Download and run the installer from https://nodejs.org/en/download/. Node.js will install an NPM as a package manager automatically. Clone the repo to your local machine using `git clone https://github.com/choutkamartin/datapick.git`. Proceed to the folder where you cloned the repository. At the root of the project run `npm install`. This will install all the dependencies needed. At the root of the project is the `.env.example` file. All of these environment variables should be filled in to achieve a 100% working application. To save files an AWS S3 (Simple Storage Service) bucket is needed. AWS SES (Simple Email Service) is used for e-mails.

## Images
### Label tool
<img src="https://user-images.githubusercontent.com/45522695/158090902-63e61308-c1e2-4008-849e-2e74d627f979.png" />

### User profile
<img src="https://user-images.githubusercontent.com/45522695/158091649-811a045f-9ce1-4575-afdd-0d188d29b88a.png" />

