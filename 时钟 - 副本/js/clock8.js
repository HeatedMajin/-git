
//生成画布        
var width = 800;
var height = 600;
var svg = d3.select("body").append("svg")
    .attr("width",width)
    .attr("height",height)
    .append("g")
    .attr("transform","translate("+60+","+20+")");

var axisLen3 = 300;
var axisLen60 = 500;

/***生成线性比例尺***/
var xscale = d3.scale.linear()
    .domain([0,3])
    .range([0,axisLen3]);
var yscale = d3.scale.linear()
    .domain([0,60])
    .range([0,axisLen60]);

/*** 创建坐标轴 ***/
//创建横轴
var yAxis = d3.svg.axis()
    .scale(yscale)
    .orient("bottom")
    .ticks(31);            
//创建竖轴
var xAxis = d3.svg.axis()
    .scale(xscale)
    .orient("left")
    .tickValues(["0","0","0","0"]);

/*** 添加坐标轴 ***/
//添加横轴
svg.append("g")
    .attr("transform","translate(0,"+axisLen3+")")
    .attr("class","axis")
    .call(yAxis);
//添加竖轴
svg.append("g")
    .attr("class","axis")
    .call(xAxis);

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

    //清除以前画的点，重新绘制
    svg.selectAll(".second").remove();
    svg.selectAll(".minute").remove();
    svg.selectAll(".hour").remove();
    

    var rectWidth = 30;
    //绘制秒柱
    svg.append("rect")
        .attr("class","hour")
        .attr("x",0)
        .attr("y",function(){
            return  0;
        })
        .attr("width",function(){
            return yscale(hour);
        })
        .attr("height",rectWidth);
    svg.append("rect")
        .attr("class","minute")
        .attr("x",0)
        .attr("y",function(d,i){
            return 100;
        })
        .attr("width",function(){
            return  yscale(minute);
        })
        .attr("height",rectWidth);
    svg.append("rect")
        .attr("class","second")
        .attr("x",0)
        .attr("y",function(d,i){
             return 200 ;
        })
        .attr("width",function(){
            return yscale(second);
        })
        .attr("height",rectWidth);


    //删除文字
    svg.selectAll(".timeText").remove();
    //添加文字
    var legend= svg.append("g")
        .attr("class","timeText");

    legend.append("text")
        .attr("x",function(){
            return yscale(hour);
        })
        .attr("y",function(){
            return 0;
        })
        .text("时:"+hour)
        .attr("fill","white");
    legend.append("text")
        .attr("x",function(){
             return yscale(minute);
        })
        .attr("y",function(){
            return 100;
        })
        .text("分:"+minute)
        .attr("fill","white");
    legend.append("text")
        .attr("x",function(){
             return yscale(second);
        })
        .attr("y",function(){
            return 200;
        })
        .text("秒:"+second)
        .attr("fill","white");
}
//设置重新绘制的时间间隔
setInterval(DrawNodes, 1000);

//添加解释性文字
svg.append("text")
    .attr("class","explain")
    .attr("x",10)
    .attr("y",-8)
    .text("使用横向柱状图表示三类数据数值，绿蓝红分别代表：时、分、秒");