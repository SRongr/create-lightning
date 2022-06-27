const fs = require('fs');
const { writeTemplate } = require('./writeFile');
const createPage = require("./createPage");

/**
 * 
 * @param {string} uri 当前用户选择的目录
 * @param {string} projectName 用户输入的page名称
 */
const createProject = (uri, projectName) => {
    // fs.readdirSync()
    console.log(projectName)
    
    const rootDir = String(uri).replace("file://", ""); // 当前右单机的目录
    const createDir = `${rootDir}/${projectName}`; // 要成声文件的目录

    const srcDir = `${rootDir}/${projectName}/src`; // 要成声文件的目录
    if (!fs.existsSync(createDir)) {
        // 不存在
        fs.mkdirSync(`${createDir}`);
    }

    
    if (!fs.existsSync(srcDir)) {
      // 不存在
      fs.mkdirSync(`${srcDir}`);
    }
    // 调用createPage 创建默认page
    createPage(srcDir, 'demoPage')

    // 创建页面文件
    writeTemplate(createDir, projectName, 'package', '', 'json'); // 创建redux/state
}

module.exports = createProject;