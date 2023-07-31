<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
  <a href="https://github.com/unfoldingWord">
    <img src="images/uW.png" alt="Logo" width="300" height="50">
  </a>

# Oce Editor Tools

#### Bible resources editor tools 
- using Proskomma underneath

<a href="https://oce-editor-tools-core.netlify.app/"><strong>View Demo and examples</strong></a>

<a href="https://github.com/unfoldingWord/oce-editor-tools/issues">Report Bug</a>
·
<a href="https://github.com/unfoldingWord/oce-editor-tools/issues">Request Feature</a>


<p>
<a href="https://opencomponents.io/component/unfoldingWord/findr" title="findr is part of the OCE"></a>
<a href="https://discord.com/channels/867746700390563850/867746700390563853" title="OCE discord server"><img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&amp;logo=discord&amp;logoColor=white" alt="Discord"></a>
<a href="https://github.com/unfoldingWord/findr/blob/HEAD/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="license"></a>
</p>

---

## Features

  - Various underlying components assembled together and made available in an easy to use library.
  - These tools are organized in three packages, each one tailored to various use-cases, depending on your needs.

## Documentation

This project is organized as a mono-repository. The packages defined in this repo are published to `npm` individually. Here are the links and descriptions:

| Local Package | 📦 NPM Package | Demo | ✏️ Description |
| - | - | - | - |
| [core](./packages/core) | [@oce-editor-tools/core](https://npmjs.com/@oce-editor-tools/core)  | [Core Styleguidist](https://oce-editor-tools-core.netlify.app/) | Various editor and preview components - the core library used by other packages|
| [pk](./packages/pk) | [@oce-editor-tools/pk](https://npmjs.com/@oce-editor-tools/pk)  | [Pk Styleguidist](https://oce-editor-tools-pk.netlify.app/) | Designed to make it easy to have access to various Proskomma functions |
| [simple](./packages/simple) | [@oce-editor-tools/simple](https://npmjs.com/@oce-editor-tools/simple)  | [Simple Styleguidist](https://simple-oce-editor-tools.netlify.app/) | A simplified implementation completely hiding Proskomma *(while also loosing some repository handling as a result of this)* |

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
npm install @oce-editor-tools/core
```
OR
```shell
yarn add @oce-editor-tools/core
```
(just replace `core` above with `pk` or `simple` in order to install one of the other packages)

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

See [Styleguidist link](https://oce-editor-tools-core.netlify.app/) for many usage examples.

Other examples here:

 - [pk](https://oce-editor-tools-pk.netlify.app/) - with access to Proskomma features
 
  and 

 - [simple](https://npmjs.com/@oce-editor-tools/simple) - for simple usage


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
3. Install NPM packages
   ```sh
   yarn
   ```
4. Run a package locally, for instance:
   ```sh
   yarn nx start @oce-editor-tools/simple
   ```

5. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
6. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
7. Push to the Branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



