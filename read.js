var xlsx = require("node-xlsx");
var fs = require('fs');
var list = xlsx.parse("text.xlsx"); // 需要 转换的excel文件

// 数据处理 方便粘贴复制
console.log('arr',list[0]);
var data = list[0].data;  // 1.读取json数据到变量暂存
var file_name = list[0].name; 

var len = data.length;
var outData_cn = {}; // 中文
// var outData_us = {}; // 英文
for(var i = 0; i < len; i ++){  // 2.数据处理
	var item = data[i];
    var num = item[1].replace(/[^\d]/g, "");
    item[1] = item[1].replace(num, "");
    item[1] = item[1]+num;
    if(outData_cn[item[1]]){
        outData_cn[item[1]].push(item[0]);
    }else{
        outData_cn[item[1]] = [item[0]];

    }
	// outData_us[item[0]] = item[2];
}
var outData = {
	outData_cn,
}

writeFile(file_name,JSON.stringify(outData)); // 输出的json文件  3.数据写入本地json文件
function writeFile(fileName,data)
{  
  fs.writeFile(`${fileName}.json`,data,'utf-8',complete);  // 文件编码格式  utf-8
  function complete(err)
  {
      if(!err)
      {
          console.log("文件生成成功");  // 终端打印这个 表示输出完成
      }   
  } 
}
// var data = list[0].data;  // 1.读取json数据到变量暂存
// var len = data.length;
// var outData_cn = {}; // 中文
// var outData_us = {}; // 英文
// for(var i = 0; i < len; i ++){  // 2.数据处理
// 	var item = data[i];
// 	outData_cn[item[0]] = item[1];
// 	outData_us[item[0]] = item[2];
// }
// var outData = {
// 	cn: outData_cn,
// 	us: outData_us
// }

// writeFile("all.json",JSON.stringify(outData)); // 输出的json文件  3.数据写入本地json文件
// function writeFile(fileName,data)
// {  
//   fs.writeFile(fileName,data,'utf-8',complete);  // 文件编码格式  utf-8
//   function complete(err)
//   {
//       if(!err)
//       {
//           console.log("文件生成成功");  // 终端打印这个 表示输出完成
//       }   
//   } 
// }
