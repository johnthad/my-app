# PWA Starter Kit App with Lit

This project is an update to the [Polymer PWA Starter Kit](https://github.com/Polymer/pwa-starter-kit). Like the original project, this one uses [Lit](https://lit.dev/), which here has been updated to version 2. The Polymer CLI has been replaced with [@open-wc recommendations](https://github.com/open-wc) and Polymer elements replaced with [Material 2 web components](https://github.com/material-components/material-web/tree/mwc).

## Motivations

1. Update a project I found useful when I moved from experimenting with Polymer 1 to seriously developing with Lit. I copied the general structure of the PWASK sample apps when rewriting my largest [GWT](https://www.gwtproject.org/) application, a commercial client app for a document management system. I have also completed two smaller applications using this structure and the componets created for the main product.

2. Show off the suitability of [Polymer/pwa-helpers](https://github.com/Polymer/pwa-helpers) as a light framework for SPAs and Lit. I found that `router.js`, `connect-mixin.js`, and `lazy-reducer-enhancer.js` completely adequate for my application. (I did not use either `media-query.js` or `network.js` which are not useful to my environment.)

3. Serve as a project to try out [@lit-labs/context](https://lit.dev/docs/data/context/) as a substitue for Redux, as well as other experiments.

## Scripts

- `start` runs the app for development
- `start:build` runs the app after it has been built using the `build` command
- `build` builds the app and outputs it in the `dist` directory
- `test` runs the test suite with Web Test Runner
- `lint` runs the linter for the project
- `format` fixes linting and formatting errors

### Notes on scripts

- `start`'s reloading on file changes is not guaranteed due to the addition of CSP headers.
- The tests are incomplete.
- The app created by the `build` script can be deployed to an [Apache Web Server](https://httpd.apache.org/), like the one bundled with macOS.

## To Do's and Improvements

I have ideas where this project could go to be of use to others.

- Complete the tests. The original product has several tests that could be converted to [@web/test-runner](https://modern-web.dev/guides/test-runner/getting-started/).

- Expand on and bring up-to-date the PWA and mobile aspects of the project. I'm not the one for this work. In 2015 I wrote a mobile client using [mgwt](http://www.m-gwt.com/) but no one wants to review a 300dpi, Legal-size, multipage TIFF file on a cellphone. The one `'mobile`' customer I know of is using one of my smaller Lit-based clients on iPad Pros.

- Add whatever is required to deploy the app to [Eleventy](https://www.11ty.dev/) or other common platforms. (Like mobile, this is not my bailiwick.)

- Use common Lit decorators like `@customElement`, `@property`, etc.

- Write a version of this app using TypeScript. Gee, aren't all the cool kids using it?
