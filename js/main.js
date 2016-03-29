

window.CoverU = {

    EMAIL_SCRIPT: "mailer.aspx/HelloWorld",

    init: function () {

        this.imgCache = [null, null];
        Loader.json("json/slides.json");

        this.$stage = $(".stage");
        this.$edge = $(".edge-layers");
        this.$edgeLayers = $(".edge-layers .bg");
        this.$edgeFgLayers = $(".edge-layers .fg");
        this.$fgBg = $('.fg, .bg');
        this.$panel = $(".panel");
        this.$progress = $(".header .fill");
        this.$character = $(".character");
        this.$innerMenu = $(".menu ul");
        this.$footer = $(".footer");
        this.$audio = $(".vo");
        this.$toggleSound = $(".tools .audio");
        this.$forward = $(".tools .forward");
        this.$back = $(".tools .back");
        this.setScale();

        if (Util.mobileWidth()) {
            this.disableSound();
        } else {
            this.enableSound();
        }

        Util.debugMode = true;

        this.initializeEvents();

        window.onresize = this.setScale;
    },
    initializeEvents: function () {
        var self = this;
        $(".menu").on("click", function (evt) {
            if (evt.target.tagName == "LI") {
                self.$innerMenu.hide();
                self.$footer.show();
            } else {
                if (self.$footer.css("display") == "block") {
                    self.$footer.hide();
                    self.$innerMenu.show();
                } else {
                    self.$innerMenu.fadeToggle(200);
                }
            }
        });

        this.$toggleSound.click(function () {
            if (self.project.soundEnabled)
                self.disableSound();
            else
                self.enableSound();
        });

        this.$back.on("click tap", function () {
            if (!CoverU.history.atBack())
                CoverU.controls.back();
        }).on("touchstart touchstop", function (e) {
            e.preventDefault();
            //self.$back.animate({opacity: .5}, 250).animate({opacity: 1}, 250);
            self.$back.addClass("tapped");
            setTimeout(function () {
                self.$back.removeClass("tapped");
            }, 250);
        });

        this.$forward.on("click tap", function () {
            if (!CoverU.history.atFront())
                CoverU.controls.forward();
        }).on("touchstart touchstop", function (e) {
            e.preventDefault();
            self.$forward.addClass("tapped");
            setTimeout(function () {
                self.$forward.removeClass("tapped");
            }, 250);
        });

        self.$footer.click(function (evt) {
            if (Util.mobileWidth()) {
                self.$footer.fadeOut(200);
            }
        });


    },
    start: function () {
        this.$stage.css("visibility", "visible");

        AdobeEdge.bootstrapCallback(function (compId) {
            var self = CoverU.currentSlide;
            var backgrounds = self.properties.backgrounds;

            //$(AdobeEdge.getComposition(compId).getStage().ele).css({transform: "translateX(0)"})
            AdobeEdge.getComposition(compId).getStage().stop(0);

            self.numLoaded++;

            AdobeEdge.Symbol.bindTimelineAction(compId, "stage", "Default Timeline", "complete", function (sym, e) {
                self.edgeCompleted();
            });

            if (self.$el.background && self.numLoaded == 1) {
                if (self.edge.foreground) {
                    self.edge.foreground.getStage().play(0);
                    self.edge.foreground.getStage().ele.style.visibility = "visible";
                }
                if (self.inherited.nofadebg && !Util.mobileWidth()) $(".edge-layers .bg > div:first-child").remove();
                if (self.inherited.nofadefg) $(".edge-layers .fg > div:first-child").remove();
                return;
            }

            if (self.numLoaded == _.size(backgrounds)) {
                if (self.edge.init) {
                    self.edge.init.getStage().play(0);
                    self.edge.init.getStage().ele.style.visibility = "visible";
                    self.$el.background = self.edge.init;
                }
                if (self.edge.foreground) {
                    self.edge.foreground.getStage().play(0);
                    self.edge.foreground.getStage().ele.style.visibility = "visible";
                }
                if (self.inherited.nofadebg && !Util.mobileWidth()) $(".edge-layers .bg > div:first-child").remove();
                if (self.inherited.nofadefg) $(".edge-layers .fg > div:first-child").remove();

            }
        });

        var hash = document.location.hash;
        var entryPoint = (hash) ? Number(hash.substr(1)) : 1;
        CoverU.history.add(entryPoint);
        var slideData = this.getSlideData(entryPoint);
        var slide = new Slide(slideData, { autoPlay: true, retain: {} });

    },
    updateUI: function () {
        if (CoverU.history.atFront()) {
            this.$forward.addClass("inactive");
        } else {
            this.$forward.removeClass("inactive");
        }

        if (CoverU.history.atBack()) {
            this.$back.addClass("inactive");
        } else {
            this.$back.removeClass("inactive");
        }
    },
    controls: {
        back: function () {
            CoverU.currentSlide.goBack();
        },
        forward: function () {
            CoverU.currentSlide.goForward();
        }
    },
    getSlideData: function (id) {
        return _.findWhere(this.project.slides, { id: id });
    },
    setProgress: function (val, relative) {
        this.project.progress = (relative) ? this.project.progress + val : val;
        this.$progress.css("width", this.project.progress + "%");
    },
    setScale: function () {
        var scale = window.innerWidth / 1920;
        CoverU.project.scale = scale;

        if (!Util.mobileWidth()) {
            CoverU.$stage.css({
                width: 1920 * scale + "px",
                height: 840 * scale + "px"
            });
            $('.wrapper').css('transform', "scale(" + scale + ")");

            //
            CoverU.$edge.css('transform', "");
            CoverU.$fgBg.css({
                left: "",
                top: ""
            });

            $(".next").css("top", "");

            document.ontouchmove = function () { }
        } else {
            CoverU.$stage.css({
                width: window.innerWidth + "px",
                height: window.innerHeight - 50 + "px"
            });
            $('.wrapper').css('transform', "scale(1)");

            // position 
            CoverU.$edge.css('transform', "scale(" + scale * 1.25 + ")");
            CoverU.$fgBg.css({
                left: -1920 / 2 * (1 - scale) + "px",
                top: (-840 * (1 - scale)) + "px"
            });

            $(".next").css("top", window.innerHeight - 110);

            document.ontouchmove = function (event) {
                var target = $(".calculator-module").find(event.target)[0];
                if (target) {
                    return;
                } else {
                    event.preventDefault();
                }
            }
        }
        if (CoverU.currentSlide) CoverU.currentSlide.adjustAfterResize();
    },
    disableSound: function () {
        this.project.soundEnabled = false;
        this.$toggleSound.addClass("off");
        var element = this.$audio.get(0);
        element.pause();
        element.currentTime = 0;
    },
    enableSound: function () {
        this.project.soundEnabled = true;
        this.$toggleSound.removeClass("off");
    },
    toggleSound: function () {
        if (this.project.soundEnabled)
            this.disableSound();
        else
            this.enableSound();
    },
    project: {
        width: 1920,
        height: 840,
        scale: window.innerWidth / 1920,
        characterFps: 1000 / 24,
        progress: 0,
        soundEnabled: true
    },
    history: {
        depth: 0,
        data: [],
        add: function (entry) {
            if (this.depth == 0) {
                this.data.push(entry);
            } else {
                this.data.splice(this.depth, 1000, entry);
                this.depth = 0;
            }
        },
        forward: function () {
            if (this.depth < 0) {
                this.depth++;
                return {
                    depth: this.depth,
                    entry: this.selectedEntry()
                }
            }
            return null;
        },
        back: function () {
            if (this.data.length - 1 + this.depth > 0) {
                this.depth--;
                return {
                    depth: this.depth,
                    entry: this.selectedEntry()
                }
            }
            return null;
        },
        selectedEntry: function () {
            return this.data[this.data.length + this.depth - 1];
        },
        depthPercentage: function () {
            return Math.abs(this.depth - 1) / this.data.length;
        },
        atBack: function () {
            return Math.abs(this.depth - 1) / this.data.length == 1;
        },
        atFront: function () {
            return this.depth == 0;
        }
    },
    events: {
        onEdgeComplete: function () { }
    },
    cache: {},
    imgCache: {},
    hey: function () { console.log('jrob') }
}

var Loader = {
    json: function (url) {
        $.getJSON(url, "", function (data, status, jq) {
            CoverU.project.slides = data;
            CoverU.start();
        });
    },
    image: function (url, callback) {
        var image = new Image();
        image.src = url;
        $(".preload").append(image);

        image.onload = function (data) { callback(data); };
    },
    images: function (urls, callback) {
        var numLoaded = 0;

        for (var url in urls) {
            var image = new Image();
            image.src = urls[url];
            $(".preload").append(image);
            image.onload = loaded;
        }

        function loaded(data) {
            numLoaded++;
            if (numLoaded == urls.length)
                callback(data);
        }
    },
    complete: function () {
        CoverU.start();
    }
}

var Util = {
    debugMode: false,
    $new: function (el) {
        return $("<" + el + "></" + el + ">");
    },
    ctoi: function (c) {
        return c.charCodeAt() - 97;
    },
    itoc: function (i) {
        return String.fromCharCode(97 + i);
    },
    removeElement: function (element) {
        element.parentNode.removeChild(element);
    },
    debug: function (msg) {
        if (this.debugMode) {
            console.log(msg);
        }
    },
    runDebug: function (callback) {
        if (this.debugMode) {
            callback();
        }
    },
    mobileWidth: function () {
        return window.innerWidth <= 768;
    }
}

var Modules = {
    "email-module": function () {
        if (Util.mobileWidth()) {
            var labels = $(".email-module .label");
            labels.get(0).innerHTML = "Their e-mail";
            labels.get(1).innerHTML = "Your e-mail";
        }

        $(".email-module .message").html(CoverU.currentSlide.properties.module.message);

        $(".email-module #nvmButton").click(function () {
            CoverU.currentSlide.transitionTo(0);
        });

        $(".email-module #sendButton").click(function () {

            var emailData = {
                youremail: $("#youremail").val(),
                theiremail: $("#theiremail").val(),
                message: CoverU.currentSlide.properties.module.path
            }

            if (emailData.theiremail == "") {
                var label = $("#theiremail").prev().css("color", "red");
                setTimeout(function () {
                    label.css("color", "");
                }, 1000);
                return;
            }

            if (emailData.youremail == "") {
                var label = $("#youremail").prev().css("color", "red");
                setTimeout(function () {
                    label.css("color", "");
                }, 1000);
                return;
            }


            $.ajax({
                type: "POST",
                url: "mailer.aspx/SendEmail",
                data: "{'theiremail': '" + emailData.theiremail + "', 'youremail': '" + emailData.youremail + "', 'message': '" + emailData.message + "'}",
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                   
                    if (response.d == 100) {
                        var label = $("#youremail").prev().css("color", "red");
                        setTimeout(function () {
                            label.css("color", "");
                        }, 2000);
                    }
                    else if (response.d == 200) {
                        var label = $("#theiremail").prev().css("color", "red");
                        setTimeout(function () {
                            label.css("color", "");
                        }, 2000);
                    }
                    else if (response.d == 500) {
                        var label = $("#youremail, #theiremail").prev().css("color", "red");
                        setTimeout(function () {
                            label.css("color", "");
                        }, 2000);
                    }

                    else {
                        CoverU.currentSlide.transitionTo(0);
                    }
                }
            });

        });
    },
    "calculator-module": function () {
        if (Util.mobileWidth()) {
            $(".hr .right").text("Other Insurance Options");
        }

        function calculateInputs(type) {
            var result = 0;
            var inputs = $(".calculator-module > div ." + type + " input");
            inputs.each(function (i) {
                var val = parseFloat($(this).val());
                result += (isNaN(val)) ? 0 : val;
            });
            return result;
        }

        function roundTo(num, decimalPoint) {
            var factor = Math.pow(10, decimalPoint);
            num = parseInt(num * factor);
            return num / factor;
        }

        var studentResult = $(".answer.left");
        var otherResult = $(".answer.right");

        $(".input input").keypress(function (e) {
            var regex = /[0-9\.]+/;
            if (!regex.test(String.fromCharCode(e.which))) {
                e.preventDefault();
            };
        });

        $(".button").click(function () {
            var studentValue = calculateInputs("student");
            var otherValue = calculateInputs("other");
            var interpolatedValues = {
                student: parseFloat(studentResult.text().substr(1, 50)),
                other: parseFloat(otherResult.text().substr(1, 50))
            }

            TweenLite.to(interpolatedValues, 2, { student: studentValue, other: otherValue, ease: Power4.easeInOut, onUpdate: function () {
                studentResult.text("$" + interpolatedValues.student.toFixed(2));
                otherResult.text("$" + interpolatedValues.other.toFixed(2));
            }
            });

        });
    }
}

