
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
    

    //绘制秒圈
    svg.append("circle")
        .attr("class","hour")
        .attr("r",2)
        .attr("cx",100)
        .attr("cy",function(){
            return yscale(hour);
        });
    svg.append("circle")
        .attr("class","minute")
        .attr("r",2)
        .attr("cx",200)
        .attr("cy",function(){
            return yscale(minute);
        });
    svg.append("circle")
        .attr("class","second")
        .attr("r",2)
        .attr("cx",300)
        .attr("cy",function(){
            return yscale(second);
        });

    //删除文字
    svg.selectAll(".timeText").remove();
    //添加文字
    var legend= svg.append("g")
        .attr("class","timeText");

    legend.append("text")
        .attr("x",100)
        .attr("y",function(){
            return yscale(hour);
        })
        .text("时:"+hour);
    legend.append("text")
        .attr("x",200)
        .attr("y",function(){
            return yscale(minute);
        })
        .text("分:"+minute);
    legend.append("text")
        .attr("x",300)
        .attr("y",function(){
            return yscale(second);
        })
        .text("秒:"+second);

    svg.selectAll(".lines").remove();
    //绘制点与点之间的连线
    var lines =svg.append("g")
        .attr("class","lines");
    lines.append("line")
        .attr("x1",100)
        .attr("x2",200)
        .attr("y1",yscale(hour))
        .attr("y2",yscale(minute))
        .attr("stroke","black");
    lines.append("line")
        .attr("x1",200)
        .attr("x2",300)
        .attr("y1",yscale(minute))
        .attr("y2",yscale(second))
        .attr("stroke","black");
}
//设置重新绘制的时间间隔
setInterval(DrawNodes, 1000);
