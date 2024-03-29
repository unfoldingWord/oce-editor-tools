<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
  <a href="https://github.com/unfoldingWord">
    <img src="images/uW.png" alt="Logo" width="300" height="50">
  </a>

# Oce Editor Tools

#### Bible resources editor tools 
- using Proskomma underneath

<a href="https://oce-editor-tools-mui-core.netlify.app/"><strong>View Demo and examples</strong></a>

<a href="https://github.com/unfoldingWord/oce-editor-tools/issues">Report Bug</a>
·
<a href="https://github.com/unfoldingWord/oce-editor-tools/issues">Request Feature</a>


<p>
<a href="https://opencomponents.io/component/unfoldingWord/oce-editor-tools" title="Oce Editor Tools is part of the OCE"><img src="https://img.shields.io/badge/OCE-component-green?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDcuNDEgMTQ3LjQxIj48dGl0bGU+b2NlX2NvbXBvbmVudDwvdGl0bGU+PGcgaWQ9IkNhcGFfMiIgZGF0YS1uYW1lPSJDYXBhIDIiPjxnIGlkPSJDYXBhXzEtMiIgZGF0YS1uYW1lPSJDYXBhIDEiPjxwYXRoIGQ9Ik04Ny4xNSw4Ny4zM2MtNy41MSw3LjUzLTguMzYsMjIuNSw4LjExLDI1LjI3LDguMjcsMS40MywxMS42LDUuNCw4LDEwLjE0TDc4LjU3LDE0Ny40MSw0OSwxMTcuODhjLTQuNzMtMy42MS04LjctLjI5LTEwLjEzLDgtMi43NywxNi40OC0xNy43NCwxNS42My0yNS4yNyw4LjEybC0uMTktLjE5Yy03LjUtNy41Mi04LjM1LTIyLjQ5LDguMTItMjUuMjcsOC4yOC0xLjQzLDExLjYtNS40LDgtMTAuMTNMMCw2OC44NSwyNC42OCw0NC4xN2M0Ljc0LTMuNjEsOC43MS0uMjgsMTAuMTMsOCwyLjc4LDE2LjQ4LDE3Ljc1LDE1LjYzLDI1LjI4LDguMTJsLjE4LS4xOGM3LjUtNy41NCw4LjM2LTIyLjUxLTguMTItMjUuMjgtOC4yNi0xLjQyLTExLjYtNS40LTgtMTAuMTNMNjguODUsMCw5OC4zOSwyOS41NGM0LjcyLDMuNjEsOC43LjI5LDEwLjEyLTgsMi43Ny0xNi40OCwxNy43NC0xNS42MiwyNS4yOC04LjEybC4xOS4xOWM3LjQ5LDcuNTIsOC4zNCwyMi41LTguMTIsMjUuMjctOC4yOCwxLjQzLTExLjYsNS40MS04LDEwLjEzbDI5LjU0LDI5LjU1LTI0LjY3LDI0LjY4Yy00Ljc0LDMuNjEtOC43MS4yOC0xMC4xNC04LTIuNzgtMTYuNDgtMTcuNzUtMTUuNjItMjUuMjctOC4xMVoiIHN0eWxlPSJmaWxsOiMyZjVjNmUiLz48L2c+PC9nPjwvc3ZnPg==&amp;style=for-the-badge&amp;labelColor=ffffff&amp;?color=2f5c6e" alt="Open Components Ecosystem"></a>
<a href="https://discord.com/channels/867746700390563850/867746700390563853" title="OCE discord server"><img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&amp;logo=discord&amp;logoColor=white" alt="Discord"></a>
<a href="https://github.com/unfoldingWord/oce-editor-tools/blob/HEAD/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="license"></a>
</p>

---

## Features

  - Various underlying components assembled together and made available in an easy to use library.
  - These tools are organized in three packages, each one tailored to various use-cases, depending on your needs.

## Documentation

This project is organized as a mono-repository. The packages defined in this repo are published to `npm` individually. Here are the links and descriptions:

| Local Package | 📦 NPM Package | Demo | ✏️ Description |
| - | - | - | - |
| [mui-core](./packages/mui-core) | [@oce-editor-tools/mui-core](https://npmjs.com/@oce-editor-tools/mui-core)  | [Core Styleguidist](https://oce-editor-tools-mui-core.netlify.app/) | Various editor and preview components - the core library used by other packages|
| [pk](./packages/mui-pk) | [@oce-editor-tools/pk](https://npmjs.com/@oce-editor-tools/mui-pk)  | [Pk Styleguidist](https://oce-editor-tools-mui-pk.netlify.app/) | Designed to make it easy to have access to various Proskomma functions |
| [simple](./packages/mui-simple) | [@oce-editor-tools/simple](https://npmjs.com/@oce-editor-tools/mui-simple)  | [Simple Styleguidist](https://oce-editor-tools-mui-simple.netlify.app/) | A simplified implementation completely hiding Proskomma *(while also loosing some repository handling as a result of this)* |

---

## Setup

run `yarn install` on the root of the repository

## Support

Having trouble? Get help in the official [Open Components Ecosystem Discord](https://discord.com/channels/867746700390563850/1019675732324143205).


*  See a diagram of the dependencies of the projects.

  ```Shell
  nx graph  
  ```

*  enable [remote caching](https://nx.app) and make CI faster.
  ```Shell
  npx nx connect-to-nx-cloud
  ```


<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot](./images/screenshot.png)


**Purpose**
- Multiple re-usable editor and preview components packaged into a library (monorepo). These are meant to be integrated into applications for editing scripture text in USFM format.

**Scope**

This package library contains various wrappers for other components. All parts are designed to hide underlying complexity and make it easy to use, as "tools". Just choose what tools to use from the most suitable package, depending on your use cases. 

These are some of the underlying components:

- the [XELAH](https://github.com/xelahjs/xelah) text editor. oce-editor-tools supplies additional UI parts, a toolbar, etc and XELAH supplies the text editor.

- [Epitelete-html](https://github.com/unfoldingWord/epitelete-html) HTML handling in Epitelete - as a derived sub-class. All the [original Epitelete](https://github.com/Proskomma/epitelete) parent functions are inherited and then extended with more functions for generating and parsing Html.

- [proskomma-core](https://github.com/Proskomma/proskomma-core) An implementation of the Proskomma Scripture Processing Model.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [React.js](https://reactjs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

Here is an example of how you may set up your project locally.

To get a local copy up and running follow these simple example steps.


### Installation/First Steps

If you wish to use a package from this library in your app you will need to add it as a dependency with, for example:
```sh
npm install @oce-editor-tools/mui-core
```
OR
```shell
yarn add @oce-editor-tools/mui-core
```
(just replace `mui-core` above with `mui-pk` or `mui-simple` in order to install one of the other packages)

Also you will need to add the peer dependencies:
```shell
npm install @mui/material @mui/styles @mui/icons-material  @mui/styled-engine npm:@mui/styled-engine-sc@latest react react-dom 
```
OR 
```shell
yarn add @mui/material @mui/styles @mui/icons-material  @mui/styled-engine npm:@mui/styled-engine-sc@latest react react-dom 
```
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage/Integration

See [Styleguidist link](https://oce-editor-tools-mui-core.netlify.app/) for many usage examples.

Other examples here:

 - [mui-pk](https://oce-editor-tools-mui-pk.netlify.app/) - with access to Proskomma features
 
  and 

 - [mui-simple](https://oce-editor-tools-mui-simple.netlify.app/) - for simple usage


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/unfoldingWord/oce-editor-tools/issues) for a full list of proposed features (and any known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

The open source community is an amazing place to learn, inspire, and create. So, any contributions you make are **greatly appreciated**.  [Guidelines for rcl development](https://forum.door43.org/t/rcl-app-development-process/605) and [general information](https://forum.door43.org).

You can, for instance, simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

If you would like to fork the repo and create a pull request.

1. Fork the Project
2. Clone the repo
   ```sh
   git clone https://github.com/unfoldingWord/oce-editor-tools.git
   ```
3. Delete .yarnrc.yml
4. Confirm which version of yarn is running on this project
   ```sh
   yarn -v
   ```
   If 3.x then add interactive-tools. (If 4.x then skip this step as interactive tools are already included.)
   ```sh
   yarn plugin import interactive-tools
   ```
5. Define linker for installing Node packages
   ```sh
   yarn config set nodeLinker node-modules
   ```
6. Install NPM packages
   ```sh
   yarn install
   ```
7. Run a package locally, for instance:
   ```sh
   yarn nx start @oce-editor-tools/mui-simple
   ``` 
8. Create your feature branch (`git checkout -b feature/AmazingFeature`)
9. Make your changes, then update what will be committed (`git add <file>`)
10. Commit your changes with comment (`git commit -m "Add some AmazingFeature"`)
11. Change the remote url to your fork (`git remote set-url origin https://github.com/(YourFork)/oce-editor-tools.git`)
12. Push to the Branch
13. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



