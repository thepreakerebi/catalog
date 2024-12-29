export const CreateProduct = () => {


  return (
    <section className={'flex w-full flex-col items-center justify-center px-4 sm:px-32 md:px-64 lg:px-96 py-4 gap-4'}>
        <h1 className={'text-2xl font-medium w-full text-left'}>Add New Product</h1>
        <p className='text-left w-full'>Provide the product details below to add a new product. All fields are required</p>
        <form className={'flex flex-col gap-8 w-full items-center'}>
            <section className={'flex flex-col gap-4 w-full items-center'}>
                <section className={'field-container'}>
                <label htmlFor='name' className={'input-label'}>Name</label>
                <input type='text' name='name' id='name' className={'input-field'} />
                </section>
                <section className={'field-container'}>
                    <label htmlFor='price' className={'input-label'}>Price</label>
                    <input type='number' name='price' id='price' className={'input-field'} />
                </section>
                <section className={'field-container'}>
                    <label htmlFor='image' className={'input-label'}>Image url</label>
                    <input type='text' name='image' id='image' className={'input-field'} />
                </section>
            </section>
            <button type='submit' className='btn'>Add Product</button>
        </form>
    </section>
  )
}