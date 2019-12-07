<template>
    <div class="classifyContainer">
        <div class="item">
            <classifyHeader></classifyHeader>
        </div>
        <div class="imgContent">
            <!-- 通过js一次性就计算好了，分成4个数组，分别渲染，不会出现多余div -->
            <div>
                <shareCard v-for="(item,index) in a" :key="index" :shareMsg="item"></shareCard>
            </div>
            <div>
                <shareCard v-for="(item,index) in b" :key="index" :shareMsg="item"></shareCard>
            </div>
            <div>
                <shareCard v-for="(item,index) in c" :key="index" :shareMsg="item"></shareCard>
            </div>
            <div>
                <shareCard v-for="(item,index) in d" :key="index" :shareMsg="item"></shareCard>
            </div>
        </div>
    </div>
</template>
    
<script>
import classifyHeader from '@/components/classifyHeader.vue'
import shareCard from '@/components/shareCard.vue'
export default {
    data(){
        return {
            classifyList:[
                {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575638444308&di=4956251eb8ee2711c91be2adeb02c7f2&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F49a3be76795ba68eaf64f0c32388f65b5f45cd8210719-EE29Y4_fw658',title:'一'},
                {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575638537242&di=d3c159ce01eb2705dce85415558052d1&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F18%2F02%2F24%2F368222be89701b15c880ad50998ad949.jpg%2521%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue',title:'二'},
                {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575638565953&di=b2506b1889e68f978359537a4e084108&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F45%2F55%2F5939f621cefd3_610.jpg',title:'三'},
                {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576233325&di=69223753b786be3c9f66929461f2d075&imgtype=jpg&er=1&src=http%3A%2F%2Fpic37.nipic.com%2F20131230%2F13298396_115340490111_2.jpg',title:'四'},
                {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575638639756&di=54ce1342ac07cd23182dbda720decd01&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F26%2F20150826175321_PvChS.jpeg',title:'五'},
                {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575690638565&di=4298f333e5780a7371edca2ee69f7e7d&imgtype=0&src=http%3A%2F%2Fdpic.tiankong.com%2Fik%2F69%2FQJ9107541546.jpg',title:'六'},
                {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575690753480&di=d511c1c6ee2222df57b14e460cfd2597&imgtype=0&src=http%3A%2F%2Fpic178.nipic.com%2Ffile%2F20180823%2F27191006_140515366943_2.jpg',title:'七'},
                {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575690881550&di=bf48f6b7ed582ae551ed48386c3b248a&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2F20120224%2FRedocn_2012022400234224.jpg',title:'八'},
                {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575690937839&di=97d971f21a7de3855f9349ba8e1e77c1&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140509%2F240405-14050Z63P149-lp.jpg',title:'九'}

            ],
            a:[],
            b:[],
            c:[],
            d:[]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            let arr = this.classifyList;
            for(let i = 0,len=arr.length;i<len;i++){
                let x = i % 4
                switch(x){
                    case 0:
                        this.a.push(arr[i]);
                        break;
                    case 1:
                        this.b.push(arr[i]);
                    break;
                    case 2:
                        this.c.push(arr[i]);
                    break;
                    case 3:
                        this.d.push(arr[i]);
                    break;
                }
            }
            console.log(this.a,this.b,this.c,this.d)
        }
    },
    components:{
        classifyHeader,
        shareCard
    }
}
</script>
    
<style lang='less' scoped>
    .classifyContainer{
        .item,.imgContent{
            width: 1200px;
            margin: 0 auto;
        }
        .imgContent{
            margin: 30px auto;
            padding: 25px 0;
            background: #ffffff;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
