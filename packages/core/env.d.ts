/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */

import { Platforms } from './src/lib/types'

declare global {
  var platform: Platforms
  var cachePath: string
  var workspaces: string[]
  var ignoreFileNames: string[]
}

export {}
