/* ************************************************ */
/*File Name: 1.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月28日 星期一 02时20分55秒
*/
<script>
/* 跟随鼠标的线 */
!function(){
function n(n,e,t){
return n.getAttribute(e)||t
}
function e(n){
return document.getElementsByTagName(n)
}
function t(){
var t=e("script"),o=t.length,i=t[o-1];
return{l:o,z:n(i,"zIndex",-1),o:n(i,"opacity",.5),c:n(i,"color","178,34,34"),n:n(i,"count",150)}
}
function o(){
a=m.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
c=m.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
}
function i(){
r.clearRect(0,0,a,c);
var n,e,t,o,m,l;
s.forEach(function(i,x){
for(i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>a||i.x<0?-1:1,i.ya*=i.y>c||i.y<0?-1:1,r.fillRect(i.x-.5,i.y-.5,1,1),e=x+1;e<u.length;e++)n=u[e],
null!==n.x&&null!==n.y&&(o=i.x-n.x,m=i.y-n.y,
l=o*o+m*m,l<n.max&&(n===y&&l>=n.max/2&&(i.x-=.03*o,i.y-=.03*m),
t=(n.max-l)/n.max,r.beginPath(),r.lineWidth=t/2,r.strokeStyle="rgba("+d.c+","+(t+.2)+")",r.moveTo(i.x,i.y),r.lineTo(n.x,n.y),r.stroke()))
}),
x(i)
}
var a,c,u,m=document.createElement("canvas"),
d=t(),l="c_n"+d.l,r=m.getContext("2d"),
x=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||
function(n){
window.setTimeout(n,1e3/45)
},
w=Math.random,y={x:null,y:null,max:2e4};m.id=l,m.style.cssText="position:fixed;top:0;left:0;z-index:"+d.z+";opacity:"+d.o,e("body")[0].appendChild(m),o(),window.onresize=o,
window.onmousemove=function(n){
n=n||window.event,y.x=n.clientX,y.y=n.clientY
},
window.onmouseout=function(){
y.x=null,y.y=null
};
for(var s=[],f=0;d.n>f;f++){
var h=w()*a,g=w()*c,v=2*w()-1,p=2*w()-1;s.push({x:h,y:g,xa:v,ya:p,max:6e3})
}
u=s.concat([y]),
setTimeout(function(){i()},100)
}();
</script>

<!--打赏微信支付宝-->
<script type="text/javascript" src="https://files.cnblogs.com/files/eternalnight/%E6%89%93%E8%B5%8F%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98%E5%AE%9D%E6%8F%92%E4%BB%B6.js"></script>
<script>
    new tctip({
        top: '20%',
        button: {
            id: 1,
            type: 'zanzhu',
        },
        list: [
            {
                type: 'alipay',
                qrImg: 'https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_201017210315%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%B6%E4%BB%9825_.bmp' <!--替换成自己的支付宝付款码-->
            }, {
                type: 'wechat',
                qrImg: 'https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_201017210307%E5%BE%AE%E4%BF%A1%E6%94%B6%E4%BB%9820_.bmp' <!--替换成自己的微信付款码-->
            }
        ]
    }).init()</script>

<!-- 底部加了小鱼<・)))><<~ -->
  <div id="jsi-flying-fish-container" class="container"></div>
  <script src='https://blog-static.cnblogs.com/files/elkyo/fish.js'></script>
  <style>
  @media only screen and (max-width: 767px){
  #sidebar_search_box input[type=text]{width:calc(100% - 24px)}
  }
  </style>

<!--点击冒点--> <canvas width="1777" height="841" style="position: fixed; left: 0px; top: 0px; z-index: 2147483647; pointer-events: none;"></canvas><script src="https://blog-static.cnblogs.com/files/elkyo/mouse-click.js"></script>


<!--3D旋转图片-->
<style>
        /*最外层容器样式*/
        .wrap {
            width: 100px;
            height: 100px;
            margin: 150px;
            position: relative;
        }
        /*包裹所有容器样式*/
        .cube {
            width: 50px;
            height: 50px;
            margin: 0 auto;
            transform-style: preserve-3d;
            transform: rotateX(-30deg) rotateY(-80deg);
            animation: rotate linear 20s infinite;
        }
        @-webkit-keyframes rotate {
            from {
                transform: rotateX(0deg) rotateY(0deg);
            }
            to {
                transform: rotateX(360deg) rotateY(360deg);
            }
        }
        .cube div {
            position: absolute;
            width: 200px;
            height: 200px;
            opacity: 0.8;
            transition: all .4s;
        }
        /*定义所有图片样式*/
        .pic {
            width: 200px;
            height: 200px;
        }
        .cube .out_front {
            transform: rotateY(0deg) translateZ(100px);
        }
        .cube .out_back {
            transform: translateZ(-100px) rotateY(180deg);
        }
        .cube .out_left {
            transform: rotateY(-90deg) translateZ(100px);
        }
        .cube .out_right {
            transform: rotateY(90deg) translateZ(100px);
        }
        .cube .out_top {
            transform: rotateX(90deg) translateZ(100px);
        }
        .cube .out_bottom {
            transform: rotateX(-90deg) translateZ(100px);
        }
        /*定义小正方体样式*/
        .cube span {
            display: block;
            width: 100px;
            height: 100px;
            position: absolute;
            top: 50px;
            left: 50px;
        }
        .cube .in_pic {
            width: 100px;
            height: 100px;
        }
        .cube .in_front {
            transform: rotateY(0deg) translateZ(50px);
        }
        .cube .in_back {
            transform: translateZ(-50px) rotateY(180deg);
        }
        .cube .in_left {
            transform: rotateY(-90deg) translateZ(50px);
        }
        .cube .in_right {
            transform: rotateY(90deg) translateZ(50px);
        }
        .cube .in_top {
            transform: rotateX(90deg) translateZ(50px);
        }
        .cube .in_bottom {
            transform: rotateX(-90deg) translateZ(50px);
        }
        /*鼠标移入后样式*/
        .cube:hover .out_front {
            transform: rotateY(0deg) translateZ(200px);
        }
        .cube:hover .out_back {
            transform: translateZ(-200px) rotateY(180deg);
        }
        .cube:hover .out_left {
            transform: rotateY(-90deg) translateZ(200px);
        }
        .cube:hover .out_right {
            transform: rotateY(90deg) translateZ(200px);
        }
        .cube:hover .out_top {
            transform: rotateX(90deg) translateZ(200px);
        }
        .cube:hover .out_bottom {
            transform: rotateX(-90deg) translateZ(200px);
        }
    </style>
<!-- 外层最大容器 -->
<div class="wrap">
<!--包裹所有元素的容器-->
<div class="cube">
<!--前面图片 -->
<div class="out_front">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_20102514180092596.jpg" class="pic">
</div>
<!--后面图片 -->
<div class="out_back">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_20103102055892575.jpg" class="pic">
</div>
<!--左面图片 -->
<div class="out_left">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_20103102055892575.jpg" class="pic">
</div>
<!--右面图片 -->
<div class="out_right">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_2010310204411427787686378.jpg" class="pic">
</div>
<!--上面图片 -->
<div class="out_top">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_2010310204411427787686378.jpg" class="pic">
</div>
<!--下面图片 -->
<div class="out_bottom">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_20102514180092596.jpg" class="pic">
</div>

<!--小正方体 -->
<span class="in_front">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_2010310204411427787686378.jpg" class="in_pic">
</span>
<span class="in_back">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_20103102055192576.jpg" class="in_pic">
</span>
<span class="in_left">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_20102514180092596.jpg" class="in_pic">
</span>
<span class="in_right">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_20103102055192576.jpg" class="in_pic">
</span>
<span class="in_top">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_20103102055192576.jpg" class="in_pic">
</span>
<span class="in_bottom">
<img src="https://images.cnblogs.com/cnblogs_com/eternalnight/1865387/o_20102514180092596.jpg" class="in_pic">
</span>
</div>
</div>

<a href="https://github.com/EternalNight996/" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#FD6C6C; color:#fff; position: absolute; top: 0; border: 0; left: 0; transform: scale(-1, 1);" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
