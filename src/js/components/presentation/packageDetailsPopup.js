import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class PackageDetailsPopUp  extends React.Component {

  constructor(props){
    super(props);
      this.state = {
        playMe: false
      }
  }
  playVideo(){
    this.setState({
      playMe: true
    });
    setTimeout(()=>{
      let myVideo = document.getElementById("packageVideo");
      myVideo.play();
    });

  }

  addClass(el, classNameToAdd){
      el.className += ' ' + classNameToAdd;
  }
  removeClass(el, classNameToRemove){

      var elClass = ' ' + el.className + ' ';
      while(elClass.indexOf(' ' + classNameToRemove + ' ') !== -1){
           elClass = elClass.replace(' ' + classNameToRemove + ' ', '');
      }
      el.className = elClass;
  }


componentDidMount()
{
let inview = this;
if(this.props.selectedPackageProduct){

  let videoPlayButton,
      videoWrapper = document.getElementsByClassName('video-wrapper-pop')[0],
      video = document.getElementsByTagName('video')[0];
      if(video){
        var plyBtn = document.getElementById('svgPlayBtn');


        video.load();
        video.pause();

      }

  let videoMethods = {
          renderVideoPlayButton: function() {
              if (videoWrapper.contains(video)) {
                  this.formatVideoPlayButton();
                  inview.addClass(video, 'has-media-controls-hidden');
                  videoPlayButton = document.getElementsByClassName('video-overlay-play-button')[0]
                  videoPlayButton.addEventListener('click', this.hideVideoPlayButton)
              }
          },

          formatVideoPlayButton: function() {
            let rootPopup = document.getElementsByClassName('actionCenter1')[0];
            if(!rootPopup.contains(plyBtn)){
              videoWrapper.insertAdjacentHTML('beforeend', '\
                  <svg class="video-overlay-play-button" id="svgPlayBtn" viewBox="0 0 200 200" alt="Play video">\
                      <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
                      <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                  </svg>\
              ')
            }else  plyBtn.setAttribute('class','video-overlay-play-button');

          },

          hideVideoPlayButton: function() {
            if(video){
              video.play()
              videoPlayButton.setAttribute('class', 'hidden')
              inview.removeClass(video, 'has-media-controls-hidden')
              video.setAttribute('controls', 'controls')
          }
          }
      }

  videoMethods.renderVideoPlayButton()

}

  let myVideo = document.getElementById("packageVideo");

  if(document.body.contains(myVideo))
  myVideo.pause();

}

  render(){
    let videoClass = "col-wd-12 col-sm-12";
    let mediaClass = "col-md-12";
    let appearanceClass="col-md-4 v--head";
    let appearanceClass1 ="col-md-3 vsub-padding-popup tx--lightgray";
    let appearanceClass2 ="col-md-3 vsub-padding-popup1 vsub-payment-popup tx--lightgray";
    let appearanceClass3 ="col-md-1 vsub-padding-popup2 tx--lightgray";
    let appearanceClass4 ="col-md-3 vsub-padding-popup-termMile tx--lightgray";
    let appearanceClass5 ="col-md-2 vsub-padding-popup-deductible tx--lightgray";
    let curentState = this.props;
    let cnt = 0;
    let curentPackageProduct = this.props.popupData;
    let valueString = '';
if(curentPackageProduct){
  valueString =  curentPackageProduct.term+' / '+curentPackageProduct.miles;
}

    return(
      <div className="packageDetailsPopupWrapper">
        <div className="packageDetailsPopupContainer">
      <div className= {videoClass}>
        <div className="actionCenter1" id="center1">
          <div className="actionBody1">
            <div className="row app-prot">
            {curentPackageProduct &&
              <span>
                <p className={appearanceClass}>{curentPackageProduct.name}</p>
                <span className={appearanceClass1}><span className="tx--font10">Price:</span> <span className="tx--font12 tx--amt">${curentPackageProduct.price ? parseFloat(curentPackageProduct.price).toFixed(2) : '0.00'}</span></span>
                {curentState.inviewPayment &&
                <span className={appearanceClass2}><span className="tx--font10">Payment:</span> <span className="tx--font12 tx--amt">${curentState.inviewPayment.payment_monthly ? parseFloat(curentState.inviewPayment.payment_monthly).toFixed(2) : '0.00'} / mo</span></span>
                }
                { curentPackageProduct.term && curentPackageProduct.miles ?
                  <span className={appearanceClass4}><span className="tx--font10">Term/Mile:</span> <span className="tx--font12 tx--amt">{curentPackageProduct.term+' / '+curentPackageProduct.miles}</span></span>
                  :
                  <span className={appearanceClass4}><span className="tx--font10">Term/Mile:</span> <span className="tx--font12 tx--amt">{'0' + ' / ' + '0'}</span></span>
                }
                {curentPackageProduct.deductible ?
                  <span className={appearanceClass5}><span className="tx--font10">Deductible:</span> <span className="tx--font12 tx--amt">${curentPackageProduct.deductible}</span></span>
                  :
                  <span className={appearanceClass5}><span className="tx--font10">Deductible:</span> <span className="tx--font12 tx--amt">${'0'}</span></span>
                }
                <div className="closePopup"><p className={appearanceClass3}><span className="tx--font10" onClick={this.props.closePopup}>X</span></p></div>
              </span>
            }
            </div>
            <div className="row">
              <div className={mediaClass}>
              {curentPackageProduct &&

                <div className="video-wrapper-pop video-wrapper">
                  {curentPackageProduct.video_url ?
                    <video src={curentPackageProduct.video_url}
                    poster={curentPackageProduct.image_url ? curentPackageProduct.image_url: "http://10.117.0.61:6357/images/roadahead.png"}></video>
                    :
                    <video src= ""
                    controls className="playImg video-responsive" poster={curentPackageProduct.image_url ? curentPackageProduct.image_url: "http://10.117.0.61:6357/images/roadahead.png"}/>
                  }
                </div>

                }

                <div className="pkgSec mg--toppk">
                <span className="prod-details-pkg"><h4>Product Details</h4></span>
                {curentPackageProduct ?
                  <p className="smlFont-prod">{curentPackageProduct.prod_short_desc}</p>
                  :
                  <p className="smlFont-prod">''</p>
                }
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
      </div>
    </div>
    )
  }
}

  function mapStateToProps(state) {
      return {
            defaultPackage: state.defaultPackage,
            selectedPackageProduct: state.selectedPackageProduct,
            inviewPayment: state.inviewPayment,
            dealerProducts: state.dealerProducts

      };
  }

  function matchDispatchToProps(dispatch){
    return {

   };

}
export default connect(mapStateToProps, matchDispatchToProps)(PackageDetailsPopUp);
