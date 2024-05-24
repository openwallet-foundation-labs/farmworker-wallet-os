<h1 align="center">
  <br>
  <a href="https://www.sphereon.com"><img src="https://sphereon.com/content/themes/sphereon/assets/img/logo.svg" alt="Sphereon" width="400"></a>
  <br> Presentation Exchange v1 and v2 
  <br> Typescript models
  <br>
</h1>

## Table of Contents

- [Background](#background)
- [Usage](#usage)

## Background

The Presentation Exchange OpenAPI (PEX-OpenAPI) is an OpenAPI specification based upon the
[DIF Presentation Exchange v2.0.0](https://identity.foundation/presentation-exchange/) and [DIF Presentation Exchange v1.0.0](https://identity.foundation/presentation-exchange/spec/v1.0.0/)
specifications.

A standardised Presentation Exchange is crucial for interoperability between different systems that are used by verifiers and holders (e.g. wallets). It enables the verifiers- and holder-systems to interpret models used by each other consistently. The PEX-OpenAPI specification and Models Generator will allow for use-cases with the need to implement a Presentation Exchange, possibly using different programming languages.

The PEX-Models Typescript library is a pre-generated and published library, ready to be used in typescript/javascript projects that can directly be used from a package manager using [npmjs.com](https://www.npmjs.com/package/@sphereon/pex-models). This library can be used in any JavaScript project, providing a consistent structure of the models required in presentation exchange between verifiers and holders of verifiable credentials.

Additionally, the PEX-Models library can be used to create libraries for verification of presentation definition and submission objects themselves. In this fashion, the PEX-Models library is used in Sphereon's [PEX library](https://github.com/Sphereon-Opensource/pex/) to validate the model objects.

## Usage

### Step 1 : Create a project using the models

The provided example will create a new `NPM` project using `typescript` as language. It will import and use `JwtObject`, similarly you can import and use other objects.

```
cd '<workspace>'
mkdir my-pex-models-consumer-prj
cd my-pex-models-consumer-prj
npm init
```

`npm init` will ask a few questions, the default answer to those questions can be selected.

### Step 2 : Add script & Import models

To use the models generated as a result of `step 1`

```
npm install
npm install --save @sphereon/pex-models
npm install --save ts-node
```

Create a folder named `scripts`

```
mkdir scripts
```

Create a file in 'scripts' named `consumer-script.ts` with following content.

```
import {JwtObject} from '@sphereon/pex-models'

var jwtObject : JwtObject = {
    alg : ['someAlgorithm']
};

console.log(jwtObject);
```

In `package.json` add a script `"my-pex-models-consumer-script": "ts-node scripts/consumer-script.ts"` in the scripts section. The resulting Package.json should look like following.

```
{
  "name": "my-pex-models-consumer-prj",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
	"my-pex-models-consumer-script": "ts-node scripts/consumer-script.ts"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@sphereon/pex-models": "2.0.0",
    "ts-node": "^9.1.1"
  }
}
```

### Step 3 : Check if everything went correctly

In the terminal run the following command from the `<workspace>/my-pex-models-consumer-prj`

```
cd '<workspace>/my-pex-models-consumer-prj'
npm run my-pex-models-consumer-script
```

You should expect this to be printed on the console.

```
{ alg: [ 'someAlgorithm' ] }
```
