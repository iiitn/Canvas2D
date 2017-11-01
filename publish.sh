#!/bin/sh

tsc
node generate_bundle_dts.js
npm version patch -m "patch"
npm publish