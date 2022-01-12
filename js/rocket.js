//register the plugin
gsap.registerPlugin(MotionPathPlugin);

// set the element to rotate from it's center
gsap.set(".rocket", {
	xPercent: -50,
	yPercent: -50,
	transformOrigin: "50% 50%"
});

// animate the rocket along the path
gsap.to(".rocket", {
    motionPath: {
        path: "#path",
        align: "#path",
        autoRotate: true,
    },
    duration: 25,
    delay: 1,
    repeat: 10,
    ease: "power1.inOut",
    immediateRender: true,
});

