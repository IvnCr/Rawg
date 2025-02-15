import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from "../components/Button";


function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
        <div className="p-6 bg-gradient-to-r shadow-outset-pink from-[#212121] to-pink-700 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
            <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Contacto</h1>
            <p className="text-lg text-white mb-4 text-center">
                ¿Tienes dudas o sugerencias? ¡Estamos aquí para ayudarte! Escríbenos a{' '}
                <a href="mailto:icr0015@alu.medac.es" className="text-white underline hover:text-yellow-100 transition duration-700">
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
                        className="w-full p-3 mt-2 border-2 border-yellow-100 rounded-md focus:ring-2 focus:ring-yellow-100"
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
                        className="w-full p-3 mt-2 border-2 border-yellow-100 rounded-md focus:ring-2 focus:ring-yellow-100"
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
                        className="w-full p-3 mt-2 border-2 border-yellow-100 rounded-md focus:ring-2 focus:ring-yellow-100"
                        rows="4"
                        placeholder="Escribe tu mensaje aquí"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full py-3"
                >
                    Enviar mensaje
                </Button>
            </form>
        </div>
    );
}

export default ContactPage;
