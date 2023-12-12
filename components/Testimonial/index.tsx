"use client";
import SectionHeader from "../Common/SectionHeader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { motion } from "framer-motion";
import SingleTestimonial from "./SingleTestimonial";
import { testimonialData } from "./testimonialData";
import { useRef } from "react";

const Testimonial = () => {
  const swiperRef = useRef(null);

  const stopAutoplay = () => {
    // @ts-ignore
    swiperRef?.current?.swiper?.autoplay?.stop();
  };

  const startAutoplay = () => {
    // @ts-ignore
    swiperRef?.current?.swiper?.autoplay?.start();
  };
  return (
    <>
      <section id="reviews">
        <div className="mx-auto mt-10 max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <div className="animate_top mx-auto text-center">
            <SectionHeader
              headerInfo={{
                title: `SUCCESS STORIES`,
                subtitle: `Feedback That Makes A Difference`,
                description: `Discover stories of career growth and success fueled by our personalized feedback.`,
              }}
            />
          </div>
          {/* <!-- Section Title End --> */}
        </div>

        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -20,
            },

            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top mx-auto mt-15 max-w-c-1235 px-4 md:px-8 xl:mt-20 xl:px-0"
        >
          {/* <!-- Slider main container --> */}
          <div
            className="swiper testimonial-01 mb-12 pb-12
          "
          >
            {/* <!-- Additional required wrapper --> */}
            <Swiper
              ref={swiperRef}
              spaceBetween={50}
              slidesPerView={2}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              breakpoints={{
                // when window width is >= 640px
                0: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 2,
                },
              }}
            >
              {testimonialData.map((review) => (
                <SwiperSlide
                  key={review?.id}
                  onMouseEnter={stopAutoplay}
                  onMouseLeave={startAutoplay}
                  onTouchStart={stopAutoplay}
                  onTouchEnd={startAutoplay}
                >
                  <SingleTestimonial review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Testimonial;
