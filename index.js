const emoji = require('node-emoji')
// const inquirer = require('inquirer')
const config = require('./config')
const command = require('./lib_node/command')

// inquirer.prompt([{
//   type: 'confirm',
//   name: 'gitshots',
//   message: 'Do you want to use gitshots?',
//   default: true
// }]).then(function (answers) {
//   if(answers.gitshots){
//     // ensure ~/.gitshots exists
//     command('mkdir -p ~/.gitshots', __dirname, function(err, out) {
//       if(err) console.error(err)
//     });
//   }

const installPackages = function(type){
  console.info('installing '+type, emoji.get('coffee'))
  config[type].map(function(item){
    console.info(type+'install', item);
    command('. lib_sh/echos.sh && . lib_sh/requirers.sh && require_'+type+' ' + item, __dirname, function(err, out) {
      if(err) console.error(emoji.get('fire'), err)
    });
  });
}

installPackages('brew');
installPackages('cask');
installPackages('npm');
installPackages('gem');

console.info('Alright, cleaning up homebrew cache...')
command('brew cleanup > /dev/null 2>&1', __dirname, function(){})
console.info('all clean')

// });
