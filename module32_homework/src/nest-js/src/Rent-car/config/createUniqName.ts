import * as path from 'path';

export const createUniqName = (file) => {
    let imgCarName = file.originalname.split('.')[0];
    const fileExtName = path.extname(file.originalname);
    const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
    return `${imgCarName}-${randomName}${fileExtName}`;
}

