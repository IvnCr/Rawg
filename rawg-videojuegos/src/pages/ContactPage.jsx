import React, { useState } from 'react';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    };

    return (
        <div className="p-6 bg-gradient-to-r from-[#212121] to-[#3498db] rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
            <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Contacto</h1>
            <p className="text-lg text-white mb-4 text-center">
                ¿Tienes dudas o sugerencias? ¡Estamos aquí para ayudarte! Escríbenos a{' '}
                <a href="mailto:icr0015@alu.medac.es" className="text-yellow-300 underline">
                    icr0015@alu.medac.es
                </a>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="text-white font-semibold">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                        placeholder="Tu nombre completo"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="text-white font-semibold">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                        placeholder="Tu correo electrónico"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="message" className="text-white font-semibold">
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                        rows="4"
                        placeholder="Escribe tu mensaje aquí"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-yellow-400 text-white font-bold rounded-md hover:bg-yellow-500 transition duration-300"
                >
                    Enviar mensaje
                </button>
            </form>
        </div>
    );
}

export default ContactPage;
