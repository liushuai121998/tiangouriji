import router from '@system.router'
import clipboard from '@system.clipboard'
import prompt from '@system.prompt'
import ad from '@service.ad'
import device from '@system.device'

export default Custom_page({
  // 页面级组件的数据模型，影响传入数据的覆盖机制：private内定义的属性不允许被覆盖
  data: {
    content: '',
    footerAdShow: false,
    footerAd: {},
  },
  async onInit() {
    const deviceInfo = await device.getInfo()
    const brand = deviceInfo.data.brand
    if(brand === 'OPPO') {
      console.log('xxx')
    } else if(brand === 'vivo') {
      // this.insertAd()
      this.queryFooterAd()
    }
  },
  longPress() {
    clipboard.set({
      text: `${this.content}`,
      success () {
        prompt.showToast({
          message: '复制成功'
        })
      }
    })
  },
  hideFooterAd() {
      this.footerAdShow = false
      this.nativeAd && this.nativeAd.destroy()
  },
  queryFooterAd() {
    if(!ad.createNativeAd) {
      return 
    }
    //   原生广告
    this.nativeAd = ad.createNativeAd({
        adUnitId: 'f9beec05c09d4575b689c2c094ef25b7'
    })
    this.nativeAd.load()
    this.nativeAd.onLoad((res) => {
      this.footerAd = res.adList[0]
      // prompt.showToast({
      //   message: this.footerAd
      // })
      this.footerAdShow = true
    })
    // // 上报广告曝光
    // this.nativeAd.reportAdShow({
    //     adId: ""
    // })
    // // 上报广告点击
    // this.nativeAd.reportAdClick({
    //     adId: ""
    // })
  },
  reportAdClick() {
    this.nativeAd && this.nativeAd.reportAdClick({
        adId: this.footerAd.adId
    })
  },
  reportAdShow() {
    this.nativeAd && this.nativeAd.reportAdShow({
        adId: this.footerAd.adId
    })
  },
//   插屏广告
  insertAd() {
    if(ad.createInterstitialAd) {
      this.interstitialAd = ad.createInterstitialAd({
          adUnitId: '6725456cd28d46f18f94bee23e748936'
      })
      this.interstitialAd && this.interstitialAd.onLoad(()=> {
          this.interstitialAd.show();
      })
    }
  },
  onHide() {
    this.interstitialAd && this.interstitialAd.destroy() 
  },
  back() {
    router.back()
  }
})