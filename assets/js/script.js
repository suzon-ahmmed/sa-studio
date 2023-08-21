function init() {
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

init();

let cursor = document.querySelector(".cursor");
let main = document.querySelector(".main");

window.addEventListener("mousemove", (dest) => {
  // circle.style.transform = `translate(${dest.clientX}px, ${dest.clientY}px)`;
  gsap.to(cursor, {
    x: dest.clientX - 10,
    y: dest.clientY - 10,
    duration: 0.4,
    ease: Expo,
  });
});

// const p2 = document.querySelector(".page-2");

// p2.addEventListener("mousemove", () => {
//   cursor.classList.add("active");
// });
// p2.addEventListener("mouseleave", () => {
//   cursor.innerText = "active";
//   cursor.classList.remove("active");
// });

let vdo = document.querySelector("video");

vdo.addEventListener("click", () => {
  // console.log("is clicked?");
  if (vdo.muted == false) {
    vdo.muted = true;
    // or toggle class, style it with a volume icon sprite, change background-position
  } else {
    vdo.muted = false;
  }
});
vdo.addEventListener("mousemove", () => {
  cursor.classList.add("video");
});
vdo.addEventListener("mouseleave", () => {
  cursor.classList.remove("video");
});

gsap.set(".page-1 .content", { filter: "blur(4px)" });
gsap.from(".page-1 .content h1, .page-1 .content h2", {
  y: 30,
  // rotate: 5,
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

let st2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-1",
    scroller: ".main",
    start: "top -130%",
    end: "top -110",
    scrub: 3,
  },
});

st2.to(
  ".main",
  {
    backgroundColor: "#fff",
    color: "#000",
  },
  "page2"
);
st2.to(
  "nav",
  {
    color: "#000",
  },
  "page2"
);
st2.to(
  ".circle",
  {
    backgroundColor: "#000",
  },
  "page2"
);


const rows = document.querySelectorAll(".row .text-content");
const imageHolderImg = document.querySelector(".img-content img");

rows.forEach((row) => {
  row.addEventListener("mouseenter", function () {
    // const link = this.querySelector("a");
    // // console.log(link)
    // link.style.opacity = "1";
    const value = this.getAttribute("data-src");
    imageHolderImg.setAttribute("src", value);
  });
});
