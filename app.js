document.addEventListener("DOMContentLoaded", () => {

    const { debounceTime } = rxjs.operators;

    let videoChangeSubject = new rxjs.Subject();

    const intro = document.querySelector(".intro");
    const video = intro.querySelector("video");
    const text = intro.querySelector("h1");
    const highlight = document.querySelector(".highlight");
    const textRevol = highlight.querySelector("h1");
    const textMind = highlight.querySelector("h2");
    const textLife = highlight.querySelector("h3");
    
    const videoRequest = fetch('Animation on Scroll Video.mp4').then(response => response.blob());
    videoRequest.then(blob => {
        video.src = window.URL.createObjectURL(blob);
    });
    
    //SCROLLMAGIC
    const controller = new ScrollMagic.Controller();
    
    
    //Text Animations
    const textAnimHeadline = TweenMax.fromTo(text, 3, {opacity: 1}, {opacity: 0});
    const textAnimRevol = TweenMax.fromTo(textRevol, 1.5, {opacity: 0, x:100}, {opacity: 1, x:200});
    const textAnimMind = TweenMax.fromTo(textMind, 1.5, {opacity: 0, x:100}, {opacity: 1, x:200});
    const textAnimLife = TweenMax.fromTo(textLife, 1.5, {opacity: 0, x:100}, {opacity: 1, x:200});
    
    
    //Scenes
    let scene = new ScrollMagic.Scene({
        duration: 7200,
        triggerElement: intro,
        triggerHook: 0
    })
    .setPin(intro)
    .addTo(controller);
    
    let scene2 = new ScrollMagic.Scene({
        duration: 3000,
        triggerElement: intro,
        triggerHook: 0
    })
    .setTween(textAnimHeadline)
    .addTo(controller);
    
    let scene3 = new ScrollMagic.Scene({
        duration: 4500,
        triggerElement: highlight,
        triggerHook: 0
    })
    .setPin(highlight)
    .addTo(controller);
    
    let scene4 = new ScrollMagic.Scene({
        duration: 1500,
        triggerElement: highlight,
        triggerHook: 0
    })
    .setTween(textAnimRevol)
    .addTo(controller);
    
    let scene5 = new ScrollMagic.Scene({
        duration: 1500,
        triggerElement: highlight,
        triggerHook: 0
    })
    .setTween(textAnimMind)
    .addTo(controller);
    
    let scene6 = new ScrollMagic.Scene({
        duration: 1500,
        triggerElement: highlight,
        triggerHook: 0
    })
    .setTween(textAnimLife)
    .addTo(controller);
    
    
    //Video Animation
    let accelAmount = 0.05;
    let scrollPosition = 0;
    let delay = 0;
    
    scene.on("update", e => {
        scrollPosition = e.scrollPos / 1000;
        videoChangeSubject.next((scrollPosition - delay) * accelAmount);
    });
    
    videoChangeSubject.pipe(debounceTime(0.001)).subscribe(value => {
        delay += value;
        video.currentTime = delay;
    })
  
})