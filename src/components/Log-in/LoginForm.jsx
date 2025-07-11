import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import AuthContext

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Use login function from AuthContext

    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene il comportamento di default del form

        // Crea un oggetto con i dati del form
        const formData = {
            email,
            password
        };

        try {
            // Invia una richiesta POST al server
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            console.log('Response data:', data);

            // Controlla se la richiesta è andata a buon fine
            if (response.ok && data.success) {
                console.log('Login success:', data);
                console.log('Nome Giornalista:', data.giornalista.nome);
                
                localStorage.setItem('nome_giornalista', data.giornalista.nome); // Save name in localStorage
                console.log('localStorage.getItem:', localStorage.getItem('nome_giornalista'));
                login({ nome: data.giornalista.nome, email: data.giornalista.email }); // Update AuthContext
                console.log('AuthContext login data:', { nome: data.giornalista.nome, email: data.giornalista.email });
                
                //window.location.href = '/home';
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
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="text-6xl mb-4">🐱</div>
              <h2 className="text-3xl font-bold text-white mb-2">Accedi a StreetCats</h2>
              <p className="text-white/70 text-lg">Bentornato! Accedi per continuare</p>
            </div>
      
            {/* Form Container */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-gray-800 font-semibold text-lg">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
      
                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-gray-800 font-semibold text-lg">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="********"
                      required
                    />
                  </div>
                </div>
      
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                >
                  Accedi
                </button>
              </form>
      
              {/* Register Link */}
              <div className="mt-8 text-center">
                <p className="text-white/70">
                  Non hai un account?{' '}
                  <Link
                    to="/register"
                    className="text-blue-300 hover:text-blue-200 font-semibold hover:underline"
                  >
                    Registrati
                  </Link>
                </p>
              </div>
            </div>
      
            {/* Footer */}
            <div className="text-center text-white/50 text-sm">
              <p>Accedendo accetti i nostri termini di servizio</p>
            </div>
          </div>
        </div>
    );  
}

export default LoginForm;