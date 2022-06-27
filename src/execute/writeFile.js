const fs = require("fs");
const execSync = require("child_process").execSync;
const path = require("path")

execSync(`echo ${__dirname}`)
/**
 * 获取template文件并写入
 * @param {string} rootDir 执行命令根路径
 * @param {string} inputKey 输入内容 ep. sowing,pick
 * @param {string} filekey 复制模版的key
 * @param {string} fileCatalogue 创建文件的目录
 * @param {string} ext 后缀
 */
const writeTemplate = (rootDir, inputKey, filekey, fileCatalogue, ext ) => {
  const source = `${__dirname}/../template/${filekey}.template`;
  let target = `${rootDir}/${filekey}.${ext}`;
  if (fileCatalogue) {
    target = `${rootDir}/${fileCatalogue}/${filekey}.${ext}`;
    // 如果有需要新创建的目录
    if (!fs.existsSync(`${rootDir}/${fileCatalogue}`)) {
      fs.mkdirSync(`${rootDir}/${fileCatalogue}`);
    }
  }

  const fsData = fs.readFileSync(source, 'utf-8'); // 读取文件
  const resultData = fsData.replace("<#C>", inputKey[0].toUpperCase() + inputKey.slice(1)) // 将文件中存在替换符的替换掉
    .replace("<#c>", inputKey)
  fs.writeFileSync(target, resultData, { encoding: "utf-8", flag: "w"});

  console.log(`----生成文件 ${target}`);
}

/**
 * 创建项目的时候使用，把大概的内容整体复制过来。
 * @param {string} {string} 创建文件的路径
 */
const copyDir = (rootDir) => {
  const source = path.join(__dirname, '../template/asset');

  console.log(rootDir, "youmeiyou");
  if (!fs.existsSync(rootDir)) {
    console.log("meiyou");
    fs.mkdirSync(rootDir);
  }

  execSync(`cp -r ${source} ${rootDir}`);
  // console.log(source)
};
// execSync



// copyDir(path.join(__dirname, '../testCopy'));

module.exports = { writeTemplate ,copyDir};