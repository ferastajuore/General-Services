import { useState, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { AdminLayout } from '@/components/layout';
import { AreasTable, CreateAreas } from '@/components/Areas';
import { Header, Modal } from '@/components/UI';

const Areas = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="المناطق" />
					<AreasTable />

					<Modal title="أضافة منطقة" isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
						<CreateAreas />
					</Modal>

					<button className="btn btn-info" ref={btnRef} onClick={onOpen}>
						أضافة منطقة
					</button>
				</div>
			</AdminLayout>
		</>
	);
};

export default Areas;
