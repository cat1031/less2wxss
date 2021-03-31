/**
 * @file 小程序编译less
 *
 */

const fs = require('fs');
const path = require('path');
// const less = require('less');
const {exec} = require('child_process');
const globalLessc = '/Users/yujinjiang/.nvm/versions/node/v14.4.0/bin/lessc';

// 编译配置
const COMPILE_CONFIG = {
    SOURCE: 'less',
    TARGET: 'wxss'
};

// 编译目录
const observedDirs = [
    path.join(__dirname, './pages/'),
    path.join(__dirname, './packageA/'),
    path.join(__dirname, './components/'),
];

// 编译监听
observedDirs.forEach(observedDir => {

    // 监听选项
    const watchOptions = {
        persistent: true,
        recursive: true,
        encoding: 'utf-8'
    };

    fs.watch(
        observedDir,
        watchOptions,
        (eventType, filename) => {
            const ext = filename.slice(filename.lastIndexOf('.') + 1);

            const {
                SOURCE,
                TARGET
            } = COMPILE_CONFIG;

            if (ext === SOURCE) {
                const sourcePath = path.join(observedDir, filename);
                const targetPath = sourcePath.slice(0, sourcePath.lastIndexOf('.') + 1) + TARGET;
                exec(`${globalLessc} ${sourcePath} ${targetPath}`);

                // const encodingOption = {
                //     encoding: 'utf-8'
                // };

                // fs.readFile(
                //     sourcePath,
                //     encodingOption,
                //     (e, data) => {
                //         if (e) {
                //             return;
                //         }
                //
                //         less.render(data)
                //             .then(code => {
                //
                //                 fs.writeFile(
                //                     targetPath,
                //                     code.css,
                //                     encodingOption,
                //                     (e) => {
                //                         if (e) {
                //                             console.log(e);
                //                         }
                //                     }
                //                 );
                //             })
                //             .catch(() => {});
                //     }
                // );
            }
        }
    );
});

