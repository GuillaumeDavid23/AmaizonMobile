import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'
import Page6 from './Page6'
import Page7 from './Page7'
import Page8 from './Page8'

const Pages = ({
	visiblePage,
	control,
	errors,
	token,
	checked,
	setChecked,
	photosList,
	setPhotosList,
	handleSubmit,
	onSubmit,
	datasToDisplay,
	seller,
	datasToValidate,
	handleValidation,
}) => {
	return (
		<>
			{/* Page 1: Infos Principales */}
			<Page1
				display={visiblePage === 1 ? 'flex' : 'none'}
				control={control}
				errors={errors}
			/>

			{/* Page 2: Infos Géographiques */}
			<Page2
				display={visiblePage === 2 ? 'flex' : 'none'}
				control={control}
				errors={errors}
			/>

			{/* Page 3: Infos Principales 2 */}
			<Page3
				display={visiblePage === 3 ? 'flex' : 'none'}
				control={control}
				errors={errors}
			/>

			{/* Page 4: Infos techniques */}
			<Page4
				display={visiblePage === 4 ? 'flex' : 'none'}
				control={control}
				errors={errors}
			/>

			{/* Page 5: Infos financières */}
			<Page5
				display={visiblePage === 5 ? 'flex' : 'none'}
				control={control}
				errors={errors}
			/>

			{/* Page 6: Infos Vendeur */}
			<Page6
				display={visiblePage === 6 ? 'flex' : 'none'}
				token={token}
				checked={checked}
				setChecked={setChecked}
			/>

			{/* Page 7: Ajout de photos */}
			<Page7
				display={visiblePage === 7 ? 'flex' : 'none'}
				photosList={photosList}
				setPhotosList={setPhotosList}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
			/>

			{/* Page 8: Récapitulatif */}
			<Page8
				display={visiblePage === 8 ? 'flex' : 'none'}
				datasToDisplay={datasToDisplay}
				seller={seller}
				datasToValidate={datasToValidate}
				handleValidation={handleValidation}
			/>
		</>
	)
}

export default Pages
