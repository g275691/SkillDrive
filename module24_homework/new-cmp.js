const fs = require('fs/promises');
const chalk = require('chalk');

require('yargs')
    .option("header", {alias: 'h', type: 'boolean', description: 'Добавить Header'})
    .option("footer", {alias: 'f', type: 'boolean', description: 'Добавить Footer'})
    .option("folder", {alias: 'fld', string: "true", description: 'Допдиректория (только одна новая ветка)'})
    .option("state", {alias: 'st', string: "true", description: 'Добавить state (--st=переменная)'})
    .option("sass", {alias: ["cs","scss"], type: 'boolean', description: 'Добавить одноимённый Sass file'})
    .option("fragm", {alias: 'fr', type: 'boolean', description: 'Обернуть в Fragments'})
    .option("rout", {alias: 'r', type: 'boolean', description: 'Теги для Rout'})

    .command(['component <component>', 'c'], 'Создать реакт-компонент', {}, (yargs) => {

    //Пример: node new-cmp c footer -h -f --st=active --cs --fr -r --fld=test4

/* С первой заглавной буквы */
let Component = yargs.component[0].toUpperCase() + yargs.component.slice(1),
    State = (yargs.state ? yargs.state[0].toUpperCase() + yargs.state.slice(1) : "");
/* Новая папка, если нет указанной */
if(yargs.folder) {
    fs.mkdir(yargs.folder)
    .then(() => console.log(chalk.green(`Создана новая папка - ${yargs.folder}`)))
    .catch(er => {
        er.message.slice(8,27) == "file already exists" ? console.log("Папка уже существует") : console.log(chalk.red(er))
    }) }
fs.appendFile(`./${yargs.folder ? yargs.folder : ""}/${Component}.js`, 
/* Шаблон*/
`import React from 'react';
${yargs.rout ? 
`import {
     Switch,
     Route,
 } from "react-router-dom";
import NotFound from './NotFound'
import Home from './Home'` : ""}
${yargs.header ? 
"import Header from '../global/Header';" : ""}
${yargs.footer? 
"import Footer from '../global/Footer';" : ""}

const ${Component} = () => {
     ${yargs.state ? 
     `let [${yargs.state}, set${State}] = React.useState(false);
     const handleClick = () => {
         set${State}(${yargs.state} = true)
     }` : ""}
     return (
        ${yargs.fragm ? `<Fragment>` : ""}
        ${yargs.header ? `<Header />` : ""}
        ${yargs.rout ? 
        `<Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} /> 
        </Switch>` : ""}
        ${yargs.footer ? `<Footer />` : ""}
        ${yargs.fragm ? `</Fragment>` : ""}
     )
 }
  
export default ${Component};
 `)
 .then (() => {
     console.log(chalk.green(`React ${yargs.component} is created!`));
     /* +sass file */
     if(yargs.sass) fs.appendFile(`./${yargs.folder ? yargs.folder : ""}/${Component}.scss`, "")
    .then (() => console.log(chalk.green(`Sass ${yargs.component} is created!`)))
    .catch(err => console.log(chalk.red("Ошибка с sass-file: " + err)));
})
.catch(err => console.log(chalk.red("Ошибка с компонентом: " + err)))
    })

// 2 команда - просто скинуть шаблон состояния в буфер обмена
.command(['state <state>', 's'], 'Создать шаблон состояния', {}, (yargs) => {
    let State = (yargs.state ? yargs.state[0].toUpperCase() + yargs.state.slice(1) : "");
    require('clipboardy').write(
`let [${yargs.state}, set${State}] = React.useState(false);
const handleClick = () => {
    set${State}(${yargs.state} = true)
}`
).then(() => console.log(`Шаблон для ${yargs.state} скопирован`))
.catch(() => console.log("Ошибка с копированием"));
})
 .argv;

 