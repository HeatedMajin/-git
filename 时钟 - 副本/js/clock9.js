
//生成画布        
var width = 1000;
var height = 700;
var svg = d3.select("body").append("svg")
    .attr("width",width)
    .attr("height",height)
    .append("g")
    .attr("transform","translate("+400+","+20+")");



var axisLen = 370;

/***生成线性比例尺***/
//x，z比例尺是从小到大
var xscale = d3.scale.linear()
    .domain([0,60])
    .range([0,axisLen]);
//y比例尺是从大到小
var yscale = d3.scale.linear()
    .domain([24,0])
    .range([0,axisLen]);

/*** 创建坐标轴 ***/
//创建竖轴
var yAxis = d3.svg.axis()
    .scale(yscale)
    .orient("left")
    .tickPadding(8)
    .ticks(25);
//创建x轴
var xAxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom")
    .tickPadding(8)
    .ticks(31);
//创建轴
var zAxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom")
    .tickPadding(8)
    .ticks(31);

/*** 添加坐标轴 ***/
//添加y轴
svg.append("g")
    .attr("class","axis yAxis")
    .call(yAxis);
//添加x轴
svg.append("g")
    .attr("class","axis xAxis")
    .attr("transform","translate(0,"+axisLen+") rotate(30)")
    .call(xAxis);
//添加z轴
svg.append("g")
    .attr("class","axis zAxis")
    .attr("transform","translate(0,"+axisLen+") rotate(150)")
    .call(zAxis);

//添加文字
svg.append("text")
    .attr("transform","translate(0,"+axisLen+")")
    .attr("x",(1.732/2*axisLen))
    .attr("y",(1/2*axisLen-20))
    .text("秒");
svg.append("text")
    .attr("transform","translate(0,"+axisLen+")")
    .attr("x",(-1*1.732/2*axisLen-20))
    .attr("y",(1/2*axisLen-10))
    .text("分");
svg.append("text")
    .text("时");

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
    svg.selectAll(".line").remove();

    //绘制x轴上的点(秒)
    svg.append("circle")
        .attr("transform","translate(0,"+axisLen+")")
        .attr("cx",(1.732/2*xscale(second)))
        .attr("cy",(1/2*xscale(second)))
        .attr("r",2)
        .attr("class","time_circle");
        
    //绘制y轴上的点(分钟)
    svg.append("circle")
        .attr("transform","translate(0,"+axisLen+")")
        .attr("cx",(-1*1.732/2*xscale(minute)))
        .attr("cy",(1/2*xscale(minute)))
        .attr("r",2)
        .attr("class","time_circle");

    //绘制竖轴上的点(小时)
    svg.append("circle")
        .attr("transform","translate(0,"+axisLen+")")
        .attr("cy",-(axisLen - yscale(hour)))
        .attr("r",2)
        .attr("class","time_circle");
    
    //绘制两两之间的连线
    svg.append("line")
        .attr("class","line") 
        .attr("x1",(1.732/2*xscale(second)))
        .attr("y1",(1/2*xscale(second)))
        .attr("x2",(-1*1.732/2*xscale(minute)))
        .attr("y2",(1/2*xscale(minute)))
        .attr("transform","translate(0,"+axisLen+")")
        .attr("stroke","black");

    svg.append("line")
        .attr("class","line") 
        .attr("x1",0)
        .attr("y1",-(axisLen - yscale(hour)))
        .attr("x2",(-1*1.732/2*xscale(minute)))
        .attr("y2",(1/2*xscale(minute)))
        .attr("transform","translate(0,"+axisLen+")")
        .attr("stroke","black");

    svg.append("line")
        .attr("class","line") 
        .attr("x1",0)
        .attr("y1",-(axisLen - yscale(hour)))
        .attr("x2",(1.732/2*xscale(second)))
        .attr("y2",(1/2*xscale(second)))
        .attr("transform","translate(0,"+axisLen+")")
        .attr("stroke","black");
}
//设置重新绘制的时间间隔
setInterval(DrawNodes, 1000);

//添加解释性文字
svg.append("text")
    .attr("class","explain")
    .attr("x",-400)
    .attr("y",80)
    .text("使用星状图表示三类数据数值");