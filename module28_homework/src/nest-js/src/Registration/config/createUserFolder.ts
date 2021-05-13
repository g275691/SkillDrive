const fs = require('fs'); 
const fsPromises = fs.promises;
const getNewToken = require("../../config/getNewToken");

export const createUserFolder = (userFolder, newUserDto, res) => {
    try {
        fsPromises.mkdir(userFolder)
        .then(()=> {
            fsPromises.mkdir(`${userFolder}/avatar`)
            .then(()=> {
                fsPromises.rename(`uploads/avatar/${newUserDto.imgAvatar}`,`${userFolder}/avatar/${newUserDto.imgAvatar}`)
                .then(()=> {
                    fsPromises.mkdir(`${userFolder}/docs`)
                    let photosDocArray = newUserDto.photosDoc;
                    if(typeof photosDocArray == "string") {
                        photosDocArray = photosDocArray.replace(/[\[\]]/g,"").split(",")
                    }
                    photosDocArray.forEach((el,i) => {
                        fsPromises.rename(`uploads/docs/${el}`,`${userFolder}/docs/${el}`)
                        .catch(err => console.log(err))
                    })
                    fsPromises.mkdir(`${userFolder}/carPhotos`);
                    getNewToken(newUserDto, res);
                })                 
            })
        })
    } catch (err) {
        console.log(err);
    }
}