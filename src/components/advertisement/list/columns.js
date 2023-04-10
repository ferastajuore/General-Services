import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuList, MenuItem, MenuButton, useDisclosure } from '@chakra-ui/react';
import { CgMenuRound } from 'react-icons/cg';
import { TbEdit } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import { DataType, PagingPosition, SortingMode } from 'ka-table/enums';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FiEye } from 'react-icons/fi';

import { db } from '@/middleware/firebase';
import { Button, Modal } from '@/components/UI';

// Custom Cell  for image column
const CustomCellImage = ({ value }) => {
	return (
		<Image
			src={value ? value : '/assets/image/Housing.png'}
			alt="company"
			width={120}
			height={120}
		/>
	);
};

// Custom cell for controle column
const CustomCellControle = ({ value }) => {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	// useState
	const [getId, setGetId] = useState('');

	// handle modal or update
	const handleModal = (isAcitve, id) => {
		setGetId(id);
		onOpen(isAcitve);
	};

	// handler Delete element
	const handleDelete = async (id) => {
		try {
			if (confirm('هل انت متاكد تريد حدف اعلان ؟')) {
				const document = doc(db, 'advertisement', id);
				await deleteDoc(document);

				setTimeout(() => {
					router.reload();
				}, 1000);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Button />
			<Button
				title="حدف اعلان"
				className="btn-danger mt-2"
				onClick={() => handleDelete(value)}
			/>
		</>
	);
};

// Table Props options
export const tablePropsInit = {
	columns: [
		{
			key: 'image',
			title: 'الصورة',
			dataType: DataType.String,
			style: { width: 100 },
		},
		{
			key: 'date',
			title: 'التاريخ',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'id',
			style: { width: 100, textAlign: 'center' },
		},
	],
	// data: dataTable,
	paging: {
		enabled: true,
		pageIndex: 0,
		pageSize: 5,
		pageSizes: [5, 10, 15],
		position: PagingPosition.Bottom,
	},
	sortingMode: SortingMode.Single,
	// editingMode: EditingMode.Cell,
	loading: true,
	rowKeyField: 'id',
	childComponents: {
		cellText: {
			content: (props) => {
				switch (props.column.key) {
					case 'image':
						return <CustomCellImage {...props} />;
					case 'id':
						return <CustomCellControle {...props} />;
					// case 'password':
					// 	return <CustomCellPassword {...props} />;
				}
			},
		},
	},
};
