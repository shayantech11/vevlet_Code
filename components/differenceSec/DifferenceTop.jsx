"use client";

import { motion } from "framer-motion";

const DifferenceTop = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="mb-10"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="h-px w-10 bg-gradient-to-r from-[#008080] to-transparent" />
        <span className="text-[#008080] font-mono text-[10px] tracking-[0.35em] uppercase">
          Why CodeVelvet
        </span>
        <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#008080]/20 to-transparent" />
      </div>
    </motion.div>
  );
};

export default DifferenceTop;
