import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, joinEvent, leaveEvent } from '../redux/slices/eventsSlice';

function EventsPage() {
    const dispatch = useDispatch();
    const { events, loading, error, userEvents } = useSelector((state) => state.events);

    useEffect(() => {
        dispatch(getEvents()); // Obtener los eventos al cargar el componente
    }, [dispatch]);

    // Función para manejar la acción de apuntarse o cancelar la participación
    const handleToggleEvent = (event) => {
        const isUserEvent = userEvents.some((e) => e.id === event.id);
        if (isUserEvent) {
            dispatch(leaveEvent(event.id)); // Si está apuntado, lo eliminamos
        } else {
            dispatch(joinEvent(event)); // No está apuntado, lo agregamos
        }
    };

    if (loading) {
        return <div className="text-center text-white text-lg mt-10">Cargando eventos...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-lg mt-10">{error}</div>;
    }

    return (
        <div className="min-h-screen grayPink text-white p-6 shadow-outset-pink">
            <h1 className="text-3xl font-bold text-center mb-8">Eventos de Videojuegos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {events.map((event) => {
                    const isUserEvent = userEvents.some((e) => e.id === event.id);

                    return (
                        <div key={event.id} className="bg-pink-900 p-4 rounded-lg shadow-lg shadow-inset-yellow">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-semibold">{event.title}</h2>
                            <p>{event.location}</p>
                            <button
                                onClick={() => handleToggleEvent(event)}
                                className={`mt-4 ${isUserEvent ? 'bg-red-500 text-white border border-white hover:bg-red-800 transition duration-700 hover:brightness-90 hover:border-white' : 'bg-green-600 text-white border border-white hover:bg-green-800 transition duration-700 hover:brightness-90 hover:border-white '}`}
                            >
                                {isUserEvent ? 'Cancelar participación' : 'Apuntarme'}
                            </button>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default EventsPage;
