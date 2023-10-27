import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function FadeIn ({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

FadeIn.propTypes = {
  children: PropTypes.node.isRequired,
};