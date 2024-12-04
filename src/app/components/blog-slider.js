import Slider from "react-slick";
import { isDesktop, isTablet } from "react-device-detect";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import throttle from "lodash.throttle";
import { getBlogs } from "../services/flightService";

export default function BlogSlider() {
    const sliderRef = useRef(null); // Slider ref to access methods
    const [scrollTop, setScrollTop] = useState(0);
    const [sliderScrolled, setSliderScrolled] = useState(false);
    const [blogs, setBlogs] = useState([]);

    // Memoize slider settings to avoid re-calculation on every render
    const sliderSettings = useMemo(() => ({
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: "20px",
        slidesToShow: isTablet ? 2 : (isDesktop ? 3 : 1),
        slidesToScroll: 1,
        speed: 500,
        focusOnSelect: true
    }), []);

    // Throttle scroll events for better performance
    const handleScroll = useCallback(throttle(() => {
        const currentPosition = window.pageYOffset;
        setScrollTop(currentPosition <= 0 ? 0 : currentPosition);

        // Trigger slider scroll when condition is met
        if (currentPosition > 3100 && !sliderScrolled) {
            sliderRef.current.slickGoTo((isDesktop ? 1 : 3))
            setSliderScrolled(true);
        }

    }, 200), [scrollTop, sliderScrolled]);

    const fetchBlogs = async () => {
        const res = await getBlogs();
        setBlogs(res.data);
    };

    // Set up scroll listener with clean-up
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <section className="blogSlider py-5 bg-light-blue">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-8">
                        <div className="subHeading">
                            <h2 className="mb-0 fw-normal">Our <strong className="color-blue">Blog</strong></h2>
                        </div>
                    </div>
                    <div className="col-4 text-end">
                        <a className="text-decoration-none color-blue fw-bold fs-14" href="https://www.travanya.ae/blog/">View All Blogs</a>
                    </div>
                    <div className="col-12">
                        <div className="position-relative px-2">
                            {blogs?.length > 0 && (
                                <Slider ref={sliderRef} {...sliderSettings}>
                                    {blogs.map((blog, index) => (
                                        <div className="slider-items py-3" key={index}>
                                            <a href={blog.link} className="position-relative w-100 d-inline-block text-decoration-none bg-white shadow rounded-3 p-3">
                                                <img
                                                    className="w-100 h-auto rounded-3"
                                                    // loader={blogImgLoader}
                                                    src={blog.image}
                                                    alt={blog.title || 'Blog Image'}
                                                    width={25}
                                                    height={25}
                                                />
                                                <p className="mb-0 color-blue fw-bold mt-2 line-hight-normal fs-16">
                                                    {blog.title || 'Default Blog Title'}
                                                </p>
                                                <span className="fs-12 color-black d-inline-block text-end w-100">{blog.updated}</span>
                                            </a>
                                        </div>
                                    ))}
                                </Slider>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}