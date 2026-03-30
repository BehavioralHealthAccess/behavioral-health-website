const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".menu a")];

const setActiveLink = (id) => {
  for (const link of links) {
    const isMatch = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isMatch);
    link.setAttribute("aria-current", isMatch ? "page" : "false");
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveLink(visible.target.id);
    }
  },
  {
    rootMargin: "-30% 0px -45% 0px",
    threshold: [0.15, 0.35, 0.6]
  }
);

sections.forEach((section) => observer.observe(section));
