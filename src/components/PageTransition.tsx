import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { type ReactNode } from 'react'

const variants: Variants = {
  initial: {
    opacity: 0,
    y:       12,
    scale:   0.995,
  },
  animate: {
    opacity:    1,
    y:          0,
    scale:      1,
    transition: {
      duration: 0.35,
      ease:     'easeOut',
    },
  },
  exit: {
    opacity:    0,
    y:          -8,
    scale:      0.995,
    transition: {
      duration: 0.2,
      ease:     'easeIn',
    },
  },
}

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
} 