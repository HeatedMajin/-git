
//生成画布        
var width = 800;
var height = 600;
var svg = d3.select("body").append("svg")
    .attr("width",width)
    .attr("height",height)
    .append("g")
    .attr("transform","translate("+60+","+20+")");

var axisLen = 500;

/***生成线性比例尺***/
var xscale = d3.scale.linear()
    .domain([0,3])
    .range([0,300]);
var yscale = d3.scale.linear()
    .domain([60,0])
    .range([0,axisLen]);

/*** 创建坐标轴 ***/
//创建y轴
var yAxis = d3.svg.axis()
    .scale(yscale)
    .orient("left")
    .ticks(31);            
//创建x轴
var xAxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom")
    .tickValues(["1","2","3"]);

/*** 添加坐标轴 ***/
//添加y轴
svg.append("g")
    .attr("class","axis")
    .call(yAxis);
//添加x轴
svg.append("g")
    .attr("class","axis")
    .attr("transform","translate(0,"+axisLen+")")
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
    

    var rectWidth = 50;
    //绘制秒柱
    svg.append("rect")
        .attr("class","hour")
        .attr("x",function(d,i){
            return 100 - rectWidth/2;
        })
        .attr("y",function(){
            return yscale(hour);
        })
        .attr("width",rectWidth)
        .attr("height",function(){
            return axisLen - yscale(hour);
        });
    svg.append("rect")
        .attr("class","minute")
        .attr("x",function(d,i){
            return 200 - rectWidth/2;
        })
        .attr("y",function(){
            return yscale(minute);
        })
        .attr("width",rectWidth)
        .attr("height",function(){
            return axisLen - yscale(minute);
        });
    svg.append("rect")
        .attr("class","second")
        .attr("x",function(d,i){
             return 300 - rectWidth/2;
        })
        .attr("y",function(){
            return yscale(second);
        })
        .attr("width",rectWidth)
        .attr("height",function(){
            return axisLen - yscale(second);
        });


    //删除文字
    svg.selectAll(".timeText").remove();
    //添加文字
    var legend= svg.append("g")
        .attr("class","timeText");

    legend.append("text")
        .attr("x",function(d,i){
             return 100 - rectWidth/2;
        })
        .attr("y",function(){
            return yscale(hour);
        })
        .text("时:"+hour)
        .attr("fill","white");
    legend.append("text")
        .attr("x",function(d,i){
             return 200 - rectWidth/2;
        })
        .attr("y",function(){
            return yscale(minute);
        })
        .text("分:"+minute)
        .attr("fill","white");
    legend.append("text")
        .attr("x",function(d,i){
             return 300 - rectWidth/2;
        })
        .attr("y",function(){
            return yscale(second);
        })
        .text("秒:"+second)
        .attr("fill","white");
}
//设置重新绘制的时间间隔
setInterval(DrawNodes, 1000);
