export default {
  name: 'intersection',
  mounted(el, binding) {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (
        entries[0].isIntersecting
        //&&
        //this.posts.length > 0 &&
        //this.page < this.totalPages
      ) {
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
};
