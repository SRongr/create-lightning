const fs = require('fs');
const { writeTemplate } = require('./writeFile');

/**
 * 
 * @param {string} uri 当前用户选择的目录
 * @param {string} filename 用户输入的page名称
 */
const createPage = (uri, filename) => {
    // fs.readdirSync()
    console.log(filename)
    
    const rootDir = String(uri).replace("file://", ""); // 当前右单机的目录
    const createDir = `${rootDir}/${filename}`; // 要成声文件的目录


    if (!fs.existsSync(createDir)) {
        // 不存在
        fs.mkdirSync(`${createDir}`);
    }


    // 创建页面文件
    writeTemplate(createDir, filename, 'state', 'redux', 'ts'); // 创建redux/state
    writeTemplate(createDir, filename, 'thunk', 'redux', 'ts'); // 创建redux/state
    writeTemplate(createDir, filename, 'actions', 'redux', 'ts'); // 创建redux/state
    writeTemplate(createDir, filename, 'page', '', 'tsx');
}

module.exports = createPage;