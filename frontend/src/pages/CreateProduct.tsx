import { useState } from 'react';
import { useProducts } from '../contexts/productsContext';

export const CreateProduct = () => {
  const { dispatch } = useProducts();
  const [formData, setFormData] = useState<{ [key: string]: string }>({ name: '', price: '', image: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: false })); // Clear field error on input change
  };

  const handleAddProduct = async (e: React.FormEvent) => {
  e.preventDefault();

  // Check for missing fields
  const missingFields = Object.keys(formData).filter((key) => !formData[key]);
  if (missingFields.length > 0) {
    setError('Please fill in all fields.');
    setFieldErrors(
      missingFields.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    return;
  }

  setIsLoading(true); // Start loading spinner
  try {
    // Make API call to add the product
    const response = await fetch('api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Extract error message from the response
      throw new Error(responseData.message || 'Failed to add product.');
    }

    // Dispatch ADD_PRODUCT action
    dispatch({ type: 'ADD_PRODUCT', payload: responseData.newProduct });

    // Reset the form
    setFormData({ name: '', price: '', image: '' });
    setSuccess('New product added');
    setTimeout(() => setSuccess(null), 5000); // Clear success message after 5 seconds
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Set the error message from the API or fallback to a default message
    setError(err.message || 'An error occurred.');
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  } finally {
    setIsLoading(false); // Stop loading spinner
  }
};

  return (
    <section className="flex w-full flex-col items-center justify-center px-4 sm:px-32 md:px-64 lg:px-96 py-4 gap-4">
      <h1 className="text-2xl font-medium w-full text-left">Add New Product</h1>
      <p className="text-left w-full">
        Provide the product details below to add a new product. All fields are required.
      </p>
      <form onSubmit={handleAddProduct} className="flex flex-col gap-8 w-full items-center">
        {/* Error Message */}
        {error && (
          <p className="w-full text-left text-red-500 bg-red-100 border border-red-500 rounded p-2">
            {error}
          </p>
        )}
        {/* Success Message */}
        {success && (
          <p className="w-full text-left text-green-500 bg-green-100 border border-green-500 rounded p-2">
            {success}
          </p>
        )}
        <section className="flex flex-col gap-4 w-full items-center">
          <section className="field-container">
            <label
              htmlFor="name"
              className={`input-label ${fieldErrors.name ? 'text-red-500' : ''}`}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`input-field ${fieldErrors.name ? 'border-red-500' : ''}`}
            />
          </section>
          <section className="field-container">
            <label
              htmlFor="price"
              className={`input-label ${fieldErrors.price ? 'text-red-500' : ''}`}
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              className={`input-field ${fieldErrors.price ? 'border-red-500' : ''}`}
            />
          </section>
          <section className="field-container">
            <label
              htmlFor="image"
              className={`input-label ${fieldErrors.image ? 'text-red-500' : ''}`}
            >
              Image URL
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleInputChange}
              className={`input-field ${fieldErrors.image ? 'border-red-500' : ''}`}
            />
          </section>
        </section>
        <button type="submit" className="btn flex items-center justify-center">
          {isLoading ? (
            <span className="spinner border-t-2 border-white w-4 h-4 rounded-full animate-spin"></span>
          ) : (
            'Add Product'
          )}
        </button>
      </form>
    </section>
  );
};
