import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function FadeIn ({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

FadeIn.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};