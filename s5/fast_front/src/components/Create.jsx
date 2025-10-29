import { useState } from "react"
import { useNavigate } from "react-router"

export default function Create(){
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleClick = (e)=>{

        e.preventDefault();

        if(!name && !description && !price){
            alert('Please fill in both fields');
        }

        // const formData = new URLSearchParams();
        // formData.append('name', name);
        // formData.append('desciption', description);
        // formData.append('price', price);

        const data ={

            name: name,
            description: description,
            price: price
        }

        // console.log(formData);

        fetch('http://localhost:8000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({'id': 1, 'name': name, 'description': description, 'price': price }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur');
            }
            return response.json();
        })
        .then(data => {
            navigate('/')
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    }

    return (
        <>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" method="POST">
                                <div>
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Nom du livre</label>
                                    <div className="mt-2">
                                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" id="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Description</label>
                                    {/* <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div> */}
                                    </div>
                                    <div className="mt-2">
                                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} name="description" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                    <label htmlFor="password1" className="block text-sm/6 font-medium text-gray-900">Prix</label>
                                    {/* <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div> */}
                                    </div>
                                    <div className="mt-2">
                                    <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} name="description" id="password1" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" onClick={handleClick} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                                </div>
                            </form>

                            {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
                            Not a member?
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}