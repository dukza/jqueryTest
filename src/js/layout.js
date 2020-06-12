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
function commonInit(selector, nav, menuId, scroll, more) {
	$(selector).common();	

	// 1. 속성 정하고, 속성을 메서드에 인자 전달
	// 2. 객체 확인후 메서드
	// 메뉴 스타일
	$(selector).attr("data-nav", nav);

	// 상단 메뉴 활성화
	$(selector).attr("data-menu", menuId);

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
	
	// 플로팅 배너
	this._$animateBanner = this.$selector.find('.js-animateBanner');

	// 상단 메뉴
	this._$navTop = this.$selector.find('#navTop');

	// 1. 속성 정하고, 속성을 메서드에 인자 전달
	// 상단 메뉴 활성화
	this._selectMenu(this.$selector.attr("data-menu"));


}

// 5.
Common.prototype._iniEvent = function() {
	var objThis = this;
	// 2. 객체 확인후 메서드
	if (objThis.$selector.hasClass("js-common")) {
		$(window).on({
			scroll:function(){
				// 플로팅 배너
				objThis._animateBanner();
				// 스크롤
				if(objThis.$selector.hasClass("js-scroll")){
					objThis._scrollPage();
				}
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

// 상단 메뉴 활성화
Common.prototype._selectMenu = function(menuId) {
	if (menuId === undefined || menuId == null || menuId == "") {
		return;
	}
	$('[data-fss-menu-id]').removeClass('active');
	$('[data-fss-menu-id='+menuId+']').addClass('active');
};

// 플로팅 배너
Common.prototype._animateBanner = function() {
	var objThis = this;
	var topValue = $(window).scrollTop() + 300;
	$(objThis._$animateBanner).animate(
		{top:topValue+'px'},{queue: false, duration: 500}
	);
}


// 스크롤
Common.prototype._scrollPage = function() {
	var objThis = this;
	var objTop = $('.objTop').offset().top;
	var objTopHeight = $('.objTop').height();
	var objTopPos = objTop + objTopHeight;
	//console.log(objTopPos);
	if ((this._windowPos > objTopPos) && (this._topHeight1 < this._windowPos) ) {
		// console.log('목표지점 아래');
		// console.log('_topHeight1'+this._topHeight1);
		// console.log('_windowPos' +this._windowPos);

		// 스크롤 타입 내비
		if (objThis._$navTop.hasClass("scrollType")) {
			//console.log('스크롤');
			// 스크롤 스타일
			// objThis._$navTop.addClass('box-shadow-lg');
			objThis._$navTop.addClass('navSub');
			objThis._$navTop.removeClass('navMain');
			objThis._$navTop.stop().animate({
				'top':'0px',
				'position':'absolute',
				'left':'0px'
			},300,'easeInOutCubic')
		}
		// 위로 버튼
		objThis._$btnTop.stop().animate({
			'opacity':'1'
		})
	}
	else if( (this._topHeight1 < this._windowPos) &&  (this._windowPos < objTopPos) ) {
		// console.log('네비 아래고 목표지점 위');
		//console.log('mid 준비');
		// 스크롤 타입 내비
		if (objThis._$navTop.hasClass("scrollType")) {
			objThis._$navTop.css({
				'top':-objThis._$navTopHeight,
				'position':'fixed',
				'z-index': '77'
			});
		}
	}
	else if((this._topHeight1 > this._windowPos)){
		// console.log('내비 안');
		// 스크롤 타입 내비
		if (objThis._$navTop.hasClass("scrollType")) {
			// objThis._$navTop.removeClass('box-shadow-lg');
			objThis._$navTop.removeClass('navSub');
			objThis._$navTop.addClass('navMain');

			objThis._$navTop.stop().animate({
				'top':this._mainBannerWelcome+'px',
				'left':'0px',
				'position':'absolute'
			},300,'easeInOutCubic')

		}
		// 위로 버튼
		objThis._$btnTop.stop().animate({
			'opacity':'0'
		})
	}

};



