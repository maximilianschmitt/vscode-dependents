import * as vscode from "vscode";
import * as path from "path";
import dependents from "dependents";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.findDependents",
    async () => {
      const activeTextEditor = vscode.window.activeTextEditor;
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (!activeTextEditor || !workspaceFolders) {
        return;
      }

      const workspaceRoot = workspaceFolders[0].uri.fsPath;
      const fileName = activeTextEditor.document.fileName;

      interface Dependent {
        fsPath: string;
        label: string;
      }
      const depsPromise = new Promise<Array<Dependent>>((resolve, reject) =>
        dependents(
          {
            filename: fileName,
            directory: workspaceRoot
          },
          (err: any, deps: string[]) => {
            if (err) {
              return reject(err);
            }

            resolve(
              deps.map(dep => ({
                fsPath: dep,
                label: path.relative(fileName, dep)
              }))
            );
          }
        )
      );

      const selectedFile = await vscode.window.showQuickPick(depsPromise);

      if (!selectedFile) {
        return;
      }

      const textDocument = await vscode.workspace.openTextDocument(
        selectedFile.fsPath
      );

      await vscode.window.showTextDocument(textDocument);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
