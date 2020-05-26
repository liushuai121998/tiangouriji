import prompt from '@system.prompt';
export default Custom_page({
    data: {
        list: []
    },
    onInit() {
        // this.queryList()
    },
    queryList() {
        const $appDef = this.$app.$def 
        $appDef.storageHandle.get('list').then(d => {
            if(d) {
                try {
                    this.list = JSON.parse(d)
                    prompt.showToast({
                        message: this.list
                    })
                } catch(err) {
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
                this.list.splice(index, 1)
                this.$app.$def.storageHandle.set('list', JSON.stringify(this.list)).then(res => {
                    prompt.showToast({
                        message: '取消收藏成功'
                    })
                })
            },
            cancel: function() {
                console.log('handling cancel')
            },
            fail: function(data, code) {
                console.log(`handling fail, code = ${code}`)
            }
        })
    }
})