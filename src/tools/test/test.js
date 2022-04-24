const readdirSync = require("fs").readdirSync
const join = require("path").join
// const stat = statSync("./contents/index.yaml")
// const date = new Date(stat.mtime)
// console.log(date.toISOString().split("T")[0])

// console.log(process.argv[2])

function getDirListRecursive(dir, subdir = "") {
    const dirList = readdirSync(join(dir, subdir), {
        withFileTypes: true,
    })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => join(subdir, dirent.name));
    const dirs = [...dirList]
    console.log(dirList)
    dirList.forEach(child => {
        dirs.push(...getDirListRecursive(dir, child))
    })
    return dirs
}

const dirs = getDirListRecursive("./src")
console.log(dirs)