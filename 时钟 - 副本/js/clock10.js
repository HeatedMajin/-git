
//生成画布        
var width = 1700;
var height = 1000;

//划分半径
var outR_second =200;
var inR_second = 170;
var buR_second = 0;

var outR_minu =200;
var inR_minu = 170;
var buR_minu = 0;

var outR_hour =150;
var inR_hour = 120;
var buR_hour = 0;

var svg = d3.select("body").append("svg")
    .attr("width",width)
    .attr("height",height)
    .append("g")
    .attr("transform","translate("+outR_second+","+outR_second+")");

//存放1-60
var dataset = new Array(60);
for(var i=0;i<60;i++){
    dataset[i]=1;
}

//存放1-24
var dataset2 = new Array(24);
 for(var i=0;i<24;i++){
    dataset2[i]=1;
}

//饼图布局
var pie =d3.layout.pie();//生成个饼图
var piedata = pie(dataset);//饼图数据
var piedata2 = pie(dataset2);//饼图数据


//弧生成器
/** 秒 **/
var arc_second = d3.svg.arc()     //画出秒圈的最外层含有数字的一圈
            .innerRadius(inR_second)//外半径
            .outerRadius(outR_second) //内半径
            ;
var arc_sec_bu = d3.svg.arc()     //画出秒圈里面不含数字的圈
            .innerRadius(buR_second) //内半径
            .outerRadius(inR_second)//外半径
            ;
var selectSec = d3.svg.arc()    //画出秒圈的选择框
            .innerRadius(buR_second)//外半径
            .outerRadius(outR_second) //内半径
            ;
/**  分 **/
var arc_minute = d3.svg.arc()     //画出秒圈的最外层含有数字的一圈
            .innerRadius(inR_minu)//外半径
            .outerRadius(outR_minu) //内半径
            ;
var arc_minu_bu = d3.svg.arc()     //画出秒圈里面不含数字的圈
            .innerRadius(buR_minu) //内半径
            .outerRadius(inR_minu)//外半径
            ;
var selectMinu = d3.svg.arc()    //画出秒圈的选择框
            .innerRadius(buR_minu)//外半径
            .outerRadius(outR_minu) //内半径
            ;

/**  时 **/
var arc_hour = d3.svg.arc()     //画出秒圈的最外层含有数字的一圈
            .innerRadius(inR_hour)//内半径
            .outerRadius(outR_hour) //外半径
            ;
var arc_hour_bu = d3.svg.arc()     //画出秒圈里面不含数字的圈
            .innerRadius(buR_hour) //内半径
            .outerRadius(inR_hour)//外半径
            ;
var selectHour = d3.svg.arc()    //画出秒圈的选择框
            .innerRadius(buR_hour)//外半径
            .outerRadius(outR_hour) //内半径
            ;

var second_circle= svg.append("g")
    .attr("class","second_circle")
    .attr("transform","translate(10,0)");
var minute_circle= svg.append("g")
    .attr("class","minute_circle")
    .attr("transform","translate("+(outR_second*2+10)+",0)");
var hour_circle= svg.append("g")
    .attr("class","hour_circle")
    .attr("transform","translate("+(outR_second*2+outR_minu*2+20)+","+0+")");


/** 秒 **/
var gs_second = second_circle.selectAll("g")    //秒弧 对应一个g
    .data(piedata)
    .enter()
    .append("g");
var gs_sec_select = svg.append("g")         //秒弧的选择
    .data([piedata[0]]);

/** 分 **/
var gs_minu = minute_circle.selectAll("g")    //分弧 对应一个g
    .data(piedata)
    .enter()
    .append("g");
var gs_minu_select = svg.append("g")         //分弧的选择
    .data([piedata[0]]);

/** 时 **/
var gs_hour = hour_circle.selectAll("g")    //时弧 对应一个g
    .data(piedata2)
    .enter()
    .append("g");
var gs_hour_select = svg.append("g")         //时弧的选择
    .data([piedata2[0]]);


/**  画出扇形区域 **/
gs_second.append("path")    //数字的外扇区
    .attr("class","num")
    .attr("fill",function(d,i){
        if((i+1)%5==0){
            return "rgb(35,76,110)";    
        }else{
            return "steelblue";
        }
    })
    .attr("d",function(d,i){
        return arc_second(d);
    })
    .on("mouseover",function(d,i){  //鼠标移上变黄
        d3.select(this)
            .style("fill","red");

    })
    .on("mouseout",function(d,i){
        d3.select(this)
            .transition()
            .duration(300)
            .style("fill",function(){
                if((i+1)%5==0){
                    return "rgb(35,76,110)";    
                }else{
                    return "steelblue";
                }
            });
    });
gs_second.append("path")    //补充的内扇区
    .attr("class","bu")
    .attr("fill",function(d,i){
        if((i+1)%5==0){
            return "rgb(35,76,110)";    
        }else{
            return "steelblue";
        }
    })
    .attr("d",function(d,i){
        return arc_sec_bu(d);
    });
gs_sec_select.append("path")    //选择使用的一个框
    .attr("d",function(d,i){
        return selectSec(d);
    })
    .attr("transform","rotate("+(-1*360/60/2)+")")
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width","4");


/**  画出扇形区域 **/
gs_minu.append("path")    //数字的外扇区
    .attr("class","num")
    .attr("fill",function(d,i){
        if((i+1)%5==0){
            return "rgb(35,76,110)";    
        }else{
            return "steelblue";
        }
    })
    .attr("d",function(d,i){
        return arc_minute(d);
    })
    .on("mouseover",function(d,i){  //鼠标移上变黄
        d3.select(this)
            .style("fill","red");
    })
    .on("mouseout",function(d,i){
        d3.select(this)
            .transition()
            .duration(300)
            .style("fill",function(){
                if((i+1)%5==0){
                    return "rgb(35,76,110)";    
                }else{
                    return "steelblue";
                }
            });
    });
gs_minu.append("path")    //补充的内扇区
    .attr("class","bu")
    .attr("fill",function(d,i){
        if((i+1)%5==0){
            return "rgb(35,76,110)";    
        }else{
            return "steelblue";
        }
    })
    .attr("d",function(d,i){
        return arc_minu_bu(d);
    });
gs_minu_select.append("path")    //选择使用的一个框
    .attr("d",function(d,i){
        return selectMinu(d);
    })
    .attr("transform","translate("+(outR_second+outR_minu)+","+(outR_minu-outR_second)+") rotate("+(-1*360/60/2)+")")
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width","4");



/**  画出扇形区域 **/
gs_hour.append("path")    //数字的外扇区
    .attr("class","num")
    .attr("fill",function(d,i){
        if((i+1)%5==0){
            return "rgb(35,76,110)";    
        }else{
            return "steelblue";
        }
    })
    .attr("d",function(d,i){
        return arc_hour(d);
    })
    .on("mouseover",function(d,i){  //鼠标移上变黄
        d3.select(this)
            .style("fill","red");
    })
    .on("mouseout",function(d,i){
        d3.select(this)
            .transition()
            .duration(300)
            .style("fill",function(){
                if((i+1)%5==0){
                    return "rgb(35,76,110)";    
                }else{
                    return "steelblue";
                }
            });
    });
gs_hour.append("path")    //补充的内扇区
    .attr("class","bu")
    .attr("fill",function(d,i){
        if((i+1)%5==0){
            return "rgb(35,76,110)";    
        }else{
            return "steelblue";
        }
    })
    .attr("d",function(d,i){
        return arc_hour_bu(d);
    });
gs_hour_select.append("path")    //选择使用的一个框
    .attr("d",function(d,i){
        return selectHour(d);
    })
    .attr("transform","translate("+(outR_second*2+outR_minu+outR_hour)+",0) rotate("+(-1*360/24/2)+")")
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width","4");


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


    /** 在秒圈上画出数字 **/
    gs_second.append("text")
        .attr("class","tick")
        .attr("transform",function(d){
            return "translate(" + arc_second.centroid(d) + ") rotate("+(-1*(second*360/60+360/60/2))+")";
        })
        .attr("text-anchor","middle")
        .attr("fill","white")
        .text(function(d,i){
            return 59-i;
        });
    //旋转秒圈
    svg.select(".second_circle") 
        .attr("transform",function(d,i){
            return "rotate("+(second*360/60+360/60/2)+")";
        });

    /** 在分圈上画出数字 **/
    gs_minu.append("text")
        .attr("class","tick")
        .attr("transform",function(d){
            return "translate(" + arc_minute.centroid(d) + ") rotate("+(-1*(minute*360/60+360/60/2))+")";
        })
        .attr("text-anchor","middle")
        .attr("fill","white")
        .text(function(d,i){
            return 59-i;
        });
    //旋转分圈
    svg.select(".minute_circle") 
        .attr("transform",function(d,i){
            return "translate("+(outR_second+outR_minu)+","+(outR_minu-outR_second)+") rotate("+(minute*360/60+360/60/2)+")";
        });
   
   /** 在时圈上画出数字 **/
    gs_hour.append("text")
        .attr("class","tick")
        .attr("transform",function(d){
            return "translate(" + arc_hour.centroid(d) + ") rotate("+(-1*(hour*360/24+360/24/2))+")";
        })
        .attr("text-anchor","middle")
        .attr("fill","white")
        .text(function(d,i){
            // console.log(i);
            return 23-i;
        });
    // 旋转时圈
    svg.select(".hour_circle") 
        .attr("transform",function(d,i){
            return "translate("+(outR_second*2+outR_minu+outR_hour)+",0) rotate("+(hour*360/24+360/24/2)+")";
        });
}
//设置重新绘制的时间间隔
setInterval(DrawNodes, 1000);

//添加解释性文字
svg.append("text")
    .attr("class","explain")
    .attr("x",-100)
    .attr("y",250)
    .text("采用small multipart思想，拆分大转盘。使用三个旋转的盘来表示时间。由左向右依次是秒、分、时。被黑色框选出来的值为当前时间。");