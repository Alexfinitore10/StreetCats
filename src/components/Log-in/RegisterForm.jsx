import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function RegisterForm(){

    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        const payload = { 
          nome, 
          email, 
          password 
        };

        try {
            const res = await fetch("http://localhost:3001/api/create_giornalista", { // Modificato l'endpoint
              method: "POST",
              credentials: "include",      // abilita cookie HttpOnly (se li imposti lato server)
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
            });
      
            const data = await res.json();
      
            if (!data.success) {
              setError(data.message || "Registrazione fallita");
              return;
            }
            setError(""); // Rimuove eventuali errori precedenti
            alert("Registrazione avvenuta con successo!");
            navigate("/login");
        } catch (error) {
            console.error("Error during registration:", error);
            setError("Errore durante la registrazione");
        }
    };

    
    return(
        <>
        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-200 p-6 rounded-xl">
        <h2 className="text-xl font-semibold">Registrazione</h2>

        {error && <div className="text-red-600">{error}</div>}

        <div>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-sm p-1"
            required
          />
        </div>

        <div>
          <label>Cognome</label>
          <input
            type="text"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            className="w-full rounded-sm p-1"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm p-1"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm p-1"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Registrati
        </button>
      </form>

      <p className="mt-4 text-center">
        Hai già un account?{" "}
        <Link className="text-red-700" to="/login">
          Effettua il login
        </Link>
      </p>
    </>
    );
}

export default RegisterForm;