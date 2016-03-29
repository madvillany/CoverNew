var Slide = function(obj, inherited, back){
    Util.debug("Slide ID: " + obj.id)
    this.properties = obj;
    this.numLoaded = 0;
    this.timeline = new TimelineLite();
    this.timeline.stop();
    this.fgTransitionOut = false;
    this.$el = {};
    this.edge = {};
    this.transitionOut = null;
    this.autoPlay = (inherited) ? inherited.autoPlay : false;
    CoverU.currentSlide = this;
    this.inherited = inherited || {};
    this.nofadebg = (obj.backgrounds && obj.backgrounds.init) ? obj.backgrounds.init.nofade : false;
    this.nofadefg = (obj.backgrounds && obj.backgrounds.foreground && !Util.mobileWidth()) ? obj.backgrounds.foreground.nofade : false;
    this.goingBack = false;
    this.historyChange = false;

    this.headingOffset = 0;
    this.responseOffset = 0;

    if(this.properties.progress)
            CoverU.setProgress(this.properties.progress)


    Util.runDebug(function() {
        //document.location.hash = obj.id;
    });

    if (this.properties.character && !Util.mobileWidth()) {
        var images = this.properties.character.img;
        if (images instanceof Array) {
            Loader.images(this.properties.character.img, this.onLoadImages);
        } else {
            Loader.image(this.properties.character.img, this.onLoad);
        }
    }

    if(inherited) {

        if(inherited.edgeLoop) this.edge.loop = inherited.edgeLoop;

        for(var el in inherited.el) {
            this.$el[el] = inherited.el[el];
        }

        if(inherited.autoPlay && (!this.properties.character || Util.mobileWidth()))
            this.play();
    }
};

Slide.prototype = {
    constructor: Slide,

    play: function() {
        CoverU.updateUI();
        this.initiallyMobile = Util.mobileWidth();
        this.delegateEvents();
        this.showHeading();
        this.showResponses();
        this.showModule();
        this.showForeground();
        this.showBackgrounds();
        this.addContinueDelay();
        this.loadVoiceover();
        this.timeline.play();
        CoverU.setScale();
    },

    isReady: function() {
        return this.numLoaded == 0;
    },

    delegateEvents: function() {
        var self = this;
        function clickOrTap() {
            var buttonId = Util.ctoi($(this).data("id"));
            if(self.animation) {
                self.animation.endOverride = $(this).data("id");
            }

            if(self.edge.foreground && self.properties.backgrounds.foreground.transitionOut) {
                self.edge.foreground.getStage().play($(this).data("id") + "-trans");
                self.fgTransitionOut = true;
            }

            self.transitionTo(buttonId);
        }
        CoverU.$stage.delegate(".responses div", {
            click: clickOrTap,
            tap: clickOrTap,
            mouseover: function() {
                if(self.edge.foreground) {
                    self.edge.foreground.getStage().play($(this).data("id") + "-in");
                }
                if(self.animation) {
                    var buttonId = $(this).data("id");
                    self.animation.playHover(buttonId, "in");
                }
            },
            mouseout: function() {
                if(self.edge.foreground) {
                    self.edge.foreground.getStage().play($(this).data("id") + "-out");
                }
                if(self.animation) {
                    var buttonId = $(this).data("id");
                    self.animation.playHover(buttonId, "out");
                }
            }
        });

        CoverU.$stage.delegate(".next.arrow", {
            click: function() {
                self.transitionTo(0);
            },
            tap:function(){
                self.transitionTo(0);
            },
            touchstart: function(e){e.preventDefault()},
            touchstop: function(e){e.preventDefault()}
        });
        
    },

    removeEvents: function() {
        CoverU.$stage.undelegate(".responses div", "click tap mouseover mouseout");
        CoverU.$stage.undelegate(".next.arrow", "click tap touchstart touchstop");
    },

    loadVoiceover: function() {
        if(this.properties.audio == undefined || !CoverU.project.soundEnabled) return;
        CoverU.$audio.attr("src", "audio/" + this.properties.audio);
        var self = this;
        CoverU.$audio.bind("canplaythrough", self.playVoiceover());

    },

    playVoiceover: function() {
        var self = this;
        //return function() {
            //self.timeline.add(function() {
                CoverU.$audio.get(0).play();
            //}, "-=0.5"); 
        //};
    },

    resetBackgrounds: function() {
        for(var bg in this.edge) {
            this.edge[bg].getStage().stop(0);
        }
    },

    showModule: function() {
        var module = this.properties.module;
        //if(module == undefined || this.initiallyMobile) return false;
        if(module == undefined) return false;

        var moduleObj = $($("#"+module.type).html());
        $(".module-layer")
            .css("display", "block")
            .append(moduleObj);

        this.timeline.to(moduleObj, .5, {opacity:1, x:0}, 0);
        Modules[module.type]();
    },

    showHeading: function() {
        var heading = this.properties.heading;
        if (this.$el.heading || heading == undefined) return false;

        var $el = Util.$new("div")
            .addClass("heading " + heading.style)
            .html(heading.text);

        CoverU.$panel.append($el);
        this.$el.heading = $el;
        this.headingOffset = $el.position().top + $el.height() - ((Util.mobileWidth()) ? 10 : 0);
        var bottomOfHtml = $el.offset().top + $el.outerHeight();
        this.bottomOfHtml = bottomOfHtml;
        this.timeline.to($el, .5, {opacity:1, x:0}, 0.75);


    },  

    showCharacter: function() {
        var character = this.properties.character;
        if (this.$el.character || character == undefined || Util.mobileWidth()) return false;
        
        CoverU.$character.css("left", ((this.properties.characterPos) ? "21%" : ""));

        var self = this;
        this.timeline.to(CoverU.$character, .5, {opacity:1}, 0.75);
        this.timeline.add(function() {
            if(character.animations.init)
                self.animation.play();
        }, 1);
    },

    showBackgrounds: function() {
        var backgrounds = this.properties.backgrounds;
        if (!Util.mobileWidth() && (this.$el.background || backgrounds == undefined)) return false;

        var self = this;
        this.timeline.add(function() {
            if(!self.inherited.nofadebg) CoverU.$edgeLayers.html("");
            for(var type in backgrounds) {
                if(type != "foreground") self.loadBackground(backgrounds[type].id, backgrounds[type].path, type);
            }
        }, .2);
    },

    loadBackground: function(id, path, type){
        var stage;

        var bg = this.properties.backgrounds[type];
        var mobileSettings = this.properties.mobile;
        var isMobile = Util.mobileWidth();
        var scale = (isMobile && mobileSettings && mobileSettings.scale) ? "scale("+(mobileSettings.scale*(1-CoverU.project.scale))+")" : "";

        if(isMobile) {
            var translate = this.getCenterOfEdge();
            CoverU.$edge.css("top", translate + "px");
        } 

        var voffset = "";

        if(isMobile && mobileSettings && mobileSettings.voffset != undefined) 
            voffset = "translateY(" + (mobileSettings.voffset + ((bg.voffset) ? bg.voffset : 0)) + "px)";
        else if (bg.voffset)
            voffset = "translateY(" + bg.voffset + "px)";

        if(id in CoverU.cache) {

            var edge = CoverU.cache[id];
            stage = edge.getStage().ele;
            $(stage).css({opacity: "", transform: ""});
            
            CoverU.$edgeLayers.append(stage).css({
                "transform": (scale + " " + voffset).trim(),
            });

            this.edge[type] = edge;
            if(this.inherited.nofadebg) $(".edge-layers .bg > div:first-child").remove();
            if(type == "init" || type == "loop") {
                edge.getStage().play(0);
                if(type == "init") this.$el.background = edge;
            }
        } else {

            stage = Util.$new("div")
                .attr("id", id)
                .addClass(id + " " + type);
            CoverU.$edgeLayers.append(stage).css({
                "transform": (scale + " " + voffset).trim()
            });

            AdobeEdge.loadComposition("edge/" + path, id, {scaleToFit: "none", centerStage: "none", minW: "0", maxW: "undefined", width: CoverU.project.width+"px", height: CoverU.project.height+"px"}, {"dom":{}}, {"dom":{}});
            this.edge[type] = AdobeEdge.getComposition(id);
            CoverU.cache[id] = this.edge[type];
        }

    },

    showForeground: function() {
        var backgrounds = this.properties.backgrounds;
        if(backgrounds == undefined || backgrounds.foreground == undefined) return;

        var fg = backgrounds.foreground;
        var self = this;

        this.timeline.add(function() {
            self.loadForeground(fg.id, fg.path, "foreground");
        }, .2);
    },

    loadForeground: function(id, path, type) {
        var fg = this.properties.backgrounds.foreground;
        var mobileSettings = this.properties.mobile;//fg.mobile;
        var isMobile = Util.mobileWidth();
        var scale = (isMobile && mobileSettings && mobileSettings.scale) ? "scale("+(mobileSettings.scale*(1-CoverU.project.scale))+")" : "";
        if(isMobile) {
            var translate = this.getCenterOfEdge();
            CoverU.$edge.css("top", translate + "px");
        } 
        
        var voffset = "";
        if(isMobile && mobileSettings && mobileSettings.voffset) 
            voffset = "translateY(" + (mobileSettings.voffset + (fg.voffset ? fg.voffset : 0)) + "px)";
        else if(fg.voffset)
            voffset = "translateY(" + fg.voffset + "px)";

        if(id in CoverU.cache) {
            var edge = CoverU.cache[id];
            stage = edge.getStage().ele;
            $(stage).css({opacity: "", transform: ""});

            CoverU.$edgeFgLayers.append(stage).css({
                "transform": (scale + " " + voffset).trim()
            });

            this.edge.foreground = edge;
            if(this.inherited.nofadefg) $(".edge-layers .fg > div:first-child").remove();
            edge.getStage().play(0);
        } else {
            stage = Util.$new("div")
                    .attr("id", id)
                    .addClass(id + " " + type);

            CoverU.$edgeFgLayers.append(stage).css({
                "transform": (scale + " " + voffset).trim()
            });

            AdobeEdge.loadComposition("edge/" + path, id, {scaleToFit: "none", centerStage: "none", minW: "0", maxW: "undefined", width: CoverU.project.width+"px", height: CoverU.project.height+"px"}, {"dom":{}}, {"dom":{}});
            this.edge[type] = AdobeEdge.getComposition(id);
            CoverU.cache[id] = this.edge[type];
        }
    },

    edgeCompleted: function() {
        var self = CoverU.currentSlide;
        if(self.goingBack) return;
        

        var background = self.$el.background;
        if(background == self.edge.init && self.edge.loop) {
            Util.removeElement(background.getStage().ele);
            self.$el.background = self.edge.loop;
            self.$el.background.getStage().play();
            self.$el.background.getStage().ele.style.visibility = "visible";
        } else if(background != self.edge.init && background != self.edge.loop) {
            var el = background.getStage().ele;
            TweenLite.to(el, .5, {opacity:0, x:0, ease:Cubic.easeIn, onComplete: function() {
                background.getStage().stop();
                Util.removeElement(el);
                self.animationEnded = true;
                self.$el.background = self.edge.init;
                self.continue();
            }});
        }
    },

    addContinueDelay: function() {
        if(this.properties.wait == undefined) return; 
        var self = this;
        var arrow = $(".next.arrow").css("transform", "");
        this.timeline.add(function() {
            arrow.css({
                "display": "block",
                "visibility": "visible"
            }).css("transform", "");
            TweenLite.to(arrow, .5, {x: "0", opacity: 1, ease:Cubic.easeOut});
        }, "+="+self.properties.wait);
    },

    showResponses: function() {
        var responses = this.properties.responses;
        if (this.$el.responses || responses == undefined) return false;

        var style = this.properties.responseStyle;
        var $el = Util.$new("div")
            .addClass("responses " + ((style) ? style : ""))
            .css("top", this.headingOffset + 25 + "px");

        CoverU.$panel.append($el);

        for(var i = 0; i<responses.length; i++){
            var $response = $("<div></div>")
                .data("id", Util.itoc(i))
                .text(responses[i]);
            $el.append($response);
        }
        var bottomOfHtml = $el.position().top + $el.outerHeight();
        this.bottomOfHtml = bottomOfHtml;

        this.timeline.staggerTo($el.find("div"), .5, {visibility: "visible", x:0, opacity: 1, ease:Cubic.easeOut}, .1, "+=0.5");
        this.$el.responses = $el;
    },

    hideHeading: function() {
        var $el = this.$el.heading;
        if ($el == undefined) return;
        this.timeline.to($el, .5, {opacity:0, x:50, ease:Cubic.easeIn, onComplete: function() {
            $el.remove();
        }});
    },

    hideResponses: function() {
        var $el = this.$el.responses;
        if ($el == undefined) return;
        this.timeline.staggerTo($el.find("div"), .5, {x:50, opacity: 0, ease:Cubic.easeIn}, .1, "-=.25", function() {
            $el.remove();
        });
    },

    hideCharacter: function() {
        this.timeline.to(CoverU.$character, .5, {opacity: 0, ease:Cubic.easeIn}, 0);
    },

    hideForeground: function(notAtBeginning) {
        if(this.nofadefg && !this.goingBack && !Util.mobileWidth()) return;

        fg = this.edge.foreground.getStage().ele;

        this.timeline.to(fg, .5, {opacity: 0, x:0, onComplete: function() {
            Util.removeElement(fg);
        }}, (notAtBeginning) ? "+=0" : 0);
    },

    hideBackground: function(id) {
        var el = this.$el.background;
        if (!Util.mobileWidth() && (el == undefined || this.nofadebg)) return;
    
        var buttonId = Util.itoc(id);
        var self = this;

        if(this.edge[buttonId]){
            $(".edge-layers .bg > div:not(."+buttonId+")").remove();
            var edge = this.edge[buttonId];
            this.$el.background = edge;
            edge.getStage().play();
            edge.getStage().ele.style.visibility = "visible";
        } else { 
            try{
                el = el.getStage().ele;
                if(self.edge.init) self.$el.background = self.edge.init;
                this.timeline.to(el, .5, {opacity: 0, x:0, onComplete: function() {
                    Util.removeElement(el);
                }}, .1, 0);
            } catch (e) {}
        }
    },

    hideArrow: function() {
        var arrow = $(".next.arrow");
        this.timeline.to(arrow, .35, {x: "25", opacity: 0,  ease:Cubic.easeIn, onComplete:function() {
            arrow.css({
                display: "none",
                transform: "matrix(1, 0, 0, 1, -25, 0)"
            });
        }});
    },

    hideModule: function() {
        var el = $(".module-layer > div");
        this.timeline.to(el, .35, {x: "+=25", opacity: 0,  ease:Cubic.easeIn, onComplete:function() {
            el.remove();
            $(".module-layer").css("display", "none");
        }});
    },

    goBack: function() {
        if(this.historyChange) return;
        this.historyChange = true;
        this.goingBack = true;
        var back = CoverU.history.back();
        var slideData = CoverU.getSlideData(back.entry);

        var self = this;
        this.end(undefined,{},function() {
            //self.resetBackgrounds();
            if(self.edge.init) self.$el.background = self.edge.init;
            new Slide(slideData, {autoPlay: true, retain: {}});
        });
    },

    goForward: function() {
        if(this.historyChange) return;
        this.historyChange = true;
        var front = CoverU.history.forward();
        var slideData = CoverU.getSlideData(front.entry);

        var self = this;
        this.end(undefined,slideData.retain,function() {
            if(self.edge.init) self.$el.background = self.edge.init;
            new Slide(slideData, self.buildProperties(slideData.retain));
        });
    },

    end: function(id, retainElements, callback) {
        this.removeEvents();

        var retainElements = retainElements || {};

        this.onComplete = (callback) ? callback : function(){};

        this.timeline.stop();
        this.timeline = new TimelineLite();
        this.timeline.stop();
        
        this.hideArrow();  

        if(!("heading" in retainElements))
            this.hideHeading();

        if(!("responses" in retainElements))
            this.hideResponses();

        if(!("character" in retainElements))
            this.hideCharacter();

        if(!("background" in retainElements) || Util.mobileWidth())
            this.hideBackground(id);

        if(this.edge.foreground && (!this.fgTransitionOut || this.goingBack || Util.mobileWidth()))
            this.hideForeground();

        if(this.properties.module)
            this.hideModule();

        var self = this;
        this.timeline.add(function() {
            if(!(Util.itoc(id) in self.edge) && !(self.fgTransitionOut)) {
                self.animationEnded = true;
                self.continue();
            } else if (self.fgTransitionOut) {
                setTimeout(function() {
                    self.hideForeground(true);
                    self.animationEnded = true;
                    self.continue(); 
                }, 1500);
            }
        });

        this.timeline.play();

        Util.debug("Slide removed.");
    },

    buildProperties: function(retain) {
        var properties = {};
        properties.autoPlay = true;
        properties.el = {};
        properties.nofadebg = this.nofadebg;  
        properties.nofadefg = this.nofadefg;
        
        for (var item in retain){
            properties.el[item] = this.$el[item];
            if(item == "background"){
                properties.edgeLoop = this.edge.loop;
            }
        }

        return properties;
    },

    transitionTo: function(id, noRetain, isSlide) {
        Util.debug("Transition ID: " + id);
        try {
            if (!noRetain && !isSlide) {
                var action = this.properties.actions[id];
                var nextSlide = CoverU.getSlideData(action);
                CoverU.history.add(nextSlide.id);
            } else {
                var nextSlide = CoverU.getSlideData(id);
            }
        } catch(e) {
            alert("Not implemented.");
            return false;
        }
        
        if(this.properties.continuousBg) {
            window.play();
        }

        var retain = (noRetain) ? {} : nextSlide.retain || {};

        var self = this;
        this.end(id, retain, function() {
            new Slide(nextSlide, self.buildProperties(retain));
        });

        return true;
    },

    getHeadingMargin: function() {
        return (Util.mobileWidth()) ? "10px" : "50px";
    },

    continue: function(next, properties) {
        var bothComplete = !Util.mobileWidth() && this.properties.character && this.animation.completed && this.animationEnded;
        var animationComplete = (this.properties.character == undefined  || Util.mobileWidth()) && this.animationEnded;
        if(bothComplete || animationComplete) {
            this.onComplete();
        }
    },

    adjustAfterResize: function() {
        var isMobile = Util.mobileWidth();
        var mobileSettings = this.properties.mobile;
        var fg = (this.properties.backgrounds && this.properties.backgrounds.foreground) ? this.properties.backgrounds.foreground : false;      
        var scale = (isMobile && mobileSettings && mobileSettings.scale) ? "scale("+(mobileSettings.scale*(1-CoverU.project.scale))+")" : "";

        if(this.$el.responses != undefined) {
            var r = this.$el.heading;
            this.headingOffset = r.position().top + r.height() - ((isMobile) ? 10 : 0);
            this.$el.responses.css("top", this.headingOffset + 25 + "px");
        }

        if(isMobile) {
            var translate = this.getCenterOfEdge();
            CoverU.$edge.css("top", translate + "px");
        } else { 
            CoverU.$edge.css("top", "0");
        }

        if(this.properties.backgrounds && this.properties.backgrounds.init) {
            var bg = this.properties.backgrounds.init;
            var voffset = "";
            if(isMobile && mobileSettings && mobileSettings.voffset != undefined) 
                voffset = "translateY(" + (mobileSettings.voffset + ((bg.voffset) ? bg.voffset : 0)) + "px)";
            else if (bg.voffset)
                voffset = "translateY(" + bg.voffset + "px)";

            CoverU.$edgeLayers.css({
                "transform": (scale + " " + voffset).trim()
            });
        }


        if(fg) {      
            var voffset = "";
            if(isMobile && mobileSettings && mobileSettings.voffset) 
                voffset = "translateY(" + (mobileSettings.voffset + (fg.voffset ? fg.voffset : 0)) + "px)";
            else if(fg.voffset)
                voffset = "translateY(" + fg.voffset + "px)";

            CoverU.$edgeFgLayers.css({
                "transform": (scale + " " + voffset).trim()
            });
        }
    },


    getCenterOfEdge: function() {
        var bottom = 0;
        if(this.properties.responses) {
            bottom = this.$el.responses.position().top + this.$el.responses.height();
        } else if (this.properties.heading) {
            bottom = this.$el.heading.position().top + this.$el.heading.height();
        }
        this.bottomOfHtml = bottom;
        return this.bottomOfHtml - 3 // + ((window.innerHeight - this.bottomOfHtml + (this.properties.responses) ? 0 : 20) - CoverU.$edge.height()*CoverU.project.scale)/2; 

    }
}