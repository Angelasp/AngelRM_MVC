/**
 * @mod switchable
 * @author zhw
 * @param 参数列表
 *     effect:          {String}    切换效果，默认为slide
 *     showNav:         {Boolean}   是否显示切换导航(0,1,2,3,4..)，默认为true
 *     showPage:        {Boolean}   是否显示翻页(next,prev)，默认为true
 *     animateSpeed:    {Number}    动画执行时间，默认为500
 *     interval:        {Number}    帧切换间隔时间，默认为2000
 *     restartDelay:    {Number}    停止后再次播放延迟时间，默认为2000
 *     pauseOnHover:    {Boolean}   鼠标hover时不否停止播放，默认为true
 *     loadImg:         {Boolean}   是否加载延迟图片(<img data-src="..." />)，默认为true
 *     autoPlay:        {Boolean}   是否自动播放
 *     transformFix:    {Boolean}   CSS3切换，目前未实现
 *     switchNavEvent:  {String}    切换导航(0,1,2,3,4..)事件类型，默认为click
 *     switchMainClass: {String}    切换项目Wrap类名，默认为switch_main
 *     switchItemClass: {String}    切换项目类名，默认为switch_item
 *     pageClass:       {String}    翻页Wrap类名，默认为switch_page
 *     pageItemClass:   {String}    翻页项类名，默认为switch_page_item
 *     navClass:        {String}    切换导航(0,1,2,3,4..)Wrap类名，默认为switch_nav
 *     navItemClass:    {String}    切换导航(0,1,2,3,4..)项类名，默认为switch_nav_item
 *     navCurrentClass: {String}    切换导航(0,1,2,3,4..)选中类名，默认为switch_nav_item_current
 *     mixClass:        {String}    切换图片项类名，默认为item，用于图片滚动切换中，未实现真正图片无缝滚动，利用mixClass组合凑整以幻灯形式切换
**/


(function (o) {
    if (typeof define === 'function') {
        define(['jquery'], function () {
            return o;
        })
    } else {
        window.switchable = o;
    }
})(function () {
    var Switchable,
        defaults;
    defaults = {
        type: ''
        , effect: 'slide'
        , showNav: true
        , showPage: true
        , callback: {
            loaded: function () { }
            , start: function () { }
            , complete: function () { }
        }
        , animateSpeed: 500
        , interval: 2000
        , restartDelay: 2000
        , pauseOnHover: true
        , loadImg: true
        , autoPlay: true
        , transformFix: false
        , switchNavEvent: 'click'
        , switchMainClass: 'switch_main'
        , switchItemClass: 'switch_item'
        , pageClass: 'switch_page'
        , pageItemClass: 'switch_page_item'
        , navClass: 'switch_nav'
        , navItemClass: 'switch_nav_item'
        , navCurrentClass: 'switch_nav_item_current'
        , mixClass: 'item'

    };
    Switchable = function (opts) {
        return new Switchable.fn.init(opts);
    }
    Switchable.fn = Switchable.prototype = {
        init: function (opts) {
            var _this = this,
                opts = this.opts = $.extend(true, {}, defaults, opts),
                $element = this.$element = opts.$element;
            if (this.opts.type == 'imgScroll') {
                this.scrollMix();
            }
            this.items = $element.find('.' + opts.switchItemClass);
            this.total = this.items.length;
            this.buildHtml();
            //this.transformFix = this.getTransformFix();
            this.width = $element.width();
            this.current = 0;

            this.bindEvent();
        }

        //´´½¨»ù±¾µÄhtml
        , buildHtml: function () {
            var html = '';
            if (this.opts.showNav) {
                for (var i = 0; i < this.total; i++) {
                    html += '<a class="' + this.opts.navItemClass + '" href="javascript:;">' + (i + 1) + '</a>';
                }
                html = '<div class="' + this.opts.navClass + '">' + html + '</div>';
                this.opts.$element.append(html);
            }

            if (this.opts.showPage) {
                this.opts.$element.append('<div class="' + this.opts.pageClass + '">\
		                            <a href="javascript:;" class="prev"></a><a href="javascript:;" class="next"></a>\
	                            </div>');
            }
            this.nav = this.opts.$element.find('.' + this.opts.navItemClass);
            this.main = this.opts.$element.find('.' + this.opts.switchMainClass);
            this.effectInit();
            this.opts.callback.loaded();
        }

        //¸÷ÖÖÐ§¹û³õÊ¼»¯
        , effectInit: function () {
            var _this = this;
            if (this.opts.loadImg) {
                this.items.eq(0).find('img').attr('src', function () {
                    return $(this).attr('data-src');
                });
            }
            this.items.eq(0).show();
            this.nav.eq(0).addClass(this.opts.navCurrentClass);
            if (this.opts.autoPlay) {
                this.play();
            }

        }

        //°ó¶¨ÊÂ¼þ
        , bindEvent: function () {
            var _this = this;
            if (this.opts.showNav) {
                this.opts.$element.on(this.opts.switchNavEvent, '.' + this.opts.navItemClass, function () {
                    _this.moveTo($(this).index());
                });
            }
            if (this.opts.showPage) {
                this.opts.$element.on('click', '.' + this.opts.pageClass + ' .next', function () {
                    _this.next();
                });
                this.opts.$element.on('click', '.' + this.opts.pageClass + ' .prev', function () {
                    _this.prev();
                });
            }
            if (this.opts.pauseOnHover) {
                this.opts.$element.on('mouseenter', function () {
                    _this.stop();
                }).on('mouseleave', function () {
                    if (_this.opts.restartDelay) {
                        _this.restartDelay = setTimeout(function () {
                            _this.play();
                        }, _this.opts.restartDelay);
                    } else {
                        _this.play();
                    }
                });
            }
        }

        //ÒÆÖÁÄ³Ò»Ö¡
        , moveTo: function (n) {
            this.slide(n);
        }

        //²¥·Åinterval
        , play: function () {
            var _this = this;
            if (!this.playInterval) {
                this.playInterval = setInterval(function () {
                    if (_this.opts.effect in _this) {
                        _this[_this.opts.effect]('next');
                    }
                }, this.opts.interval);
            }
        }

        //Í£Ö¹
        , stop: function () {
            if (this.playInterval) {
                clearInterval(this.playInterval);
                this.playInterval = null;
            }
        }

        //slideÇÐ»»ÊµÏÖ
        , slide: function (n) {
            var _this = this,
                $element = this.$element,
                next,
                $next,
                imgs,
                direction;
            if (!this.animating && n != this.current) {
                this.animating = true;
                if (typeof n === 'number') {
                    direction = n > this.current ? -1 : 1;
                } else if (n === 'next') {
                    n = this.current + 1;
                    direction = -1;
                } else if (n === 'prev') {
                    n = this.current - 1;
                    direction = 1;
                }

                n = n >= this.total ? 0 : n;
                n = n === -1 ? this.total - 1 : n;
                $next = this.items.eq(n);
                this.opts.callback.start(n);
                this.nav.removeClass(this.opts.navCurrentClass);
                this.nav.eq(n).addClass(this.opts.navCurrentClass);
                imgs = $next.find('img');
                imgs.each(function () {
                    var e = $(this);
                    if (!e.attr('src')) {
                        e.attr('src', e.attr('data-src'));
                    }
                });


                $next.css({
                    left: -this.width * direction
                }).show();


                this.main.stop(true).animate({
                    left: this.width * direction
                }, this.opts.animateSpeed, function () {
                    _this.main.css({
                        left: 0
                    });
                    $next.css({
                        left: 0
                    });
                    _this.items.eq(_this.current).css({
                        left: 0
                    }).hide();
                    _this.animating = false;
                    _this.current = n;
                    _this.opts.callback.complete(n);
                });

            }
        }

        //fadeÇÐ»»ÊµÏÖ
        , fade: function (n) {
            var _this = this,
                $element = this.$element,
                next,
                $next,
                imgs,
                direction;
            if (!this.animating && n != this.current) {
                this.animating = true;
                if (typeof n === 'number') {
                    direction = n > this.current ? -1 : 1;
                } else if (n === 'next') {
                    n = this.current + 1;
                    direction = -1;
                } else if (n === 'prev') {
                    n = this.current - 1;
                    direction = 1;
                }

                n = n >= this.total ? 0 : n;
                n = n === -1 ? this.total - 1 : n;
                $next = this.items.eq(n);
                this.opts.callback.start(n);
                this.nav.removeClass(this.opts.navCurrentClass);
                this.nav.eq(n).addClass(this.opts.navCurrentClass);

                imgs = $next.find('img');
                imgs.each(function () {
                    var e = $(this);
                    if (!e.attr('src')) {
                        e.attr('src', e.attr('data-src'));
                    }
                });
                $next.css({
                    zIndex: this.total
                });
                this.items.stop().eq(this.current).fadeOut(this.opts.animateSpeed);
                $next.stop().fadeIn(this.opts.animateSpeed, function () {
                    _this.animating = false;
                    _this.current = n;
                    _this.opts.callback.complete(n);
                });
            }
        }

        //Í¼Æ¬¹ö¶¯£¬Î´ÊµÏÖÕæÕýÒâÒåÉÏµÄÎÞ·ì¹ö¶¯£¬Ö»ÊÇ°ü×°×éºÏÁËitemÒÔ»ÃµÆÐÎÊ½ÇÐ»»£¬¼´¹ö¶¯µ¥Î»Ö»ÄÜÒÔ¿ÉÊÓ·¶Î§
        , imgScroll: function () {
            this[_this.opts.effect]('next');
        }

        //Í¼Æ¬¹ö¶¯ÏîÄ¿µÄ×éºÏ
        , scrollMix: function () {
            var _this = this,
                items = this.opts.$element.find('.' + this.opts.mixClass),
                i = 0, e, num, mixNum;
            num = this.opts.$element.width() / items.outerWidth(true);
            num = Math.round(num);
            //¸´ÖÆ´ÕÕû
            mixNum = num - items.length % num;
            if (mixNum !== num) {
                items.filter(':last').after(items.slice(0, mixNum).clone());
                items = this.opts.$element.find('.' + this.opts.mixClass);
            }
            while ((e = items.slice(i, i + num)).length > 0) {
                e.wrapAll('<div class="switch_item" style="width:' + this.opts.$element.width() + 0 + 'px"></div>');//trace Ã»ÓÐ×ö¾«È·µÄ¼ÆËã
                i = i + 5;
            }
        }

        , next: function () {
            this[this.opts.effect]('next');
        }
        , prev: function () {
            this[this.opts.effect]('prev');
        }

        //Î´ÊµÏÖCSS3ÇÐ»»
        , getTransformFix: function () {
            var body, i, style, transition, fix;
            body = document.body || document.documentElement;
            style = body.style;
            transition = "Transition";
            fix = ["Moz", "Webkit", "Khtml", "O", "ms"];
            i = 0;
            while (i < fix.length) {
                if (typeof style[fix[i] + transition] === "string") {
                    return fix[i];
                }
                i++;
            }
            return false;
        }
    };
    Switchable.fn.init.prototype = Switchable.prototype;
    return Switchable;
}());