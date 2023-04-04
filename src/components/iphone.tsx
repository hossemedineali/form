import { motion } from "framer-motion";
type props={
color:string
}
const HardwareAnimation:React.FC<props> = ({ color }) => {
  const containerVariants = {
    active: {
      rotate: [0, -5, 0, 5, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity
      }
    }
  };

  const imageVariants = {
    show: {
      scale: [0, 1],
      opacity: [0, 1],
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    hidden: {
      opacity: 0,
      scale: 0
    }
  };

  const imageContainerVariants = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const colors = [
    "midnight",
    "starlight",
    "red",
    "blue",
    "purple",
    "yellow"
  ];

  return (
    <motion.div
      className={`hw-container show active will-change ${color}`}
      data-component-list="HeroHWController"
      data-color-feature=""
      variants={containerVariants}
      animate="active"
    >
      <motion.div className="hw" variants={imageContainerVariants}>
        {colors.map((hwColor, index) => (
          <motion.figure
            key={hwColor}
            className={`image-hardware-${hwColor}`}
            aria-hidden="true"
            lazy-load="true"
            variants={imageVariants}
            initial="hidden"
            animate="show"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HardwareAnimation;
