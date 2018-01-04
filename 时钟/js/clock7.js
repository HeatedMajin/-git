//生成画布        
var width = 800;
var height = 600;
var svg = d3.select("body").append("svg")
    .attr("width",width)
    .attr("height",height)
    .append("g")
    .attr("transform","translate("+60+","+30+")");

var axisLen = 500;

/***生成线性比例尺***/
//x，z比例尺是从小到大
var xscale = d3.scale.linear()
    .domain([0,60])
    .range([0,axisLen]);
//y比例尺是从大到小
var yscale = d3.scale.linear()
    .domain([60,0])
    .range([0,axisLen]);

/*** 创建坐标轴 ***/
//创建y轴
var yAxis = d3.svg.axis()
    .scale(yscale)
    .orient("left")
    .tickPadding(8)
    .ticks(31);
//创建x轴
var xAxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom")
    .tickPadding(8)
    .ticks(31);
//创建z轴
var zAxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom")
    .tickPadding(8)
    .ticks(31);

/*** 添加坐标轴 ***/
//添加y轴
svg.append("g")
    .attr("class","axis")
    .attr("transform","translate(0,0)")
    .attr("opacity",".7")
    .call(yAxis);
//添加x轴
svg.append("g")
    .attr("class","axis")
    .attr("transform","translate(0,"+axisLen+")")
    .attr("opacity",".7")
    .call(xAxis);
//添加z轴
svg.append("g")
    .attr("class","axis")
    .attr("transform","translate(0,"+axisLen+") rotate(-45)")
    .attr("opacity",".6")
    .call(zAxis);

//添加文字
svg.append("text")
    .attr("x",axisLen+5)
    .attr("y",axisLen)
    .text("秒");
svg.append("text")
    .attr("x",0)
    .attr("y",-3)
    .text("分钟");
svg.append("text")
    .attr("x",axisLen/1.414+3)
    .attr("y",axisLen-axisLen/1.414-3)
    .text("小时");

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
    svg.selectAll(".time_circle").remove();

    //绘制x轴上的点(秒)
    svg.append("circle")
        .attr("r",4)
        .attr("class","time_circle")
        .attr("transform","translate("+(xscale(second))+","+axisLen+")");
    //绘制y轴上的点(分钟)
    svg.append("circle")
        .attr("r",4)
        .attr("class","time_circle")
        .attr("transform","translate("+0+","+yscale(minute)+")");
    //绘制z轴上的点(小时)
    svg.append("circle")
        .attr("cx",xscale(hour)/1.414)
        .attr("cy",axisLen - xscale(hour)/1.414)
        .attr("r",4)
        .attr("class","time_circle");
    
}
//设置重新绘制的时间间隔
setInterval(DrawNodes, 1000);

//添加解释性文字
svg.append("text")
    .attr("class","explain")
    .attr("x",100)
    .attr("y",-8)
    .text("在三维正交坐标系中表示时间数值，三个轴的意义分别是时分秒");