function combine() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}
combine();

let curser = document.querySelector(".curser");
let main = document.querySelector(".main");

main.addEventListener("mousemove", (dets) => {
  curser.style.left = dets.x - 5 + "px";
  curser.style.top = dets.y - 8 + "px";
});

let vdo = document.querySelector(".video-wrapper video");

vdo.addEventListener("click", () => {
  console.log("is clicked?");
  if (vdo.muted = false) {
    vdo.muted = true;
    // or toggle class, style it with a volume icon sprite, change background-position
  } else {
    vdo.muted = false;
  }
});

gsap.set(".page-1 .content", { filter: "blur(4px)" });
gsap.from(".page-1 .content h1, .page-1 .content h2", {
  y: 8,
  rotate: 5,
  opacity: 0,
  filter: "blur(0px)",
  delay: 0.3,
  duration: 0.7,
  stagger: 0.1,
});
gsap.from(".page-1 .content .subtext", {
  y: 50,
  opacity: 0,
  delay: 1,
  duration: 0.7,
});

let st = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-1",
    scroller: ".main",
    start: "top 30%",
    end: "top 0",
    scrub: 3,
  },
});

gsap.set(".page-1 .content", { filter: "blur(0px)" });

st.to(
  ".page-1 .content",
  {
    filter: "blur(4px)",
  },
  "page1"
);

st.to(
  ".page-1 .content h1",
  {
    x: -200,
    //   duration: 1,
    // scrollTrigger: {
    //   trigger: ".page-1 h1",
    //   scroller: ".main",
    //   markers: true,
    //   start: "top 30%",
    //   end: "top 0",
    //   scrub: 3,
    // },
  },
  "page1"
);
st.to(
  ".page-1 .content h2",
  {
    x: 200,
  },
  "page1"
);
st.to(
  ".page-1 video",
  {
    width: "100%",
  },
  "page1"
);
