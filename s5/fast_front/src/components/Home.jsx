import { useEffect, useState } from "react"

export default function Home(){

    
    const token = localStorage.getItem('token');
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        displayBook();
    },[]);

    function displayBook(){
        fetch('http://localhost:8000/books', {
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Échec de la requête');
            }
            return response.json();
        })
        .then(data => {
            console.log('Données reçues:', data);
            setBooks(data);
        })
        .catch(error => {
            console.error('Erreur:', error);
         });
    }

    const handleDelete = (id)=>{
        if(confirm('Voulez-vous vraiment supprimer ce livre ?')){
            fetch('http://localhost:8000/books/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data=>{
                displayBook();
            })

        }
        else{
            console.log('Suppression annulée');
            return;
        }
        
        
    }

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Bienvenue à la boutique en ligne</h2>
                <p className="mt-2 text-lg/8 text-gray-600">Retrouver vos livres ici vos livres.</p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {
                        books.length > 0 ? 
                        books.map((book,index) => (
                            <article key={index.toString()} className="flex max-w-xl flex-col items-start justify-between border-1 border-gray-500 rounded-md p-4">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime="2020-03-16" className="text-gray-500">Mar 16, 2020</time>
                                    <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Marketing</a>
                                    </div>
                                    <div className="group relative grow">
                                        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                            <a href="#">
                                            <span className="absolute inset-0"></span>
                                            {book?.name}
                                            </a>
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{book?.description}</p>
                                    </div>
                                <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-sm/6 text-gray-600">Prix:</span>
                                        <span className="text-base font-medium text-gray-900">{book?.price} FCFA</span>
                                    </div>
                                    <p></p>
                                    <a href="#" className="relative z-10 rounded-full bg-green-50 px-3
                                    py-1.5 font-medium text-gray-600 hover:bg-gray-100">Lire
                                    </a>
                                    {/* button supprimer */}
                                    <button onClick={()=>handleDelete(book?.id)} className="relative z-10 rounded-full bg-red-300 px-3 py-
                                    1.5 font-medium text-white hover:bg-gray-100">Supprimer</ button>
                                    {/* <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                                    <div className="text-sm/6">
                                        <p className="font-semibold text-gray-900">
                                        <a href="#">
                                            <span className="absolute inset-0"></span>
                                            Michael Foster
                                        </a>
                                        </p>
                                        <p className="text-gray-600">Co-Founder / CTO</p>
                                    </div> */}
                                </div>
                            </article>
                        ))
                        : <p className="text-shadow-red-600">Il n'y a pas de livre dans la boutique</p>

                    }
                    {/* <article className="flex max-w-xl flex-col items-start justify-between">
                        <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime="2020-03-10" className="text-gray-500">Mar 10, 2020</time>
                        <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Sales</a>
                        </div>
                        <div className="group relative grow">
                        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                            <a href="#">
                            <span className="absolute inset-0"></span>
                            How to use search engine optimization to drive sales
                            </a>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.</p>
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                        <div className="text-sm/6">
                            <p className="font-semibold text-gray-900">
                            <a href="#">
                                <span className="absolute inset-0"></span>
                                Lindsay Walton
                            </a>
                            </p>
                            <p className="text-gray-600">Front-end Developer</p>
                        </div>
                        </div>
                    </article>
                    <article className="flex max-w-xl flex-col items-start justify-between">
                        <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime="2020-02-12" className="text-gray-500">Feb 12, 2020</time>
                        <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Business</a>
                        </div>
                        <div className="group relative grow">
                        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                            <a href="#">
                            <span className="absolute inset-0"></span>
                            Improve your customer experience
                            </a>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis. Nostrud sint anim sunt aliqua. Nulla eu labore irure incididunt velit cillum quis magna dolore.</p>
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                        <div className="text-sm/6">
                            <p className="font-semibold text-gray-900">
                            <a href="#">
                                <span className="absolute inset-0"></span>
                                Tom Cook
                            </a>
                            </p>
                            <p className="text-gray-600">Director of Product</p>
                        </div>
                        </div>
                    </article> */}
                </div>
            </div>
        </div>
    )
}
