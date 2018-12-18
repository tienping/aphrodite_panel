# GamiCenter
This project is extended from react-boilerplate [https://www.reactboilerplate.com/]

# Getting Started
1. Clone the repo
2. `npm install` to setup the environment
3. `npm start` to start the instance
4. `npm run build && aws s3 sync build/ s3://gamicenter$` to push update into s3 instance


# Settings
## Table Setting
[Example](https://bitbucket.org/hermo/gamicenter/src/26bd00f897ac/app/utils/globalTableSetting.js?at=devel-base)
> object key will be the table's id

* title `string`
* link `string`
* createButtonWidth `xxpx or xxrem or xx% or xxvw`
* iconClass `string`
* tableWidth `xxpx or xxrem or xx% or xxvw`
* api `string`
* pathToDataRoot `string`
* fields `array of object`
    * key `string`
    * label `string`
    * width `xxpx or xxrem or xx% or xxvw`
    * align `[ left | center | right ]`
    * type `[ string | date | json | boolean | image | boolean | dropdown ]`


## Form Setting
[Example](https://bitbucket.org/hermo/gamicenter/src/26bd00f897ac/app/utils/globalFormSetting.js?at=devel-base)
> object key will be the table's id

* title `string`
* formHeight `xxpx or xxrem or xx% or xxvw`
* fields `array of object`
    * key `string`
    * label `string`
    * type `[ string | date | json | boolean | image | boolean | dropdown ]`
    * placeholder `string`
    * mandatory `[ true | false ]`