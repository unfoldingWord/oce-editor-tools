<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
  <a href="https://oce-editor-tools.netlify.app/">
    <img src="images/uW.png" alt="Logo" width="300" height="50">
  </a>

# Oce Editor Tools

#### Bible resources editor tools 
- using Proskomma underneath

<a href="https://oce-editor-tools.netlify.app/"><strong>View Demo and examples</strong></a>

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

  - Various underlying components are here assembled together and made available in an easy to use library.
  - These tools are three packages, each one tailored to various use-cases, depending on your needs.

## Documentation

This project is organized as a mono-repository. The packages defined in this repo are published to `npm` individual. Here are the links and descriptions below:

| Local Package | 📦 NPM Package | Tutorial | ✏️ Description |
| - | - | - | - |
| [fnr-text](./packages/fnr-text)   | [@findr/text](https://npmjs.com/@findr/text)    | [@findr/text tutorial](https://findrjs.netlify.app/) | all the logic behind a find-and-replace feature |
| [fnr-react](./packages/fnr-react) | [@findr/react](https://npmjs.com/@findr/react)  |  | state management needed to build your own find-and-replace components |
| [fnr-mui](./packages/fnr-mui)     | [@findr/mui](https://npmjs.com/@findr/mui)      |  | library of GUI components for find-and-replace based on [@mui/material](https://mui.com/material-ui/getting-started/) |
| [fnr-perf](./packages/fnr-perf)   | [@findr/perf](https://npmjs.com/@findr/perf)    |  | Pipeline and Actions needed for find-and-replace scripture using [proskomma-json-tools](https://github.com/Proskomma/proskomma-json-tools/) |

- reference documentation: _coming soon!_

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
- Create a re-usable editor component that can be integrated into application to support editing scripture text in USFM format.

**Scope**
- Mostly this is a wrapper for the [XELAH](https://github.com/xelahjs/xelah) text editor. uW editor is mostly responsible for the UI, toolbar, etc and XELAH supplies the text editor.

<p align="right">(<a href="#top">back to top</a>)</p>

## Packages

### @oce-editor-tools/core

A core library used by other packages.

### @oce-editor-tools/pk

An implementation making it easy to have access to various Proskomma functions.

### @oce-editor-tools/simple

A simplified implementation completely hiding Proskomma (while also loosing some repository handling as a result of this).


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

See [Styleguidist link](https://oce-editor-tools.netlify.app/) for many usage examples.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/unfoldingWord/oce-editor-tools/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

The open source community is an amazing place to learn, inspire, and create. So, any contributions you make are **greatly appreciated**.  [Guidelines for external contributions.](https://forum.door43.org)

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
4. Run a packages locally, for instance:
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


