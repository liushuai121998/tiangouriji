import prompt from '@system.prompt';
import ad from '@service.ad';
import router from '@system.router';
export default Custom_page({
    data: {
        list: [],
        currentIndex: 1,
        visible: false
    },
    onInit() {
        this.createBanner()
        // this.queryList()
        this.$watch('visible', () => {
            // prompt.showToast({
            //     message: this.visible
            // })
            if(this.visible) {
                this.bannerAd && this.bannerAd.show()
            } else {
                this.bannerAd && this.bannerAd.hide()
            }
        })
    },
    queryList() {
        const $appDef = this.$app.$def
        $appDef.storageHandle.get('list').then(d => {
            if(d) {
              try{
                let res = JSON.parse(d)
                this.list = [...res]
              }catch(err) {
                  console.log(err)
              }
            }
          })
    },
    longpress(index) {
        prompt.showDialog({
            title: '提示',
            message: '确定取消收藏嘛？',
            buttons: [
                {
                    text: '确定',
                    color: '#33dd44'
                },
                {
                    text: '取消',
                    color: '#333'
                }
            ],
            success: (data) => {
                if(data.index === 0) {
                    this.list.splice(index, 1)
                    this.$app.$def.storageHandle.set('list', JSON.stringify(this.list)).then(res => {
                        prompt.showToast({
                            message: '取消收藏成功'
                        })
                    })
                }
            },
            cancel: function() {
                console.log('handling cancel')
            },
            fail: function(data, code) {
                console.log(`handling fail, code = ${code}`)
            }
        })
    },
    createBanner() {
        this.bannerAd =  ad.createBannerAd({
            adUnitId: '40fd7b8cc5094f47aa45b52ebe68c07a',
            style:{
                left:0,
                top: 1300,
                width: 750,
                height: 400
            }
        })
        
    },
    toHome() {
        router.replace({
            uri: '/Home'
          })
    }
})