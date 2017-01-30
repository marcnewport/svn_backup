var fs = require('fs');
var path = require('path');
var mv = require('mv');
var exec = require('child_process').exec;
var async = require('async');

var repos = JSON.parse(fs.readFileSync('repos-3.json'));
var RepoCount = repos.length;
var index = 0;

processRepo(repos[index]);

function processRepo(repo) {

    var date = new Date();
    var name = repo.split('/').pop();
    var dumpFile = name +'.dump';
    var compressedFile = dumpFile +'.tar.gz';
    var cmd = 'svnrdump dump '+ repo +' > '+ dumpFile +' && tar -czvf '+ compressedFile +' ./'+ dumpFile;

    console.log("\n", date.toLocaleTimeString());
    console.log('dumping data for', name);

    exec(cmd, function(error, stdout, stderr) {
        if (error !== null) {
            console.log("\n", date.toLocaleTimeString());
            console.log('exec error: ', error);
            process.exit();
        }
        else {
            // Delete the dump file
            fs.unlinkSync(dumpFile);

            console.log("\n", date.toLocaleTimeString());
            console.log('compressed '+ compressedFile);

            var source = path.resolve(__dirname, compressedFile);
            var destination = '\\\\10.0.0.3\\Data\\cloudforge_svn_dumps\\'+ compressedFile;

            mv(source, destination, function(error) {
                if (error) {
                    console.log("\n", date.toLocaleTimeString());
                    console.log('exec error: ', error);
                    process.exit();
                }
                else {
                    index++;

                    var percent = Math.round((index / RepoCount) * 100);

                    console.log("\n", date.toLocaleTimeString());
                    console.log('Moved to fullmoon');
                    console.log(percent +'% complete');

                    if (index < RepoCount) {
                        processRepo(repos[index]);
                    }
                }
            });
        }
    });
}
