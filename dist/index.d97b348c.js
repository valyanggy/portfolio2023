let eye_ref = document.querySelectorAll(".iris");
let events = [
    "mousemove",
    "touchmove"
];
function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}
events.forEach((eventType)=>{
    document.body.addEventListener(eventType, (event)=>{
        eye_ref.forEach((eye)=>{
            let eyeX = -(window.innerWidth / 2 - event.pageX) / 20;
            let eyeY = -(window.innerHeight / 2 - event.pageY) / 45;
            eye.style.transform = `rotate(-45deg) translateY(${eyeY}px) translateX(${eyeX}px)`;
        });
    });
});

//# sourceMappingURL=index.d97b348c.js.map
