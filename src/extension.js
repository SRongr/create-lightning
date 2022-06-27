// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const execute = require("./execute");

const { copyDir } = require("./execute/writeFile")

/**
 * 
 * @param {*} uri 
 */
const run = (uri, input, fn) => {
	let path
	if (uri?.path) {	// 快捷指令会打印 undefined
		path = String(uri.path);
	}
	fn(path, input);
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "create-lightning" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('create-lightning.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from create-lightning!');
	});


	const createPage = vscode.commands.registerCommand('create-lightning.createPage', (uri) => {
		vscode.window.showInputBox({placeHolder: "请输入文件名称"}).then((input) => {
			// execute.createPage(uri, input); // 快捷指令会打印 undefined
			run(uri, input, execute.createPage);
		});
	});

	const createProject = vscode.commands.registerCommand('create-lightning.createProject', (uri) => {
		vscode.window.showInputBox({placeHolder: "请输入项目名称"}).then((input) => {
			// execute.createPage(uri, input); // 快捷指令会打印 undefined
			run(uri, input, execute.createProject);
		});
	});


	context.subscriptions.push(disposable);

	context.subscriptions.push(createPage);
	context.subscriptions.push(createProject);
}

// this method is called when your extension is deactivated
function deactivate() {}
module.exports = {
	activate,
	deactivate
}