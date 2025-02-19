import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishers } from "../services/api"; // Asegúrate de tener esta función en api.js
import Button from "../components/Button";

function PublishersPage() {
    const [publishers, setPublishers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getPublishers().then(setPublishers);
    }, []);

    const filteredPublishers = publishers.filter((publisher) =>
        publisher.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mt-12 px-6 grayPink rounded-lg py-8 shadow-outset-pink">
            <h2 className="text-3xl font-bold text-center text-white mb-6">📢 Publishers</h2>

            {/* Input de búsqueda */}
            <div className="flex justify-center mb-8">
                <div className="flex w-full max-w-4xl bg-pink-600 shadow-outset-pink p-4 rounded-lg shadow-2xl transition-all duration-1000 ease-in-out">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Escribe el nombre del publisher..."
                        className="flex-grow p-3 bg-transparent text-white border-2 border-yellow-100 rounded-lg focus:shadow-inner transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPublishers.length > 0 ? (
                    filteredPublishers.map((publisher) => (
                        <Link key={publisher.id} to={`/publishers/${publisher.slug}`}>
                            <div className="relative p-5 rounded-lg shadow-lg shadow-yellow-100/50 
                                bg-gradient-to-br from-pink-800 to-pink-950
                                hover:brightness-125 hover:scale-105 transition-transform duration-500
                                flex items-center justify-center min-h-[90px]">

                                {/* Efecto de brillo */}
                                <div className="absolute inset-0 rounded-lg opacity-20 hover:opacity-50 transition duration-500 bg-white/10"></div>

                                <h3 className="relative text-white text-lg font-semibold truncate overflow-hidden 
                                    whitespace-nowrap w-full text-center">
                                    {publisher.name}
                                </h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center col-span-full text-white">No se encontraron publishers.</p>
                )}
            </div>


        </div>
    );
}

export default PublishersPage;
