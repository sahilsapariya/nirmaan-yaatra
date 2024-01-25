import React, { useEffect, useRef } from "react";

import { motion } from "framer-motion"
import { useState } from "react";
import Card from "./Card";
import { liveSiteData } from "../../data/Data";

const Slider = () => {
  const [width, setWidth] = useState(0)
  const carousel = useRef();

  let card;

  
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [])

  card = <Card />;
  
  const styles = {
    slider__inner_container: {
      display: "flex"
    },
    slider__container: {
      overflow: "hidden"
    },
    __card: {
      padding: "1rem 0.5rem"
    }
  }


  return (
    <motion.div className="slider__container" style={styles.slider__container}>
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        ref={carousel}
        className="slider__inner-container"
        style={styles.slider__inner_container}
      >
        {
          liveSiteData.map((data, index) => {
            return (
              <motion.div className="__card" style={styles.__card} key={index}>
                <React.Fragment >{React.cloneElement(card, { site: data })}</React.Fragment>
              </motion.div>
            )
          })
        }
      </motion.div>
    </motion.div>
  );
};


export default Slider;