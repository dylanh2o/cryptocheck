import React from 'react';
import {motion} from "framer-motion";

const Page = ({children}) => (
	<motion.div
		initial={{
			x: '-100%'
		}}
		animate={{
			x: '0%'
		}}
		exit={{
			x: '100%'
		}}
		transition={{
			duration: 0.5
		}}
	>
		{children}
	</motion.div>
);

export default Page;