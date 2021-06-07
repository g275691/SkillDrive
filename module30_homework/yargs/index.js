const fs = require('fs.promises');
const chalk = require('chalk');
const makrosComponent = require('./makrosComponent');
const makrosContainer = require('./makrosContainer');
const makrosStoreActions = require('./makrosStore');

//Пример: node yargs/index.js test
require('yargs')
    .command(['value <value>', 'create'], 'Component+scss+container+store'
    , {}
    , (yargs) => {
        try {
            //Components (+scss)
            let yargsValue = yargs.value[0].toUpperCase() + yargs.value.slice(1);
            let folderComponent = `src/components/${yargsValue}`;
            fs.mkdir(folderComponent)
            .then(()=> {
                fs.appendFile(`${folderComponent}/${yargsValue}.js`
                , makrosComponent(yargsValue)) 
            })
            .then(()=> {
                fs.appendFile(`${folderComponent}/${yargsValue}.scss`
                , `.${yargsValue.toLowerCase()}-container {
    display: flex;
}`)
            })

            //Containers
            let folderContainer = `src/containers/${yargsValue}`;
            fs.mkdir(folderContainer)
            .then(()=> {
                fs.appendFile(`${folderContainer}/${yargsValue}.js`
                , makrosContainer(yargsValue)) 
            })

            //Store
            let folderStore = `src/store/${yargsValue}`;
            fs.mkdir(folderStore)
            .then(()=> {
                fs.appendFile(`${folderStore}/defaultState.js`
                , makrosStoreActions("defaultState")) 
                fs.appendFile(`${folderStore}/actions.js`
                , makrosStoreActions("actions")) 
                fs.appendFile(`${folderStore}/reducers.js`
                , makrosStoreActions("reducers", yargsValue)) 
            })

        } catch (err) { console.log(err) }
    }).argv;

        
    // })
    // .command(['value <value>', 'moveit'], 'Component+scss+container+store'
    // , {}
    // , (yargs) => {
    //     try {
    //         console.log(yargs)
    //         fs.rename("test.file","test/test2.file")
    //     } catch (err) { console.log(err) }
    