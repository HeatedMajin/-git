
//生成画布        
var width = 800;
var height = 1000;
var svg = d3.select("body").append("svg")
    .attr("width",width)
    .attr("height",height)
    .append("g")
    .attr("transform","translate("+400+","+400+")");

var dataset = new Array(60);
for(var i=0;i<60;i++){
    dataset[i]=1;
}

var dataset2 = new Array(24);
 for(var i=0;i<24;i++){
    dataset2[i]=1;
}

//饼图布局
var pie =d3.layout.pie();//生成个饼图
var piedata = pie(dataset);//饼图数据
var piedata2 = pie(dataset2);//饼图数据

var outR =400;
var inR = 360;
var inR2 = 320;
var inR3 = 280;


//弧生成器
var arc1 = d3.svg.arc()     //弧生成器
            .innerRadius(inR)//外半径
            .outerRadius(outR) //内半径
            ;
var arc2 = d3.svg.arc()
            .innerRadius(inR2)//外半径
            .outerRadius(inR) //内半径
            ;
var arc3 = d3.svg.arc()
            .innerRadius(inR3)//外半径
            .outerRadius(inR2) //内半径
            ;

var selectSector = d3.svg.arc()
            .innerRadius(outR)//外半径
            .outerRadius(inR3-20) //内半径
            ;

var second_circle= svg.append("g")
    .attr("class","second_circle");
var minute_circle= svg.append("g")
    .attr("class","minute_circle");
var hour_circle= svg.append("g")
    .attr("class","hour_circle");

var select_circle= svg.append("g")
    .attr("class","select_circle");


var gs_second = second_circle.selectAll("g")
    .data(piedata)
    .enter()
    .append("g");
 var gs_minute = minute_circle.selectAll("g")
    .data(piedata)
    .enter()
    .append("g");
 var gs_hour = hour_circle.selectAll("g")
    .data(piedata2)
    .enter()
    .append("g");

var gs_select = select_circle.append("g")
    .attr("id","dddd")
    .data([piedata[0]]);

gs_select.append("path")
    .attr("d",function(d,i){
        return selectSector(d);
    })
    .attr("transform","rotate("+(-1*360/60/2)+")")
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width","4");

   


gs_second.append("path")
    .attr("fill",function(d,i){
        if((i+1)%5==0){
            return "rgb(35,76,110)";    
        }else{
            return "steelblue";
        }
    })
    .attr("d",function(d,i){
        return arc1(d);
    })
    .on("mouseover",function(d,i){  //鼠标移上变黄
        d3.select(this)
            .style("fill","red");
    })
    .on("mouseout",function(d,i){
        d3.select(this)
            .transition()
            .duration(200)
            .style("fill",function(){
                if((i+1)%5==0){
                    return "rgb(35,76,110)";    
                }else{
                    return "steelblue";
                }
            });
    });//鼠标移出变回原色;;
gs_minute.append("path")
    .attr("fill",function(d,i){
        if((i+1)%5==0){
            return "rgb(35,76,110)";    
        }else{
            return "steelblue";
        }
    })
    .attr("d",function(d,i){
        return arc2(d);
    })
    .on("mouseover",function(d,i){  //鼠标移上变黄
        d3.select(this)
            .style("fill","red");
    })
    .on("mouseout",function(d,i){
        d3.select(this)
            .transition()
            .duration(200)
            .style("fill",function(){
                if((i+1)%5==0){
                    return "rgb(35,76,110)";    
                }else{
                    return "steelblue";
                }
            });
    });//鼠标移出变回原色;;
gs_hour.append("path")
    .attr("fill",function(d,i){
        if((i+2)%5==0){
            return "rgb(35,76,110)";    
        }else{
            return "steelblue";
        }
    })
    .attr("d",function(d,i){
        return arc3(d);
    })
    .on("mouseover",function(d,i){  //鼠标移上变黄
        d3.select(this)
            .style("fill","red");
    })
    .on("mouseout",function(d,i){
        d3.select(this)
            .transition()
            .duration(200)
            .style("fill",function(){
                if((i+2)%5==0){
                    return "rgb(35,76,110)";    
                }else{
                    return "steelblue";
                }
            });
    });//鼠标移出变回原色;;


svg.append("text")
    .attr("class","explain")
    .attr("x",-200)
    .text("由内向外依次是：时、分、秒。黑框选出来的是现在的时间。");
//将数字格式化，小于9的前面加0
function FormatTime(hour,minute,second){
    if(hour<10){
        hour = "0"+hour;
    }
    if(minute<10){
        minute= "0"+minute;
    }
    if(second <10){
        second = "0"+second;

    }
    return hour+":"+minute+":"+second;
}

DrawNodes();

function DrawNodes(){

    //获取当前时间
    var nowdate = new Date();
    var hour = nowdate.getHours();
    var minute = nowdate.getMinutes();
    var second = nowdate.getSeconds();


    //得到显示时间的div，设置其上面的 显示文字
    var time = document.getElementById("time");
    time.innerText = FormatTime(hour,minute,second);

    //清除以前画的字，重新绘制        
    svg.selectAll(".tick").remove();

    gs_second.append("text")
        .attr("class","tick")
        .attr("transform",function(d){
            return "translate(" + arc1.centroid(d) + ") rotate("+(-1*(second*360/60+360/60/2))+")";
        })
        .attr("text-anchor","middle")
        .attr("fill","white")
        .text(function(d,i){
            return 59-i;
        });
    gs_minute.append("text")
        .attr("class","tick")
        .attr("transform",function(d){
            return "translate(" + arc2.centroid(d) + ") rotate("+(-1*(minute*360/60+360/60/2))+")";
        })
        .attr("text-anchor","middle")
        .attr("fill","white")
        .text(function(d,i){
            return 59-i;
        });
    gs_hour.append("text")
        .attr("class","tick")
        .attr("transform",function(d){
            // console.log(d);
            return "translate(" + arc3.centroid(d) + ") rotate("+(-1*(hour*360/24+360/24/2))+")";
        })
        .attr("text-anchor","middle")
        .attr("fill","white")
        .text(function(d,i){
            return 23-i;
        });
    //旋转秒圈
    svg.select(".second_circle") 
        .attr("transform",function(d,i){
            return "rotate("+(second*360/60+360/60/2)+")";
        });
     //旋转秒圈
    svg.select(".minute_circle") 
        .attr("transform",function(d,i){
            return "rotate("+(minute*360/60+360/60/2)+")";
        });
     //旋转秒圈
    svg.select(".hour_circle") 
        .attr("transform",function(d,i){
            return "rotate("+(hour*360/24+360/24/2)+")";
        });

  
}
//设置重新绘制的时间间隔
setInterval(DrawNodes, 1000);
