(() => {
    var z = () => ({
        events: {},
        emit(r, ...t) {
            (this.events[r] || []).forEach(e => e(...t))
        },
        on(r, t) {
            return (this.events[r] = this.events[r] || []).push(t), () => this.events[r] = (this.events[r] || []).filter(e => e !== t)
        }
    });

    function w(r, t, e) {
        return Math.max(r, Math.min(t, e))
    }
    var L = class {
            advance(t) {
                var e;
                if (!this.isRunning) return;
                let s = !1;
                if (this.lerp) this.value = (1 - (o = this.lerp)) * this.value + o * this.to, Math.round(this.value) === this.to && (this.value = this.to, s = !0);
                else {
                    this.currentTime += t;
                    let i = w(0, this.currentTime / this.duration, 1);
                    s = i >= 1;
                    let n = s ? 1 : this.easing(i);
                    this.value = this.from + (this.to - this.from) * n
                }
                var o;
                (e = this.onUpdate) == null || e.call(this, this.value, {
                    completed: s
                }), s && this.stop()
            }
            stop() {
                this.isRunning = !1
            }
            fromTo(t, e, {
                lerp: s = .1,
                duration: o = 1,
                easing: i = l => l,
                onUpdate: n
            }) {
                this.from = this.value = t, this.to = e, this.lerp = s, this.duration = o, this.easing = i, this.currentTime = 0, this.isRunning = !0, this.onUpdate = n
            }
        },
        y = class {
            constructor(t) {
                this.onResize = ([e]) => {
                    if (e) {
                        let {
                            width: s,
                            height: o
                        } = e.contentRect;
                        this.width = s, this.height = o
                    }
                }, this.onWindowResize = () => {
                    this.width = window.innerWidth, this.height = window.innerHeight
                }, this.element = t, t === window ? (window.addEventListener("resize", this.onWindowResize), this.onWindowResize()) : (this.width = this.element.offsetWidth, this.height = this.element.offsetHeight, this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this.element))
            }
            destroy() {
                window.removeEventListener("resize", this.onWindowResize), this.resizeObserver.disconnect()
            }
        },
        T = class {
            constructor(t, {
                wheelMultiplier: e = 1,
                touchMultiplier: s = 2,
                normalizeWheel: o = !1
            }) {
                this.onTouchStart = i => {
                    let {
                        pageX: n,
                        pageY: l
                    } = i.targetTouches ? i.targetTouches[0] : i;
                    this.touchStart.x = n, this.touchStart.y = l
                }, this.onTouchMove = i => {
                    let {
                        pageX: n,
                        pageY: l
                    } = i.targetTouches ? i.targetTouches[0] : i, a = -(n - this.touchStart.x) * this.touchMultiplier, c = -(l - this.touchStart.y) * this.touchMultiplier;
                    this.touchStart.x = n, this.touchStart.y = l, this.emitter.emit("scroll", {
                        type: "touch",
                        deltaX: a,
                        deltaY: c,
                        event: i
                    })
                }, this.onWheel = i => {
                    let {
                        deltaX: n,
                        deltaY: l
                    } = i;
                    this.normalizeWheel && (n = w(-100, n, 100), l = w(-100, l, 100)), n *= this.wheelMultiplier, l *= this.wheelMultiplier, this.emitter.emit("scroll", {
                        type: "wheel",
                        deltaX: n,
                        deltaY: l,
                        event: i
                    })
                }, this.element = t, this.wheelMultiplier = e, this.touchMultiplier = s, this.normalizeWheel = o, this.touchStart = {
                    x: null,
                    y: null
                }, this.emitter = z(), this.element.addEventListener("wheel", this.onWheel, {
                    passive: !1
                }), this.element.addEventListener("touchstart", this.onTouchStart, {
                    passive: !1
                }), this.element.addEventListener("touchmove", this.onTouchMove, {
                    passive: !1
                })
            }
            on(t, e) {
                return this.emitter.on(t, e)
            }
            destroy() {
                this.emitter.events = {}, this.element.removeEventListener("wheel", this.onWheel, {
                    passive: !1
                }), this.element.removeEventListener("touchstart", this.onTouchStart, {
                    passive: !1
                }), this.element.removeEventListener("touchmove", this.onTouchMove, {
                    passive: !1
                })
            }
        },
        E = class {
            constructor({
                direction: t,
                gestureDirection: e,
                mouseMultiplier: s,
                smooth: o,
                wrapper: i = window,
                content: n = document.documentElement,
                smoothWheel: l = o == null || o,
                smoothTouch: a = !1,
                duration: c,
                easing: m = d => Math.min(1, 1.001 - Math.pow(2, -10 * d)),
                lerp: p = c ? null : .1,
                infinite: h = !1,
                orientation: u = t != null ? t : "vertical",
                gestureOrientation: f = e != null ? e : "vertical",
                touchMultiplier: A = 2,
                wheelMultiplier: R = s != null ? s : 1,
                normalizeWheel: _ = !0
            } = {}) {
                this.onVirtualScroll = ({
                    type: d,
                    deltaX: v,
                    deltaY: g,
                    event: S
                }) => {
                    if (S.ctrlKey || this.options.gestureOrientation === "vertical" && g === 0 || this.options.gestureOrientation === "horizontal" && v === 0 || S.composedPath().find(b => b == null || b.hasAttribute == null ? void 0 : b.hasAttribute("data-lenis-prevent"))) return;
                    if (this.isStopped || this.isLocked) return void S.preventDefault();
                    if (this.isSmooth = this.options.smoothTouch && d === "touch" || this.options.smoothWheel && d === "wheel", !this.isSmooth) return this.isScrolling = !1, void this.animate.stop();
                    S.preventDefault();
                    let M = g;
                    this.options.gestureOrientation === "both" ? M = Math.abs(g) > Math.abs(v) ? g : v : this.options.gestureOrientation === "horizontal" && (M = v), this.scrollTo(this.targetScroll + M, {
                        programmatic: !1
                    })
                }, this.onScroll = () => {
                    if (!this.isScrolling) {
                        let d = this.animatedScroll;
                        this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - d), this.emit()
                    }
                }, t && console.warn("Lenis: `direction` option is deprecated, use `orientation` instead"), e && console.warn("Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead"), s && console.warn("Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead"), o && console.warn("Lenis: `smooth` option is deprecated, use `smoothWheel` instead"), window.lenisVersion = "1.0.0-dev.8", i !== document.documentElement && i !== document.body || (i = window), this.options = {
                    wrapper: i,
                    content: n,
                    smoothWheel: l,
                    smoothTouch: a,
                    duration: c,
                    easing: m,
                    lerp: p,
                    infinite: h,
                    gestureOrientation: f,
                    orientation: u,
                    touchMultiplier: A,
                    wheelMultiplier: R,
                    normalizeWheel: _
                }, this.wrapper = new y(i), this.content = new y(n), this.rootElement.classList.add("lenis"), this.velocity = 0, this.isStopped = !1, this.isSmooth = l || a, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, this.animate = new L, this.emitter = z(), this.wrapper.element.addEventListener("scroll", this.onScroll, {
                    passive: !1
                }), this.virtualScroll = new T(i, {
                    touchMultiplier: A,
                    wheelMultiplier: R,
                    normalizeWheel: _
                }), this.virtualScroll.on("scroll", this.onVirtualScroll)
            }
            destroy() {
                this.emitter.events = {}, this.wrapper.element.removeEventListener("scroll", this.onScroll, {
                    passive: !1
                }), this.virtualScroll.destroy()
            }
            on(t, e) {
                return this.emitter.on(t, e)
            }
            off(t, e) {
                var s;
                this.emitter.events[t] = (s = this.emitter.events[t]) == null ? void 0 : s.filter(o => e !== o)
            }
            setScroll(t) {
                this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t
            }
            emit() {
                this.emitter.emit("scroll", this)
            }
            reset() {
                this.isLocked = !1, this.isScrolling = !1, this.velocity = 0
            }
            start() {
                this.isStopped = !1, this.reset()
            }
            stop() {
                this.isStopped = !0, this.animate.stop(), this.reset()
            }
            raf(t) {
                let e = t - (this.time || t);
                this.time = t, this.animate.advance(.001 * e)
            }
            scrollTo(t, {
                offset: e = 0,
                immediate: s = !1,
                lock: o = !1,
                duration: i = this.options.duration,
                easing: n = this.options.easing,
                lerp: l = !i && this.options.lerp,
                onComplete: a,
                force: c = !1,
                programmatic: m = !0
            } = {}) {
                if (!this.isStopped || c) {
                    if (["top", "left", "start"].includes(t)) t = 0;
                    else if (["bottom", "right", "end"].includes(t)) t = this.limit;
                    else {
                        var p;
                        let h;
                        if (typeof t == "string" ? h = document.querySelector(t) : (p = t) != null && p.nodeType && (h = t), h) {
                            if (this.wrapper.element !== window) {
                                let f = this.wrapper.element.getBoundingClientRect();
                                e -= this.isHorizontal ? f.left : f.top
                            }
                            let u = h.getBoundingClientRect();
                            t = (this.isHorizontal ? u.left : u.top) + this.animatedScroll
                        }
                    }
                    if (typeof t == "number") {
                        if (t += e, t = Math.round(t), this.options.infinite ? m && (this.targetScroll = this.animatedScroll = this.scroll) : t = w(0, t, this.limit), s) return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.animate.stop(), this.reset(), this.emit(), void(a == null || a());
                        m || (this.targetScroll = t), this.animate.fromTo(this.animatedScroll, t, {
                            duration: i,
                            easing: n,
                            lerp: l,
                            onUpdate: (h, {
                                completed: u
                            }) => {
                                o && (this.isLocked = !0), this.isScrolling = !0, this.velocity = h - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = h, this.setScroll(this.scroll), m && (this.targetScroll = h), u && (o && (this.isLocked = !1), requestAnimationFrame(() => {
                                    this.isScrolling = !1
                                }), this.velocity = 0, a == null || a()), this.emit()
                            }
                        })
                    }
                }
            }
            get rootElement() {
                return this.wrapper.element === window ? this.content.element : this.wrapper.element
            }
            get limit() {
                return Math.round(this.isHorizontal ? this.content.width - this.wrapper.width : this.content.height - this.wrapper.height)
            }
            get isHorizontal() {
                return this.options.orientation === "horizontal"
            }
            get actualScroll() {
                return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop
            }
            get scroll() {
                return this.options.infinite ? function(t, e) {
                    let s = t % e;
                    return (e > 0 && s < 0 || e < 0 && s > 0) && (s += e), s
                }(this.animatedScroll, this.limit) : this.animatedScroll
            }
            get progress() {
                return this.scroll / this.limit
            }
            get isSmooth() {
                return this.__isSmooth
            }
            set isSmooth(t) {
                this.__isSmooth !== t && (this.rootElement.classList.toggle("lenis-smooth", t), this.__isSmooth = t)
            }
            get isScrolling() {
                return this.__isScrolling
            }
            set isScrolling(t) {
                this.__isScrolling !== t && (this.rootElement.classList.toggle("lenis-scrolling", t), this.__isScrolling = t)
            }
            get isStopped() {
                return this.__isStopped
            }
            set isStopped(t) {
                this.__isStopped !== t && (this.rootElement.classList.toggle("lenis-stopped", t), this.__isStopped = t)
            }
        };

    function x(r) {
        let t = document.createElement("style");
        t.textContent = r, document.head.append(t)
    }

    function O(r) {
        let t = document.documentElement,
            e = {
                attributes: !0,
                childList: !1,
                subtree: !1
            },
            s = i => {
                for (let n of i) n.type === "attributes" && [...document.querySelectorAll(".w-editor-bem-EditSiteButton , .w-editor-bem-EditorMainMenu")].forEach(l => {
                    l.onclick = () => {
                        r()
                    }
                })
            };
        new MutationObserver(s).observe(t, e)
    }

    function H(r) {
        return /^(\s*[(]?[a-zA-Z0-9\s,]*[)]?\s*=>\s*{?\s*[\s\S]*}?)/.test(r)
    }

    function k(r, t = {}) {
        let e = document.querySelector(r);
        if (!e) return { ...t
        };
        let s = { ...e.dataset
        };
        for (let o in s) {
            let i = s[o];
            i === "" || i === " " || (isNaN(i) ? i === "true" || i === "false" ? i === "true" ? s[o] = !0 : s[o] = !1 : H(i) ? s[o] = new Function(`return ${i};`)() : s[o] = i : s[o] = +i)
        }
        return { ...t,
            ...s
        }
    }
    var P = x(`
    .lenis.lenis-smooth {
      scroll-behavior: auto;  
    }
    html.lenis {
      height: auto;
    }
`),
        W = class extends E {
            constructor(t) {
                super({
                    params: t
                }), this.params = t, this.isActive = !0, this.init()
            }
            init() {
                this.config(), this.render(), this.params.useRaf && (this.y = window.scrollY, this.max = window.innerHeight, this.speed = 0, this.percent = this.y / (document.body.scrollHeight - window.innerHeight), this.direction = 0, this.on("scroll", t => this.outScroll(t))), O(this.destroy)
            }
            config() {
                this.params.useAnchor && [...document.querySelectorAll("[data-scrolllink]")].forEach(t => {
                    let e = document.querySelector(t.dataset.scrolllink);
                    e && t.addEventListener("click", () => {
                        this.scrollTo(e)
                    })
                }), this.params.useOverscroll && [...document.querySelectorAll('[data-scroll="overscroll"]')].forEach(t => t.setAttribute("onwheel", "event.stopPropagation()")), this.params.useControls && ([...document.querySelectorAll('[data-scroll="stop"]')].forEach(t => {
                    t.onclick = () => {
                        this.stop(), this.isActive = !1
                    }
                }), [...document.querySelectorAll('[data-scroll="start"]')].forEach(t => {
                    t.onclick = () => {
                        this.start(), this.isActive = !0
                    }
                }), [...document.querySelectorAll('[data-scroll="toggle"]')].forEach(t => {
                    t.onclick = () => {
                        this.isActive ? (this.stop(), this.isActive = !1) : (this.start(), this.isActive = !0)
                    }
                }))
            }
            render(t) {
                this.raf(t), window.requestAnimationFrame(this.render.bind(this)), this.params.useRaf && this.renderWebflow(t)
            }
            outScroll({
                scroll: t,
                limit: e,
                velocity: s,
                progress: o,
                direction: i
            }) {
                this.y = t || 0, this.max = e || window.innerHeight, this.speed = s || 0, this.percent = o || 0, this.direction = 0
            }
            renderWebflow(t) {}
        },
        q = k("[data-id-scroll]", {
            duration: 1.5,
            easing: r => r === 1 ? 1 : 1 - Math.pow(2, -10 * r),
            orientation: "vertical",
            smoothWheel: !0,
            smoothTouch: !1,
            touchMultiplier: 1.5,
            useOverscroll: !0,
            useControls: !0,
            useAnchor: !0,
            useRaf: !0
        });
    window.SmoothScroll = new W(q);
})();