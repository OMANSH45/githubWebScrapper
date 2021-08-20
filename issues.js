let fs=require("fs");
let path=require("path");

let request=require("request");
let cheerio=require("cheerio");

function ans(url,topicName,count){
    request(url,cb3);

function cb3(err,response,html){
    if(err){
        console.log(err);
    }else if(response.statusCode==404){
        console.log("Page Not Found");
    }else{
        getIssues(html);
    }
}
function getIssues(html){
    let searchTool=cheerio.load(html);
    let issues=searchTool("#issues-tab");
    
    if(issues.length==0||count>8){
        return;
    }else{
        let fullLink="https://github.com"+searchTool(issues).attr("href");
        request(fullLink,cb4);
    }
}

function cb4(err,response,html){
    if(err){
        console.log(err);
    }else if(response.statusCode==404){
        console.log("Page Not Found");
    }else{
        getFinalLinks(html);
    }
}
function getFinalLinks(html){
    
    let searchTool=cheerio.load(html);
    let repoName=searchTool("h1 strong a").text().trim();
    let allLinks=searchTool(".js-navigation-container .flex-auto>a");
    let arr=[];
    
    for(let i=0;i<allLinks.length;i++){
        let links=searchTool(allLinks[i]).attr("href");
        arr.push(links);
    }
    let topicFolderPath=path.join(process.cwd(),topicName);
    if(fs.existsSync(topicFolderPath)==false){
        fs.mkdirSync(topicFolderPath);
    }
    let repoFilePath=path.join(topicFolderPath,repoName+".json");
    fs.writeFileSync(repoFilePath,JSON.stringify(arr));
}
return count;
}
module.exports={
    ans
}