import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react';
import { CgMenuRound } from 'react-icons/cg';
import { TbEdit } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import { DataType, PagingPosition, SortingMode } from 'ka-table/enums';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FiEye } from 'react-icons/fi';

import { db } from '@/middleware/firebase';

import EditContainer from '../EditContainer';

// Custom Cell  for image column
const CustomCellImage = ({ value }) => {
	return <Image src="/assets/image/Housing.png" alt="company" width={30} height={30} />;
};

// Custom cell for controle column
const CustomCellControle = ({ value }) => {
	const router = useRouter();

	// useState
	const [isActiveModel, setIsActiveModel] = useState(false);
	const [getId, setGetId] = useState('');

	// handle modal or update
	const handleModalUpdate = (isAcitve, id) => {
		setGetId(id);
		setIsActiveModel(!isAcitve);
	};

	const handleModal = (isAcitve, id) => {
		setGetId(id);
		// setIsActiveModel(!isAcitve);
	};

	// handler Delete element
	const handleDelete = async (id) => {
		try {
			if (confirm('هل انت متاكد تريد حدف الحاوية ؟')) {
				const document = doc(db, 'containers', id);
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
			<Menu>
				<MenuButton>
					<CgMenuRound fontSize="1.8em" />
				</MenuButton>
				<MenuList>
					<Link href={`/Containers/${value}`}>
						<MenuItem icon={<FiEye fontSize="1.8em" color="#333" />}>
							عرض الحاوية
						</MenuItem>
					</Link>
					<MenuItem
						icon={<TbEdit fontSize="1.8em" color="#333" />}
						onClick={() => handleModalUpdate(isActiveModel, value)}
					>
						تعديل الحاوية
					</MenuItem>
					<MenuItem
						icon={<MdDelete fontSize="1.8em" color="#333" />}
						onClick={() => handleDelete(value)}
					>
						حدف الحاوية
					</MenuItem>
				</MenuList>
			</Menu>
			{getId && (
				<>
					<EditContainer
						activeModel={isActiveModel}
						closeModel={handleModal}
						getId={getId}
					/>
				</>
			)}
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
			style: { width: 200 },
		},
		{
			key: 'city',
			title: 'المدينة',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'address',
			title: 'العنوان',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'id',
			style: { width: 80, textAlign: 'center' },
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
