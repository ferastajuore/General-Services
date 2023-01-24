import React from 'react';

const HeaderTitle = ({ title, className = 'text-center' }) => {
	return (
		<div className={`mb-3 ${className}  headerTitle`}>
			<h2>{title}</h2>
		</div>
	);
};

export default HeaderTitle;
