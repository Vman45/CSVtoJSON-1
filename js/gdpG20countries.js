let convert = function (dat) {
	let fs = require('fs');
	let readline = require('readline');
	let path = '../inputdata/datafile.csv';
	let csvarray = [];
	let jsonarray = [];
	let rl;
    if(isNaN(dat)) {
         throw new Error('Not a number');
     }
//	creating readline interface
rl = readline.createInterface({
	//	Creating Readstream instance to read line by line
    input: fs.createReadStream(path)
      });
//	reads a line, coverts into an array and pushes into csvarray
rl.on('line', function(line) {
		let temp = line.replace(/"|\n/g, '');
		temp = temp.split(',');
		csvarray.push(temp);
});
//	closes after filtering raw csvarray into json object
rl.on('close', function() {
		let jsonData;
		//	objkeys = csvarray[0].toString().split(','); // headers of csv
		let objkeys = ['CountryName', 'Area', 'Population2010',
		'Population2011', 'Population2012', 'Population2013',
		'Population2014', 'Population2015', 'GDP2010', 'GDP2011',
		'GDP2012', 'GDP2013', 'GDP2014', 'GDP2015', 'GDPCur2010',
		'GDPCur2011', 'GDPCur2012', 'GDPCur2013', 'GDPCur2014', 'GDPCur2015',
		'PPP2010', 'PPP2011', 'PPP2012', 'PPP2013', 'PPP2014', 'PPP2015'];
		//		creates an array which contains each row into objects
		for (let j = 1; j < csvarray.length; j = j + 1) {
			let tempobj = {};
			//	pairs object keys and values
			let arr = csvarray[j].toString().split(',');
			for (let i = 0; i < objkeys.length; i = i + 1) {
				tempobj[objkeys[i]] = arr[i];
				}
			jsonarray.push(tempobj);
			}
		jsonData = JSON.stringify(jsonarray);
		fs.writeFileSync('../outputdata/GDP1.json', jsonData, 'utf8');
});
console.log("CSV to Json Converted");
   return 'JSON written successfully';
};
module.exports = convert;
