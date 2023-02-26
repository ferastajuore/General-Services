import { useState, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { AdminLayout } from '@/components/layout';
import { AdsTable, CreateAds } from '@/components/ads';
import { Header, Modal } from '@/components/UI';

const Ads = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="الاخبار" />
					<AdsTable />

					<Modal title="أضافة خبر" isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
						<CreateAds />
					</Modal>

					<button className="btn btn-info" ref={btnRef} onClick={onOpen}>
						أضافة خبر
					</button>
				</div>
			</AdminLayout>
		</>
	);
};

export default Ads;
