import {danger, fail} from 'danger'

const currentMrAuthor = danger.gitlab.mr.author.username
const {modified_files, created_files, deleted_files} = danger.git
const allChangedFiles = [...modified_files, ...created_files, ...deleted_files]

const athenaFile = allChangedFiles.find(item => item.indexOf("athena-") > -1)
if (athenaFile !== undefined && currentMrAuthor === "panweiji") {
  fail(`你没有权限提交athena相关的核心代码, 尝试Merge Request方式合并`)
}
