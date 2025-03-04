import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishers } from "../services/api";
import Button from "../components/Button";

function PublishersPage() {
    const [publishers, setPublishers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getPublishers(currentPage).then((data) => {
            setPublishers(data);
            setTotalPages(10); // Puedes cambiarlo por el total real si la API lo proporciona
        });
    }, [currentPage]);

    const filteredPublishers = publishers.filter((publisher) =>
        publisher.name.toLowerCase().includes(search.toLowerCase())
    );

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="mt-12 px-6 grayPink rounded-lg py-8 shadow-outset-pink">
            <h2 className="text-3xl font-bold text-center text-white mb-6">📢 Publishers</h2>

            {/* Input de búsqueda */}
            <div className="flex justify-center mb-8">
                <div className="flex w-full max-w-4xl bg-pink-600 shadow-outset-pink p-4 rounded-lg shadow-2xl">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Escribe el nombre del publisher..."
                        className="flex-grow p-3 bg-transparent text-white border-2 border-yellow-100 rounded-lg"
                    />
                </div>
            </div>

            {/* Lista de publishers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredPublishers.length > 0 ? (
                    filteredPublishers.map((publisher) => (
                        <Link key={publisher.id} to={`/publishers/${publisher.slug}`} className="group">
                            <div className="relative p-6 rounded-xl shadow-xl bg-gradient-to-br from-pink-800 to-pink-950 hover:brightness-110 hover:scale-105 transition-transform duration-500 flex items-center justify-center min-h-[120px]">
                                {/* Fondo con un toque de transparencia para un efecto de capa */}
                                <div className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 bg-white/10"></div>
                                {/* Contenido del publisher */}
                                <h3 className="relative text-white text-xl font-semibold truncate overflow-hidden w-full text-center 
                                    group-hover:text-pink-100 transition-colors duration-300">
                                    {publisher.name}
                                </h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center col-span-full text-white text-xl">No se encontraron publishers.</p>
                )}
            </div>


            {/* Paginación */}
            <div className="flex justify-center items-center mt-6 space-x-4">
                {/* Botón Anterior */}
                <Button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-2 px-4 py-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#db2777">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                    <span>Anterior</span>
                </Button>

                {/* Número de página */}
                <span className="text-yellow-100 text-xl font-semibold">
                    Página {currentPage} de {totalPages}
                </span>

                {/* Botón Siguiente */}
                <Button
                    onClick={nextPage}
                    disabled={currentPage >= totalPages}
                    className="flex items-center space-x-2 px-4 py-2"
                >
                    <span>Siguiente</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#db2777 ">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                    </svg>
                </Button>
            </div>

        </div>
    );
}

export default PublishersPage;
