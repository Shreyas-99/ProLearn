This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# ProLearn

## 11-------------------------------------------------------------------------
trigger:
- release-pipeline

pool:
  name: Default

stages:

# ---------- BUILD STAGE ----------
- stage: Build
  displayName: Build Application

  jobs:
  - job: BuildJob

    steps:

    - task: Maven@3
      inputs:
        mavenPomFile: 'AzurePipeline/pom.xml'
        goals: 'clean install'
        publishJUnitResults: true
        testResultsFiles: '**/surefire-reports/TEST-*.xml'

    - task: PublishBuildArtifacts@1
      inputs:
        PathtoPublish: 'AzurePipeline/target'
        ArtifactName: 'app-artifact'

# ---------- DEPLOY STAGE ----------
- stage: Deploy
  displayName: Deploy Application
  dependsOn: Build
  condition: succeeded()

  jobs:
  - job: DeployJob

    steps:

    - task: DownloadBuildArtifacts@0
      displayName: Download Artifact
      inputs:
        buildType: 'current'
        downloadType: 'single'
        artifactName: 'app-artifact'
        downloadPath: '$(System.ArtifactsDirectory)'

    - script: |
        echo "Deploying application..."
        ls $(System.ArtifactsDirectory)
      displayName: Deploy Step

 ##    ---------------------------------------------------------------------------------------------------------------------------------- 

 ## 12-----------------------------------
trigger:
- master

pool:
  name: Default

stages:

# ---------- BUILD STAGE ----------
- stage: Build
  displayName: Build Application

  jobs:
  - job: BuildJob

    steps:

    - task: Maven@3
      inputs:
        mavenPomFile: 'CICD/pom.xml'
        goals: 'clean install'
        publishJUnitResults: true
        testResultsFiles: '**/surefire-reports/TEST-*.xml'

    - task: PublishBuildArtifacts@1
      inputs:
        PathtoPublish: 'CICD/target'
        ArtifactName: 'app-artifact'

# ---------- DEPLOY STAGE ----------
- stage: Deploy
  displayName: Deploy Application
  dependsOn: Build
  condition: succeeded()

  jobs:
  - job: DeployJob

    steps:

    - task: DownloadBuildArtifacts@0
      displayName: Download Artifact
      inputs:
        buildType: 'current'
        downloadType: 'single'
        artifactName: 'app-artifact'
        downloadPath: '$(System.ArtifactsDirectory)'

    - script: |
        echo "Deploying application..."
        cp $(System.ArtifactsDirectory)/app-artifact/*.jar /tmp
      displayName: Deploy Step


      ##-----------------------------------------------------------------------
