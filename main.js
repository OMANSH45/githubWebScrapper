let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");
let url="https://github.com//topics";

let issueObj=require("./issues");

request(url,cb1);
function cb1(err,response,html){
    if(err){
        console.log(err);
    }else if(response.statusCode==404){
        console.log("Page Not Found");
    }else{
        getTopics(html);
    }
}
function getTopics(html){

    let searchTool=cheerio.load(html);
    let topicBox=searchTool(".topic-box a");
    for(let i=0;i<topicBox.length;i++){
        let topics=searchTool(topicBox[i]).attr("href");
        let topicName=searchTool(topicBox[i]).find(".f3").text().trim();

        let fullLink="https://github.com"+topics;
        
        request(fullLink,cb2);
       
    }
}

function cb2(err,response,html){
    if(err){
        console.log(err);
    }else if(response.statusCode==404){
        console.log("Page Not Found");
    }else{
        getRepo(html);
    }
}
function getRepo(html){
    let searchTool=cheerio.load(html);
    let repo=searchTool(".px-3 h3 .text-bold");

    let topicName=searchTool(".h1").text().trim();

    if(repo.length<8){
        for(let i=0;i<repo.length;i++){
            let repoLink=searchTool(repo[i]).attr("href");
            
            let fullLink="https://github.com"+repoLink;
            
            issueObj.ans(fullLink,topicName);
        }
    }else{
        for(let i=0;i<8;i++){
            let repoLink=searchTool(repo[i]).attr("href");
            
            let fullLink="https://github.com"+repoLink;
            
            issueObj.ans(fullLink,topicName);
        }
    }

        
}