// 2.
(function($){
	$.fn.common = function(){
		this.each(function(index){
			var common = new Common(this);
		})
		return this;
	}
})(jQuery)

// 1.
// 객체 확인후 메서드
function commonInit(selector) {
	$(selector).common();	
	// 1. 속성 정하고, 속성을 메서드에 인자 전달
	// 2. 객체 확인후 메서드
	// 메뉴 스타일
	// $(selector).attr("data-nav", nav);

	// 상단 메뉴 활성화
	// $(selector).attr("data-menu", menuId);

}


// 3.
function Common(selector){
	this.$selector = null;
	this._init(selector);
    this._iniEvent();
}
// 4.
Common.prototype._init = function(selector) {
	this.$selector = $(selector);
	
	this._windowPos = $(window).scrollTop();
	
	// 애니메이션 배너
    this._$aniGnb = this.$selector.find('.js-aniGnb');
    this._$aniGnb_top = this._$aniGnb.offset().top;

    // 애니메이션 링크
    this._$aniGnbLink = this.$selector.find('.js-aniGnbLink');

    // 애니메이션 탑
    this._$aniTop = this.$selector.find('.js-aniTop');    

 
    // 애니메이션 알람
    this._$aniNotice = this.$selector.find('.js-aniNotice');
    

	// 1. 속성 정하고, 속성을 메서드에 인자 전달
	// 상단 메뉴 활성화
	// this._selectMenu(this.$selector.attr("data-menu"));


}

// 5.
Common.prototype._iniEvent = function() {
	var objThis = this;
	// 2. 객체 확인후 메서드
	if (objThis.$selector.attr('id') == 'js-page') {

		$(window).on({
			scroll:function(){
                var topVal = $(window).scrollTop();
				// 애니메이션 메뉴
                objThis._aniGnb(topVal + objThis._$aniGnb_top);
                $("[data-gnb-target]").each(function(index){
                    var obj = $("[data-gnb-target]").eq(index);
                    if($(obj).offset().top <= topVal){
                        // 메뉴 활성화
                        objThis._ctrlActive($(objThis._$aniGnbLink),$("[data-gnb]").eq(index));
                    }
                });    
                objThis._ctrlNotice(topVal);         
            }

        });
        // 애니메이션 링크
        $(objThis._$aniGnbLink).on({
            click:function(e){
                console.log('qq')
                event.preventDefault();
                var gnb = $(this).data('gnb');
                var target = $("[data-gnb-target='" + gnb + "']").offset().top;
                // 메뉴 활성화
                objThis._ctrlActive($(objThis._$aniGnbLink),$(this));
                // 애니메이션 링크
                if($(this).hasClass("mobile")){
                    objThis._aniScrollTop(target - 100);
                }else{
                    objThis._aniScrollTop(target);
                }
            }            
        }) 
        // 애니메이션 탑
        $(objThis._$aniTop).on({
            click:function(e){
                event.preventDefault();
                objThis._aniScrollTop(0);
            }            
        })    
	}
	// 상단 메뉴 스타일
	if (this.$selector.attr("data-nav") == "navSub") {
		this._$navTop.removeClass('navMain');
		this._$navTop.removeClass('scrollType');
		this._$navTop.addClass('navSub');
	}


}


// 애니메이션 알람
Common.prototype._ctrlNotice = function(topVal){
    var objThis = this;
    console.log('sss')
    if(topVal == 0){
        objThis._$aniNotice.stop().animate({
            opacity:0
        }, 600,'easeOutQuint')
        objThis._$aniNotice.css({
            display:'none'
        })        
    }else{
        objThis._$aniNotice.stop().animate({
            opacity:1
        }, 600,'easeOutQuint')
        objThis._$aniNotice.css({
            display:'block'
        })
    }

}

// 메뉴 활성화
Common.prototype._ctrlActive = function(wrap, obj){
    wrap.removeClass('active');
    obj.addClass('active');  
}

// 애니메이션 링크
Common.prototype._aniScrollTop = function(val){
    $('html, body').stop().animate({
        scrollTop:val
    }, 600,'easeOutQuint');
}

// 애니메이션 메뉴
Common.prototype._aniGnb = function(topVal) {
	var objThis = this;
	$(objThis._$aniGnb).animate({
        top:topVal+'px'},{queue: false, duration: 600}
    );

}

// 애니메이션 이미지
Common.prototype._aniImage = function(){
    TweenLite.to($("div"), 3, {
        left:300, 
        backgroundColor:"#ccc",
        padding: 50,
        border:"1px solid red",
        borderRadius:20
    });
}


// 스크롤
// Common.prototype._scrollPage = function() {
// 	var objThis = this;
// 	var objTop = $('.objTop').offset().top;
// 	var objTopHeight = $('.objTop').height();
// 	var objTopPos = objTop + objTopHeight;
// 	//console.log(objTopPos);
// 	if ((this._windowPos > objTopPos) && (this._topHeight1 < this._windowPos) ) {
// 		// console.log('목표지점 아래');
// 		// console.log('_topHeight1'+this._topHeight1);
// 		// console.log('_windowPos' +this._windowPos);

// 		// 스크롤 타입 내비
// 		if (objThis._$navTop.hasClass("scrollType")) {
// 			//console.log('스크롤');
// 			// 스크롤 스타일
// 			// objThis._$navTop.addClass('box-shadow-lg');
// 			objThis._$navTop.addClass('navSub');
// 			objThis._$navTop.removeClass('navMain');
// 			objThis._$navTop.stop().ani({
// 				'top':'0px',
// 				'position':'absolute',
// 				'left':'0px'
// 			},300,'easeInOutCubic')
// 		}
// 		// 위로 버튼
// 		objThis._$btnTop.stop().ani({
// 			'opacity':'1'
// 		})
// 	}
// 	else if( (this._topHeight1 < this._windowPos) &&  (this._windowPos < objTopPos) ) {
// 		// console.log('네비 아래고 목표지점 위');
// 		//console.log('mid 준비');
// 		// 스크롤 타입 내비
// 		if (objThis._$navTop.hasClass("scrollType")) {
// 			objThis._$navTop.css({
// 				'top':-objThis._$navTopHeight,
// 				'position':'fixed',
// 				'z-index': '77'
// 			});
// 		}
// 	}
// 	else if((this._topHeight1 > this._windowPos)){
// 		// console.log('내비 안');
// 		// 스크롤 타입 내비
// 		if (objThis._$navTop.hasClass("scrollType")) {
// 			// objThis._$navTop.removeClass('box-shadow-lg');
// 			objThis._$navTop.removeClass('navSub');
// 			objThis._$navTop.addClass('navMain');

// 			objThis._$navTop.stop().ani({
// 				'top':this._mainBannerWelcome+'px',
// 				'left':'0px',
// 				'position':'absolute'
// 			},300,'easeInOutCubic')

// 		}
// 		// 위로 버튼
// 		objThis._$btnTop.stop().ani({
// 			'opacity':'0'
// 		})
// 	}

// };



