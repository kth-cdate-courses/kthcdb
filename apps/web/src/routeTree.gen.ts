/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as DummyIndexImport } from './routes/dummy/index'
import { Route as CoursesIndexImport } from './routes/courses/index'
import { Route as CoursesCourseIdIndexImport } from './routes/courses/$courseId/index'
import { Route as AccountsAccountIdIndexImport } from './routes/accounts/$accountId/index'
import { Route as loginSignupIndexImport } from './routes/(login)/signup/index'
import { Route as loginSigninIndexImport } from './routes/(login)/signin/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DummyIndexRoute = DummyIndexImport.update({
  id: '/dummy/',
  path: '/dummy/',
  getParentRoute: () => rootRoute,
} as any)

const CoursesIndexRoute = CoursesIndexImport.update({
  id: '/courses/',
  path: '/courses/',
  getParentRoute: () => rootRoute,
} as any)

const CoursesCourseIdIndexRoute = CoursesCourseIdIndexImport.update({
  id: '/courses/$courseId/',
  path: '/courses/$courseId/',
  getParentRoute: () => rootRoute,
} as any)

const AccountsAccountIdIndexRoute = AccountsAccountIdIndexImport.update({
  id: '/accounts/$accountId/',
  path: '/accounts/$accountId/',
  getParentRoute: () => rootRoute,
} as any)

const loginSignupIndexRoute = loginSignupIndexImport.update({
  id: '/(login)/signup/',
  path: '/signup/',
  getParentRoute: () => rootRoute,
} as any)

const loginSigninIndexRoute = loginSigninIndexImport.update({
  id: '/(login)/signin/',
  path: '/signin/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/courses/': {
      id: '/courses/'
      path: '/courses'
      fullPath: '/courses'
      preLoaderRoute: typeof CoursesIndexImport
      parentRoute: typeof rootRoute
    }
    '/dummy/': {
      id: '/dummy/'
      path: '/dummy'
      fullPath: '/dummy'
      preLoaderRoute: typeof DummyIndexImport
      parentRoute: typeof rootRoute
    }
    '/(login)/signin/': {
      id: '/(login)/signin/'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof loginSigninIndexImport
      parentRoute: typeof rootRoute
    }
    '/(login)/signup/': {
      id: '/(login)/signup/'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof loginSignupIndexImport
      parentRoute: typeof rootRoute
    }
    '/accounts/$accountId/': {
      id: '/accounts/$accountId/'
      path: '/accounts/$accountId'
      fullPath: '/accounts/$accountId'
      preLoaderRoute: typeof AccountsAccountIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/courses/$courseId/': {
      id: '/courses/$courseId/'
      path: '/courses/$courseId'
      fullPath: '/courses/$courseId'
      preLoaderRoute: typeof CoursesCourseIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/courses': typeof CoursesIndexRoute
  '/dummy': typeof DummyIndexRoute
  '/signin': typeof loginSigninIndexRoute
  '/signup': typeof loginSignupIndexRoute
  '/accounts/$accountId': typeof AccountsAccountIdIndexRoute
  '/courses/$courseId': typeof CoursesCourseIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/courses': typeof CoursesIndexRoute
  '/dummy': typeof DummyIndexRoute
  '/signin': typeof loginSigninIndexRoute
  '/signup': typeof loginSignupIndexRoute
  '/accounts/$accountId': typeof AccountsAccountIdIndexRoute
  '/courses/$courseId': typeof CoursesCourseIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/courses/': typeof CoursesIndexRoute
  '/dummy/': typeof DummyIndexRoute
  '/(login)/signin/': typeof loginSigninIndexRoute
  '/(login)/signup/': typeof loginSignupIndexRoute
  '/accounts/$accountId/': typeof AccountsAccountIdIndexRoute
  '/courses/$courseId/': typeof CoursesCourseIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/courses'
    | '/dummy'
    | '/signin'
    | '/signup'
    | '/accounts/$accountId'
    | '/courses/$courseId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/courses'
    | '/dummy'
    | '/signin'
    | '/signup'
    | '/accounts/$accountId'
    | '/courses/$courseId'
  id:
    | '__root__'
    | '/'
    | '/courses/'
    | '/dummy/'
    | '/(login)/signin/'
    | '/(login)/signup/'
    | '/accounts/$accountId/'
    | '/courses/$courseId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CoursesIndexRoute: typeof CoursesIndexRoute
  DummyIndexRoute: typeof DummyIndexRoute
  loginSigninIndexRoute: typeof loginSigninIndexRoute
  loginSignupIndexRoute: typeof loginSignupIndexRoute
  AccountsAccountIdIndexRoute: typeof AccountsAccountIdIndexRoute
  CoursesCourseIdIndexRoute: typeof CoursesCourseIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CoursesIndexRoute: CoursesIndexRoute,
  DummyIndexRoute: DummyIndexRoute,
  loginSigninIndexRoute: loginSigninIndexRoute,
  loginSignupIndexRoute: loginSignupIndexRoute,
  AccountsAccountIdIndexRoute: AccountsAccountIdIndexRoute,
  CoursesCourseIdIndexRoute: CoursesCourseIdIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/courses/",
        "/dummy/",
        "/(login)/signin/",
        "/(login)/signup/",
        "/accounts/$accountId/",
        "/courses/$courseId/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/courses/": {
      "filePath": "courses/index.tsx"
    },
    "/dummy/": {
      "filePath": "dummy/index.tsx"
    },
    "/(login)/signin/": {
      "filePath": "(login)/signin/index.tsx"
    },
    "/(login)/signup/": {
      "filePath": "(login)/signup/index.tsx"
    },
    "/accounts/$accountId/": {
      "filePath": "accounts/$accountId/index.tsx"
    },
    "/courses/$courseId/": {
      "filePath": "courses/$courseId/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
