(function($) {
    var simpleSlider = function(element, options) {
        var settings = $.extend({}, $.fn.simpleSlider.defaults, options);
        var slider = $(element);
        var slides = slider.children(),
            current = 0,
            slideshow = {width:0, height:0},
            timeOut = null,
            firstRun = true;

        var currentSlide = null,
            nextIndex   = 0,
            nextSlide = null;


        // Calculate the image width and height.
        width=slider.width();

        imgs = slider.find('img');
        imgs.each(function() {
            img = $(this);
            img.attr('width', width);
        });

        nextButton = '#'+settings.directtionNavElement+' .'+settings.nextClass;
        prevButton = '#'+settings.directtionNavElement+' .'+settings.prevClass;

        $(nextButton).click(function(e, simulated) {
            currentSlide = slides.eq(current);
            nextIndex = current >= slides.length-1 ? 0 : current+1;
            nextSlide = slides.eq(nextIndex);
            current=nextIndex;
            nextSlide.addClass('slideActive').show();
            currentSlide.removeClass('slideActive').hide();

            if (!simulated) {
                if (settings.pauseOnNav) {
                    clearTimeout(timeOut);
                }
            }
        });

        $(prevButton).click(function(e, simulated) {
            currentSlide = slides.eq(current);
            nextIndex = current <= 0 ? slides.length-1 : current-1;
            nextSlide = slides.eq(nextIndex);
            current=nextIndex;
            nextSlide.addClass('slideActive').show();
            currentSlide.removeClass('slideActive').hide();

            if (!simulated) {
                if (settings.pauseOnNav) {
                    clearTimeout(timeOut);
                }
            }
        });

        if (!settings.manualAdvance) {
            (function autoAdvance() {
                if (!firstRun) {
                    $(nextButton).trigger('click', [true]);
                }
                else {
                    firstRun = false;
                }

                timeOut = setTimeout(autoAdvance, settings.betweenSlideTime);
            })();
        }
    };

    $.fn.simpleSlider = function(options) {
        return this.each(function(key, value){
            var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data('simpleslider')) {
                return element.data('simpleslider');
            }

            // Pass options to plugin constructor
            var simpleslider = new simpleSlider(this, options);
            // Store plugin object in this element's data
            element.data('simpleslider', simpleslider);
        });
    };

    //Default settings
    $.fn.simpleSlider.defaults = {
        betweenSlideTime: 3000,
        directtionNavElement: 'slideshowNavControls',
        nextClass: 'next',
        prevClass: 'prev',
        manualAdvance: false,
        pauseOnNav: true
    };
})(jQuery);
