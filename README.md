<div id="top"></div>


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]](https://github.com/unfoldingWord/uw-editor/graphs/contributors)
[![Forks][forks-shield]](https://github.com/unfoldingWord/uw-editor/network/members)
[![Stargazers][stars-shield]](https://github.com/unfoldingWord/uw-editor/stargazers)
[![Issues][issues-shield]](https://github.com/unfoldingWord/uw-editor/issues)
[![MIT License][license-shield]](https://github.com/unfoldingWord/uw-editor/blob/main/LICENSE)
[![LinkedIn][linkedin-shield]](https://www.linkedin.com/company/unfoldingword/)



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://uw-editor.netlify.app/">
    <img src="images/uW.png" alt="Logo" width="300" height="50">
  </a>

<h3 align="center">Oce Editor Tools</h3>

  <p align="center">
    A reusable biblical text editor tool library
    <br />
    <a href="https://uw-editor.netlify.app/"><strong>View Demo and examples</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/unfoldingWord/uw-editor/issues">Report Bug</a>
    ·
    <a href="https://github.com/unfoldingWord/uw-editor/issues">Request Feature</a>
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
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot](./images/screenshot.png)


**Purpose**
- Create a re-usable editor component that can be integrated into application to support editing scripture text in USFM format.

**Scope**
- Mostly this is a wrapper for the [XELAH](https://github.com/xelahjs/xelah) text editor. uW editor is mostly responsible for the UI, toolbar, etc and XELAH supplies the text editor.

<p align="right">(<a href="#top">back to top</a>)</p>

## Packages

### @oce-editor-tools/core

A core library used by other packages.

### @oce-editor-tools/core

An implementation making it easy to have access to various Proskomma functions.

### @oce-editor-tools/core

A simplifies implementation completely hiding Proskomma (while also loosing some repository handling as a result of this).


### Built With

* [React.js](https://reactjs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.


### Installation/First Steps

If you wish to use a package from this library in your app you will need to add it as a dependency with, for example:
```sh
npm install @oce-editor-tools/simple
```
OR
```shell
yarn add @oce-editor-tools/simple
```
Also you will need to add the peer dependencies:
```shell
npm install @mui/material @mui/styles @mui/icons-material  @mui/styled-engine npm:@mui/styled-engine-sc@latest react react-dom translation-helps-rcl
```
OR 
```shell
yarn add @mui/material @mui/styles @mui/icons-material  @mui/styled-engine npm:@mui/styled-engine-sc@latest react react-dom translation-helps-rcl
```
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage/Integration

See [Styleguidist link](https://uw-editor.netlify.app/) for many usage examples.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/unfoldingWord/uw-editor/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.  [Guidelines for external contributions.](https://forum.door43.org)

You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

If you would like to fork the repo and create a pull request.

1. Fork the Project
2. Clone the repo
   ```sh
   git clone https://github.com/unfoldingWord/uw-editor.git
   ```
3. Install NPM packages
   ```sh
   yarn
   ```
4. Run a packages locally, for instance:
   ```sh
   yarn nx start @oce-editor-tools/simple
   ```

2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/unfoldingWord/uw-editor.svg?style=for-the-badge
[contributors-url]: https://github.com/unfoldingWord/uw-editor/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/unfoldingWord/uw-editor.svg?style=for-the-badge
[forks-url]: https://github.com/unfoldingWord/uw-editor/network/members
[stars-shield]: https://img.shields.io/github/stars/unfoldingWord/uw-editor.svg?style=for-the-badge
[stars-url]: https://github.com/unfoldingWord/uw-editor/stargazers
[issues-shield]: https://img.shields.io/github/issues/unfoldingWord/uw-editor.svg?style=for-the-badge
[issues-url]: https://github.com/unfoldingWord/uw-editor/issues
[license-shield]: https://img.shields.io/github/license/unfoldingWord/uw-editor.svg?style=for-the-badge
[license-url]: https://github.com/unfoldingWord/uw-editor/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
