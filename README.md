<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache 2.0 License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/paiswillie/digital-composite">
    <img src="https://github.com/user-attachments/assets/0ae1b6d5-1a62-4b41-b2c7-c595a0460497" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">GradSight</h3>

  <p align="center">
    A web-based application for displaying and managing graduation composites, featuring OCR, user authentication, and role-based access control.
    <br />
    <a href="https://github.com/paiswillie/digital-composite"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/paiswillie/digital-composite">View Demo</a>
    &middot;
    <a href="https://github.com/paiswillie/digital-composite/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/paiswillie/digital-composite/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

GradSight is a web application designed to modernize the way graduation composites are displayed and managed. It provides a user-friendly interface for browsing and searching composites, enhanced with OCR technology for data extraction and role-based access control for secure administration.

The project is structured with a client-side React application, a server-side component using Node.js and Express, and leverages cloud services like AWS S3, Lambda, and DynamoDB. It aims to deliver a scalable and intuitive digital composite experience for students, faculty, and alumni.

The repository is organized as follows:

- `docs`: Documentation for the project, including SRS, design documents, and meeting minutes.
- `refs`: Reference material used for the project, such as research papers and articles.
- `src`: Source code for the client-side React application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [MySQL](https://www.mysql.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Developed By

- [Willie Pai](https://github.com/PaisWillie)
- [Wajdan Faheem](https://github.com/WajdanF)
- [Henushan Balachandran](https://github.com/HenushanB)
- [Hammad Pathan](https://github.com/hammadpathan)
- [Zahin Hossain](https://github.com/ZahinH)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [MySQL](https://www.mysql.com/)
- AWS Account and Credentials (for server deployment)

### Installation

1.  Clone the repository:

    ```sh
    git clone https://github.com/paiswillie/digital-composite.git
    ```

2.  Navigate to the client directory:

    ```sh
    cd digital-composite/client
    ```

3.  Install client-side dependencies using pnpm:

    ```sh
    pnpm install
    ```

4.  Configure environment variables:

    - Create a `.env` file in the `client` directory.
    - Add the following variables:

      ```
      VITE_AUTH0_DOMAIN=your_auth0_domain
      VITE_AUTH0_CLIENT_ID=your_auth0_client_id
      VITE_HOST=your_backend_host
      ```

5.  Navigate to the server directory:

    ```sh
    cd ../server
    ```

6.  Install server-side dependencies using npm:

    ```sh
    npm install
    ```

7.  Configure environment variables for the server:

    - Create a `.env` file in the `server` directory.
    - Add the following variables:

      ```
      DB_HOST=your_db_host
      DB_USER=your_db_user
      DB_PASSWORD=your_db_password
      DB_NAME=your_db_name
      AWS_ACCESS_KEY_ID=your_aws_access_key_id
      AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
      AWS_REGION=your_aws_region
      S3_BUCKET_NAME=your_s3_bucket_name
      ```

8.  Set up the MySQL database:

    - Create a database named `studentdata`.
    - Execute the SQL script `server/db/schema/StudentsTable.sql` to create the `OCRDATA` table.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

1.  Start the client-side application:

    ```sh
    cd client
    pnpm run dev
    ```

2.  Start the server-side application:

    ```sh
    cd server
    node server.js
    ```

3.  Access the application in your browser at `http://localhost:5173`.

_For more detailed instructions, please refer to the [INSTALL.md](INSTALL.md) file._

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Implement user roles and permissions
- [ ] Integrate with McMaster's alumni and event management platforms
- [ ] Enhance OCR accuracy and performance
- [ ] Implement advanced analytics dashboard

See the [open issues](https://github.com/paiswillie/digital-composite/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/paiswillie/digital-composite/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=paiswillie/digital-composite" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Willie Pai - [williepai](https://www.linkedin.com/in/williepai/)
- Wajdan Faheem - [Wajdan Faheem](https://www.linkedin.com/in/wajdan-faheem-921418167/)
- Henushan Balachandran - [Henushan Balachandran](https://www.linkedin.com/in/henushan-balachandran-6704a8174/)
- Hammad Pathan - [Hammad Pathan](https://www.linkedin.com/in/hammad-pathan-744a63168/)
- Zahin Hossain - [Zahin Hossain](https://www.linkedin.com/in/zahin-hossain-45400a157/)

Project Link: [https://github.com/paiswillie/digital-composite](https://github.com/paiswillie/digital-composite)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- This project was inspired by the need for a modern solution to manage graduation composites.
- Thanks to McMaster University's Faculty of Engineering for their support and guidance.
- Special thanks to Meggie MacDougall for her invaluable insights and feedback.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/paiswillie/digital-composite.svg?style=for-the-badge
[contributors-url]: https://github.com/paiswillie/digital-composite/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/paiswillie/digital-composite.svg?style=for-the-badge
[forks-url]: https://github.com/paiswillie/digital-composite/network/members
[stars-shield]: https://img.shields.io/github/stars/paiswillie/digital-composite.svg?style=for-the-badge
[stars-url]: https://github.com/paiswillie/digital-composite/stargazers
[issues-shield]: https://img.shields.io/github/issues/paiswillie/digital-composite.svg?style=for-the-badge
[issues-url]: https://github.com/paiswillie/digital-composite/issues
[license-shield]: https://img.shields.io/github/license/paiswillie/digital-composite.svg?style=for-the-badge
[license-url]: https://github.com/paiswillie/digital-composite/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: https://github.com/user-attachments/assets/721b7fb3-e480-4809-9023-fd48b82b1f8c
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
