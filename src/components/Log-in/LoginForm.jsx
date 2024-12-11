import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene il comportamento di default del form

        // Crea un oggetto con i dati del form
        const formData = {
            email: email,
            password: password
        };

        try {
            // Invia una richiesta POST al server
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Controlla se la richiesta è andata a buon fine
            if (response.ok) {
                const data = await response.json();
                console.log('Login success:', data);
                // Esegui altre azioni, come reindirizzare l'utente
            } else {
                console.error('Login failed:', response.statusText);
                // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
            }
        } catch (error) {
            console.error('Error:', error);
            // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
        }
    };

    return (
        <>
            <div className="bg-slate-200 bg-gradient-to-r to-transparent flex-col justify-evenly rounded-xl">
                <div>
                    Login
                </div>
                <div className="p-10 bg-[#93c0f7] flex flex-col">
                    <div>
                        Email
                    </div>
                    <div>
                        <input
                            className="rounded-sm"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        Password
                    </div>
                    <div>
                        <input
                            className="rounded-sm"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="bg-slate-100 rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <button type="submit" className="hover:bg-slate-500 hover:text-slate-100">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <div>
                <p>
                    Non sei ancora registrato? Clicca{" "}
                    <Link className="text-red-700" to="/register">
                        qui
                    </Link>{" "}
                    per registrarti
                </p>
            </div>
        </>
    );
}

export default LoginForm;