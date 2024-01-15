#### 1. Pariti Code Challenge

#### Settup

All scripts executed from the root of this monorepo runs all the project which is possible with `lerna` as this monorepo project manager.

**STEP 1 - Installing dependency**
Installs all dependency in the project

```bash
npm run install:deps
```

**STEP 2 - Building workspaces**
Builds workspaces i.e shared libs using `npm workspaces`. You only need to run this once but anytime you modify a lib in the workspaces you have to rebuild workspaces with this command so that new changes will be reflected.

```bash
npm run build:libs
```

**STEP 3 - Running Application**
To run application on `DEV` mode run

```bash
  npm run start:dev
```

To run application on `PROD` mode run

```
 npm run start
```

#### Additional Scripts

**Eslint - Checking code standard**

```bash
  npm run lint
```

**Test - Running test**

```bash
  npm run test:ci
```

#### Vending Machine Configuration

**Backend**
The vending machine is highly configurable via environment variable. The table below explains the environment variables needed to run the vending machine. Nevertheless there is a default config already. `Note` project won't run without these variables in place

| Key            | Description                                                                     | Type               |
| -------------- | ------------------------------------------------------------------------------- | ------------------ | ------------ | ------ |
| SLOTS          | This is the number of slot for the machine where each slot belongs to a product | `number`           |
| SLOT_SIZE      | This is the maximum number of item per slot                                     | number             |
| COINS_CURRENCY | the currency the machine should accept.                                         | `dollar` or `euro` |
| PORT           | the port application should run on                                              | number             |
| NODE_ENV       | the environment app should run on                                               | `development`      | `production` | `test` |

**NOTE**
You can customize your own coin for thsi project by following the this instructions

- Goto `backends/vending-machine/src/core/currency-manager/currency-configs`
- Add your own directory for currency and follow the format of `dollar` or `euro` as a guide for your own currency
- Make sure to export your currency at `backends/vending-machine/src/core/currency-manager/currency-configs/index.ts`
