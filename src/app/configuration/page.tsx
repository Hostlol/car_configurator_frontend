'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

const colorOptions = [
    { name: 'White', price: 0, class: 'bg-white' },
    { name: 'Red', price: 0, class: 'bg-red-600' },
    { name: 'Black', price: 0, class: 'bg-black' },
    { name: 'Blue', price: 485, class: 'bg-blue-600' },
    { name: 'Gray', price: 485, class: 'bg-gray-500' }
]

const rimOptions = [
    { name: 'Standard', price: 0, image: '/roti_ieftine.png?height=50&width=50' },
    { name: 'Premium', price: 2500, image: '/roti_scumpe.png?height=50&width=50' }
]

const engineOptions = [
    { name: '2.0L Turbo', price: 0 },
    { name: '4.0L BiTurbo', price: 4500 }
]

const specOptions = [
    { name: 'Standard', price: 0 },
    { name: 'Luxury', price: 1500 },
    { name: 'Sport', price: 2500 }
]


export default function ConfigurationPage() {
    const [color, setColor] = useState(colorOptions[0])
    const [rim, setRim] = useState(rimOptions[0])
    const [engine, setEngine] = useState(engineOptions[0])
    const [spec, setSpec] = useState(specOptions[0])
    const handleCheckout = async () => {
        const configuration = {
            vehicleId: 10,
            color: color.name,
            rim: rim.name,
            price: totalPrice,
            deliveryAddress: 'home',
            paymentMethod: 'card'
        };

        try {
            const response = await fetch('http://localhost:3000/configurations', { // Make sure the URL matches your API route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(configuration)
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Configuration created successfully with ID: ${data.id}`);
            } else {
                const errorData = await response.json();
                console.error('Failed to create configuration:', errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const basePrice = 45000
    const totalPrice = basePrice + color.price + rim.price + engine.price + spec.price
    const getCarImage = () => {
        // Convert the color name to lowercase for URL compatibility
        const colorName = color.name.toLowerCase();
        const rimType = rim.name === 'Premium' ? 'premium' : 'cheap'; // Define rim type

        // Construct the image path based on color and rim selection
        return `/${colorName}_${rimType}.jpeg`; // Adjust path as necessary
    }
    return (
        <div className="min-h-screen text-white p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Customize your car</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <div className="bg-white rounded-lg overflow-hidden mb-4">
                        <Image
                            src={getCarImage()}
                            alt="Honda Civic Type R"
                            width={1200}
                            height={800}
                            className="w-full h-full object-cover object-center transform scale-125" // Scale image by 1.25
                        />
                    </div>
                    <div className="flex justify-between items-center bg-gray-800 rounded-lg p-4">
                        <span className="text-xl font-bold">Total: ${totalPrice.toLocaleString()}</span>
                        <button
                            onClick={handleCheckout} // Trigger checkout on click
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
                        >
                            Checkout
                            <ShoppingCart className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 bg-gray-800 rounded-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">Step 1: Choose your color</h2>
                        <div className="flex gap-4">
                            {colorOptions.map((option) => (
                                <button
                                    key={option.name}
                                    onClick={() => setColor(option)}
                                    className={`w-8 h-8 rounded-full ${option.class} ${color.name === option.name ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-800' : ''}`}
                                    title={`${option.name}${option.price ? ` +$${option.price}` : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">Step 2: Choose your rims</h2>
                        <div className="flex gap-4">
                            {rimOptions.map((option) => (
                                <button
                                    key={option.name}
                                    onClick={() => setRim(option)}
                                    className={`p-2 rounded ${rim.name === option.name ? 'bg-blue-600' : 'bg-gray-700'}`}
                                >
                                    <Image src={option.image} alt={option.name} width={50} height={50} />
                                    <p>{option.name}</p>
                                    {option.price > 0 && <p className="text-sm">+${option.price}</p>}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">Step 3: Choose your engine</h2>
                        <div className="flex gap-4">
                            {engineOptions.map((option) => (
                                <button
                                    key={option.name}
                                    onClick={() => setEngine(option)}
                                    className={`p-2 rounded ${engine.name === option.name ? 'bg-blue-600' : 'bg-gray-700'}`}
                                >
                                    <p>{option.name}</p>
                                    {option.price > 0 && <p className="text-sm">+${option.price}</p>}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Step 4: Choose your specifications</h2>
                        <div className="flex gap-4">
                            {specOptions.map((option) => (
                                <button
                                    key={option.name}
                                    onClick={() => setSpec(option)}
                                    className={`p-2 rounded ${spec.name === option.name ? 'bg-blue-600' : 'bg-gray-700'}`}
                                >
                                    <p>{option.name}</p>
                                    {option.price > 0 && <p className="text-sm">+${option.price}</p>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}