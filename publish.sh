#!/bin/sh

tsc
npm version patch -m "patch"
npm publish